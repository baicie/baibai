export default {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {
      // 配置目标浏览器
      overrideBrowserslist: [
        // Windows
        "Chrome >= 87",
        // macOS
        "Safari >= 13",
        // Linux
        "Firefox >= 78",
      ],
    },
  },
};
