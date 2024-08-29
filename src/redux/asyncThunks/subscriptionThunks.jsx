import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCustomer,
  createSubscription,
  createSubscriptionSession,
} from "../api/subscriptionAPI";

export const createAsyncCustomer = createAsyncThunk(
  "subscription/createCustomer",
  async ({ email, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await createCustomer(email, paymentMethod);
      return response.data.customer;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to create customer"
      );
    }
  }
);

export const createAsyncSubscription = createAsyncThunk(
  "subscription/createSubscription",
  async ({ customerId, priceId }, { rejectWithValue }) => {
    try {
      const response = await createSubscription(customerId, priceId);
      return response.data.subscription;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to create subscription"
      );
    }
  }
);

export const createAsyncSubscriptionSession = createAsyncThunk(
  "subscription/createSession",
  async ({ email, priceId }, { rejectWithValue }) => {
    try {
      const response = await createSubscriptionSession(email, priceId);
      return response.data.sessionUrl;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to create session"
      );
    }
  }
);

export const saveAsyncsSubscriptionSession = createAsyncThunk(
  "subscription/saveAsyncsSubscriptionSession",
  async (subscriptionData, { rejectWithValue }) => {
    try {
      const {
        userId,
        email,
        name,
        customerId,
        subscriptionId,
        plan,
        startDate,
        endDate,
        status,
        price,
      } = subscriptionData;

      const newSubscriptionData = {
        userId,
        email,
        name,
        customerId,
        subscriptionId,
        plan,
        startDate,
        endDate,
        status,
        price,
      };

      const response = await saveAsyncsSubscriptionSession(newSubscriptionData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
