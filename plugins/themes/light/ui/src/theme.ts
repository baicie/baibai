import type { ThemeConfig } from "antd/es/config-provider/context";

const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
    borderRadius: 4,
    colorBgBase: "#ffffff",
    colorTextBase: "rgba(0, 0, 0, 0.85)",

    // 组件相关
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBgLayout: "#f5f5f5",

    // 边框相关
    colorBorder: "#d9d9d9",
    colorBorderSecondary: "#f0f0f0",

    // 文本相关
    colorText: "rgba(0, 0, 0, 0.85)",
    colorTextSecondary: "rgba(0, 0, 0, 0.45)",
    colorTextTertiary: "rgba(0, 0, 0, 0.25)",
    colorTextDisabled: "rgba(0, 0, 0, 0.25)",

    // 链接相关
    colorLink: "#1890ff",
    colorLinkHover: "#40a9ff",
    colorLinkActive: "#096dd9",

    // 状态相关
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1890ff",
  },
  components: {
    Button: {
      colorPrimary: "#1890ff",
      algorithm: true,
    },
    Input: {
      colorBorder: "#d9d9d9",
      colorPrimaryHover: "#40a9ff",
    },
    Select: {
      colorBorder: "#d9d9d9",
      colorPrimaryHover: "#40a9ff",
    },
    Table: {
      colorBorderSecondary: "#f0f0f0",
    },
    Card: {
      colorBorderSecondary: "#f0f0f0",
    },
  },
};

export default lightTheme;
