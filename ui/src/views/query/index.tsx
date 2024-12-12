import React from "react";
import { Layout } from "antd";
import SqlEditor from "@/components/SqlEditor";
import ResultTable from "@/components/ResultTable";
import type { QueryResult } from "@baibai/plugin-core";

const { Content } = Layout;

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
      <Content className="p-4">
        <SqlEditor value={sql} onChange={setSql} onExecute={handleExecute} />
        <div className="h-4" />
        <ResultTable loading={loading} result={result} />
      </Content>
    </Layout>
  );
};

export default QueryView;
