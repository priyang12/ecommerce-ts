import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorCatch from "./Components/ErrorCatch";
import { AuthProvider } from "./Context/Authentication/AuthContext";
import "./Style/Globle.css";

ReactDOM.render(
  <ErrorCatch>
    <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthProvider>
  </ErrorCatch>,
  document.getElementById("root")
);
