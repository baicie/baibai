import { createI18n } from "vue-i18n";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "dayjs/locale/en";

export const messages = {
  "zh-CN": {
    theme: {
      dark: "切换到暗色模式",
      light: "切换到亮色模式",
    },
    locale: {
      switch: "Switch to English",
    },
    menu: {
      query: "查询",
      connection: "连接",
    },
    time: {
      today: "今天",
      yesterday: "昨天",
      week: "本周",
      month: "本月",
      year: "今年",
    },
    sql: {
      execute: "执行",
      format: "格式化",
      clear: "清空",
      copy: "复制",
      save: "保存",
      export: "导出",
      noResult: "暂无结果",
      executing: "执行中...",
      affectedRows: "影响行数：{count}",
      shortcuts: {
        execute: "Ctrl + Enter",
        format: "Ctrl + S",
      },
    },
    connection: {
      add: "添加连接",
      edit: "编辑连接",
      delete: "删除连接",
      name: "连接名称",
      host: "主机地址",
      port: "端口",
      username: "用户名",
      password: "密码",
      database: "数据库",
      test: "测试连接",
      save: "保存",
      cancel: "取消",
      deleteConfirm: "确定要删除此连接吗？",
    },
  },
  "en-US": {
    theme: {
      dark: "Switch to Dark Mode",
      light: "Switch to Light Mode",
    },
    locale: {
      switch: "切换到中文",
    },
    menu: {
      query: "Query",
      connection: "Connection",
    },
    time: {
      today: "Today",
      yesterday: "Yesterday",
      week: "This Week",
      month: "This Month",
      year: "This Year",
    },
    sql: {
      execute: "Execute",
      format: "Format",
      clear: "Clear",
      copy: "Copy",
      save: "Save",
      export: "Export",
      noResult: "No Result",
      executing: "Executing...",
      affectedRows: "Affected Rows: {count}",
      shortcuts: {
        execute: "Ctrl + Enter",
        format: "Ctrl + S",
      },
    },
    connection: {
      add: "Add Connection",
      edit: "Edit Connection",
      delete: "Delete Connection",
      name: "Connection Name",
      host: "Host",
      port: "Port",
      username: "Username",
      password: "Password",
      database: "Database",
      test: "Test Connection",
      save: "Save",
      cancel: "Cancel",
      deleteConfirm: "Are you sure to delete this connection?",
    },
  },
};

// 初始化 dayjs 语言
dayjs.locale("zh_cn");

export const i18n = createI18n({
  legacy: false,
  locale: "zh-CN",
  fallbackLocale: "en-US",
  messages,
});
