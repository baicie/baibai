import { useEffect, useMemo } from "react";
import { PluginManager } from "@baibai/plugin-core";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../stores/theme";
import type { ButtonProps, SpaceProps, InputProps } from "antd";
import { Button, Space, Input } from "antd";

export function usePlugins() {
  const pluginManager = useMemo(() => new PluginManager("/api/plugins"), []);
  const { t, i18n } = useTranslation();
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const isDark = currentTheme === "dark";

  useEffect(() => {
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
        set: (key: string, value: any) => {
          localStorage.setItem(key, JSON.stringify(value));
          // 触发主题或语言更新
          if (key.startsWith("themes.")) {
            useThemeStore.getState().loadThemes(pluginManager);
          }
        },
      },
      components: {
        Button: Button as React.FC<ButtonProps>,
        Space: Space as React.FC<SpaceProps>,
        Input: Input as React.FC<InputProps>,
      },
    };

    // 初始化所有插件
    pluginManager.initialize(context).catch(console.error);

    return () => {
      pluginManager.destroy().catch(console.error);
    };
  }, [t, i18n.language, isDark]);

  return { pluginManager };
}
