<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '제품 관리' })
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-ink-dark">제품 관리</h1>
        <p class="text-ink-dark-muted mt-2">충전재 라인업 편집</p>
      </div>
      <button class="bg-ink-dark text-white px-5 py-2.5 text-sm font-medium hover:opacity-90">
        + 제품 추가
      </button>
    </div>

    <div class="mt-8 bg-white border border-black/5 p-16 text-center text-ink-dark-muted">
      [제품 목록 테이블 — 다음 단계에서 구현]
    </div>
  </div>
</template>
