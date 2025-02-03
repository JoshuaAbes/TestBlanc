import { defineConfig } from "vite";
export default defineConfig({
  root: "src", // Set the root to 'src'
  build: {
    target: "es6",
    outDir: "../dist", // Output directory (relative to the ro
    emptyOutDir: true, // Clean the output directory before b
  },
});
