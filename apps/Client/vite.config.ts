import fs from "fs";
import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

const manifest = JSON.parse(
  fs.readFileSync("../Client/public/manifest.json", "utf-8")
);

export default defineConfig(({ mode }) => ({
  build: {
    outDir: "build",
    sourcemap: true,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  plugins: [
    react(),
    VitePWA({
      srcDir: "src/ServiceWorkers",
      filename: "Service-Workers.ts",
      strategies: "injectManifest",
      injectRegister: false, // because you register manually
      manifest,
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
