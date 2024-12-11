import React from "react";
import { Table, Button, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import { useDatabaseStore } from "../../../stores/database";
import { invoke } from "@tauri-apps/api/core";
import type { QueryResult } from "@baibai/plugin-core";

const TableData: React.FC = () => {
  const { database, table } = useParams<{ database: string; table: string }>();
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<QueryResult>();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(20);
  const currentConnection = useDatabaseStore(
    (state) => state.currentConnection
  );

  const loadData = React.useCallback(async () => {
    if (!currentConnection || !database || !table) return;

    setLoading(true);
    try {
      const offset = (page - 1) * pageSize;
      const sql = `SELECT * FROM ${database}.${table} LIMIT ${pageSize} OFFSET ${offset}`;
      const result = await invoke<QueryResult>("execute_query", {
        connectionId: currentConnection.id,
        sql,
      });
      setResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentConnection, database, table, page, pageSize]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const columns: ColumnsType<any> =
    result?.columns.map((col) => ({
      title: col,
      dataIndex: col,
      key: col,
    })) || [];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={result?.rows}
      rowKey={(record) => JSON.stringify(record)}
      size="small"
      bordered
      pagination={{
        current: page,
        pageSize,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        },
      }}
    />
  );
};

export default TableData;
