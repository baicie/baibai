import React from "react";
import { ConfigProvider, theme } from "antd";
import { I18nextProvider } from "react-i18next";
import { RouterProvider } from "react-router-dom";
import { useThemeStore } from "./stores/theme";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { router } from "./router";
import i18n from "./i18n";

const App: React.FC = () => {
  const isDark = useThemeStore((state) => state.isDark);

  const themeConfig = {
    algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      borderRadius: 4,
      colorPrimary: "#1890ff",
    },
  };

  return (
    <ConfigProvider
      theme={themeConfig}
      locale={i18n.language === "zh-CN" ? zhCN : enUS}
    >
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router}></RouterProvider>
      </I18nextProvider>
    </ConfigProvider>
  );
};

export default App;
