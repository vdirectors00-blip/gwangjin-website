<script setup lang="ts">
defineProps<{
  label: string
  hint?: string
  required?: boolean
  error?: string
}>()
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-baseline justify-between">
      <label class="text-ink-dark text-sm font-medium">
        {{ label }}
        <span v-if="required" class="text-red-500 ml-0.5">*</span>
      </label>
      <span v-if="hint" class="text-ink-dark-muted text-xs">{{ hint }}</span>
    </div>
    <slot />
    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>
