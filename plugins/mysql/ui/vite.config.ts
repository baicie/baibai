import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
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
      external: ["vue", "@baibai/plugin-core", "ant-design-vue"],
      output: {
        globals: {
          vue: "Vue",
          "@baibai/plugin-core": "BaibaiPluginCore",
          "ant-design-vue": "antd",
        },
      },
    },
  },
});
