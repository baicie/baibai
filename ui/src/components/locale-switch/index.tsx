import React from "react";
import { Button, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

const LocaleSwitch: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLocale = () => {
    const nextLocale = i18n.language === "zh-CN" ? "en-US" : "zh-CN";
    i18n.changeLanguage(nextLocale);
    dayjs.locale(nextLocale.toLowerCase().replace("-", "_"));
  };

  return (
    <Tooltip title={t("locale.switch")} placement="bottom">
      <Button onClick={toggleLocale}>
        {i18n.language === "zh-CN" ? "EN" : "中"}
      </Button>
    </Tooltip>
  );
};

export default LocaleSwitch;
