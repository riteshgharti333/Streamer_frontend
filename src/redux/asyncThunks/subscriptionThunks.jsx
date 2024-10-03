import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCustomer,
  createSubscriptionSession,
  deleteSubscription,
} from "../api/subscriptionAPI";

export const createAsyncCustomer = createAsyncThunk(
  "subscription/createCustomer",
  async ({ email, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await createCustomer(email, paymentMethod);
      return response.data.customer;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data || "Failed to create customer",
      );
    }
  },
);

export const createAsyncSubscriptionSession = createAsyncThunk(
  "subscription/createSession",
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const response = await createSubscriptionSession(subscriptionData);
      return response.data.sessionUrl;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data || "Failed to create session");
    }
  },
);

export const deleteSubscriptionAsync = createAsyncThunk(
  "subscription/deleteSubscription",
  async (subscriptionId, { rejectWithValue }) => {
    try {
      const response = await deleteSubscription(subscriptionId);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response.data || "Failed to delete subscription",
      );
    }
  },
);
