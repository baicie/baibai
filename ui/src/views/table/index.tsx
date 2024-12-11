import React from "react";
import { useParams } from "react-router-dom";
import { Layout } from "antd";
import DatabaseTree from "../../components/DatabaseTree";
import ResultTable from "../../components/ResultTable";
import { useDatabaseStore } from "../../stores/database";
import { invoke } from "@tauri-apps/api/core";
import type { QueryResult } from "@baibai/plugin-core";

const { Sider, Content } = Layout;

const TableView: React.FC = () => {
  const { database, table } = useParams<{ database: string; table: string }>();
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState<QueryResult>();
  const currentConnection = useDatabaseStore(
    (state) => state.currentConnection
  );

  React.useEffect(() => {
    if (!currentConnection || !database || !table) return;

    const loadTableData = async () => {
      setLoading(true);
      try {
        const sql = `SELECT * FROM ${database}.${table} LIMIT 100`;
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
    };

    loadTableData();
  }, [currentConnection, database, table]);

  return (
    <Layout className="h-full">
      <Sider width={250} className="bg-white">
        <DatabaseTree />
      </Sider>
      <Content className="p-4">
        <ResultTable loading={loading} result={result} />
      </Content>
    </Layout>
  );
};

export default TableView;
