import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { QueryResult } from "@baibai/plugin-core";

interface Props {
  loading?: boolean;
  result?: QueryResult;
}

const ResultTable: React.FC<Props> = ({ loading, result }) => {
  if (!result) return null;

  const columns: ColumnsType<any> = result.columns.map((col) => ({
    title: col,
    dataIndex: col,
    key: col,
  }));

  return (
    <div className="result-table">
      <Table
        loading={loading}
        dataSource={result.rows}
        columns={columns}
        scroll={{ x: true }}
        size="small"
        bordered
        rowKey={(record) => JSON.stringify(record)}
      />
      <div className="mt-2 text-gray-600">影响行数: {result.affectedRows}</div>
    </div>
  );
};

export default ResultTable;
