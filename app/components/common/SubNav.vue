<script setup lang="ts">
const props = defineProps<{
  section: 'about' | 'technology'
  accent?: 'bronze' | 'eco'      // 활성 탭 색 (기본 bronze)
}>()

const route = useRoute()

const sectionMeta = computed(() => {
  if (props.section === 'about') return { label: 'About', ko: '회사소개', to: '/about' }
  return { label: 'Technology', ko: '기술·인증', to: '/certifications' }
})

const tabs = computed(() => {
  if (props.section === 'about') {
    return [
      { label: 'CEO 인사말',   en: 'CEO Message',  to: '/about' },
      { label: '경영 이념',    en: 'Philosophy',   to: '/philosophy' },
      { label: '연혁',         en: 'History',      to: '/history' },
      { label: '생산 시설',    en: 'Factory',      to: '/factory' },
    ]
  }
  return [
    { label: '품질·환경 인증', en: 'Certifications', to: '/certifications' },
    { label: '특허',           en: 'Patents',        to: '/patents' },
  ]
})

const accent = computed(() => props.accent ?? 'bronze')
const accentBg = computed(() => accent.value === 'eco' ? 'bg-accent-bronze' : 'bg-accent-bronze')
const accentText = computed(() => accent.value === 'eco' ? 'text-accent-bronze' : 'text-accent-bronze')

const isActive = (to: string) => route.path === to
</script>

<template>
  <nav class="border-b border-paper-line bg-paper">
    <div class="max-w-container mx-auto px-6 md:px-10 lg:px-16">
      <div class="flex flex-col md:flex-row md:items-end py-4 md:py-0">
        <!-- 섹션 이름 (왼쪽 고정, 클릭 시 섹션 첫 페이지로) -->
        <NuxtLink :to="sectionMeta.to" class="group flex items-baseline gap-3 md:py-6 shrink-0">
          <h2
            class="font-light text-2xl md:text-3xl tracking-[-0.02em] transition-colors"
            :class="accent === 'eco' ? 'text-ink-muted group-hover:text-accent-bronze' : 'text-ink-muted group-hover:text-accent-bronze'"
          >
            {{ sectionMeta.label }}
          </h2>
          <span class="mono-label text-ink-faint group-hover:text-ink-muted transition-colors">{{ sectionMeta.ko }}</span>
        </NuxtLink>

        <!-- 탭 (중앙 살짝 우측 — mx-auto + 우측 여유 공간 축소) -->
        <ul class="flex items-end gap-6 md:gap-10 overflow-x-auto md:mx-auto md:mr-[8%]">
          <li v-for="t in tabs" :key="t.to" class="shrink-0">
            <NuxtLink
              :to="t.to"
              class="group relative inline-flex flex-col items-center gap-1 py-4 md:py-6 text-sm md:text-[15px] text-ink-muted hover:text-ink transition-colors"
              :class="isActive(t.to) ? 'text-ink font-semibold' : ''"
            >
              <span class="block">{{ t.label }}</span>
              <!-- 영어 라벨: 모바일 숨김 (한 줄에 4탭 다 들어가도록) -->
              <span
                class="mono-label transition-colors hidden md:block"
                :class="isActive(t.to) ? `!${accentText}` : 'text-ink-faint'"
              >
                {{ t.en }}
              </span>
              <!-- 밑줄 (활성) -->
              <span
                class="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] transition-all duration-500 ease-out-expo"
                :class="isActive(t.to) ? `w-full ${accentBg}` : 'w-0 group-hover:w-full group-hover:bg-ink/30'"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
