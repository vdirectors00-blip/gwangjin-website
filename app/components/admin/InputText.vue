<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null | undefined
  type?: 'text' | 'email' | 'tel' | 'url' | 'number'
  placeholder?: string
  required?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [string | number] }>()

const onInput = (e: Event) => {
  const t = e.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(t.value) : t.value)
}
</script>

<template>
  <input
    :type="type || 'text'"
    :value="modelValue ?? ''"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    class="w-full bg-white border border-paper-line px-4 py-2.5 text-ink-dark placeholder-ink-dark-faint focus:border-ink-dark focus:outline-none transition disabled:bg-paper-soft disabled:text-ink-dark-muted"
    @input="onInput"
  >
</template>
