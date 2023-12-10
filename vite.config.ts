import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
    }),
  ],
  server: {
    port: 3001,
    open: true,
  },
  resolve: {
    alias: {
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@routes": path.resolve(__dirname, "./src/routes.tsx"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@variables": path.resolve(__dirname, "./src/variables"),
      "@axios": path.resolve(__dirname, "./src/axios/axios.ts"),
      "@":path.resolve(__dirname, "./src"),
    },
  },
});
