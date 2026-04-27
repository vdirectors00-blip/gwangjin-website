<script setup lang="ts">
const props = defineProps<{
  container?: string      // 스크롤 컨테이너 id (없으면 window)
  threshold?: number      // 표시 기준 스크롤 거리 (default 300)
}>()

const threshold = props.threshold ?? 300
const show = ref(false)

const getScrollEl = () => {
  if (typeof document === 'undefined') return null
  return props.container ? document.getElementById(props.container) : null
}

const onScroll = () => {
  const el = getScrollEl()
  const y = el ? el.scrollTop : (typeof window !== 'undefined' ? window.scrollY : 0)
  show.value = y > threshold
}

onMounted(() => {
  const el = getScrollEl()
  const target = el || window
  target.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  const el = getScrollEl()
  const target = el || window
  target.removeEventListener('scroll', onScroll)
})

const scrollToTop = () => {
  const el = getScrollEl()
  // SnapController 가 있으면 그걸 사용 (연혁 페이지 등)
  if (el && typeof (window as any).__snapGo === 'function') {
    ;(window as any).__snapGo(0)
    return
  }
  if (el) {
    el.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-500 ease-out-expo"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-400"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <button
      v-if="show"
      @click="scrollToTop"
      aria-label="Scroll to top"
      class="group fixed bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center hover:bg-accent-bronze hover:-translate-y-1 transition-all duration-500 ease-out-expo shadow-[0_10px_30px_-10px_rgba(26,24,20,0.4)]"
    >
      <svg class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </Transition>
</template>
