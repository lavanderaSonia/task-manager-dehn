<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="w-full">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Task Manager</h1>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-500">Loading tasks...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p>{{ error }}</p>
      </div>

      <!-- Tasks table -->
      <div v-else>
        <div class="flex justify-end mb-4">
          <Button title="+ Add task" variant="primary" @click="handleAddTask" />
        </div>
        <Table :data="tasks" :columns="tableColumns" :actions="tableActions" @action="handleAction" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Table from '@/components/Table.vue';
import Button from '@/components/Button.vue';
import { useTaskViewModel } from '@/composables/useTaskViewModel';
import type { Task } from '@/types/Task';
import { useRouter } from 'vue-router';

const { tasks, loading, error, loadTasks } = useTaskViewModel();

const router = useRouter();

const tableColumns: Array<{ key: keyof Task; label: string }> = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'dueDate', label: 'Due date' },
  { key: 'state', label: 'State' }
];

const tableActions: Array<{ name: string; icon: string }> = [
  { name: 'edit', icon: '✏️' },
  { name: 'delete', icon: '🗑️' }
];

onMounted(() => {
  loadTasks();
});

const handleAction = ({ actionName, rowData }: { actionName: string, rowData: Task }) => {
  console.log("SELECTED", actionName, rowData);
}
const handleAddTask = () => {
  router.push('/add-task')
}
</script>
