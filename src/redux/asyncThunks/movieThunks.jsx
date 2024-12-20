import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMovies,
  getQueryMovies,
  getRandomMovies,
  getSingleMovie,
} from "../api/movieAPI";

//GET ALL MOVIES
export const getAsyncMovies = createAsyncThunk(
  "movies/getMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMovies();
      return response.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(error.response.data || "Failed to fetch movies");
    }
  }
);

//GET QUERY MOVIES
export const getQueryAsyncMovies = createAsyncThunk(
  "movies/getQueryMovies",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getQueryMovies(query);
      return { query, data: response.data };
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(
        error.response.data || "Failed to fetch query movies"
      );
    }
  }
);

//GET SINLGE MOVIE
export const getAsyncSigleMovie = createAsyncThunk(
  "movies/getSingleMovie",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getSingleMovie(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(error.response.data || "Failed to fetch movie");
    }
  }
);

//GET RANDOM MOVIES
export const getRandomAsyncMovies = createAsyncThunk(
  "movies/getRandomMovies",
  async (query, { rejectWithValue }) => {
    try {
      const response = await getRandomMovies(query);
      return { query, data: response.data };
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(
        error.response.data || "Failed to fetch query movies"
      );
    }
  }
);
