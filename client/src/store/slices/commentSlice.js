import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    comments: [],
    // page: 1,
    // prevPage: null,
    // nextPage: null,
}

export const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostComments.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload.data.comments);

                state.comments = action.payload.data.comments;
                // state.prevPage = action.payload.data.prevPage;
                // state.page = action.payload.data.page;
                // state.nextPage = action.payload.data.nextPage;
            })
            .addCase(getPostComments.rejected, (state, action) => {
                state.isLoading = false;
                state.posts = [];
            })
    }
})


// Asynchronous Actions Thunks

// ! Comment Fetching
export const getPostComments = createAsyncThunk('comment/getPostComments',
    async (postId) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/${postId}`,
            {
                withCredentials: true
            });
        return response.data;
    });


// ! Comment Controllers
export const addPostComment = createAsyncThunk('comment/addPostComments',
    async ({postId, data}) => {
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

export const editPostComment = createAsyncThunk('comment/deletePostComments',
    async ({commentId, data}) => {
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


export default commentSlice.reducer;