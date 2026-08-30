import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// The API has no error-handling middleware, so failures arrive as an HTML
// stack trace rather than an ApiResponse payload. Fall back to our own copy
// whenever a structured message isn't available.
const extractErrorMessage = (error, fallback) => {
    const data = error?.response?.data;
    if (data && typeof data === "object" && data.message) {
        return data.message;
    }
    return fallback;
}

const initialState = {
    isAuthLoading: true,
    isAuthenticated: false,
    isLoading: false,
    user: null,
    error: null,
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearAuthError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload?.data?.user;
            state.error = null;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload?.data?.user;
            state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })
        // Check For Authentication
        .addCase(checkAuth.pending, (state) => {
            state.isAuthLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.isAuthenticated = true;
            state.user = action.payload?.data?.user;
        })
        .addCase(checkAuth.rejected, (state) => {
            state.isAuthLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(logOutUser.fulfilled, (state) => {
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(logOutUser.rejected, (state) => {
            state.isAuthenticated = false;
            state.user = null;
        })
    }
})


// Asynchronous Actions Thunks
export const registerUser = createAsyncThunk('auth/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/register`,
                formData,
                {
                    withCredentials: true
                });
            return response.data;
        }
        catch (error) {
            return rejectWithValue(
                extractErrorMessage(error, "Could not create your account. Please try again.")
            );
        }
    })

export const loginUser = createAsyncThunk('auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`,
                formData,
                {
                    withCredentials: true
                });
            return response.data;
        }
        catch (error) {
            return rejectWithValue(
                extractErrorMessage(error, "Invalid credentials. Please check your details and try again.")
            );
        }
    })

export const checkAuth = createAsyncThunk('auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/check-auth`,
                {
                    withCredentials: true
                });
            return response.data;
        }
        catch (error) {
            return rejectWithValue(
                extractErrorMessage(error, "Unauthorized, Please Login First")
            );
        }
    })

export const logOutUser = createAsyncThunk('auth/logOutUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/logout`,
                {},
                {
                    withCredentials: true
                });
            return response.data;
        }
        catch (error) {
            return rejectWithValue(
                extractErrorMessage(error, "Could not sign you out. Please try again.")
            );
        }
    })







export const { setUser, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
