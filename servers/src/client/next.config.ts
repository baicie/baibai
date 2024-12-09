import { NextConfig } from "next";

const config: NextConfig = {
  // 禁用默认的文件系统路由
  useFileSystemPublicRoutes: false,

  // 输出目录配置
  distDir: "../../dist/client",

  // 编译配置
  transpilePackages: ["antd", "@ant-design/pro-components"],

  // 环境变量
  env: {
    API_URL: process.env.API_URL || "http://localhost:3000/api",
  },
};

export default config;
