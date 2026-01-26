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
          <th v-if="actions && actions.length > 0"
            class="border-l border-gray-300 px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i" class="border-b border-gray-200">
          <td v-for="col in columns" :key="col.key" class="px-6 py-4 text-sm text-gray-800">
            {{ formatValue(row[col.key]) }}
          </td>
          <td v-if="actions && actions.length > 0" class="px-6 py-4 text-sm text-gray-800">
            <div class="flex gap-2">
              <button v-for="action in actions" :key="action.name"
                @click="$emit('action', { actionName: action.name, rowData: row })" :title="action.name"
                class="inline-flex items-center justify-center p-2 cursor-pointer">
                <span>{{ action.icon }}</span>
              </button>
            </div>
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
type Action = {
  name: string;
  icon: string;
};
type Column<T> = {
  key: keyof T;
  label: string;
}

defineProps<{
  data: T[];
  columns: Column<T>[];
  actions?: Action[];
}>();

defineEmits<{
  action: [payload: { actionName: string; rowData: T }];
}>();

const formatValue = (value: any) => {
  if (typeof value === 'boolean') return value ? '✓' : '✗';
  if (value === null || value === undefined) return '-';
  return String(value);
};
</script>
