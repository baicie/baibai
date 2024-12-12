import type { Plugin, PluginContext } from "@baibai/plugin-core";
import translations from "./translations";
import manifest from "../../manifest.json";

export class ZhCNLanguagePlugin implements Plugin {
  name = manifest.name;
  version = manifest.version;

  async init(context: PluginContext) {
    // 注册语言包
    context.settings.set("translations.zh-CN", translations);
  }

  async destroy() {
    // 清理工作
  }

  getComponents() {
    return {};
  }
}

export default ZhCNLanguagePlugin;
