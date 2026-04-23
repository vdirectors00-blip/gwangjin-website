<script setup lang="ts">
const scrolled = ref(false)
const menuOpen = ref(false)

const route = useRoute()

watch(() => route.fullPath, () => { menuOpen.value = false })

const onScroll = () => {
  scrolled.value = window.scrollY > 60
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const overDarkHero = computed(() => route.path === '/' && !scrolled.value)

watch(menuOpen, (v) => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = v ? 'hidden' : ''
  }
})

const nav = [
  {
    label: 'About', to: '/about',
    children: [
      { label: 'CEO Message', sub: '대표 인사말', to: '/about' },
      { label: 'Philosophy',  sub: '경영 이념',   to: '/philosophy' },
      { label: 'History',     sub: '연혁',        to: '/history' },
      { label: 'Factory',     sub: '생산 시설',   to: '/factory' },
    ],
  },
  {
    label: 'Technology & Certifications', to: '/certifications',
    children: [
      { label: 'Quality Certifications', sub: '품질·환경 인증', to: '/certifications' },
      { label: 'Patents',                sub: '특허',           to: '/patents' },
    ],
  },
  { label: 'Products', sub: '제품', to: '/products' },
  { label: 'Contact',  sub: '문의', to: '/contact' },
]
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo',
      menuOpen
        ? 'bg-transparent text-paper'
        : scrolled
          ? 'bg-paper/90 backdrop-blur-md border-b border-paper-line/40 text-ink'
          : overDarkHero
            ? 'bg-transparent text-paper'
            : 'bg-paper/90 backdrop-blur-md border-b border-paper-line/40 text-ink',
    ]"
  >
    <div class="container-x flex items-center justify-between h-20">
      <NuxtLink to="/" class="flex items-center gap-3 h-12">
        <!-- 로고: 다크 위에선 흰색, 라이트 위에선 컬러 -->
        <img
          v-if="menuOpen || overDarkHero"
          src="/logo/bi-white.svg"
          alt="COSY FEEL"
          class="h-9 w-auto"
        />
        <img
          v-else
          src="/logo/bi-color.svg"
          alt="COSY FEEL"
          class="h-9 w-auto"
        />
      </NuxtLink>

      <button
        class="relative w-12 h-12 flex items-center justify-center group"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        @click="menuOpen = !menuOpen"
      >
        <span class="sr-only">Menu</span>
        <span
          :class="[
            'absolute block h-px w-7 bg-current transition-all duration-300 ease-out-expo',
            menuOpen ? 'rotate-45' : '-translate-y-1.5',
          ]"
        />
        <span
          :class="[
            'absolute block h-px w-7 bg-current transition-all duration-300 ease-out-expo',
            menuOpen ? 'opacity-0' : 'opacity-100',
          ]"
        />
        <span
          :class="[
            'absolute block h-px w-7 bg-current transition-all duration-300 ease-out-expo',
            menuOpen ? '-rotate-45' : 'translate-y-1.5',
          ]"
        />
      </button>
    </div>
  </header>

  <Transition
    enter-active-class="transition-all duration-700 ease-out-expo"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-500 ease-out-expo"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="menuOpen"
      class="fixed inset-0 z-40 bg-dark text-paper overflow-y-auto"
    >
      <div class="container-x pt-32 pb-20 min-h-screen flex flex-col">
        <nav class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12">
          <template v-for="item in nav" :key="item.label">
            <div v-if="item.children" class="py-6 border-b border-paper/10">
              <NuxtLink
                :to="item.to"
                class="block text-paper hover:text-accent-bronze-soft transition"
              >
                <div class="text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
                  {{ item.label }}
                </div>
              </NuxtLink>
              <div class="mt-4 grid grid-cols-2 gap-3">
                <NuxtLink
                  v-for="c in item.children" :key="c.label"
                  :to="c.to"
                  class="group flex flex-col text-ink-inverse-dim hover:text-paper py-2 transition"
                >
                  <span class="text-sm font-medium">{{ c.label }}</span>
                  <span class="text-xs text-ink-inverse-faint mt-0.5">{{ c.sub }}</span>
                </NuxtLink>
              </div>
            </div>

            <NuxtLink
              v-else
              :to="item.to"
              class="group block py-6 border-b border-paper/10 hover:text-accent-bronze-soft transition"
            >
              <div class="text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
                {{ item.label }}
              </div>
              <div class="text-sm text-ink-inverse-faint mt-2">{{ item.sub }}</div>
            </NuxtLink>
          </template>
        </nav>

        <div class="mt-12 pt-8 border-t border-paper/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-ink-inverse-muted">
          <div>
            <div class="text-paper font-medium mb-2">COSY FEEL</div>
            <p>주식회사 광진실업<br>인천광역시 서구 가정로 58번길 3</p>
          </div>
          <div>
            <div class="text-paper font-medium mb-2">CONTACT</div>
            <p>TEL · 032-582-4149<br>EMAIL · info@gwangjin.co.kr</p>
          </div>
          <div class="md:text-right">
            <div class="text-paper font-medium mb-2">LANGUAGE</div>
            <p class="text-paper">KOR</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
