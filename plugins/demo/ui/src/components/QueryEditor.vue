<template>
  <div class="query-editor">
    <MonacoEditor
      v-model="sql"
      language="mysql"
      :theme="isDark ? 'vs-dark' : 'vs'"
      @keydown.ctrl.enter="handleExecute"
    />
    <div class="toolbar">
      <a-space>
        <a-button type="primary" :loading="loading" @click="handleExecute">
          {{ t("mysql.query.execute") }}
        </a-button>
        <a-button @click="handleClear">
          {{ t("mysql.query.clear") }}
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "@/composables/useTheme";
import { useQuery } from "@/composables/useQuery";
import MonacoEditor from "@/components/MonacoEditor.vue";

const { t } = useI18n();
const { isDark } = useTheme();
const { executeQuery, loading } = useQuery();

const sql = ref("");

const handleExecute = async () => {
  if (!sql.value.trim()) return;
  await executeQuery(sql.value);
};

const handleClear = () => {
  sql.value = "";
};
</script>

<style scoped>
.query-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.toolbar {
  padding: 8px 0;
}
</style>
