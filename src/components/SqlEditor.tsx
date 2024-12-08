import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import * as monaco from "monaco-editor";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { Button, Space, Tooltip } from "ant-design-vue";
import {
  PlayCircleOutlined,
  ClearOutlined,
  FormatPainterOutlined,
} from "@ant-design/icons-vue";

// SQL 格式化配置
const formatOptions: monaco.languages.FormattingOptions = {
  insertSpaces: true,
  tabSize: 2,
};

export default defineComponent({
  name: "SqlEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "200px",
    },
  },
  emits: ["update:value", "execute"],
  setup(props, { emit }) {
    const { t } = useI18n();
    const themeStore = useThemeStore();
    const { isDark } = storeToRefs(themeStore);
    const editorContainer = ref<HTMLDivElement>();
    const editor = ref<monaco.editor.IStandaloneCodeEditor>();

    // 初始化编辑器
    onMounted(() => {
      if (!editorContainer.value) return;

      editor.value = monaco.editor.create(editorContainer.value, {
        value: props.value,
        language: "sql",
        theme: isDark.value ? "vs-dark" : "vs",
        minimap: { enabled: false },
        automaticLayout: true,
        fontSize: 14,
        lineNumbers: "on",
        scrollBeyondLastLine: false,
        wordWrap: "on",
        // 快捷键配置
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: "on",
      });

      // 监听内容变化
      editor.value.onDidChangeModelContent(() => {
        emit("update:value", editor.value?.getValue());
      });

      // 注册快捷键
      editor.value.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        () => {
          emit("execute");
        }
      );

      editor.value.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        () => {
          formatSql();
        }
      );
    });

    // 监听主题变化
    watch(isDark, (newValue) => {
      if (editor.value) {
        monaco.editor.setTheme(newValue ? "vs-dark" : "vs");
      }
    });

    // 格式化 SQL
    const formatSql = async () => {
      if (!editor.value) return;

      const model = editor.value.getModel();
      if (!model) return;

      const formatted = await monaco.languages.formatDocument(
        model,
        formatOptions
      );

      editor.value.executeEdits("format", formatted);
    };

    // 清空编辑器
    const clearEditor = () => {
      editor.value?.setValue("");
    };

    // 执行 SQL
    const executeSql = () => {
      emit("execute");
    };

    // 销毁编辑器
    onBeforeUnmount(() => {
      editor.value?.dispose();
    });

    return () => (
      <div class="sql-editor">
        <div class="toolbar mb-2">
          <Space>
            <Tooltip title={t("sql.execute") + " (Ctrl+Enter)"}>
              <Button
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={executeSql}
              >
                {t("sql.execute")}
              </Button>
            </Tooltip>
            <Tooltip title={t("sql.format") + " (Ctrl+S)"}>
              <Button icon={<FormatPainterOutlined />} onClick={formatSql}>
                {t("sql.format")}
              </Button>
            </Tooltip>
            <Tooltip title={t("sql.clear")}>
              <Button icon={<ClearOutlined />} onClick={clearEditor}>
                {t("sql.clear")}
              </Button>
            </Tooltip>
          </Space>
        </div>
        <div
          ref={editorContainer}
          class="editor-container"
          style={{ height: props.height }}
        />
      </div>
    );
  },
});
