import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    profileData: {}
}

export const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profileData = action.payload.data.user;
        })
        .addCase(getProfile.rejected, (state) => {
            state.isLoading = false;
            state.profileData = {};
        })
    }
});


// Asynchronous Actions Thunks
export const getProfile = createAsyncThunk('profile/get',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/my-profile`,
            {
                withCredentials: true
            });
            return response.data;
    });

export const updateProfileAvatar = createAsyncThunk('profile/update-avatar',
    async (data) => {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/update-avatar`,
            data,
            {
                withCredentials: true
            });
            console.log(response.error);
            
            return response.data;
    });

export const updateProfile = createAsyncThunk('profile/update-profile',
    async (data) => {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/update-profile`,
            data,
            {
                withCredentials: true
            });
            return response.data;
    });



export default profileSlice.reducer;