import { Plugin, PluginType, PluginMetadata, PluginContext } from "./types";
import { DefaultPluginStore } from "./store";

export class PluginManager {
  private plugins: Map<string, Plugin>;
  private store: DefaultPluginStore;
  private builtinPlugins: Map<string, Plugin>;

  constructor(apiUrl: string) {
    this.plugins = new Map();
    this.builtinPlugins = new Map();
    this.store = new DefaultPluginStore(apiUrl);
  }

  // 注册内置插件
  public registerBuiltin(plugin: Plugin, metadata: PluginMetadata): void {
    if (metadata.pluginType !== PluginType.Builtin) {
      throw new Error("Only builtin plugins can be registered directly");
    }
    this.builtinPlugins.set(plugin.name, plugin);
  }

  // 获取插件实例
  public getPlugin(name: string): Plugin | undefined {
    return this.plugins.get(name) || this.builtinPlugins.get(name);
  }

  // 初始化所有插件
  public async initialize(context: PluginContext): Promise<void> {
    // 初始化内置插件
    for (const [name, plugin] of this.builtinPlugins) {
      try {
        await plugin.init(context);
        console.log(`Initialized builtin plugin: ${name}`);
      } catch (error) {
        console.error(`Failed to initialize builtin plugin ${name}:`, error);
      }
    }

    // 加载并初始化外部插件
    const installed = await this.store.listInstalled();
    for (const metadata of installed) {
      try {
        const plugin = await this.loadExternalPlugin(metadata);
        await plugin.init(context);
        this.plugins.set(metadata.name, plugin);
      } catch (error) {
        console.error(`Failed to load plugin ${metadata.name}:`, error);
      }
    }
  }

  // 销毁所有插件
  public async destroy(): Promise<void> {
    const allPlugins = [
      ...this.plugins.values(),
      ...this.builtinPlugins.values(),
    ];
    await Promise.all(allPlugins.map((plugin) => plugin.destroy()));
    this.plugins.clear();
  }

  private async loadExternalPlugin(metadata: PluginMetadata): Promise<Plugin> {
    // 实现外部插件的动态加载逻辑
    const module = await import(metadata.path!);
    return new module.default();
  }
}
