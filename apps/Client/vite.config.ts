import fs from "fs";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

const manifest = JSON.parse(
  fs.readFileSync("../Client/public/manifest.json", "utf-8")
);

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      srcDir: "src", // assuming your service-worker.ts is in src
      filename: "service-worker.ts",
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
});
