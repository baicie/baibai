import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { fileURLToPath } from "url";
import type { Config } from "tailwindcss";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

const host = process.env.TAURI_DEV_HOST;

// Tailwind 配置
const tailwindConfig: Config = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "../packages/plugin/src/**/*.{vue,js,ts,jsx,tsx}",
    "../plugins/mysql/ui/src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
  ],

  css: {
    postcss: {
      plugins: [
        postcssImport(),
        postcssNesting(),
        tailwindcss(tailwindConfig),
        autoprefixer(),
      ],
    },
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "root-entry-name": "variable",
        },
      },
    },
  },

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
