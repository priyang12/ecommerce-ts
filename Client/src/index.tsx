import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorCatch from "./Components/ErrorCatch";
import { AuthProvider } from "./Context/Authentication/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./Style/Globle.css";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <ErrorCatch>
      <AuthProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AuthProvider>
    </ErrorCatch>
  </QueryClientProvider>,
  document.getElementById("root")
);
