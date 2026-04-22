<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  background?: string
}>()
</script>

<template>
  <section
    class="relative h-[50vh] min-h-[320px] flex items-center justify-center overflow-hidden border-b border-white/5"
    :style="background ? `background-image:url('${background}');background-size:cover;background-position:center;` : ''"
  >
    <div class="absolute inset-0 bg-bg/70" />
    <div class="relative container-x text-center">
      <h1 class="text-4xl md:text-6xl font-bold text-ink tracking-tight">{{ title }}</h1>
      <p v-if="subtitle" class="mt-4 text-ink-dim text-lg">{{ subtitle }}</p>
    </div>
  </section>
</template>
