import { defineComponent, onMounted, ref } from "vue";
import G6 from "@antv/g6";

export default defineComponent({
  name: "TableER",
  setup() {
    const container = ref<HTMLDivElement>();
    const graph = ref<any>(null);

    onMounted(() => {
      if (!container.value) return;

      graph.value = new G6.Graph({
        container: container.value,
        width: container.value.offsetWidth,
        height: 500,
        layout: {
          type: "dagre",
          rankdir: "LR",
          nodesep: 50,
          ranksep: 70,
        },
      });

      const data = {
        nodes: [
          {
            id: "users",
            label: "users",
            type: "table-node",
            columns: ["id", "username"],
          },
          {
            id: "orders",
            label: "orders",
            type: "table-node",
            columns: ["id", "user_id", "amount"],
          },
        ],
        edges: [
          {
            source: "orders",
            target: "users",
            label: "user_id -> id",
          },
        ],
      };

      graph.value.data(data);
      graph.value.render();
    });

    return () => (
      <div class="table-er">
        <div ref={container} class="er-container" />
      </div>
    );
  },
});
