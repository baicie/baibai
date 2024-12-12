import { create } from "zustand";
import { PluginManager, PluginKind } from "@baibai/plugin-core";
import type { ThemeConfig } from "antd/es/config-provider/context";

interface ThemeState {
  currentTheme: string;
  themes: Record<string, ThemeConfig>;
  setTheme: (name: string) => void;
  loadThemes: (pluginManager: PluginManager) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  currentTheme: "light",
  themes: {},

  setTheme: (name) => {
    set({ currentTheme: name });
    localStorage.setItem("theme", name);
  },

  loadThemes: (pluginManager) => {
    const themes: Record<string, ThemeConfig> = {};
    const themePlugins = pluginManager.getPluginsByKind(PluginKind.Theme);

    for (const plugin of themePlugins) {
      const manifest = plugin.getManifest();
      themes[manifest.name] = plugin
        ?.getComponents()
        ?.settings?.() as ThemeConfig;
    }
    set({ themes });
  },
}));
