import { BasePlugin } from "@baibai/plugin-core";
import type { PluginComponents } from "@baibai/plugin-core";
import QueryEditor from "./components/QueryEditor.vue";
import DataViewer from "./components/DataViewer.vue";
import Settings from "./components/Settings.vue";

export class MySQLPlugin extends BasePlugin {
  readonly name = "mysql";
  readonly version = "1.0.0";

  protected async onInit(): Promise<void> {
    // 初始化逻辑
    console.log("MySQL plugin initialized");
  }

  protected async onDestroy(): Promise<void> {
    // 清理逻辑
    console.log("MySQL plugin destroyed");
  }

  getComponents(): PluginComponents {
    return {
      editor: QueryEditor,
      viewer: DataViewer,
      settings: Settings,
    };
  }

  // MySQL 特定的方法
  async executeQuery(sql: string): Promise<any> {
    // 实现查询逻辑
  }
}
