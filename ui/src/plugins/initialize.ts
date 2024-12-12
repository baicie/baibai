import { MySQLPluginUI } from "@baibai/mysql-plugin";
import { ZhCNLanguagePlugin } from "@baibai/zh-cn-language-plugin";
import { EnUSLanguagePlugin } from "@baibai/en-us-language-plugin";
import { LightThemePlugin } from "@baibai/light-theme-plugin";
import { DarkThemePlugin } from "@baibai/dark-theme-plugin";
import { BlueThemePlugin } from "@baibai/blue-theme-plugin";
import { PluginManager } from "@baibai/plugin-core";

export async function initializePlugins(pluginManager: PluginManager) {
  // 注册内置插件
  pluginManager.registerBuiltin(
    new MySQLPluginUI(),
    MySQLPluginUI.getManifest()
  );

  // 注册语言插件
  pluginManager.registerBuiltin(
    new ZhCNLanguagePlugin(),
    ZhCNLanguagePlugin.getManifest()
  );
  pluginManager.registerBuiltin(
    new EnUSLanguagePlugin(),
    EnUSLanguagePlugin.getManifest()
  );

  // 注册主题插件
  pluginManager.registerBuiltin(
    new LightThemePlugin(),
    LightThemePlugin.getManifest()
  );
  pluginManager.registerBuiltin(
    new DarkThemePlugin(),
    DarkThemePlugin.getManifest()
  );
  pluginManager.registerBuiltin(
    new BlueThemePlugin(),
    BlueThemePlugin.getManifest()
  );
}
