import { createPluginContext } from "@/plugins/use-plugin-context";
import { PluginManager } from "@baibai/plugin-core";
import { onBeforeUnmount, onMounted } from "vue";
import { initializePlugins } from "./index";

export function usePlugins() {
  const pluginManager = new PluginManager("/api");
  const context = createPluginContext();

  onMounted(async () => {
    await initializePlugins(pluginManager, context);
  });

  onBeforeUnmount(async () => {
    await pluginManager.destroy();
  });
}
