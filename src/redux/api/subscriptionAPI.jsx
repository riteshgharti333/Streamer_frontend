import axios from "axios";

const baseUrl = import.meta.env.VITE_API_KEY;

// CREATE CUSTOMER
export const createCustomer = (email, paymentMethod) => {
  return axios.post(
    `${baseUrl}/subscriptions/create-customer`,
    {
      email,
      payment_method: paymentMethod,
    },
    { withCredentials: true }
  );
};

// CREATE SUBSCRIPTION SESSION
export const createSubscriptionSession = (subscriptionData) => {
  return axios.post(
    `${baseUrl}/subscriptions/create-subscription-session`,
    subscriptionData,
    { withCredentials: true }
  );
};

// DELETE SUBSCRIPTION 
export const deleteSubscription = (subscriptionId, userId) => {
  return axios.delete(`${baseUrl}/subscriptions/${subscriptionId}/${userId}`, {
    withCredentials: true,
  });
};
