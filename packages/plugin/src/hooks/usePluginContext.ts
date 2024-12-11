import { inject } from "vue";
import type { PluginContext } from "../types";
import { PLUGIN_CONTEXT_KEY } from "../context";

export function usePluginContext(): PluginContext {
  const context = inject<PluginContext>(PLUGIN_CONTEXT_KEY);
  if (!context) {
    throw new Error(
      "Plugin context not found. Make sure the plugin is properly initialized."
    );
  }
  return context;
}
