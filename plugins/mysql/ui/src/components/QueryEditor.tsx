import { defineComponent, ref } from "vue";
import { usePluginContext } from "@baibai/plugin-core";

export default defineComponent({
  name: "QueryEditor",
  setup() {
    const {
      i18n: { t },
      components: { Space, Button, Input },
    } = usePluginContext();
    const sql = ref("");

    const handleExecute = () => {
      // ...
    };

    return () => (
      <div class="query-editor">
        <div class="toolbar">
          <Space>
            <Button type="primary" onClick={handleExecute}>
              {t("editor.execute")}
            </Button>
          </Space>
        </div>
        <Input.TextArea
          v-model={sql.value}
          class="editor"
          placeholder={t("editor.placeholder")}
          autoSize={{ minRows: 4, maxRows: 10 }}
        />
      </div>
    );
  },
});
