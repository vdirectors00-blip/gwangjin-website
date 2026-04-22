<script setup lang="ts">
const scrolled = ref(false)
const mobileOpen = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const nav = [
  { label: 'Home', to: '/' },
  {
    label: 'About', to: '/about',
    children: [
      { label: '기업개요', to: '/about' },
      { label: '연혁·인증', to: '/history' },
      { label: '생산공정', to: '/process' },
    ],
  },
  { label: 'Strength', to: '/strength' },
  { label: 'Products', to: '/products' },
  { label: 'Contact', to: '/contact' },
]
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-bg/90 backdrop-blur border-b border-white/5' : 'bg-transparent',
    ]"
  >
    <div class="container-x flex items-center justify-between h-20">
      <NuxtLink to="/" class="text-ink font-bold text-xl tracking-tight">
        COSY FEEL
      </NuxtLink>

      <nav class="hidden lg:flex items-center gap-10">
        <div v-for="item in nav" :key="item.label" class="relative group">
          <NuxtLink
            :to="item.to"
            class="text-sm font-medium text-ink/80 hover:text-ink transition"
          >
            {{ item.label }}
          </NuxtLink>
          <div
            v-if="item.children"
            class="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition"
          >
            <div class="bg-bg-soft border border-white/10 min-w-40 py-2">
              <NuxtLink
                v-for="c in item.children"
                :key="c.label"
                :to="c.to"
                class="block px-4 py-2 text-sm text-ink-muted hover:text-ink hover:bg-white/5"
              >
                {{ c.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>

      <button
        class="lg:hidden text-ink p-2"
        aria-label="Toggle menu"
        @click="mobileOpen = !mobileOpen"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            :d="mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
          />
        </svg>
      </button>
    </div>

    <Transition name="fade">
      <div v-if="mobileOpen" class="lg:hidden bg-bg-soft border-t border-white/10">
        <div class="container-x py-4 flex flex-col gap-1">
          <NuxtLink
            v-for="item in nav" :key="item.label" :to="item.to"
            class="py-3 text-ink-dim hover:text-ink"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
