import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorCatch from "./Components/ErrorCatch";
import { AuthProvider } from "./Context/Authentication/AuthContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./query";
import "./Style/Globle.css";
import { serviceWorkerRegister } from "./serviceWokerRegister";

declare global {
  interface Window {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
  }
}

// Disable React devtools for production
const disableReactDevTools = () => {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "object") {
    return;
  }

  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    if (prop === "renderers") {
      // this line will remove that one console error

      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
    } else {
      // Replace all of its properties with a no-op function or a null value
      // depending on their types

      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] =
        typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === "function"
          ? () => {}
          : null;
    }
  }
};

if (process.env.NODE_ENV === "production") {
  console.log("In PRoduction");
  disableReactDevTools();
}

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ErrorCatch>
      <AuthProvider>
        <React.StrictMode>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </React.StrictMode>
      </AuthProvider>
    </ErrorCatch>
  </QueryClientProvider>,
  document.getElementById("root")
);

serviceWorkerRegister();
