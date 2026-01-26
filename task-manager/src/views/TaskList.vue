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
        <Table :data="tasks" :columns="[
          { key: 'id', label: 'ID' },
          { key: 'title', label: 'Title' },
          { key: 'description', label: 'Description' },
          { key: 'status', label: 'Status' }
        ]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Table from '@/components/Table.vue';
import { useTaskViewModel } from '@/composables/useTaskViewModel';

const { tasks, loading, error, loadTasks } = useTaskViewModel();

onMounted(() => {
  loadTasks();
});
</script>
