<template>
  <div class="bg-white rounded border border-gray-200">
    <table class="w-full">
      <thead>
        <tr>
          <th v-for="(col, index) in columns" :key="col.key" :class="[
            'px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider',
            index < columns.length - 1 ? 'border-r border-gray-200' : ''
          ]">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id" class="border-b border-gray-200 last:border-b-0">
          <td v-for="col in columns" :key="col.key" class="px-6 py-3 text-sm text-slate-700">
            {{ formatValue(row[col.key]) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Empty state -->
    <div v-if="!data || data.length === 0" class="p-12 text-center text-slate-500">
      <p class="text-sm font-medium">No data available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Column {
  key: string;
  label: string;
}

defineProps<{
  data: Record<string, any>[];
  columns: Column[];
}>();

const formatValue = (value: any) => {
  if (typeof value === 'boolean') return value ? '✓' : '✗';
  if (value === null || value === undefined) return '-';
  return String(value);
};
</script>
