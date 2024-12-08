import { defineComponent, PropType } from "vue";
import { QueryResult } from "../../../core/src/lib";

export default defineComponent({
  name: "ResultTable",
  props: {
    result: {
      type: Object as PropType<QueryResult>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="result-table">
        <a-table
          dataSource={props.result.rows}
          columns={props.result.columns.map((col) => ({
            title: col,
            dataIndex: col,
            key: col,
          }))}
          scroll={{ x: true }}
          size="small"
          bordered
        />
        <div class="mt-2 text-gray-600">
          影响行数: {props.result.affected_rows}
        </div>
      </div>
    );
  },
});
