import fs from "fs";
import { defineConfig } from "vitest/config";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import wyw from "@wyw-in-js/vite";

const manifest = JSON.parse(
  fs.readFileSync("../Client/public/manifest.json", "utf-8")
);

export default defineConfig(({ mode }) => ({
  build: {
    outDir: "build",
    //@ts-ignore
    sourcemap: process.env.NODE_ENV !== "production",
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
    wyw(),
    VitePWA({
      registerType: "prompt", //
      injectRegister: "auto",
      strategies: "generateSW",
      workbox: {
        cleanupOutdatedCaches: true,
        globDirectory: "build",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,md}"],
      },
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
