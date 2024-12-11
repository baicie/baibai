import React, { useEffect } from "react";
import { Tree, Button, Modal, Form, Input, Space } from "antd";
import type { DataNode } from "antd/es/tree";
import {
  DatabaseOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useDatabaseStore } from "../stores/database";

interface Connection {
  id: string;
  name: string;
  host: string;
  port: number;
  username: string;
}

const ConnectionTree: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [editingConnection, setEditingConnection] =
    React.useState<Connection>();

  const {
    connections,
    loading,
    loadConnections,
    addConnection,
    removeConnection,
    setCurrentConnection,
  } = useDatabaseStore();

  useEffect(() => {
    loadConnections();
  }, []);

  const handleAdd = () => {
    setEditingConnection(undefined);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (connection: Connection) => {
    setEditingConnection(connection);
    form.setFieldsValue(connection);
    setModalVisible(true);
  };

  const handleDelete = async (connection: Connection) => {
    await removeConnection(connection.id);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingConnection) {
      // TODO: 实现编辑功能
    } else {
      await addConnection(values);
    }
    setModalVisible(false);
  };

  const treeData: DataNode[] = connections.map((conn) => ({
    key: conn.id,
    title: (
      <div className="flex justify-between items-center">
        <span>{conn.name}</span>
        <Space>
          <EditOutlined onClick={() => handleEdit(conn)} />
          <DeleteOutlined onClick={() => handleDelete(conn)} />
        </Space>
      </div>
    ),
    icon: <DatabaseOutlined />,
  }));

  return (
    <div className="connection-tree">
      <div className="toolbar mb-2">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          {t("database.newConnection")}
        </Button>
      </div>
      <Tree
        treeData={treeData}
        showIcon
        onSelect={(keys) => {
          const conn = connections.find((c) => c.id === keys[0]);
          if (conn) setCurrentConnection(conn);
        }}
      />
      <Modal
        title={
          editingConnection
            ? t("database.editConnection")
            : t("database.newConnection")
        }
        open={modalVisible}
        onOk={handleOk}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label={t("database.name")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="host"
            label={t("database.host")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="port"
            label={t("database.port")}
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="username"
            label={t("database.username")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={t("database.password")}
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ConnectionTree;
