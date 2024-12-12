import { useEffect } from "react";
import { PluginManager } from "@baibai/plugin-core";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../stores/theme";
import { Button, Space, Input } from "antd";

export function usePlugins() {
  const { t, i18n } = useTranslation();
  const isDark = useThemeStore((state) => state.isDark);

  useEffect(() => {
    const pluginManager = new PluginManager("/api/plugins");

    // 初始化插件上下文
    const context = {
      i18n: {
        t,
        locale: i18n.language,
      },
      theme: {
        isDark,
        primaryColor: "#1890ff",
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

    // 初始化插件
    pluginManager.initialize(context).catch(console.error);

    return () => {
      pluginManager.destroy().catch(console.error);
    };
  }, [t, i18n.language, isDark]);
}
