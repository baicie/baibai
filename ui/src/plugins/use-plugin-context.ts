import { useI18n } from "vue-i18n";
import { useThemeStore } from "../stores/theme";
import type { PluginContext } from "@baibai/plugin-core";
import { Button, Space, Input } from "ant-design-vue";

export function createPluginContext(): PluginContext {
  const { t, locale } = useI18n();
  const themeStore = useThemeStore();

  return {
    i18n: {
      t,
      locale: locale.value,
    },
    theme: {
      isDark: themeStore.isDark,
      primaryColor: "#1890ff",
      token: {
        colorPrimary: "#1890ff",
      },
    },
    settings: {
      get: (key: string) => localStorage.getItem(key),
      set: (key: string, value: any) => localStorage.setItem(key, value),
    },
    components: {
      Button,
      Space,
      Input,
    },
  };
}
