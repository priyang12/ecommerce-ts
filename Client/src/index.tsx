import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ErrorCatch from "./Components/ErrorCatch";
import { AuthProvider } from "./Context/Authentication/AuthContext";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./Style/Globle.css";
import { queryClient } from "./query";

import * as serviceWorkerRegistration from "./serviceWokerRegister";

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

serviceWorkerRegistration.register({
  onUpdate: (registration: any) => {
    alert("New version available!  Ready to update?");
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  },
});
