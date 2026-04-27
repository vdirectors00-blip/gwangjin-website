<script setup lang="ts">
import type { HeroSlide } from '~/types/database.types'

const props = defineProps<{
  slides: HeroSlide[] | { media_type: 'image' | 'video'; media_url: string }[]
  intervalMs?: number   // 전환 간격 (default 5000)
}>()

const interval = props.intervalMs ?? 5000
const current = ref(0)
const slides = computed(() => (props.slides && props.slides.length > 0 ? props.slides : []))

let timer: ReturnType<typeof setInterval> | null = null

const next = () => {
  if (slides.value.length <= 1) return
  current.value = (current.value + 1) % slides.value.length
}

onMounted(() => {
  if (slides.value.length > 1) {
    timer = setInterval(next, interval)
  }
})
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="absolute inset-0 overflow-hidden bg-dark">
    <div
      v-for="(s, i) in slides" :key="i"
      :class="[
        'absolute inset-0 transition-opacity duration-1500 ease-out-expo',
        current === i ? 'opacity-100' : 'opacity-0',
      ]"
    >
      <video
        v-if="s.media_type === 'video'"
        :src="s.media_url"
        autoplay muted loop playsinline
        class="w-full h-full object-cover scale-105"
      />
      <img
        v-else
        :src="s.media_url"
        :alt="('caption' in s ? s.caption : '') || ''"
        class="w-full h-full object-cover scale-105"
      />
    </div>

    <!-- 인디케이터 -->
    <div
      v-if="slides.length > 1"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10"
    >
      <button
        v-for="(_, i) in slides" :key="i"
        :class="[
          'h-px transition-all duration-500',
          current === i ? 'w-12 bg-white' : 'w-6 bg-white/40',
        ]"
        :aria-label="`Slide ${i + 1}`"
        @click="current = i"
      />
    </div>
  </div>
</template>

<style scoped>
.duration-1500 { transition-duration: 1500ms; }
</style>
