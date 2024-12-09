import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:1420",
    supportFile: "cypress/support/e2e.ts",
  },
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
