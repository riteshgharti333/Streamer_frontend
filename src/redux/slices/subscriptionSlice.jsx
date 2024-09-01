import { createSlice } from '@reduxjs/toolkit';
import { createAsyncCustomer, createAsyncSubscription, createAsyncSubscriptionSession } from '../asyncThunks/subscriptionThunks';

const initialState = {
  customer: null,
  subscription: null,
  sessionUrl: null,
  loading: false,
  error: null
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Handle create customer
    builder
      .addCase(createAsyncCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsyncCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.customer = action.payload;
      })
      .addCase(createAsyncCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle create subscription
    builder
      .addCase(createAsyncSubscription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsyncSubscription.fulfilled, (state, action) => {
        state.loading = false;
        state.subscription = action.payload;
      })
      .addCase(createAsyncSubscription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle create subscription session
    builder
      .addCase(createAsyncSubscriptionSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAsyncSubscriptionSession.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionUrl = action.payload;
      })
      .addCase(createAsyncSubscriptionSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default subscriptionSlice.reducer;
