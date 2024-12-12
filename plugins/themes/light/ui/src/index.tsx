import type { Plugin, PluginContext } from "@baibai/plugin-core";
import theme from "./theme";
import manifest from "../../manifest.json";

export class LightThemePlugin implements Plugin {
  name = manifest.name;
  version = manifest.version;

  async init(context: PluginContext) {
    // 注册主题
    context.settings.set("themes.light", theme);
  }

  async destroy() {
    // 清理工作
  }

  getComponents() {
    return {};
  }
}

export default LightThemePlugin;
