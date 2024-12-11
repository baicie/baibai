import { Plugin, PluginContext, PluginComponents } from "./types";

export abstract class BasePlugin implements Plugin {
  protected context?: PluginContext;

  abstract readonly name: string;
  abstract readonly version: string;

  async init(context: PluginContext): Promise<void> {
    this.context = context;
    await this.onInit();
  }

  async destroy(): Promise<void> {
    await this.onDestroy();
    this.context = undefined;
  }

  getComponents(): PluginComponents {
    return {};
  }

  protected async onInit(): Promise<void> {
    // 子类可以覆盖此方法
  }

  protected async onDestroy(): Promise<void> {
    // 子类可以覆盖此方法
  }

  protected t(key: string, params?: Record<string, any>): string {
    return this.context?.i18n.t(key, params) ?? key;
  }

  protected get isDark(): boolean {
    return this.context?.theme.isDark ?? false;
  }
}
