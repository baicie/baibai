import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

const LocaleSwitch: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLocale = () => {
    const nextLocale = i18n.language === "zh-CN" ? "en-US" : "zh-CN";
    i18n.changeLanguage(nextLocale);
  };

  return (
    <Button type="text" onClick={toggleLocale}>
      {t("locale.switch")}
    </Button>
  );
};

export default LocaleSwitch;
