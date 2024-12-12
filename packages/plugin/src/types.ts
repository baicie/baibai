import type { ButtonProps, SpaceProps, InputProps } from "antd";
import type { JSX } from "react";

export enum PluginType {
  Builtin = "builtin",
  External = "external",
}

export enum PluginKind {
  Language = "language",
  Theme = "theme",
  Database = "database",
  Editor = "editor", // 编辑器插件(如 Monaco 配置、语法高亮等)
  Formatter = "formatter", // SQL 格式化插件
  Exporter = "exporter", // 数据导出插件(CSV、Excel等)
  Importer = "importer", // 数据导入插件
  Chart = "chart", // 图表可视化插件
  Backup = "backup", // 备份插件
  Migration = "migration", // 数据迁移插件
  Monitor = "monitor", // 性能监控插件
  Security = "security", // 安全审计插件
}

export interface PluginMetadata {
  name: string;
  version: string;
  kind: PluginKind; // 插件类型
  displayName: {
    "en-US": string;
    "zh-CN": string;
  };
  description: {
    "en-US": string;
    "zh-CN": string;
  };
  author: string;
  homepage?: string;
  icon?: string;
  capabilities: string[];
  path?: string;
  checksum?: string;
}

export interface UIComponents {
  Button: React.FC<ButtonProps>;
  Space: React.FC<SpaceProps>;
  Input: React.FC<InputProps>;
}

export interface PluginContext {
  i18n: {
    t: (key: string, params?: Record<string, any>) => string;
    locale: string;
  };
  theme: {
    isDark: boolean;
    primaryColor: string;
    token?: {
      colorPrimary: string;
    };
  };
  settings: {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
  };
  components: UIComponents;
}

export interface PluginComponents {
  editor?: () => JSX.Element;
  viewer?: () => JSX.Element;
  settings?: () => JSX.Element;
}

export interface Plugin {
  name: string;
  version: string;
  init: (context: PluginContext) => Promise<void>;
  destroy: () => Promise<void>;
  getComponents: () => PluginComponents;
}

export interface PluginError extends Error {
  code: string;
  details?: any;
}

export interface PluginInstallOptions {
  force?: boolean;
  skipVerification?: boolean;
}
