import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
