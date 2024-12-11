import type { ButtonProps, SpaceProps, InputProps } from "antd";
import type { JSX } from "react";

export enum PluginType {
  Builtin = "builtin",
  External = "external",
}

export interface PluginMetadata {
  name: string;
  version: string;
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
