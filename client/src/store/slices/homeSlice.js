import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    posts: [],
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

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/?page=${nextPage}&limit=${homeSlice.limit}`,
            {
                withCredentials: true
            });
            return response.data;
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
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPosts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            // console.log(action.payload.data);  

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
        })
        .addCase(getAllPosts.rejected, (state) => {
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

export const { prependPost } = homeSlice.actions;

export default homeSlice.reducer;