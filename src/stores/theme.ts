import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { theme } from "ant-design-vue";

export const useThemeStore = defineStore("theme", () => {
  const isDark = ref(false);

  // 监听系统主题变化
  const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");
  isDark.value = darkMedia.matches;
  darkMedia.addEventListener("change", (e) => {
    isDark.value = e.matches;
  });

  // 切换主题
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
  };

  // 初始化主题
  watch(
    isDark,
    (val) => {
      document.documentElement.classList.toggle("dark", val);
    },
    { immediate: true }
  );

  return {
    isDark,
    toggleTheme,
  };
});
