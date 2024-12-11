import React from "react";
import MonacoEditor from "react-monaco-editor";
import { useThemeStore } from "@/stores/theme";
import { Button, Space } from "antd";
import { PlayCircleOutlined, FormatPainterOutlined } from "@ant-design/icons";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onExecute: (sql: string) => void;
}

const SqlEditor: React.FC<Props> = ({ value, onChange, onExecute }) => {
  const isDark = useThemeStore((state) => state.isDark);

  const editorOptions = {
    minimap: { enabled: false },
    automaticLayout: true,
  };

  const handleFormat = () => {
    // 格式化功能由 Monaco Editor 自动处理
  };

  return (
    <div className="sql-editor">
      <div className="mb-2">
        <Space>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => onExecute(value)}
          >
            执行
          </Button>
          <Button icon={<FormatPainterOutlined />} onClick={handleFormat}>
            格式化
          </Button>
        </Space>
      </div>
      <div style={{ height: "calc(100% - 40px)" }}>
        <MonacoEditor
          language="sql"
          theme={isDark ? "vs-dark" : "vs"}
          value={value}
          onChange={onChange}
          options={editorOptions}
        />
      </div>
    </div>
  );
};

export default SqlEditor;
