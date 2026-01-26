<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="w-full">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Task Manager</h1>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-500">{{ INFO_MESSAGES.LOADING_TASKS }}</p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p>{{ error }}</p>
      </div>

      <!-- Tasks table -->
      <div v-else>
        <div class="flex justify-end mb-4">
          <Button :title="BUTTON_LABELS.ADD_TASK" variant="primary" @click="handleAddTask" />
        </div>
        <Table :data="tasks" :columns="tableColumns" :actions="tableActions" @action="handleAction" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Table from '@/components/Table.vue';
import Button from '@/components/Button.vue';
import { useTaskViewModel } from '@/composables/useTaskViewModel';
import type { Task } from '@/types/Task';
import { APP_ROUTES } from '@/config/routes';
import { TABLE_LABELS, BUTTON_LABELS, ACTION_NAMES } from '@/config/ui-labels';
import { INFO_MESSAGES } from '@/config/messages';

const { tasks, loading, error, loadTasks, removeTask } = useTaskViewModel();

const router = useRouter();

const tableColumns: Array<{ key: keyof Task; label: string }> = [
  { key: 'id', label: TABLE_LABELS.ID },
  { key: 'title', label: TABLE_LABELS.TITLE },
  { key: 'description', label: TABLE_LABELS.DESCRIPTION },
  { key: 'dueDate', label: TABLE_LABELS.DUE_DATE },
  { key: 'state', label: TABLE_LABELS.STATE }
];

/**
 * Add a new action here to configure the table
 */
const tableActions: Array<{ name: string; icon: string }> = [
  { name: ACTION_NAMES.EDIT, icon: '✏️' },
  { name: ACTION_NAMES.DELETE, icon: '🗑️' }
];

onMounted(() => {
  loadTasks();
});

const handleAction = async ({ actionName, rowData }: { actionName: string, rowData: Task }) => {
  switch (actionName) {
    case ACTION_NAMES.EDIT:
      router.push(APP_ROUTES.EDIT_TASK(rowData.id));
      break;
    case ACTION_NAMES.DELETE:
      await removeTask(rowData.id);
      break;
  }
};

const handleAddTask = () => {
  router.push(APP_ROUTES.ADD_TASK)
}
</script>
