import React from "react";
import { Tooltip, Switch } from "antd";
import { useThemeStore } from "@/stores/theme";
import { useTranslation } from "react-i18next";

const ThemeSwitch: React.FC = () => {
  const { t } = useTranslation();
  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <Tooltip title={t(`theme.${isDark ? "light" : "dark"}`)} placement="bottom">
      <Switch
        checked={isDark}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
        onChange={toggleTheme}
      />
    </Tooltip>
  );
};

export default ThemeSwitch;
