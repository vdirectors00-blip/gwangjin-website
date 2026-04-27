<script setup lang="ts">
const props = defineProps<{
  sections: Array<{ key: string; label: string; dark: boolean }>
  container?: string   // 스크롤 컨테이너 element id (없으면 window)
}>()

const current = ref(0)
const hoverIdx = ref<number | null>(null)

const getContainer = () => {
  if (typeof document === 'undefined') return null
  return props.container ? document.getElementById(props.container) : null
}

const onScroll = () => {
  const c = getContainer()
  const y = c ? c.scrollTop : window.scrollY
  const h = c ? c.clientHeight : window.innerHeight
  const idx = Math.min(props.sections.length - 1, Math.max(0, Math.round(y / h)))
  current.value = idx
}

onMounted(() => {
  const c = getContainer()
  const target = c || window
  target.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  const c = getContainer()
  const target = c || window
  target.removeEventListener('scroll', onScroll)
})

const go = (i: number) => {
  // SnapController가 있으면 그걸 통해 부드럽게
  if (typeof window !== 'undefined' && typeof (window as any).__snapGo === 'function') {
    ;(window as any).__snapGo(i)
    return
  }
  const c = getContainer()
  const h = c ? c.clientHeight : window.innerHeight
  const y = i * h
  if (c) c.scrollTo({ top: y, behavior: 'smooth' })
  else window.scrollTo({ top: y, behavior: 'smooth' })
}

const isDark = computed(() => props.sections[current.value]?.dark ?? false)
</script>

<template>
  <nav
    aria-label="Section navigation"
    class="fixed right-4 md:right-7 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4 py-3 px-2"
  >
    <button
      v-for="(s, i) in sections" :key="s.key"
      @click="go(i)"
      @mouseenter="hoverIdx = i"
      @mouseleave="hoverIdx = null"
      :aria-label="`${s.label} section`"
      :aria-current="current === i ? 'true' : undefined"
      class="relative w-7 h-7 flex items-center justify-center bg-transparent border-0 cursor-pointer group"
    >
      <span
        :class="[
          'block transition-all duration-500 ease-out-expo rounded-full',
          current === i ? 'w-[2px] h-5 rounded-sm' : 'w-[5px] h-[5px]',
          current === i
            ? (isDark ? 'bg-paper' : 'bg-ink')
            : hoverIdx === i
              ? (isDark ? 'bg-paper' : 'bg-ink')
              : (isDark ? 'bg-paper/40' : 'bg-ink/30'),
        ]"
      />
    </button>
  </nav>
</template>
