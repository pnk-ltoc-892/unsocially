import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice.js'
import profileSliceReducer from './slices/profileSlice.js'
import postSliceReducer from './slices/post-slice.js'
import userSliceReducer from './slices/userSlice.js'


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        profileSlice: profileSliceReducer,
        userSlice: userSliceReducer,

        postSlice: postSliceReducer
    }
})

export default store;