import { theme } from "ant-design-vue";
import { ThemeConfig } from "ant-design-vue/es/config-provider/context";

export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    borderRadius: 4,
  },
};

export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    borderRadius: 4,
  },
  algorithm: theme.darkAlgorithm,
};
