import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "kgp3yd",
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:5173",
    // baseUrl: "http://localhost:5001",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});
