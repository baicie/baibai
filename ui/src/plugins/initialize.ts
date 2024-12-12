import { MySQLPluginUI } from "@baibai/mysql-plugin";
import { ZhCNLanguagePlugin } from "@baibai/zh-cn-language-plugin";
import { EnUSLanguagePlugin } from "@baibai/en-us-language-plugin";
import { LightThemePlugin } from "@baibai/light-theme-plugin";
import { DarkThemePlugin } from "@baibai/dark-theme-plugin";
import { BlueThemePlugin } from "@baibai/blue-theme-plugin";
import { PluginManager } from "@baibai/plugin-core";

export async function initializePlugins(pluginManager: PluginManager) {
  // 注册内置插件
  const mysqlPluginUI = new MySQLPluginUI();
  pluginManager.registerBuiltin(mysqlPluginUI, mysqlPluginUI.getManifest());

  // 注册语言插件
  const zhCNLanguagePlugin = new ZhCNLanguagePlugin();
  pluginManager.registerBuiltin(
    zhCNLanguagePlugin,
    zhCNLanguagePlugin.getManifest()
  );

  const enUSLanguagePlugin = new EnUSLanguagePlugin();
  pluginManager.registerBuiltin(
    enUSLanguagePlugin,
    enUSLanguagePlugin.getManifest()
  );

  // 注册主题插件
  const lightThemePlugin = new LightThemePlugin();
  pluginManager.registerBuiltin(
    lightThemePlugin,
    lightThemePlugin.getManifest()
  );

  const darkThemePlugin = new DarkThemePlugin();
  pluginManager.registerBuiltin(darkThemePlugin, darkThemePlugin.getManifest());

  const blueThemePlugin = new BlueThemePlugin();
  pluginManager.registerBuiltin(blueThemePlugin, blueThemePlugin.getManifest());
}
