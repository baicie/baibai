import type {
  Plugin,
  PluginContext,
  PluginKind,
  PluginMetadata,
} from "@baibai/plugin-core";
import theme from "./theme";
import manifest from "../../manifest.json";

export class LightThemePlugin implements Plugin {
  name = manifest.name;
  version = manifest.version;
  kind = manifest.kind as PluginKind;

  async init(context: PluginContext) {
    context.settings.set(`themes.${this.name}`, theme);
  }

  getManifest(): PluginMetadata {
    return manifest as PluginMetadata;
  }

  async destroy() {}
}
