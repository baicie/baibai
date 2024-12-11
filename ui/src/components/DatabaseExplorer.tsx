import React from "react";
import { Tree } from "antd";
import type { DataNode } from "antd/es/tree";
import { DatabaseOutlined, TableOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDatabaseStore } from "../stores/database";
import { invoke } from "@tauri-apps/api/core";

interface Database {
  name: string;
  tables: string[];
}

const DatabaseExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [databases, setDatabases] = React.useState<Database[]>([]);
  const currentConnection = useDatabaseStore(
    (state) => state.currentConnection
  );

  const loadDatabases = async () => {
    if (!currentConnection) return;
    setLoading(true);
    try {
      const result = await invoke<Database[]>("get_databases", {
        connectionId: currentConnection.id,
      });
      setDatabases(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    loadDatabases();
  }, [currentConnection]);

  const treeData: DataNode[] = databases.map((db) => ({
    key: db.name,
    title: db.name,
    icon: <DatabaseOutlined />,
    children: db.tables.map((table) => ({
      key: `${db.name}.${table}`,
      title: table,
      icon: <TableOutlined />,
    })),
  }));

  return (
    <Tree
      treeData={treeData}
      showIcon
      onSelect={(keys) => {
        const key = keys[0] as string;
        if (key && key.includes(".")) {
          const [database, table] = key.split(".");
          navigate(`/table/${database}/${table}`);
        }
      }}
    />
  );
};

export default DatabaseExplorer;
