<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '관리자 대시보드' })

const cards = [
  { label: '메인 배너', to: '/admin/hero', desc: '히어로 슬로건/배경' },
  { label: '회사 정보', to: '/admin/company', desc: '주소/전화/CEO 인사말' },
  { label: '제품', to: '/admin/products', desc: '충전재 라인업' },
  { label: '연혁', to: '/admin/history', desc: '타임라인' },
  { label: '인증서', to: '/admin/certifications', desc: 'OEKO-TEX, GRS' },
  { label: '생산공정', to: '/admin/process', desc: '6단계 공정' },
  { label: '공장 갤러리', to: '/admin/gallery', desc: '생산 시설 사진' },
  { label: 'Strength', to: '/admin/strength', desc: 'OEKO-TEX, GRS 섹션' },
  { label: '사이트 설정', to: '/admin/settings', desc: '로고, 푸터 등' },
]
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-ink-dark">대시보드</h1>
    <p class="text-ink-dark-muted mt-2">관리할 항목을 선택하세요.</p>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
        v-for="c in cards" :key="c.to" :to="c.to"
        class="bg-white border border-black/5 p-6 hover:border-black/20 transition block"
      >
        <div class="text-ink-dark font-semibold text-lg">{{ c.label }}</div>
        <div class="text-ink-dark-muted text-sm mt-1">{{ c.desc }}</div>
      </NuxtLink>
    </div>
  </div>
</template>
