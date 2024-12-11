<template>
  <div class="data-viewer">
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      :scroll="{ x: true }"
      size="small"
      bordered
    >
      <template #headerCell="{ column }">
        <div class="column-header">
          <span>{{ column.title }}</span>
          <span class="column-type">{{ column.dataType }}</span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { QueryResult } from "baibai-plugin";

const props = defineProps<{
  result: QueryResult;
  loading?: boolean;
}>();

const columns = computed(() =>
  props.result.columns.map((col) => ({
    title: col,
    dataIndex: col,
    key: col,
  }))
);

const dataSource = computed(() =>
  props.result.rows.map((row, index) => ({
    key: index,
    ...Object.fromEntries(props.result.columns.map((col, i) => [col, row[i]])),
  }))
);
</script>

<style scoped>
.data-viewer {
  overflow: auto;
}

.column-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.column-type {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
