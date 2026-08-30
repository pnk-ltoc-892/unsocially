import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    comments: [],
    limit: 5,
    prevPage: null,
    page: 1,
    nextPage: null,
    hasPrevPage: null,
    hasNextPage: true,
    loadedPostId: null,
}

export const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {
        resetComments: (state) => {
            state.comments = [];
            state.page = 1;
            state.nextPage = null;
            state.prevPage = null;
            state.hasNextPage = true;
            state.isLoading = false;
            state.loadedPostId = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostComments.pending, (state) => {
                if (state.comments.length === 0) {
                    state.isLoading = true;
                }
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.isLoading = false;

                if(action.payload.data.page === 1){
                    state.comments = action.payload.data.comments;
                }
                else{
                    state.comments = [...state.comments, ...action.payload.data.comments];
                }

                state.limit = action.payload.data.limit;
                state.hasPrevPage = action.payload.data.hasPrevPage;
                state.prevPage = action.payload.data.prevPage;
                state.page = action.payload.data.page;
                state.nextPage = action.payload.data.nextPage;
                state.hasNextPage = action.payload.data.hasNextPage;
                state.loadedPostId = action.meta.arg;
            })
            .addCase(getPostComments.rejected, (state) => {
                state.isLoading = false;
                state.comments = [];
                state.hasNextPage = false;
                state.nextPage = null;
            })
            .addCase(addPostComment.fulfilled, (state, action) => {
                const created = action.payload?.data;
                if (!created?._id) return;
                if (state.comments.some((item) => item._id === created._id)) return;

                state.comments.unshift({
                    ...created,
                    author: action.meta.arg.author || created.author,
                    Likes: 0,
                    isLiked: false,
                });
            })
            .addCase(deletePostComment.fulfilled, (state, action) => {
                const commentId = action.meta.arg;
                state.comments = state.comments.filter((item) => item._id !== commentId);
            })
            .addCase(editPostComment.fulfilled, (state, action) => {
                const updated = action.payload?.data;
                const commentId = action.meta.arg.commentId;
                state.comments = state.comments.map((item) => (
                    item._id === commentId
                        ? { ...item, content: updated?.content ?? action.meta.arg.data.content }
                        : item
                ));
            })
    }
})


// Asynchronous Actions Thunks

// ! Comment Fetching
export const getPostComments = createAsyncThunk('comment/getPostComments',
    async (postId, { getState }) => {
        const { commentSlice } = getState();
        const nextPage = commentSlice.nextPage || commentSlice.page;

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/${postId}/?page=${nextPage}&limit=${commentSlice.limit}`,
            {
                withCredentials: true
            });
        return response.data;
    });


// ! Comment Controllers
export const addPostComment = createAsyncThunk('comment/addPostComments',
    async ({ postId, data }) => {
        // console.log({postId, data});

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/comments/post/${postId}`,
            data,
            {
                withCredentials: true,
            });
        return response.data;
    });

export const deletePostComment = createAsyncThunk('comment/deletePostComments',
    async (commentId) => {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`,
            {
                withCredentials: true,
            });
        return response.data;
    });

export const editPostComment = createAsyncThunk('comment/editPostComments',
    async ({ commentId, data }) => {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/comments/${commentId}`,
            data,
            {
                withCredentials: true,
            });
        return response.data;
    });

export const toggleCommentLike = createAsyncThunk('comment/likePostComments',
    async (commentId) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/like/comment/${commentId}`,
            {},
            {
                withCredentials: true,
            });
        return response.data;
    });

export const { resetComments } = commentSlice.actions;

export default commentSlice.reducer;