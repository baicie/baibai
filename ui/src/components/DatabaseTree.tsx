import React from "react";
import { Tree, Button, Modal, Form, Input } from "antd";
import type { DataNode } from "antd/es/tree";

import { useNavigate } from "react-router-dom";

const DatabaseTree: React.FC = () => {
  const navigate = useNavigate();
  const [treeData, TreeData] = React.useState<DataNode[]>([]);
  const [_, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [form] = Form.useForm();

  const loadDatabases = async () => {
    setLoading(true);
    try {
      // 加载数据库列表...
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (selectedKeys: React.Key[]) => {
    const key = selectedKeys[0] as string;
    if (key.startsWith("table:")) {
      const [, database, table] = key.split(":");
      navigate(`/table/${database}/${table}`);
    }
  };

  React.useEffect(() => {
    loadDatabases();
  }, []);

  return (
    <div className="database-tree">
      <div className="p-2">
        <Button type="primary" onClick={() => setModalVisible(true)}>
          新建连接
        </Button>
      </div>
      <Tree
        treeData={treeData}
        onSelect={handleSelect}
        showIcon
        defaultExpandAll
      />
      <Modal
        title="新建连接"
        open={modalVisible}
        onOk={form.submit}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="连接名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="host" label="主机" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="port" label="端口" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DatabaseTree;
