import { createSlice } from "@reduxjs/toolkit";
import {
  getAsyncMovies,
  getAsyncSigleMovie,
  getQueryAsyncMovies,
  getRandomAsyncMovies,
} from "../asyncThunks/movieThunks";

const initialState = {
  movies: [],
  singleMovie: null,
  status: "idle",
  error: null,
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //  Get All Movies
    builder
      .addCase(getAsyncMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload;
      })
      .addCase(getAsyncMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    //  Get Query Movies
    builder
      .addCase(getQueryAsyncMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getQueryAsyncMovies.fulfilled, (state, action) => {
        const { query, data } = action.payload;
        state.status = "succeeded";
        if (query === "movies") {
          state.movies = data;
        } else if (query === "webseries") {
          state.webseries = data;
        }
      })
      .addCase(getQueryAsyncMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

        //  Get Random Movies
    builder
    .addCase(getRandomAsyncMovies.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(getRandomAsyncMovies.fulfilled, (state, action) => {
      const { query, data } = action.payload;
      state.status = "succeeded";
      if (query === "movies") {
        state.movies = data;
      } else if (query === "series") {
        state.series = data;
      }
    })
    .addCase(getRandomAsyncMovies.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Get Single Movie
    builder
      .addCase(getAsyncSigleMovie.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncSigleMovie.fulfilled, (state, action) => {
        state.status = "idle";
        state.singleMovie = action.payload;
      })
      .addCase(getAsyncSigleMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
