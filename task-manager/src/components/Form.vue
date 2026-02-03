<template>
  <form @submit.prevent="$emit('submit')" class="bg-white rounded-lg shadow-md p-6 border border-gray-300">
    <!-- Form content slot -->
    <div class="mb-6">
      <slot></slot>
    </div>

    <!-- Actions -->
    <div class="flex gap-3 justify-end">
      <Button :title="BUTTON_LABELS.CANCEL" variant="secondary" @click="$emit('cancel')" />
      <Button type="submit" :title="BUTTON_LABELS.SAVE" variant="primary" />
    </div>
  </form>
</template>

<script setup lang="ts">
import Button from './Button.vue';
import { BUTTON_LABELS } from '@/config/ui-labels';

defineEmits<{
  submit: [];
  cancel: [];
}>();
</script>
