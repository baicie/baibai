import { PluginManager } from "@baibai/plugin-core";
import type { PluginContext } from "@baibai/plugin-core";
import { MySQLPluginUI } from "@baibai/mysql-plugin";

export async function initializePlugins(
  pluginManager: PluginManager,
  context: PluginContext
) {
  // 注册内置插件
  const mysqlPlugin = new MySQLPluginUI();
  pluginManager.registerBuiltin(mysqlPlugin, MySQLPluginUI.getManifest());

  // 初始化插件
  await pluginManager.initialize(context);
}
