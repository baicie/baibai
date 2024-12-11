import { useI18n } from "vue-i18n";
import { useThemeStore } from "../stores/theme";
import type { PluginContext } from "@baibai/plugin-core";

export function usePluginContext(): PluginContext {
  const { t, locale } = useI18n();
  const themeStore = useThemeStore();

  return {
    i18n: {
      t,
      locale: locale.value,
    },
    theme: {
      isDark: themeStore.isDark,
      primaryColor: themeStore.primaryColor,
    },
    settings: {
      get: (key) => localStorage.getItem(key),
      set: (key, value) => localStorage.setItem(key, value),
    },
  };
}
