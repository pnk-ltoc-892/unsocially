import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isSearchLoading: false,
    searchProfiles: []
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        

    },
    extraReducers: (builder) => {
        builder
            .addCase(searchProfiles.pending, (state) => {
                state.isSearchLoading = true;
            })
            .addCase(searchProfiles.fulfilled, (state, action) => {
                state.isSearchLoading = false;
                // console.log(action.payload.data.users.users);
                state.searchProfiles = action.payload.data.users.users;
            })
            .addCase(searchProfiles.rejected, (state) => {
                state.isSearchLoading = false;
                state.searchProfiles = [];
            })
    }
});


// Asynchronous Actions Thunks
//! Profile Searching Actions
export const searchProfiles = createAsyncThunk('get/searchProfiles',
    async (keyword) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/search?keyword=${keyword}&?page=1&limit=100`,
            {
                withCredentials: true
            });
        return response.data;
    });



export default userSlice.reducer;