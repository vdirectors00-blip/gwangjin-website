<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  eyebrow?: string
  chapter?: string             // e.g. "About · 01"
  background?: string
}>()
</script>

<template>
  <section class="relative h-[72vh] min-h-[520px] flex items-end overflow-hidden bg-dark text-paper">
    <div
      v-if="background"
      class="absolute inset-0 bg-cover bg-center scale-105"
      :style="`background-image:url('${background}')`"
    />
    <!-- fiber pattern overlay (Claude Design 스타일) -->
    <div
      class="absolute inset-0 opacity-40"
      style="background:
        radial-gradient(1200px 700px at 25% 30%, rgba(181,155,122,0.15), transparent 60%),
        linear-gradient(180deg, rgba(26,24,20,0.4) 0%, transparent 35%, rgba(26,24,20,0.72) 100%);"
    />
    <!-- 하단 베일 -->
    <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/10" />

    <div class="relative z-10 max-w-container mx-auto px-6 md:px-10 lg:px-16 pb-20 md:pb-24 w-full">
      <!-- 상단 메타 -->
      <div class="absolute top-28 md:top-32 left-6 md:left-10 right-6 md:right-10 flex justify-between items-baseline">
        <div class="mono-label text-paper/55">
          EST.&nbsp;&nbsp;1 9 9 4 &nbsp;&nbsp;·&nbsp;&nbsp; 인천
        </div>
        <div v-if="chapter" class="mono-label text-paper/70">
          {{ chapter }}
        </div>
      </div>

      <p v-if="eyebrow" class="eyebrow text-paper/60">{{ eyebrow }}</p>
      <h1 class="mt-6 font-light text-display-lg text-paper">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mt-4 text-paper/75 text-base md:text-lg max-w-xl font-light">
        {{ subtitle }}
      </p>
    </div>
  </section>
</template>
