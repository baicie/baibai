import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "QueryEditor",
  emits: ["execute"],
  setup(props, { emit }) {
    const sqlContent = ref("");

    const handleExecute = () => {
      emit("execute", sqlContent.value);
    };

    return () => (
      <div class="query-editor">
        <a-textarea
          v-model={sqlContent.value}
          placeholder="请输入 SQL 语句"
          autoSize={{ minRows: 4, maxRows: 10 }}
          class="mb-4"
        />
        <a-button type="primary" onClick={handleExecute}>
          执行查询
        </a-button>
      </div>
    );
  },
});
