import React, { useState } from "react";
import { usePluginContext } from "@baibai/plugin-core";
import { Space } from "antd";
import MonacoEditor from "react-monaco-editor";

const QueryEditor: React.FC = () => {
  const {
    i18n: { t },
    components: { Button },
  } = usePluginContext();
  const [sql, setSql] = useState("");

  const handleExecute = () => {
    // 执行查询
  };

  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
  };

  return (
    <div className="query-editor">
      <div className="toolbar mb-2">
        <Space>
          <Button type="primary" onClick={handleExecute}>
            {t("editor.execute")}
          </Button>
        </Space>
      </div>
      <MonacoEditor
        language="sql"
        value={sql}
        onChange={setSql}
        options={editorOptions}
        height="200px"
      />
    </div>
  );
};

export default QueryEditor;
