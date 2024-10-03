import React from "react";
import "./consoleOverrides.jsx";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.scss";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
