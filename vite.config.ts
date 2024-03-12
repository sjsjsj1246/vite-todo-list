import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/vite-todo-list/" : "/",
  plugins: [react(), tsconfigPaths()],
  server: {
    host: "localhost",
    port: 3000,
  },
}));
