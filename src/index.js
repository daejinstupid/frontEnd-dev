import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import AppContext, { AppContextProvider } from "./AppContext";
import { BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <AppContextProvider>
      <App />
    </AppContextProvider>

);
