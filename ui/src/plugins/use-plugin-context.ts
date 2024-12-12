import type { PluginContext } from "@baibai/plugin-core";
import { useThemeStore } from "@/stores/theme";
import { Button, Space, Input } from "antd";
import { useTranslation } from "react-i18next";

export function createPluginContext(): PluginContext {
  const { t, i18n } = useTranslation();
  const themeStore = useThemeStore();

  return {
    i18n: {
      t,
      locale: i18n.language,
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
