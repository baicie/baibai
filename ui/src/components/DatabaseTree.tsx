import { defineComponent, ref, onMounted } from "vue";
import {
  Tree,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
} from "ant-design-vue";
import type { TreeProps } from "ant-design-vue";
import {
  DatabaseOutlined,
  TableOutlined,
  ColumnHeightOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { invoke } from "@tauri-apps/api/core";
import { useRouter } from "vue-router";
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
  type: "connection" | "database" | "table";
  data?: any;
}

export default defineComponent({
  name: "DatabaseTree",
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const treeData = ref<TreeNode[]>([]);
    const selectedKeys = ref<string[]>([]);
    const expandedKeys = ref<string[]>([]);
    const modalVisible = ref(false);
    const form = ref();
    const editingConnection = ref<Connection | null>(null);

    // 加载连接列表
    const loadConnections = async () => {
      try {
        const connections: Connection[] = await invoke("list_connections");
        treeData.value = connections.map((conn) => ({
          key: `conn-${conn.id}`,
          title: conn.name,
          icon: () => <DatabaseOutlined />,
          type: "connection",
          data: conn,
          children: [],
        }));
      } catch (error) {
        console.error("Failed to load connections:", error);
        message.error(t("database.connection.loadError"));
      }
    };

    // 加载数据库列表
    const loadDatabases = async (node: TreeNode) => {
      if (node.type !== "connection" || !node.data) return;

      try {
        const databases: string[] = await invoke("list_databases", {
          config: node.data,
        });

        node.children = databases.map((db) => ({
          key: `${node.key}-${db}`,
          title: db,
          icon: () => <DatabaseOutlined />,
          type: "database",
          data: { ...node.data, database: db },
          children: [],
        }));
      } catch (error) {
        console.error("Failed to load databases:", error);
        message.error(t("database.list.failed"));
      }
    };

    // 加载表列表
    const loadTables = async (node: TreeNode) => {
      if (node.type !== "database" || !node.data) return;

      try {
        const tables = await invoke("list_tables", {
          config: node.data,
        });

        node.children = tables.map((table: any) => ({
          key: `${node.key}-${table.name}`,
          title: table.name,
          icon: () => <TableOutlined />,
          type: "table",
          data: { ...node.data, table: table.name },
          isLeaf: true,
        }));
      } catch (error) {
        console.error("Failed to load tables:", error);
        message.error(t("database.tables.failed"));
      }
    };

    // 展开/加载节点
    const onExpand = async (keys: string[], info: any) => {
      expandedKeys.value = keys;
      const node = info.node as TreeNode;

      if (!node.children?.length) {
        if (node.type === "connection") {
          await loadDatabases(node);
        } else if (node.type === "database") {
          await loadTables(node);
        }
      }
    };

    // 选择节点
    const onSelect: TreeProps["onSelect"] = (keys, info) => {
      selectedKeys.value = keys as string[];
      const node = info.node as TreeNode;

      if (node.type === "table") {
        router.push({
          name: "table-detail",
          params: {
            database: node.data.database,
            table: node.data.table,
          },
        });
      }
    };

    // 添加连接
    const handleAdd = () => {
      editingConnection.value = null;
      modalVisible.value = true;
    };

    // 删除连接
    const handleDelete = async (node: TreeNode) => {
      if (node.type !== "connection" || !node.data?.id) return;

      try {
        await invoke("delete_connection", { id: node.data.id });
        await loadConnections();
        message.success(t("database.connection.deleted"));
      } catch (error) {
        console.error("Failed to delete connection:", error);
        message.error(t("database.connection.deleteError"));
      }
    };

    // 保存连接
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
        message.success(
          t(
            editingConnection.value
              ? "database.connection.updated"
              : "database.connection.created"
          )
        );
      } catch (error) {
        console.error("Failed to save connection:", error);
        message.error(t("database.connection.saveError"));
      }
    };

    onMounted(() => {
      loadConnections();
    });

    return () => (
      <div class="database-tree">
        <div class="toolbar mb-2">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            {t("connection.add")}
          </Button>
        </div>

        <Tree
          treeData={treeData.value}
          selectedKeys={selectedKeys.value}
          expandedKeys={expandedKeys.value}
          onSelect={onSelect}
          onExpand={onExpand}
        >
          {{
            title: ({ node }: { node: TreeNode }) => (
              <div class="flex justify-between items-center">
                <span>{node.title}</span>
                {node.type === "connection" && (
                  <DeleteOutlined
                    class="opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(node);
                    }}
                  />
                )}
              </div>
            ),
          }}
        </Tree>

        <Modal
          v-model:visible={modalVisible.value}
          title={t(
            editingConnection.value ? "connection.edit" : "connection.add"
          )}
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
          </Form>
        </Modal>
      </div>
    );
  },
});
