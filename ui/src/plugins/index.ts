import { PluginManager } from "@baibai/plugin-core";
import { MySQLPlugin } from "@baibai/mysql-plugin";

export function registerBuiltinPlugins(pluginManager: PluginManager) {
  // MySQL 插件
  const mysqlPlugin = new MySQLPlugin();
  pluginManager.registerBuiltin(mysqlPlugin, {
    name: "mysql",
    version: "1.0.0",
    pluginType: "builtin",
    displayName: {
      "en-US": "MySQL Database",
      "zh-CN": "MySQL 数据库",
    },
    description: {
      "en-US": "MySQL database plugin",
      "zh-CN": "MySQL 数据库插件",
    },
    author: "baibai",
    capabilities: ["transaction", "prepared_statement"],
  });
}
