import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    posts: [],
    post: null
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
        .addCase(getAllPosts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(getAllPosts.fulfilled, (state, action) => {
            state.isLoading = false;
            // console.log(action.payload.data);            
            state.posts = action.payload.data.reverse();
        })
        .addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.posts = [];
        })
    }
})


// Asynchronous Actions Thunks
export const addNewPost = createAsyncThunk('post/addNewPost',
    async (data) => {
        const response = await axios.post("http://localhost:5000/api/v1/posts/post",
            data,
            {
                withCredentials: true
            });
            return response.data;
    })

export const getAllPosts = createAsyncThunk('post/getAllPosts',
    async () => {
        const response = await axios.get("http://localhost:5000/api/v1/posts/",
            {
                withCredentials: true
            });
            console.log("Fetching posts from serer");
            
            return response.data;
    })




// export const { setUser } = authSlice.actions;

export default postSlice.reducer;