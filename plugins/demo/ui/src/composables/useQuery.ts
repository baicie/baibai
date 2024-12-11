import { ref } from "vue";
import { useMessage } from "ant-design-vue/es/message";
import type { QueryResult } from "baibai-plugin";

export function useQuery() {
  const loading = ref(false);
  const result = ref<QueryResult | null>(null);
  const message = useMessage();

  const executeQuery = async (sql: string) => {
    loading.value = true;
    try {
      result.value = await window.__TAURI__.invoke("plugin:mysql|query", {
        sql,
      });
    } catch (error) {
      message.error(error.message);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    result,
    executeQuery,
  };
}
