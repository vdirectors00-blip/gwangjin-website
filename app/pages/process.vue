<script setup lang="ts">
useHead({ title: 'Production Process | 광진실업' })

const steps = [
  { n: '01', t: '원료 입고', d: '원자재 검수 및 보관' },
  { n: '02', t: '개섬 공정', d: '섬유 풀기 및 정렬' },
  { n: '03', t: '혼합 공정', d: '소재 비율 혼합' },
  { n: '04', t: '성형 공정', d: '충전재 형태 성형' },
  { n: '05', t: '품질 검사', d: '규격 및 품질 확인' },
  { n: '06', t: '포장·출하', d: '포장 및 출고 처리' },
]
</script>

<template>
  <div>
    <CommonPageHero title="Production Process" subtitle="생산 공정" />

    <section class="py-24">
      <div class="container-x">
        <p class="text-ink-muted text-sm tracking-widest uppercase">Process Flow</p>
        <h2 class="text-3xl md:text-5xl font-bold text-ink mt-2">6단계 공정</h2>
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="s in steps" :key="s.n"
            class="bg-bg-mid hover:bg-bg-card transition border border-white/5 p-10"
          >
            <div class="text-ink-faint text-3xl font-light">{{ s.n }}</div>
            <div class="w-10 h-px bg-white/20 mt-6" />
            <h3 class="text-ink text-xl font-semibold mt-6">{{ s.t }}</h3>
            <p class="text-ink-muted text-sm mt-3">{{ s.d }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bg-soft py-24">
      <div class="container-x">
        <p class="text-ink-muted text-sm tracking-widest uppercase">Gallery</p>
        <h2 class="text-3xl md:text-5xl font-bold text-ink mt-2">생산 시설</h2>
        <p class="text-ink-faint mt-4">[스크롤 연동 갤러리 — Phase 2에서 구현]</p>
      </div>
    </section>
  </div>
</template>
