import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ErrorCatch from "./Components/ErrorCatch";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./Context/Authentication/AuthContext";
import { Normalize } from "styled-normalize";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./Utils/query";
import { serviceWorkerRegister } from "./ServiceWorkers/serviceWorkerRegister";
import "react-toastify/dist/ReactToastify.css";

import "./Style/Globle.css";
import ReactModal from "react-modal";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          ? // eslint-disable-next-line @typescript-eslint/no-empty-function
            () => {}
          : null;
    }
  }
};

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const container = document.getElementById("root");

ReactModal.setAppElement("#root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ErrorCatch>
          <ReactQueryDevtools initialIsOpen={false} />
          <AuthProvider>
            <Normalize />
            <ToastContainer />
            <App />
          </AuthProvider>
        </ErrorCatch>
      </HelmetProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

serviceWorkerRegister();
