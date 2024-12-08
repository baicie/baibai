import { defineComponent, ref } from "vue";
import { Table } from "ant-design-vue";

interface ColumnInfo {
  name: string;
  type: string;
  nullable: boolean;
  default: string;
  comment: string;
}

export default defineComponent({
  name: "TableStructure",
  setup() {
    const columns = [
      {
        title: "列名",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "类型",
        dataIndex: "type",
        key: "type",
      },
      {
        title: "允许空",
        dataIndex: "nullable",
        key: "nullable",
        customRender: ({ text }: { text: boolean }) => (text ? "是" : "否"),
      },
      {
        title: "默认值",
        dataIndex: "default",
        key: "default",
      },
      {
        title: "注释",
        dataIndex: "comment",
        key: "comment",
      },
    ];

    const data = ref<ColumnInfo[]>([
      {
        name: "id",
        type: "int",
        nullable: false,
        default: "",
        comment: "主键",
      },
      {
        name: "username",
        type: "varchar(50)",
        nullable: false,
        default: "",
        comment: "用户名",
      },
    ]);

    return () => (
      <div class="table-structure">
        <Table columns={columns} dataSource={data.value} pagination={false} />
      </div>
    );
  },
});
