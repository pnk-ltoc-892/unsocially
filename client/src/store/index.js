import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './slices/authSlice.js'
import postSliceReducer from './slices/post-slice.js'


const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        postSlice: postSliceReducer
    }
})

export default store;