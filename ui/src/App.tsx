import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { useThemeStore } from "./stores/theme";
import { useI18nStore } from "./stores/i18n";
import { usePlugins } from "./plugins";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import i18n from "./i18n";
import { router } from "./router";

const App: React.FC = () => {
  const { currentTheme, themes, loadThemes } = useThemeStore();
  const { currentLocale, loadLocales } = useI18nStore();
  const { pluginManager } = usePlugins();

  useEffect(() => {
    if (pluginManager) {
      loadThemes(pluginManager);
      loadLocales(pluginManager);
    }
  }, [pluginManager]);

  return (
    <ConfigProvider theme={themes[currentTheme]}>
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router}></RouterProvider>
      </I18nextProvider>
    </ConfigProvider>
  );
};

export default App;
