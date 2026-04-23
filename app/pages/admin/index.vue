<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '관리자 대시보드' })

const supabase = useSupabaseClient()

// 각 컬렉션 카운트
const counts = ref<Record<string, number>>({})

const loadCounts = async () => {
  const tables = ['products', 'history_items', 'certifications', 'process_steps', 'factory_gallery', 'strength_sections', 'hero_slides']
  await Promise.all(tables.map(async (t) => {
    const { count } = await supabase.from(t).select('*', { count: 'exact', head: true })
    counts.value[t] = count || 0
  }))
}
await loadCounts()

const sections = computed(() => [
  { group: '공통 콘텐츠', cards: [
    { label: '메인 배너', to: '/admin/hero', desc: '히어로 텍스트 + 슬라이드', count: counts.value.hero_slides, unit: '슬라이드' },
    { label: '회사 정보', to: '/admin/company', desc: '주소·전화·CEO 인사말·통계', count: null },
    { label: '사이트 설정', to: '/admin/settings', desc: '로고·푸터·저작권', count: null },
  ]},
  { group: '제품·콘텐츠', cards: [
    { label: '제품', to: '/admin/products', desc: '충전재 라인업', count: counts.value.products, unit: '제품' },
    { label: '연혁', to: '/admin/history', desc: '회사 타임라인', count: counts.value.history_items, unit: '항목' },
    { label: '인증·특허', to: '/admin/certifications', desc: 'ISO·특허', count: counts.value.certifications, unit: '건' },
  ]},
  { group: '시설', cards: [
    { label: '생산 공정', to: '/admin/process', desc: '6단계 공정 정보', count: counts.value.process_steps, unit: '단계' },
    { label: '공장 갤러리', to: '/admin/gallery', desc: '시설 사진', count: counts.value.factory_gallery, unit: '장' },
    { label: 'Strength 섹션', to: '/admin/strength', desc: '강점 섹션 (선택)', count: counts.value.strength_sections, unit: '섹션' },
  ]},
])
</script>

<template>
  <div>
    <AdminPageHeader title="대시보드" subtitle="관리할 항목을 선택하세요." />

    <div v-for="g in sections" :key="g.group" class="mb-12">
      <h2 class="text-sm font-semibold text-ink-dark-muted uppercase tracking-wider mb-4">{{ g.group }}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="c in g.cards" :key="c.to" :to="c.to"
          class="bg-white border border-paper-line p-6 hover:border-ink-dark transition group"
        >
          <div class="flex items-start justify-between">
            <div>
              <div class="text-ink-dark font-semibold text-lg">{{ c.label }}</div>
              <div class="text-ink-dark-muted text-sm mt-1">{{ c.desc }}</div>
            </div>
            <div v-if="c.count !== null" class="text-right">
              <div class="text-3xl font-bold text-ink-dark">{{ c.count }}</div>
              <div class="text-xs text-ink-dark-faint">{{ c.unit }}</div>
            </div>
          </div>
          <div class="mt-6 text-xs text-ink-dark-muted group-hover:text-accent-bronze">
            관리하기 →
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
