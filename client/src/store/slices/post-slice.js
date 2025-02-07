import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    isPostLoading: false,
    posts: [],
    page: 1,
    prevPage: null,
    nextPage: null,
    post: {}
}

export const postSlice = createSlice({
    name: "postSlice",
    initialState,
    reducers: {
        // setUser: (state, action) => {
        //     console.log(action)
        //     state.user = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
        // .addCase(addNewPost.pending, (state, action) => {
        //     state.isLoading = true;
        // })
        // .addCase(addNewPost.fulfilled, (state, action) => {
        //     state.isLoading = false;
        //     state.isAuthenticated = false;
        // })
        // .addCase(addNewPost.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.isAuthenticated = false;
        //     state.user = null;
        // })

        .addCase(getPostById.pending, (state, action) => {
            state.isPostLoading = true;
        })
        .addCase(getPostById.fulfilled, (state, action) => {
            state.isPostLoading = false;
            state.post = action.payload.data;
        })
        .addCase(getPostById.rejected, (state, action) => {
            state.isPostLoading = false;
            state.post = null;
        })
    }
})


// Asynchronous Actions Thunks

// ! Post Fetching
export const getPostById = createAsyncThunk('post/getPostById',
    async (postId) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/${postId}`,
            {
                withCredentials: true
            });
            return response.data;
    });


// ! Post Controllers
export const togglePostLike = createAsyncThunk('post/toggleLike',
    async (postId) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/like/post/${postId}`,
            {},
            {
                withCredentials: true
            });
            return response.data;
    });

export const togglePostBookmark = createAsyncThunk('post/toggleBookmark',
    async (postId) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/bookmarks/${postId}`,
            {},
            {
                withCredentials: true
            });
            return response.data;
    });




// ${import.meta.env.VITE_BACKEND_URL}/comments/${postId}/?page=${nextPage}&limit=${commentSlice.limit}`

export const addNewPost = createAsyncThunk('post/addNewPost',
    async (data) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/post`,
            data,
            {
                withCredentials: true
            });
            return response.data;
    })


export const deletePost = createAsyncThunk('post/deletePost',
    async (data) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/posts/post`,
            data,
            {
                withCredentials: true
            });
            return response.data;
    })






// export const { setUser } = authSlice.actions;

export default postSlice.reducer;