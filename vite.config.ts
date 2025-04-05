
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import MillionLint from "@million/lint";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/" : "/",  // Adjust base path if needed
  plugins: [
    react(),
    MillionLint.vite(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true, // Clean old build files before building
  },
  server: {
    host: "::",
    port: 8080
  },
}));
