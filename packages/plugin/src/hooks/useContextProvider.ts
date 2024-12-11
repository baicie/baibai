import { provide } from "vue";
import type { Plugin, PluginContext } from "../types";
import { PLUGIN_CONTEXT_KEY } from "../context";

export function useContextProvider(plugin: Plugin, context: PluginContext) {
  // 提供插件上下文
  provide(PLUGIN_CONTEXT_KEY, context);

  // 返回清理函数
  return () => {
    // 在需要时可以执行一些清理操作
  };
}
