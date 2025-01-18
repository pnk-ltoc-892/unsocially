import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    posts: [],
    limit: 0,
    prevPage: null,
    page: 1,
    nextPage: null,
}

export const homeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllPosts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            console.log(action.payload.data);  

            state.posts = [...state.posts, ...action.payload.data.posts];
            // state.posts = action.payload.data.posts;

            state.limit = action.payload.data.limit;
            state.prevPage = action.payload.data.prevPage;
            state.page = action.payload.data.page;
            state.nextPage = action.payload.data.nextPage;
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.posts = [];
        })
    }
})


// Asynchronous Actions Thunks

// ! Post Fetching
export const getAllPosts = createAsyncThunk('post/getAllPosts',
    async (page) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/?page=${page}&limit=${5}`,
            {
                withCredentials: true
            });
            return response.data;
    });



// export const getPostById = createAsyncThunk('post/getPostById',
//     async (postId) => {
//         const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
//             {
//                 withCredentials: true
//             });
//             return response.data;
//     });



// // ! Post Controllers
// export const togglePostLike = createAsyncThunk('post/toggleLike',
//     async (postId) => {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/like/post/${postId}`,
//             {},
//             {
//                 withCredentials: true
//             });
//             return response.data;
//     });

// export const togglePostBookmark = createAsyncThunk('post/toggleBookmark',
//     async (postId) => {
//         const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/bookmarks/${postId}`,
//             {},
//             {
//                 withCredentials: true
//             });
//             return response.data;
//     });



// export const addNewPost = createAsyncThunk('post/addNewPost',
//     async (data) => {
//         const response = await axios.post("http://localhost:5000/api/v1/posts/post",
//             data,
//             {
//                 withCredentials: true
//             });
//             return response.data;
//     })


// export const deletePost = createAsyncThunk('post/deletePost',
//     async (data) => {
//         const response = await axios.post("http://localhost:5000/api/v1/posts/post",
//             data,
//             {
//                 withCredentials: true
//             });
//             return response.data;
//     })


export default homeSlice.reducer;