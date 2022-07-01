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

const disableReactDevTools = (): void => {
  const noop = (): void => undefined;
  const DEV_TOOLS = (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof DEV_TOOLS === "object") {
    for (const [key, value] of Object.entries(DEV_TOOLS)) {
      DEV_TOOLS[key] = typeof value === "function" ? noop : null;
    }
  }
};

if (process.env.NODE_ENV === "production") {
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
