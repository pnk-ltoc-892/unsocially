import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: "Pankaj",
}

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            // console.log("Hi")
            // console.log(state)
            console.log(action)
            state.user = action.payload;
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //     .addCase
    // }
})


export const { setUser } = authSlice.actions;

export default authSlice.reducer;