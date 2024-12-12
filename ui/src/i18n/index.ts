import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { invoke } from "@tauri-apps/api/core";
import dayjs from "dayjs";

// 语言包
import zhCN from "./locales/zh-CN";
import enUS from "./locales/en-US";

// dayjs 语言包
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";

i18n.use(initReactI18next).init({
  resources: {
    "zh-CN": {
      translation: zhCN,
    },
    "en-US": {
      translation: enUS,
    },
  },
  lng: "zh-CN",
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false,
  },
});

// 监听语言变化
i18n.on("languageChanged", (lng) => {
  // 同步 dayjs 语言
  dayjs.locale(lng.toLowerCase().replace("-", "_"));
  // 同步后端语言
  invoke("set_locale", { locale: lng });
});

export default i18n;
