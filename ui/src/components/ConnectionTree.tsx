import { defineComponent, ref, onMounted } from "vue";
import { Tree, Button, Modal, Form, Input, InputNumber } from "ant-design-vue";
import type { TreeProps } from "ant-design-vue";
import {
  DatabaseOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { invoke } from "@tauri-apps/api/core";
import { useI18n } from "vue-i18n";

interface Connection {
  id: number;
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database?: string;
}

interface TreeNode {
  key: string;
  title: string;
  icon?: any;
  children?: TreeNode[];
  isLeaf?: boolean;
  connection?: Connection;
}

export default defineComponent({
  name: "ConnectionTree",
  setup() {
    const { t } = useI18n();
    const treeData = ref<TreeNode[]>([]);
    const selectedKeys = ref<string[]>([]);
    const modalVisible = ref(false);
    const editingConnection = ref<Connection | null>(null);
    const form = ref();

    const loadConnections = async () => {
      try {
        const connections: Connection[] = await invoke("list_connections");
        treeData.value = connections.map((conn) => ({
          key: `conn-${conn.id}`,
          title: conn.name,
          icon: () => <DatabaseOutlined />,
          connection: conn,
          children: [],
        }));
      } catch (error) {
        console.error("Failed to load connections:", error);
      }
    };

    const handleAdd = () => {
      editingConnection.value = null;
      modalVisible.value = true;
    };

    const handleEdit = (node: TreeNode) => {
      if (node.connection) {
        editingConnection.value = { ...node.connection };
        modalVisible.value = true;
      }
    };

    const handleDelete = async (node: TreeNode) => {
      if (node.connection) {
        try {
          await invoke("delete_connection", { id: node.connection.id });
          await loadConnections();
        } catch (error) {
          console.error("Failed to delete connection:", error);
        }
      }
    };

    const handleOk = async () => {
      try {
        const values = await form.value.validateFields();
        if (editingConnection.value) {
          await invoke("update_connection", {
            connection: { ...editingConnection.value, ...values },
          });
        } else {
          await invoke("save_connection", { connection: values });
        }
        modalVisible.value = false;
        await loadConnections();
      } catch (error) {
        console.error("Failed to save connection:", error);
      }
    };

    const handleSelect: TreeProps["onSelect"] = (keys, info) => {
      selectedKeys.value = keys as string[];
      const node = info.node as unknown as TreeNode;
      if (node.connection) {
        // TODO: 处理连接选择
      }
    };

    onMounted(() => {
      loadConnections();
    });

    return () => (
      <div class="connection-tree">
        <div class="toolbar mb-2">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            {t("connection.add")}
          </Button>
        </div>
        <Tree
          treeData={treeData.value}
          selectedKeys={selectedKeys.value}
          onSelect={handleSelect}
          class="connections-list"
        >
          {{
            title: ({ node }: { node: TreeNode }) => (
              <div class="flex justify-between items-center">
                <span>{node.title}</span>
                <Space>
                  <EditOutlined onClick={() => handleEdit(node)} />
                  <DeleteOutlined onClick={() => handleDelete(node)} />
                </Space>
              </div>
            ),
          }}
        </Tree>

        <Modal
          v-model:visible={modalVisible.value}
          title={
            editingConnection.value ? t("connection.edit") : t("connection.add")
          }
          onOk={handleOk}
        >
          <Form ref={form} model={editingConnection.value || {}}>
            <Form.Item
              name="name"
              label={t("connection.name")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="host"
              label={t("connection.host")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="port"
              label={t("connection.port")}
              rules={[{ required: true }]}
            >
              <InputNumber min={1} max={65535} />
            </Form.Item>
            <Form.Item
              name="username"
              label={t("connection.username")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label={t("connection.password")}
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="database" label={t("connection.database")}>
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  },
});
