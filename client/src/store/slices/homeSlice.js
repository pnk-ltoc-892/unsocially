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
        .addCase(getAllPosts.rejected, (state, action) => {
            state.isLoading = false;
            state.posts = [];
        })
    }
})


// Asynchronous Actions Thunks

// ! Post Fetching
export const getAllPosts = createAsyncThunk('post/getAllPosts',
    async (_, {getState}) => {
        const {homeSlice} = getState();
        // console.log(homeSlice);
        const nextPage = homeSlice.nextPage || homeSlice.page;
        
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/?page=${nextPage}&limit=${homeSlice.limit}`,
            {
                withCredentials: true
            });
            return response.data;
    });



export default homeSlice.reducer;