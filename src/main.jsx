import React from 'react'
import ReactDOM from "react-dom/client";
import App from './App.jsx'
import { useState } from 'react';
import { createContext } from 'react';
import "./styles/global.scss";

export const Context = createContext({ isAuthenticated: false });

export const baseUrl = import.meta.env.VITE_SOME_KEY;

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);