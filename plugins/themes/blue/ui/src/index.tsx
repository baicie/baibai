import type { Plugin, PluginContext } from "@baibai/plugin-core";
import theme from "./theme";
import manifest from "../../manifest.json";

export class BlueThemePlugin implements Plugin {
  name = manifest.name;
  version = manifest.version;

  async init(context: PluginContext) {
    // 注册主题
    context.settings.set("themes.blue", {
      token: {
        colorPrimary: "#1e40af", // 深蓝色
        borderRadius: 4,
      },
    });
  }

  async destroy() {
    // 清理工作
  }

  getComponents() {
    return {};
  }
}

export default BlueThemePlugin;
