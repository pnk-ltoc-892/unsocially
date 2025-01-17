import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    isContentLoading: false,
    isFollowLoading: false,
    isCurrentUserProfile: false,
    profile: {},
    posts: [],
    comments: [],
    bookmarks: []
}

export const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        // Posts
            .addCase(getUserPosts.pending, (state) => {
                state.isContentLoading = true;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.isContentLoading = false;
                // console.log(action.payload.data);

                state.posts = action.payload.data.posts
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.isContentLoading = false;
                state.posts = {};
            })
        // Comments
            .addCase(getUserComments.pending, (state) => {
                state.isContentLoading = true;
            })
            .addCase(getUserComments.fulfilled, (state, action) => {
                state.isContentLoading = false;
                // console.log(action.payload.data);

                state.comments = action.payload.data.comments
            })
            .addCase(getUserComments.rejected, (state, action) => {
                state.isContentLoading = false;
                state.posts = {};
            })
        // Bookmarks
            .addCase(getUserBookmarks.pending, (state) => {
                state.isContentLoading = true;
            })
            .addCase(getUserBookmarks.fulfilled, (state, action) => {
                state.isContentLoading = false;
                console.log(action.payload.data);

                state.bookmarks = action.payload.data.bookmarkedPosts
            })
            .addCase(getUserBookmarks.rejected, (state, action) => {
                state.isContentLoading = false;
                state.posts = {};
            })

            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                // console.log(action.payload.data.profile);
                
                state.profile = action.payload.data.profile;
                state.isCurrentUserProfile = action.payload.data.profile.isCurrentUserProfile;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.profile = {};
            })

            .addCase(toggleUserFollow.pending, (state) => {
                state.isFollowLoading = true;
            })
            .addCase(toggleUserFollow.fulfilled, (state) => {
                state.isFollowLoading = false;
            })
            .addCase(toggleUserFollow.rejected, (state) => {
                state.isFollowLoading = false;
            })
    }
});


// Asynchronous Actions Thunks
//! Profile Data Fetching
export const getUserPosts = createAsyncThunk('get/userPosts',
    async (username) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/u/${username}`,
            {
                withCredentials: true
            });
        return response.data;
    });

export const getUserComments = createAsyncThunk('get/userComments',
    async (userId) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/u/${userId}`,
            {
                withCredentials: true
            });
        return response.data;
    });

export const getUserBookmarks = createAsyncThunk('get/userBookmarks',
    async (username) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/bookmarks`,
            {
                withCredentials: true
            });
        return response.data;
    });




//! Profile Data Actions
export const getUserProfile = createAsyncThunk('get/userprofile',
    async (username) => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/u/${username}`,
            {
                withCredentials: true
            });
        // console.log(response.data);
        return response.data;
    });


export const updateProfileAvatar = createAsyncThunk('profile/update-avatar',
    async (data) => {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/user/update-avatar`,
            data,
            {
                withCredentials: true
            });
        // console.log(response.error);

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



export const toggleUserFollow = createAsyncThunk('/profile/toggleUserFollow',
    async (userId) => {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/follow/${userId}`,
            {},
            {
                withCredentials: true
            });
        return response.data
    });



export default profileSlice.reducer;