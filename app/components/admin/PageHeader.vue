<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  backTo?: string                  // 뒤로가기 경로
}>()
</script>

<template>
  <div class="flex items-start justify-between gap-6 pb-8 mb-8 border-b border-paper-line">
    <div class="flex-1">
      <NuxtLink
        v-if="backTo" :to="backTo"
        class="inline-flex items-center text-sm text-ink-dark-muted hover:text-ink-dark mb-3"
      >
        ← 뒤로
      </NuxtLink>
      <h1 class="text-3xl font-bold text-ink-dark tracking-tightest">{{ title }}</h1>
      <p v-if="subtitle" class="text-ink-dark-muted mt-2">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
