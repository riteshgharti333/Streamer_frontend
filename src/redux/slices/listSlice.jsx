import { createSlice } from "@reduxjs/toolkit";
import {
  getAsyncLists,
  getAsyncQueryLists,
  getAsyncSingleList,
} from "../asyncThunks/listThunks";

const initialState = {
  lists: {
    movie: [],
    series: [],
  },
  status: "idle",
  error: null,
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //  Get All Lists
    builder
      .addCase(getAsyncLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncLists.fulfilled, (state,action) => {
        state.status = "idle";
        state.lists = action.payload;
      })
      .addCase(getAsyncLists.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //  Get Query Lists
    builder
      .addCase(getAsyncQueryLists.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncQueryLists.fulfilled, (state,action) => {
        state.status = "idle";
        const { query, data } = action.payload;
        if (query === 'movie') {
          state.lists.movie = data;
        } else if (query === 'series') {
          state.lists.series = data;
        }

      })
      .addCase(getAsyncQueryLists.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    //  Get Single List
    builder
      .addCase(getAsyncSingleList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAsyncSingleList.fulfilled, (state,action) => {
        state.status = "idle";
        state.lists = action.payload;
      })
      .addCase(getAsyncSingleList.rejected, (state,action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export default listSlice.reducer;