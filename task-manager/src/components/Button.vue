<template>
  <button @click="onClick" :class="buttonClass">
    {{ title }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  variant?: 'primary' | 'secondary';
}>();

defineEmits<{
  click: [];
}>();

const buttonClass = computed(() => {
  const baseClass = 'px-4 py-2 rounded transition-colors duration-150 cursor-pointer font-medium';
  const variantClass = props.variant === 'primary'
    ? 'text-white bg-blue-600 hover:bg-blue-700'
    : 'text-gray-700 bg-gray-100 border border-gray-300 hover:bg-gray-200';

  return `${baseClass} ${variantClass}`;
});
</script>
