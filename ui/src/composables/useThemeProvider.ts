import { watch } from "vue";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { theme } from "ant-design-vue/es";

export function useThemeProvider() {
  const themeStore = useThemeStore();
  const { isDark } = storeToRefs(themeStore);

  const antdTheme = {
    algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      borderRadius: 4,
      colorPrimary: "#1890ff",
    },
  };

  watch(isDark, (newValue) => {
    antdTheme.algorithm = newValue
      ? theme.darkAlgorithm
      : theme.defaultAlgorithm;
  });

  return {
    isDark,
    antdTheme,
  };
}
