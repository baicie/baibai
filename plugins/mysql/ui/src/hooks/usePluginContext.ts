import { inject } from "vue";
import type { PluginContext } from "@baibai/plugin-core";
import { messages } from "../i18n";

const PLUGIN_CONTEXT_KEY = Symbol("plugin-context");

export function usePluginContext() {
  const context = inject<PluginContext>(PLUGIN_CONTEXT_KEY);
  if (!context) {
    throw new Error("Plugin context not found");
  }

  const t = (key: string, params?: Record<string, any>) => {
    const pluginKey = `mysql.${key}`;
    // 先尝试从插件自己的翻译中获取
    const pluginMessage = messages[context.i18n.locale]?.mysql;
    if (pluginMessage) {
      const keys = key.split(".");
      let value = pluginMessage;
      for (const k of keys) {
        value = value[k];
        if (!value) break;
      }
      if (value) {
        if (params) {
          return Object.entries(params).reduce(
            (msg, [key, value]) => msg.replace(`{${key}}`, String(value)),
            value
          );
        }
        return value;
      }
    }
    // 回退到应用的翻译
    return context.i18n.t(pluginKey, params);
  };

  return {
    t,
    isDark: context.theme.isDark,
    primaryColor: context.theme.primaryColor,
    settings: context.settings,
  };
}
