import { create } from "zustand";
import { PluginManager, PluginKind } from "@baibai/plugin-core";
import i18n from "../i18n";

interface I18nState {
  currentLocale: string;
  locales: Record<string, any>;
  setLocale: (locale: string) => void;
  loadLocales: (pluginManager: PluginManager) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  currentLocale: "zh-CN",
  locales: {},

  setLocale: (locale) => {
    set({ currentLocale: locale });
    i18n.changeLanguage(locale);
    localStorage.setItem("locale", locale);
  },

  loadLocales: (pluginManager) => {
    const locales: Record<string, any> = {};
    const languagePlugins = pluginManager.getPluginsByKind(PluginKind.Language);

    for (const plugin of languagePlugins) {
      const manifest = plugin.getManifest();
      locales[manifest.name] = plugin.getComponents()?.settings?.();
    }
    set({ locales });

    Object.entries(locales).forEach(([locale, translations]) => {
      i18n.addResourceBundle(locale, "translation", translations);
    });
  },
}));
