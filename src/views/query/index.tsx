import { defineComponent, ref } from "vue";
import { Layout } from "ant-design-vue";
import SqlEditor from "@/components/SqlEditor";
import DatabaseTree from "@/components/DatabaseTree";
import ResultTable from "@/components/ResultTable";
import { invoke } from "@tauri-apps/api/core";

const { Sider, Content } = Layout;

export default defineComponent({
  name: "QueryView",
  setup() {
    const sql = ref("");
    const result = ref<any>(null);
    const loading = ref(false);

    const handleExecute = async () => {
      if (!sql.value.trim()) return;

      loading.value = true;
      try {
        result.value = await invoke("execute_sql", { sql: sql.value });
      } catch (error) {
        // 处理错误
      } finally {
        loading.value = false;
      }
    };

    return () => (
      <Layout class="h-full flex flex-col">
        <Content class="flex-1 p-4 flex flex-col">
          <div class="flex-1 flex flex-col">
            <SqlEditor
              v-model:value={sql.value}
              height="40%"
              onExecute={handleExecute}
            />
            <div class="h-2" />
            <ResultTable
              loading={loading.value}
              result={result.value}
              height="calc(60% - 8px)"
            />
          </div>
        </Content>
      </Layout>
    );
  },
});
