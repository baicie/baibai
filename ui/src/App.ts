import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import { PluginManager } from "@baibai/plugin-core";
import { registerBuiltinPlugins } from "./plugins";
import { usePluginContext } from "./composables/usePluginContext";

export default defineComponent({
  setup() {
    const pluginManager = new PluginManager("/api");
    const context = usePluginContext();

    onMounted(async () => {
      registerBuiltinPlugins(pluginManager);
      await pluginManager.initialize(context);
    });

    onBeforeUnmount(async () => {
      await pluginManager.destroy();
    });

    return () => (
      <div class="app">
        {/* 应用内容 */}
      </div>
    );
  },
}); 