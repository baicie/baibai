import React from "react";
import { Layout } from "antd";
import SqlEditor from "@/components/SqlEditor";
import DatabaseTree from "@/components/DatabaseTree";
import ResultTable from "@/components/ResultTable";
import type { QueryResult } from "@baibai/plugin-core";

const { Sider, Content } = Layout;

const QueryView: React.FC = () => {
  const [sql, setSql] = React.useState("");
  const [result, setResult] = React.useState<QueryResult>();
  const [loading, setLoading] = React.useState(false);

  const handleExecute = async (sql: string) => {
    if (!sql.trim()) return;
    setLoading(true);
    try {
      // TODO: 执行查询
      // const res = await executeQuery(sql);
      // setResult(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="h-full">
      <Sider width={250} className="bg-white">
        <DatabaseTree />
      </Sider>
      <Content className="p-4">
        <SqlEditor value={sql} onChange={setSql} onExecute={handleExecute} />
        <div className="h-4" />
        <ResultTable loading={loading} result={result} />
      </Content>
    </Layout>
  );
};

export default QueryView;
