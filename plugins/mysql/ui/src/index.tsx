import type {
  Plugin,
  PluginContext,
  PluginComponents,
} from "@baibai/plugin-core";
import { PluginContextProvider } from "@baibai/plugin-core";
import QueryEditor from "./components/QueryEditor";
import manifest from "../../manifest.json";

export class MySQLPluginUI implements Plugin {
  private context?: PluginContext;

  name = "mysql";
  version = "1.0.0";

  async init(context: PluginContext) {
    this.context = context;
  }

  getComponents(): PluginComponents {
    const context = this.context;
    if (!context) {
      throw new Error("Plugin not initialized");
    }

    return {
      editor: () => (
        <PluginContextProvider value={context}>
          <QueryEditor />
        </PluginContextProvider>
      ),
    };
  }

  async destroy(): Promise<void> {
    this.context = undefined;
  }

  static getManifest() {
    return manifest;
  }
}

export default MySQLPluginUI;

export type { MySQLPluginOptions } from "./types";
