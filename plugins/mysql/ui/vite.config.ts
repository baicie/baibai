import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      entryRoot: "src",
      tsconfigPath: "./tsconfig.app.json",
      outDir: "./dist/types",
    }),
  ],

  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "MySQLPlugin",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "@baibai/plugin-core", "antd"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@baibai/plugin-core": "BaibaiPluginCore",
          antd: "antd",
        },
      },
    },
  },
});
