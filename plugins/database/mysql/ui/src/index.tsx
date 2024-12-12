import type {
  Plugin,
  PluginContext,
  PluginKind,
  PluginMetadata,
} from "@baibai/plugin-core";
import manifest from "../../manifest.json";

export class MySQLPluginUI implements Plugin {
  name = manifest.name;
  version = manifest.version;
  kind = manifest.kind as PluginKind;

  async init(_: PluginContext) {
    // 初始化插件
  }

  async destroy() {}

  getManifest(): PluginMetadata {
    return manifest as PluginMetadata;
  }
}
