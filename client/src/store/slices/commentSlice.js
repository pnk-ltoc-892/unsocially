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
    totalComments: 0,
}

export const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {
        // addComment: (state, action) => {
        //     state.comments = [action.payload, ...state.comments];
        //     console.log(state.comments);
            
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.isLoading = false;

                state.comments = [...state.comments, ...action.payload.data.comments];
                // console.log(action.payload.data);

                state.limit = action.payload.data.limit;
                state.hasPrevPage = action.payload.data.hasPrevPage;
                state.prevPage = action.payload.data.prevPage;
                state.page = action.payload.data.page;
                state.nextPage = action.payload.data.nextPage;
                state.hasNextPage = action.payload.data.hasNextPage;
            })
            .addCase(getPostComments.rejected, (state, action) => {
                state.isLoading = false;
                state.comments = [];
            })
            .addCase(addPostComment.fulfilled, (state) => {
                state.isLoading = false;
                state.comments = [];
            })
            .addCase(deletePostComment.fulfilled, (state) => {
                state.isLoading = false;
                state.comments = [];
            })
            .addCase(editPostComment.fulfilled, (state) => {
                state.isLoading = false;
                state.comments = [];
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

// export const {addComment} = commentSlice.actions;

export default commentSlice.reducer;