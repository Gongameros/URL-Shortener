import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "react-auth-kit";
import { BrowserRouter } from "react-router-dom";
import createStore from 'react-auth-kit/createStore';

const store = createStore({
  authName:'_auth',
  authType:'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: false
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider
      store={store} // Set to `true` if you're using HTTPS
    >
      <BrowserRouter>
        <App /> 
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
