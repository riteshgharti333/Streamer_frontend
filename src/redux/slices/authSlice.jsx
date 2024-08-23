import { createSlice } from "@reduxjs/toolkit";
import { loginAsyncUser, registerAsyncUser, logoutAsyncUser, userProfileAsync } from "../asyncThunks/authThunks";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    profile: null,
    status: "idle",
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsyncUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginAsyncUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginAsyncUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(registerAsyncUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerAsyncUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(registerAsyncUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(logoutAsyncUser.fulfilled, (state) => {
                state.user = null;
                localStorage.removeItem("user");
            })
            .addCase(userProfileAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(userProfileAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.profile = action.payload;
            })
            .addCase(userProfileAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export default authSlice.reducer;
