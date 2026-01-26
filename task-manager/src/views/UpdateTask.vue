<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Update Task</h1>

      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-500">{{ INFO_MESSAGES.LOADING_TASK }}</p>
      </div>

      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p>{{ error }}</p>
      </div>

      <Form v-else @submit="handleSubmit" @cancel="handleCancel">
        <!-- Title input -->
        <div class="mb-4">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
            {{ FORM_LABELS.TITLE }}
          </label>
          <input id="title" v-model="formData.title" type="text" :placeholder="PLACEHOLDER_TEXTS.TITLE"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required />
        </div>

        <!-- Description input -->
        <div class="mb-4">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            {{ FORM_LABELS.DESCRIPTION }}
          </label>
          <textarea id="description" v-model="formData.description" :placeholder="PLACEHOLDER_TEXTS.DESCRIPTION"
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        <!-- Due date input -->
        <div class="mb-4">
          <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-2">
            {{ FORM_LABELS.DUE_DATE }}
          </label>
          <input id="dueDate" v-model="formData.dueDate" type="date"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <!-- Completed checkbox -->
        <div class="mb-4">
          <label for="completed" class="flex items-center gap-2 text-sm font-medium text-gray-700">
            <input id="completed" v-model="formData.completed" type="checkbox"
              class="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer" />
            {{ FORM_LABELS.MARK_COMPLETED }}
          </label>
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Form from '@/components/Form.vue';
import { useTaskViewModel } from '@/composables/useTaskViewModel';
import { APP_ROUTES } from '@/config/routes';
import { FORM_LABELS, PLACEHOLDER_TEXTS } from '@/config/ui-labels';
import { INFO_MESSAGES } from '@/config/messages';

const router = useRouter();
const route = useRoute();
const { getTask, updateExistingTask, loading, error } = useTaskViewModel();

const formData = ref({
  title: '',
  description: '',
  dueDate: '',
  completed: false
});

onMounted(() => {
  loadTask();
});

const loadTask = async () => {
  try {
    const taskId = route.params.id as string;
    const task = await getTask(taskId);

    if (task) {
      const dueDate = typeof task.dueDate === 'string'
        ? task.dueDate
        : new Date(task.dueDate).toISOString().split('T')[0];

      formData.value = {
        title: task.title,
        description: task.description,
        dueDate: dueDate!,
        completed: task.state === 'Completed'
      };
    }
  } catch (err) {
    console.error(err);
  }
};

const handleSubmit = async () => {
  try {
    const taskId = route.params.id as string;
    await updateExistingTask(taskId, {
      title: formData.value.title,
      description: formData.value.description,
      dueDate: formData.value.dueDate ? new Date(formData.value.dueDate) : new Date(),
      state: formData.value.completed ? 'Completed' : 'Pending'
    });
    router.push(APP_ROUTES.TASKS);
  }
  catch (err) {
    console.error('Error updating task:', err);
  }
};

const handleCancel = () => {
  router.push(APP_ROUTES.TASKS);
};
</script>
