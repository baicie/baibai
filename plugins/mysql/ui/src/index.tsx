import { defineComponent, ref, provide } from "vue";
import type {
  Plugin,
  PluginContext,
  PluginComponents,
} from "@baibai/plugin-core";
import QueryEditor from "./components/QueryEditor";
import DataViewer from "./components/DataViewer";
import Settings from "./components/Settings";
import { messages } from "./i18n";

const PLUGIN_CONTEXT_KEY = Symbol("plugin-context");

export class MySQLPluginUI implements Plugin {
  private context?: PluginContext;

  name = "mysql";
  version = "1.0.0";

  async init(context: PluginContext) {
    this.context = context;
  }

  async destroy() {
    // 清理资源
  }

  getComponents(): PluginComponents {
    const WrappedComponent = (Component: any) =>
      defineComponent({
        setup(props) {
          // 提供插件上下文给子组件
          provide(PLUGIN_CONTEXT_KEY, this.context);
          return () => <Component {...props} />;
        },
      });

    return {
      editor: WrappedComponent(QueryEditor),
      viewer: WrappedComponent(DataViewer),
      settings: WrappedComponent(Settings),
    };
  }

  // 提供插件的翻译资源
  getMessages() {
    return messages;
  }
}

export default MySQLPluginUI;
