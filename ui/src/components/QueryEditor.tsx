import React from "react";
import { Input } from "antd";
import MonacoEditor from "react-monaco-editor";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onExecute: () => void;
}

const QueryEditor: React.FC<Props> = ({ value, onChange, onExecute }) => {
  const editorOptions = {
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
  };

  return (
    <MonacoEditor
      value={value}
      onChange={onChange}
      language="sql"
      options={editorOptions}
      height="200px"
    />
  );
};

export default QueryEditor;
