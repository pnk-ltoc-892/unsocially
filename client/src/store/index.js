import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice.js'
import profileSliceReducer from './slices/profileSlice.js'
import homeSliceReducer from './slices/homeSlice.js' 
import postSliceReducer from './slices/post-slice.js'
import userSliceReducer from './slices/userSlice.js'
import commentSliceReducer from './slices/commentSlice.js'


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        profileSlice: profileSliceReducer,
        userSlice: userSliceReducer,

        homeSlice: homeSliceReducer,
        postSlice: postSliceReducer,
        commentSlice: commentSliceReducer
    }
})

export default store;