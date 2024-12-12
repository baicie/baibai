import { theme } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";

const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: "#177ddc",
    borderRadius: 4,
    colorBgBase: "#141414",
    colorTextBase: "rgba(255, 255, 255, 0.85)",

    // 组件相关
    colorBgContainer: "#1f1f1f",
    colorBgElevated: "#1f1f1f",
    colorBgLayout: "#141414",

    // 边框相关
    colorBorder: "#434343",
    colorBorderSecondary: "#303030",

    // 文本相关
    colorText: "rgba(255, 255, 255, 0.85)",
    colorTextSecondary: "rgba(255, 255, 255, 0.45)",
    colorTextTertiary: "rgba(255, 255, 255, 0.25)",
    colorTextDisabled: "rgba(255, 255, 255, 0.25)",

    // 链接相关
    colorLink: "#177ddc",
    colorLinkHover: "#1890ff",
    colorLinkActive: "#0050b3",

    // 状态相关
    colorSuccess: "#49aa19",
    colorWarning: "#d89614",
    colorError: "#a61d24",
    colorInfo: "#177ddc",
  },
  algorithm: theme.darkAlgorithm,
  components: {
    Button: {
      colorPrimary: "#177ddc",
      algorithm: true,
    },
    Input: {
      colorBgContainer: "#1f1f1f",
      colorBorder: "#434343",
    },
    Select: {
      colorBgContainer: "#1f1f1f",
      colorBorder: "#434343",
    },
    Table: {
      colorBgContainer: "#1f1f1f",
      colorBorderSecondary: "#303030",
    },
    Card: {
      colorBgContainer: "#1f1f1f",
    },
    Modal: {
      colorBgElevated: "#1f1f1f",
    },
  },
};

export default darkTheme;
