import type { NextConfig } from "next";

const config: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*",
      },
    ];
  },
  // 支持 antd 按需加载
  transpilePackages: [
    "@ant-design/pro-components",
    "antd",
    "@ant-design/icons-vue",
  ],
};

export default config;
