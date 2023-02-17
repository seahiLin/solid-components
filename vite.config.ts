import path from "path";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    solidPlugin({}),
  ],
  server: {
    port: 3000,
    host: "172.16.14.180",
  },
  build: {
    sourcemap: true,
    target: "esnext",
    lib: {
      entry: "src/index.tsx",
      name: "sc",
      fileName: (format) => `sc.${format}.js`,
    },
  },
});
