// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
    checkEmailExists,
    signUp,
    signIn,
    logout,
    fetchStates,
} from "./authThunk";

const initialState = {
    user: null,
    uid: null,
    states: [],
    loading: false,
    checkingEmail: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Check Email
            .addCase(checkEmailExists.pending, (state) => {
                state.checkingEmail = true;
            })
            .addCase(checkEmailExists.fulfilled, (state) => {
                state.checkingEmail = false;
            })
            .addCase(checkEmailExists.rejected, (state) => {
                state.checkingEmail = false;
            })
            // Sign Up
            .addCase(signUp.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.user = action.payload;
                state.uid = action.payload.uid;
                state.loading = false;
            })
            .addCase(signUp.rejected, (state) => {
                state.loading = false;
            })
            // Sign In
            .addCase(signIn.pending, (state) => {
                state.loading = true;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.user = action.payload;
                state.uid = action.payload.uid;
                state.loading = false;
            })
            .addCase(signIn.rejected, (state) => {
                state.loading = false;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.uid = null;
            })
            // Fetch States
            .addCase(fetchStates.fulfilled, (state, action) => {
                state.states = action.payload;
            });
    },
});

export default authSlice.reducer;
