<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
    <table class="w-full">
      <thead class="bg-gray-100 border-b-2 border-gray-300">
        <tr>
          <th v-for="(col, index) in columns" :key="col.key" :class="[
            'px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase',
            index < columns.length - 1 ? 'border-r border-gray-300' : ''
          ]">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i"
          class="border-b border-gray-200 hover:bg-blue-50 transition-colors duration-150">
          <td v-for="col in columns" :key="col.key" class="px-6 py-4 text-sm text-gray-800">
            {{ formatValue(row[col.key]) }}
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Empty state -->
    <div v-if="!data || data.length === 0" class="p-12 text-center text-gray-500">
      <p class="text-sm font-medium">No data available</p>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends object">
type Column<T> = {
  key: keyof T;
  label: string;
}

defineProps<{
  data: T[];
  columns: Column<T>[];
}>();

const formatValue = (value: any) => {
  if (typeof value === 'boolean') return value ? '✓' : '✗';
  if (value === null || value === undefined) return '-';
  return String(value);
};
</script>
