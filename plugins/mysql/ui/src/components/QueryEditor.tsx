import { defineComponent, ref } from "vue";
import { usePluginContext } from "../hooks/usePluginContext";

export default defineComponent({
  name: "QueryEditor",
  setup() {
    const { t, isDark } = usePluginContext();
    const sql = ref("");

    const handleExecute = async () => {
      // 执行查询
    };

    const handleFormat = () => {
      // 格式化 SQL
    };

    const handleClear = () => {
      sql.value = "";
    };

    return () => (
      <div class="query-editor">
        <div class="toolbar">
          <a-space>
            <a-button type="primary" onClick={handleExecute}>
              {t("editor.execute")}
            </a-button>
            <a-button onClick={handleFormat}>{t("editor.format")}</a-button>
            <a-button onClick={handleClear}>{t("editor.clear")}</a-button>
          </a-space>
        </div>
        <a-textarea
          v-model={sql.value}
          class={`editor ${isDark ? "dark" : "light"}`}
          placeholder={t("editor.placeholder")}
          autoSize={{ minRows: 4, maxRows: 10 }}
        />
      </div>
    );
  },
});
