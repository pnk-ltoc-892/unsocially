import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    isContentLoading: false,
    isFollowLoading: false,
    isCurrentUserProfile: false,

    // Profile Data
    profile: {},

    // Profile Content
    posts: [],
    postControls: {
        limit: 5,
        prevPage: null,
        page: 1,
        nextPage: null,
    },
    comments: [],
    commentControls: {
        limit: 5,
        prevPage: null,
        page: 1,
        nextPage: null,
    },
    bookmarks: [],
    bookmarkControls: {
        limit: 5,
        prevPage: null,
        page: 1,
        nextPage: null,
    }
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

                state.posts = [...state.posts, ...action.payload.data.posts];

                state.postControls.limit = action.payload.data.limit;
                state.postControls.prevPage = action.payload.data.prevPage;
                state.postControls.page = action.payload.data.page;
                state.postControls.nextPage = action.payload.data.nextPage;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.isContentLoading = false;
                state.posts = [];
            })

            // Comments
            .addCase(getUserComments.pending, (state) => {
                state.isContentLoading = true;
            })
            .addCase(getUserComments.fulfilled, (state, action) => {
                state.isContentLoading = false;
                // console.log(action.payload.data);

                state.comments = [...state.comments, ...action.payload.data.comments];

                state.commentControls.limit = action.payload.data.limit;
                state.commentControls.prevPage = action.payload.data.prevPage;
                state.commentControls.page = action.payload.data.page;
                state.commentControls.nextPage = action.payload.data.nextPage;
            })
            .addCase(getUserComments.rejected, (state, action) => {
                state.isContentLoading = false;
                state.comments = [];
            })

            // Bookmarks
            .addCase(getUserBookmarks.pending, (state) => {
                state.isContentLoading = true;
            })
            .addCase(getUserBookmarks.fulfilled, (state, action) => {
                state.isContentLoading = false;

                state.bookmarks = [...state.bookmarks, ...action.payload.data.bookmarkedPosts];
                // console.log(state.bookmarks);
                
                state.bookmarkControls.limit = action.payload.data.limit;
                state.bookmarkControls.prevPage = action.payload.data.prevPage;
                state.bookmarkControls.page = action.payload.data.page;
                state.bookmarkControls.nextPage = action.payload.data.nextPage;
            })
            .addCase(getUserBookmarks.rejected, (state, action) => {
                state.isContentLoading = false;
                state.bookmarks = [];
            })

            // Profile Data
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
    async (username, {getState}) => {
        const {profileSlice} = getState();
        // console.log(profileSlice);
        
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/posts/u/${username}/?page=${profileSlice.postControls.nextPage || profileSlice.postControls.page}&limit=${profileSlice.postControls.limit}`,
            {
                withCredentials: true
            });
        return response.data;
    });


export const getUserComments = createAsyncThunk('get/userComments',
    async (userId, {getState}) => {
        const {profileSlice} = getState();
        
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/comments/u/${userId}/?page=${profileSlice.commentControls.nextPage || profileSlice.commentControls.page}&limit=${profileSlice.commentControls.limit}`,
            {
                withCredentials: true
            });
        return response.data;
    });


export const getUserBookmarks = createAsyncThunk('get/userBookmarks',
    async (_, {getState}) => {
        const {profileSlice} = getState();

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/bookmarks/?page=${profileSlice.bookmarkControls.nextPage || profileSlice.bookmarkControls.page}&limit=${profileSlice.bookmarkControls.limit}`,
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