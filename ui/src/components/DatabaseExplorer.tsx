import { defineComponent, ref } from "vue";
import { useThemeStore } from "../stores/theme";

export default defineComponent({
  name: "DatabaseExplorer",
  setup() {
    const themeStore = useThemeStore();
    const treeData = ref([]);

    const loadData = async (node: any) => {
      // 实现加载表和字段的逻辑
    };

    return () => (
      <div class="database-explorer">
        <a-tree
          v-model:expandedKeys={expandedKeys.value}
          v-model:selectedKeys={selectedKeys.value}
          loadData={loadData}
          treeData={treeData.value}
        />
      </div>
    );
  },
});
