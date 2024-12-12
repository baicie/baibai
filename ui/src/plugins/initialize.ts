import { MySQLPluginUI } from "@baibai/mysql-plugin";
import { PluginManager } from "@baibai/plugin-core";

export async function initializePlugins(pluginManager: PluginManager) {
  // 注册内置插件
  pluginManager.registerBuiltin(
    new MySQLPluginUI(),
    MySQLPluginUI.getManifest()
  );
}
