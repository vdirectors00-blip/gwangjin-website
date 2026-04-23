<script setup lang="ts">
defineProps<{
  modelValue: boolean | null | undefined
  label: string
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()
</script>

<template>
  <label class="flex items-center gap-3 cursor-pointer select-none">
    <input
      type="checkbox"
      :checked="!!modelValue"
      class="w-4 h-4 accent-ink-dark"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    >
    <span class="text-ink-dark text-sm">{{ label }}</span>
  </label>
</template>
