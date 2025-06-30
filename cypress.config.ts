import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "kgp3yd",
  e2e: {
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:5173",
    // baseUrl: "http://localhost:5001",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    video: true,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
