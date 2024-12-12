import type {
  Plugin,
  PluginContext,
  PluginKind,
  PluginMetadata,
} from "@baibai/plugin-core";
import translations from "./translations";
import manifest from "../../manifest.json";

export class EnUSLanguagePlugin implements Plugin {
  name = manifest.name;
  version = manifest.version;
  kind = manifest.kind as PluginKind;

  async init(context: PluginContext) {
    // 注册语言包
    context.settings.set("translations.en-US", translations);
  }

  async destroy() {
    // 清理工作
  }

  getManifest(): PluginMetadata {
    return manifest as PluginMetadata;
  }
}
