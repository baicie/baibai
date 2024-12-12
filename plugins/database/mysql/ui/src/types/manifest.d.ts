import type { PluginKind } from "@baibai/plugin-core";

declare module "*.json" {
  const value: {
    name: string;
    version: string;
    kind: PluginKind;
    displayName: {
      "en-US": string;
      "zh-CN": string;
    };
    description: {
      "en-US": string;
      "zh-CN": string;
    };
    author: string;
    capabilities: string[];
  };
  export default value;
}
