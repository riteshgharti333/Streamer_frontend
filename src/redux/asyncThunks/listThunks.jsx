import { createAsyncThunk } from "@reduxjs/toolkit";
import { getLists, getQueryLists, getSingleList } from "../api/listAPI";

//GET ALL LISTS
export const getAsyncLists = createAsyncThunk(
  "lists/getLists",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getLists();
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to fetch lists");
    }
  },
);

//GET QUERY LITS
export const getAsyncQueryLists = createAsyncThunk(
  "lists/getQueryLists",
  async (query, { rejectWithValue }) => {
    try {
      const res = await getQueryLists(query);

      return { query, data: res.data };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to fetch query lists");
    }
  },
);

//GET SINGLE LIST
export const getAsyncSingleList = createAsyncThunk(
  "lists/getSingleList",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getSingleList(id);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Failed to fetch single list");
    }
  },
);
