import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

// CREATE CUSTOMER
export const createCustomer = (email, paymentMethod) => {
  return axios.post(`${baseUrl}/subscriptions/create-customer`, {
    email,
    payment_method: paymentMethod,
  });
};

// CREATE SUBSCRIPTION
export const createSubscription = (customerId, priceId) => {
  return axios.post(`${baseUrl}/subscriptions/create-subscription`, {
    customerId,
    priceId,
  });
};

// CREATE SUBSCRIPTION SESSION
export const createSubscriptionSession = (email, priceId) => {
  return axios.post(`${baseUrl}/subscriptions/create-subscription-session`, {
    email,
    priceId,
  });
};

// SAVE SUBSCRIPTION SESSION
export const saveSubscriptionSession = (subscriptionData) => {
  return axios.post(`${baseUrl}/subscriptions/saveSubscription`, {
    subscriptionData
  });
};


