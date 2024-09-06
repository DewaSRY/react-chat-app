import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { URL, fileURLToPath } from "node:url";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
