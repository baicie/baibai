import { defineComponent, ref } from "vue";
import { Table, Button, Space } from "ant-design-vue";
import {
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  SaveOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "TableData",
  setup() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "username",
        dataIndex: "username",
        key: "username",
        editable: true,
      },
    ];

    const data = ref([
      { id: 1, username: "admin" },
      { id: 2, username: "user" },
    ]);

    return () => (
      <div class="table-data">
        <div class="mb-4">
          <Space>
            <Button type="primary" icon={<ReloadOutlined />}>
              刷新
            </Button>
            <Button icon={<PlusOutlined />}>新增</Button>
            <Button icon={<DeleteOutlined />}>删除</Button>
            <Button icon={<SaveOutlined />}>保存</Button>
          </Space>
        </div>
        <Table columns={columns} dataSource={data.value} />
      </div>
    );
  },
});
