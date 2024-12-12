import type { ThemeConfig } from "antd/es/config-provider/context";

const blueTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1e40af",
    borderRadius: 4,
    colorBgBase: "#ffffff",
    colorTextBase: "rgba(0, 0, 0, 0.85)",

    // 组件相关
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBgLayout: "#f0f2f5",

    // 边框相关
    colorBorder: "#d9d9d9",
    colorBorderSecondary: "#f0f0f0",

    // 文本相关
    colorText: "rgba(0, 0, 0, 0.85)",
    colorTextSecondary: "rgba(0, 0, 0, 0.45)",
    colorTextTertiary: "rgba(0, 0, 0, 0.25)",
    colorTextDisabled: "rgba(0, 0, 0, 0.25)",

    // 链接相关
    colorLink: "#1e40af",
    colorLinkHover: "#2563eb",
    colorLinkActive: "#1d4ed8",

    // 状态相关
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1e40af",
  },
  components: {
    Button: {
      colorPrimary: "#1e40af",
      algorithm: true,
    },
    Input: {
      colorBorder: "#d9d9d9",
      colorPrimaryHover: "#2563eb",
    },
    Select: {
      colorBorder: "#d9d9d9",
      colorPrimaryHover: "#2563eb",
    },
    Table: {
      colorBorderSecondary: "#f0f0f0",
    },
    Card: {
      colorBorderSecondary: "#f0f0f0",
    },
  },
};

export default blueTheme;
