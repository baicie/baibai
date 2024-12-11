import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import { useDatabaseStore } from "../../../stores/database";
import { invoke } from "@tauri-apps/api/core";

interface Column {
  name: string;
  type: string;
  nullable: boolean;
  key: string;
  default: string | null;
  extra: string;
}

const TableStructure: React.FC = () => {
  const { database, table } = useParams<{ database: string; table: string }>();
  const [loading, setLoading] = React.useState(false);
  const [columns, setColumns] = React.useState<Column[]>([]);
  const currentConnection = useDatabaseStore(
    (state) => state.currentConnection
  );

  React.useEffect(() => {
    if (!currentConnection || !database || !table) return;

    const loadStructure = async () => {
      setLoading(true);
      try {
        const result = await invoke<Column[]>("get_table_structure", {
          connectionId: currentConnection.id,
          database,
          table,
        });
        setColumns(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadStructure();
  }, [currentConnection, database, table]);

  const tableColumns: ColumnsType<Column> = [
    {
      title: "字段名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "可空",
      dataIndex: "nullable",
      key: "nullable",
      render: (nullable: boolean) => (nullable ? "是" : "否"),
    },
    {
      title: "键",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "默认值",
      dataIndex: "default",
      key: "default",
    },
    {
      title: "额外",
      dataIndex: "extra",
      key: "extra",
    },
  ];

  return (
    <Table
      loading={loading}
      columns={tableColumns}
      dataSource={columns}
      rowKey="name"
      size="small"
      bordered
    />
  );
};

export default TableStructure;
