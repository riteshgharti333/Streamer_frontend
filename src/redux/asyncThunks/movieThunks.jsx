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
      const res = await getMovies();
      return res.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(error.message || "Failed to fetch movies");
    }
  }
);

//GET QUERY MOVIES
export const getQueryAsyncMovies = createAsyncThunk(
  "movies/getQueryMovies",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getQueryMovies(query);
      return { query, data: res.data }; 
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(error.message || "Failed to fetch query movies");
    }
  }
);

//GET SINLGE MOVIE
export const getAsyncSigleMovie = createAsyncThunk(
  "movies/getSingleMovie",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getSingleMovie(id);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(error.message || "Failed to fetch movie");
    }
  }
  
);


//GET RANDOM MOVIES
export const getRandomAsyncMovies = createAsyncThunk(
  "movies/getRandomMovies",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getRandomMovies(query);
      console.log(res.data);
      return { query, data: res.data }; 

    } catch (error) {
      console.error("Failed to fetch movies:", error);
      return rejectWithValue(error.message || "Failed to fetch query movies");
    }
  })