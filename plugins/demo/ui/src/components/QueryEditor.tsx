import { useContext } from "react";
import { PluginContext } from "baibai-plugin";
import { Editor } from "@/components/Editor";
import { useQuery } from "@/hooks/useQuery";

export function QueryEditor() {
  const context = useContext(PluginContext);
  const { executeQuery, loading } = useQuery();

  return (
    <div>
      <Editor
        language="mysql"
        theme={context.theme.isDark ? "vs-dark" : "vs"}
        onExecute={executeQuery}
      />
    </div>
  );
}
