import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useEffect, useMemo, useRef } from "react";
import type { MonacoEditorProps } from "./types";
import { noop, processSize } from "./utils";

const MonacoEditor: React.FC<MonacoEditorProps> = ({
  width = "100%",
  height = "100%",
  value = null,
  defaultValue = "",
  language = "javascript",
  theme = null,
  options = {},
  overrideServices = {},
  editorWillMount = noop,
  editorDidMount = noop,
  editorWillUnmount = noop,
  onChange = noop,
  className = null,
  uri,
}) => {
  const containerElement = useRef<HTMLDivElement | null>(null);
  const editor = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const _subscription = useRef<monaco.IDisposable | null>(null);
  const __prevent_trigger_change_event = useRef<boolean>(false);

  const fixedWidth = processSize(width || "100%");
  const fixedHeight = processSize(height || "100%");

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const style = useMemo(
    () => ({
      width: fixedWidth,
      height: fixedHeight,
    }),
    [fixedWidth, fixedHeight],
  );

  const handleEditorWillMount = () => {
    return editorWillMount(monaco) || {};
  };

  const handleEditorDidMount = () => {
    if (editor.current) {
      editorDidMount(editor.current, monaco);

      _subscription.current = editor.current.onDidChangeModelContent((event) => {
        if (!__prevent_trigger_change_event.current && editor.current) {
          onChangeRef.current(editor.current.getValue(), event);
        }
      });
    }
  };

  const handleEditorWillUnmount = () => {
    if (editor.current) {
      editorWillUnmount(editor.current, monaco);
    }
  };

  const initMonaco = () => {
    const finalValue = value !== null ? value : defaultValue;

    if (containerElement.current) {
      const finalOptions = { ...options, ...handleEditorWillMount() };
      const modelUri = uri?.(monaco);
      let model = modelUri && monaco.editor.getModel(modelUri);
      
      if (model) {
        model.setValue(finalValue || "");
        monaco.editor.setModelLanguage(model, language || "javascript");
      } else {
        model = monaco.editor.createModel(
          finalValue || "", 
          language || "javascript", 
          modelUri
        );
      }

      editor.current = monaco.editor.create(
        containerElement.current,
        {
          model,
          ...(className ? { extraEditorClassName: className } : {}),
          ...finalOptions,
          ...(theme ? { theme } : {}),
        },
        overrideServices,
      );

      handleEditorDidMount();
    }
  };

  useEffect(initMonaco, []);

  useEffect(() => {
    if (editor.current) {
      if (value === editor.current.getValue()) {
        return;
      }

      const model = editor.current.getModel();
      if (model) {
        __prevent_trigger_change_event.current = true;
        editor.current.pushUndoStop();
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: value || "",
            },
          ],
          () => null
        );
        editor.current.pushUndoStop();
        __prevent_trigger_change_event.current = false;
      }
    }
  }, [value]);

  useEffect(() => {
    if (editor.current) {
      const model = editor.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  useEffect(() => {
    if (editor.current) {
      const { model: _model, ...optionsWithoutModel } = options;
      editor.current.updateOptions({
        ...(className ? { extraEditorClassName: className } : {}),
        ...optionsWithoutModel,
      });
    }
  }, [className, options]);

  useEffect(() => {
    if (editor.current) {
      editor.current.layout();
    }
  }, [width, height]);

  useEffect(() => {
    if (theme) {
      monaco.editor.setTheme(theme);
    }
  }, [theme]);

  useEffect(
    () => () => {
      if (editor.current) {
        handleEditorWillUnmount();
        editor.current.dispose();
      }
      if (_subscription.current) {
        _subscription.current.dispose();
      }
    },
    [],
  );

  return (
    <div
      ref={containerElement}
      style={style}
      className="react-monaco-editor-container"
    />
  );
};

MonacoEditor.displayName = "MonacoEditor";

export default MonacoEditor;