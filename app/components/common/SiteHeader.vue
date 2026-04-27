<script setup lang="ts">
const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)
const assetUrl = useAssetUrl()

watch(() => route.fullPath, () => { menuOpen.value = false })

const onScroll = (e?: Event) => {
  // snap container가 있으면 그걸 사용
  const snap = typeof document !== 'undefined' ? document.getElementById('snap') : null
  const y = snap ? snap.scrollTop : window.scrollY
  scrolled.value = y > 60
}

onMounted(() => {
  const snap = document.getElementById('snap')
  const target = snap || window
  target.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => {
  const snap = typeof document !== 'undefined' ? document.getElementById('snap') : null
  const target = snap || window
  target.removeEventListener('scroll', onScroll)
})

// Home 페이지의 Hero(다크) 위에 있을 때는 헤더 투명 + 흰글씨
const overDarkHero = computed(() => route.path === '/' && !scrolled.value)

watch(menuOpen, (v) => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = v ? 'hidden' : ''
  }
})

const drawer = [
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
  <!-- 상단 미니 헤더 -->
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out-expo',
      menuOpen
        ? 'bg-transparent text-ink'
        : overDarkHero
          ? 'bg-transparent text-paper'
          : 'bg-paper/[0.88] backdrop-blur-md border-b border-paper-line/60 text-ink',
    ]"
  >
    <div class="max-w-container mx-auto px-6 md:px-10 lg:px-16 h-[76px] flex items-center justify-between">
      <!-- Logo: 다크 위는 흰색 필터, 라이트 위는 원본 컬러 -->
      <NuxtLink to="/" class="flex items-center gap-3.5">
        <img
          :src="assetUrl('/logo/bi-color.svg')"
          alt="COSY FEEL"
          :class="[
            'h-8 w-auto block transition-[filter] duration-500 ease-out-expo',
            overDarkHero ? '[filter:brightness(0)_invert(1)]' : '',
          ]"
        />
      </NuxtLink>

      <!-- 우측: 햄버거 (영문 버전 미제공으로 KOR/ENG 표시 제거) -->
      <div class="flex items-center gap-6">
        <button
          class="relative w-10 h-10 flex items-center justify-center group"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          @click="menuOpen = !menuOpen"
        >
          <span
            :class="[
              'absolute block h-px w-6 bg-current transition-all duration-300 ease-out-expo',
              menuOpen ? 'rotate-45' : '-translate-y-1.5',
            ]"
          />
          <span
            :class="[
              'absolute block h-px w-6 bg-current transition-all duration-300 ease-out-expo',
              menuOpen ? 'opacity-0' : 'opacity-100',
            ]"
          />
          <span
            :class="[
              'absolute block h-px w-6 bg-current transition-all duration-300 ease-out-expo',
              menuOpen ? '-rotate-45' : 'translate-y-1.5',
            ]"
          />
        </button>
      </div>
    </div>
  </header>

  <!-- 풀스크린 메뉴 -->
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
      class="fixed inset-0 z-30 bg-paper-soft text-ink overflow-y-auto"
    >
      <div class="max-w-container mx-auto px-6 md:px-10 lg:px-16 pt-32 pb-20 min-h-screen flex flex-col">
        <nav class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-12">
          <template v-for="item in drawer" :key="item.label">
            <div v-if="item.children" class="py-6 border-b border-paper-line/60">
              <NuxtLink
                :to="item.to"
                class="block hover:text-accent-bronze transition font-medium"
              >
                <div class="text-3xl md:text-5xl tracking-tightest leading-tight text-ink">
                  {{ item.label }}
                </div>
              </NuxtLink>
              <div class="mt-4 grid grid-cols-2 gap-3">
                <NuxtLink
                  v-for="c in item.children" :key="c.label"
                  :to="c.to"
                  class="flex flex-col text-ink-dim hover:text-ink py-2 transition"
                >
                  <span class="text-sm font-medium">{{ c.label }}</span>
                  <span class="text-xs text-ink-faint mt-0.5">{{ c.sub }}</span>
                </NuxtLink>
              </div>
            </div>
            <NuxtLink
              v-else
              :to="item.to"
              class="group block py-6 border-b border-paper-line/60 hover:text-accent-bronze transition font-medium"
            >
              <div class="text-3xl md:text-5xl tracking-tightest leading-tight text-ink">
                {{ item.label }}
              </div>
              <div class="text-sm text-ink-muted mt-2 not-italic font-normal">{{ item.sub }}</div>
            </NuxtLink>
          </template>
        </nav>

        <div class="mt-12 pt-8 border-t border-paper-line/60 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-muted">
          <div>
            <div class="text-ink font-medium mb-2">COSY FEEL</div>
            <p>주식회사 광진실업<br>인천광역시 서구 가정로 58번길 3</p>
          </div>
          <div class="md:text-right">
            <div class="text-ink font-medium mb-2">CONTACT</div>
            <p>TEL · 032-582-4149<br>EMAIL · info@gwangjin.co.kr</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
