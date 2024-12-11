import type { Component } from "vue";

export enum PluginType {
  Builtin = "builtin",
  External = "external",
}

export interface PluginMetadata {
  name: string;
  version: string;
  pluginType: PluginType;
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
  path?: string; // 外部插件的路径
  checksum?: string; // 外部插件的校验和
}

export interface PluginInstallOptions {
  force?: boolean; // 是否强制安装
  skipVerification?: boolean; // 是否跳过验证
}

export interface PluginError extends Error {
  code: string;
  details?: any;
}

export interface PluginContext {
  i18n: {
    t: (key: string, params?: Record<string, any>) => string;
    locale: string;
  };
  theme: {
    isDark: boolean;
    primaryColor: string;
  };
  settings: {
    get: (key: string) => any;
    set: (key: string, value: any) => void;
  };
}

export interface PluginComponents {
  editor?: Component;
  viewer?: Component;
  settings?: Component;
}

export interface Plugin {
  name: string;
  version: string;
  init: (context: PluginContext) => Promise<void>;
  destroy: () => Promise<void>;
  getComponents: () => PluginComponents;
}
