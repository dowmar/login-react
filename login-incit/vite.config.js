import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(import.meta.dirname, "key.pem")),
      cert: fs.readFileSync(path.resolve(import.meta.dirname, "cert.pem")),
    },
    // You can also specify a different port or other options here if needed
  },
});
