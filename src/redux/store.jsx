import {configureStore} from '@reduxjs/toolkit'
import movieReducer from "./slices/movieSlice";
import userReducer from "./slices/userSlice";
import listReducer from "./slices/listSlice";
import authReducer from "./slices/authSlice";




export const store = configureStore({
    reducer: {
        movies: movieReducer, 
        users: userReducer, 
        lists: listReducer,
        auth: authReducer,
    },
});
