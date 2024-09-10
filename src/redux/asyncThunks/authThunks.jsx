import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser, updateProfile, userProfile } from "../api/authAPI";

// LOGIN ASYNC THUNK
export const loginAsyncUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await loginUser(userData);
            // Save user info to local storage
            localStorage.setItem("user", JSON.stringify(res.data));
            return res.data;
        } catch (error) {
            console.error("Failed to log in:", error);
            return rejectWithValue(error.response.data || "Failed to log in");
        }
    }
);

// REGISTER ASYNC THUNK
export const registerAsyncUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await registerUser(userData);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("Failed to register:", error);
            return rejectWithValue(error.response.data || "Failed to register");
        }
    }
);


// LOGOUT ASYNC THUNK
export const logoutAsyncUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await logoutUser();
            // Remove user info from local storage
            localStorage.removeItem("user");
            return res.data;
        } catch (error) {
            console.error("Failed to log out:", error);
            return rejectWithValue(error.response.data || "Failed to log out");
        }
    }
);

// USER PROFILE ASYNC THUNK
export const userProfileAsync = createAsyncThunk(
    "auth/userProfile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await userProfile();
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            return rejectWithValue(error.response.data || "Failed to fetch user profile");
        }
    }
);


// UPDATE PROFILE ASYNC THUNK
export const updateProfileAsync = createAsyncThunk(
    "auth/updateProfile",
    async (profileData, { rejectWithValue }) => {
        try {
            const res = await updateProfile(profileData);
            // console.log(res.data);
            return res.data;
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            return rejectWithValue(error.response.data || "Failed to fetch user profile");
        }
    }
);