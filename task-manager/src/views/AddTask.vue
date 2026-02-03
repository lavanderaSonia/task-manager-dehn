<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Add New Task</h1>

      <Form @submit="handleSubmit" @cancel="handleCancel">
        <!-- Title input -->
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            {{ FORM_LABELS.TITLE }}
          </label>
          <input id="title" required v-model="formData.title" type="text" :placeholder="PLACEHOLDER_TEXTS.TITLE"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
        </div>

        <!-- Description input -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            {{ FORM_LABELS.DESCRIPTION }}
          </label>
          <textarea id="description" required v-model="formData.description"
            :placeholder="PLACEHOLDER_TEXTS.DESCRIPTION" rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"></textarea>
        </div>

        <!-- Due date input -->
        <div class="mb-4">
          <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-2">
            {{ FORM_LABELS.DUE_DATE }}
          </label>
          <input id="dueDate" required v-model="formData.dueDate" type="date" :min="today"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Form from '@/components/Form.vue';
import { useTaskViewModel } from '@/composables/useTaskViewModel';
import { APP_ROUTES } from '@/config/routes';
import { FORM_LABELS, PLACEHOLDER_TEXTS } from '@/config/ui-labels';

const router = useRouter();
const { addNewTask } = useTaskViewModel();

// Obtener fecha de hoy en formato YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];

const formData = ref({
  title: '',
  description: '',
  dueDate: ''
});

const handleSubmit = async () => {
  try {
    await addNewTask({
      title: formData.value.title,
      description: formData.value.description,
      dueDate: formData.value.dueDate ? new Date(formData.value.dueDate) : new Date(),
    });
    router.push(APP_ROUTES.TASKS);
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

const handleCancel = () => {
  router.push(APP_ROUTES.TASKS);
};
</script>
