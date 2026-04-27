<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '관리자 대시보드' })

const supabase = useSupabaseClient()

// 각 컬렉션 카운트
const counts = ref<Record<string, number>>({})

const loadCounts = async () => {
  const tables = ['products', 'history_items', 'certifications', 'process_steps', 'factory_gallery']
  await Promise.all(tables.map(async (t) => {
    const { count } = await supabase.from(t).select('*', { count: 'exact', head: true })
    counts.value[t] = count || 0
  }))
}
await loadCounts()

// 사이트 페이지 단위 그룹 (사이드바와 동일 구조)
const sections = computed(() => [
  {
    group: '메인 페이지',
    page: '/',
    desc: '홈페이지 5섹션 (Hero·Intro·Materials·Trust·Contact)',
    cards: [
      { label: '회사 정보·통계', to: '/admin/company',        desc: 'Footer + 메인 Intro 통계 숫자 (설립/생산라인/특허)', count: null },
      { label: '시그니처 제품',   to: '/admin/products',       desc: 'Materials 섹션 카드 (하이라이트 3개)',                count: counts.value.products, unit: '제품' },
      { label: '인증·특허',       to: '/admin/certifications', desc: 'Trust 섹션 인증 + 특허 리스트',                       count: counts.value.certifications, unit: '건' },
    ],
  },
  {
    group: 'About (회사소개)',
    page: '/about · /history · /factory',
    desc: 'CEO 인사말 / 연혁 / 생산 시설',
    cards: [
      { label: 'CEO 인사말',   to: '/admin/company', desc: '/about 인사말 본문 + 대표 이름·사진',          count: null },
      { label: '연혁',         to: '/admin/history', desc: '/history 4시기 타임라인',                      count: counts.value.history_items, unit: '항목' },
      { label: '생산 공정',     to: '/admin/process', desc: '/factory 6단계 zigzag',                       count: counts.value.process_steps, unit: '단계' },
      { label: '공장 갤러리',   to: '/admin/gallery', desc: '/factory 시설 사진',                         count: counts.value.factory_gallery, unit: '장' },
    ],
  },
  {
    group: 'Products (제품)',
    page: '/products',
    desc: '제품 카드 + 매트릭스 + 모달 상세',
    cards: [
      { label: '제품 관리', to: '/admin/products', desc: '15개 충전재 라인업 (Synthetic·Natural·Processed)', count: counts.value.products, unit: '제품' },
    ],
  },
  {
    group: 'Technology (기술·인증)',
    page: '/certifications · /patents',
    desc: '품질·환경 인증 + 자체 특허',
    cards: [
      { label: '인증·특허 관리', to: '/admin/certifications', desc: 'ISO 9001·14001·이노비즈 + 등록 특허 4건', count: counts.value.certifications, unit: '건' },
    ],
  },
  {
    group: 'Contact (문의)',
    page: '/contact',
    desc: '회사 정보 + 카카오맵 + 문의 폼',
    cards: [
      { label: '회사 정보·지도', to: '/admin/company', desc: 'TEL·이메일·주소·영업시간·카카오맵 임베드', count: null },
    ],
  },
  {
    group: '기타',
    page: '',
    desc: '전역 설정',
    cards: [
      { label: '사이트 설정', to: '/admin/settings', desc: '푸터 저작권 문구', count: null },
    ],
  },
])
</script>

<template>
  <div>
    <AdminPageHeader
      title="대시보드"
      subtitle="사이트 페이지별로 묶었습니다. 수정할 사이트 페이지의 항목을 선택하세요."
    />

    <div v-for="g in sections" :key="g.group" class="mb-12">
      <!-- 그룹 헤더: 사이트 페이지 명시 -->
      <div class="mb-4 pb-3 border-b border-paper-line">
        <div class="flex items-baseline justify-between gap-4">
          <h2 class="text-base font-semibold text-ink-dark">{{ g.group }}</h2>
          <span v-if="g.page" class="text-xs text-ink-dark-muted font-mono">{{ g.page }}</span>
        </div>
        <p class="text-xs text-ink-dark-muted mt-1">{{ g.desc }}</p>
      </div>

      <!-- 카드 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="c in g.cards" :key="`${g.group}-${c.label}`" :to="c.to"
          class="bg-white border border-paper-line p-6 hover:border-ink-dark transition group"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <div class="text-ink-dark font-semibold text-lg">{{ c.label }}</div>
              <div class="text-ink-dark-muted text-sm mt-1 leading-relaxed">{{ c.desc }}</div>
            </div>
            <div v-if="c.count !== null && c.count !== undefined" class="text-right shrink-0">
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
