import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const HOME_FEEDS = {
    forYou: "forYou",
    latest: "latest",
    following: "following",
};

const initialState = {
    isLoading: false,
    posts: [],
    feed: HOME_FEEDS.forYou,
    seed: null,
    limit: 5,
    prevPage: null,
    page: 1,
    nextPage: null,
    hasPrevPage: null,
    hasNextPage: true
}

const prependUniquePost = (posts, post) => {
    if (!post?._id) return posts;
    if (posts.some((item) => item._id === post._id)) return posts;
    return [post, ...posts];
}

export const getAllPosts = createAsyncThunk('post/getAllPosts',
    async (_, {getState}) => {
        const {homeSlice} = getState();
        const nextPage = homeSlice.nextPage || homeSlice.page;
        const params = new URLSearchParams({
            page: String(nextPage),
            limit: String(homeSlice.limit),
            feed: homeSlice.feed,
        });
        if (homeSlice.feed === HOME_FEEDS.forYou && homeSlice.seed != null) {
            params.set("seed", String(homeSlice.seed));
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/?${params.toString()}`,
            {
                withCredentials: true
            });
            return {
                ...response.data,
                requestedFeed: homeSlice.feed,
            };
    });

export const fetchAndPrependPost = createAsyncThunk('home/fetchAndPrependPost',
    async (postId) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
            {
                withCredentials: true
            });
        return response.data;
    });

export const homeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {
        prependPost: (state, action) => {
            state.posts = prependUniquePost(state.posts, action.payload);
        },
        setFeed: (state, action) => {
            if (state.feed === action.payload) return;
            state.feed = action.payload;
            state.posts = [];
            state.page = 1;
            state.nextPage = null;
            state.prevPage = null;
            state.hasPrevPage = false;
            state.hasNextPage = true;
            state.seed = null;
            state.isLoading = true;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPosts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            if (action.payload.requestedFeed !== state.feed) return;

            state.isLoading = false;

            if(action.payload.data.page === 1){
                state.posts = action.payload.data.posts;
            }
            else{
                state.posts = [...state.posts, ...action.payload.data.posts];
            }

            state.limit = action.payload.data.limit;
            state.prevPage = action.payload.data.prevPage;
            state.page = action.payload.data.page;
            state.nextPage = action.payload.data.nextPage;
            state.hasPrevPage = action.payload.data.hasPrevPage;
            state.hasNextPage = action.payload.data.hasNextPage;
            if (action.payload.data.seed != null) {
                state.seed = action.payload.data.seed;
            }
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            if (action.payload?.requestedFeed && action.payload.requestedFeed !== state.feed) return;
            state.isLoading = false;
            state.posts = [];
            state.hasNextPage = false;
            state.nextPage = null;
        })
        .addCase(fetchAndPrependPost.fulfilled, (state, action) => {
            state.posts = prependUniquePost(state.posts, action.payload?.data);
        })
    }
})

export const { prependPost, setFeed } = homeSlice.actions;

export default homeSlice.reducer;
