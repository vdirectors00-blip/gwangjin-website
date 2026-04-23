<script setup lang="ts">
defineProps<{
  modelValue: string | null | undefined
  placeholder?: string
  rows?: number
  required?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [string] }>()
</script>

<template>
  <textarea
    :value="modelValue ?? ''"
    :placeholder="placeholder"
    :rows="rows || 6"
    :required="required"
    class="w-full bg-white border border-paper-line px-4 py-2.5 text-ink-dark placeholder-ink-dark-faint focus:border-ink-dark focus:outline-none transition resize-y"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>
