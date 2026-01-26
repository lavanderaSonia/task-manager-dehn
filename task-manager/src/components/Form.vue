<template>
  <form @submit.prevent="$emit('submit')" class="bg-white rounded-lg shadow-md p-6 border border-gray-300">
    <!-- Form content slot -->
    <div class="mb-6">
      <slot></slot>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 justify-end">
      <button type="button" @click="$emit('cancel')"
        class="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors duration-150 cursor-pointer font-medium">
        Cancelar
      </button>
      <button type="submit"
        class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors duration-150 cursor-pointer font-medium">
        Guardar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
defineEmits<{
  submit: [];
  cancel: [];
}>();
</script>
