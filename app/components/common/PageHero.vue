<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  eyebrow?: string
  background?: string
}>()
</script>

<template>
  <section
    class="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden bg-dark"
  >
    <div
      v-if="background"
      class="absolute inset-0 bg-cover bg-center scale-105"
      :style="`background-image:url('${background}')`"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/20" />

    <div class="relative container-x pb-20 z-10 text-paper">
      <p v-if="eyebrow" class="eyebrow text-paper/70">{{ eyebrow }}</p>
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tightest mt-6 leading-[0.95]">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-4 text-paper/80 text-lg max-w-2xl">{{ subtitle }}</p>
    </div>
  </section>
</template>
