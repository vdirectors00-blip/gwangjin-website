<script setup lang="ts">
useHead({ title: 'History | 광진실업' })

const { data: history } = await useHistoryItems()

// 시기별 그룹핑 — 자료 기반 4단계
const groups = computed(() => {
  if (!history.value) return []
  const items = history.value
  return [
    {
      label: 'Foundation',
      ko: '창업과 성장',
      range: '1994 — 2010',
      items: items.filter(h => parseInt(h.year) >= 1994 && parseInt(h.year) <= 2010),
    },
    {
      label: 'Innovation',
      ko: '기술 혁신',
      range: '2011 — 2014',
      items: items.filter(h => parseInt(h.year) >= 2011 && parseInt(h.year) <= 2014),
    },
    {
      label: 'Brand',
      ko: '브랜드 도약',
      range: '2015 — 2020',
      items: items.filter(h => parseInt(h.year) >= 2015 && parseInt(h.year) <= 2020),
    },
    {
      label: 'Renewal',
      ko: '재정립과 성장',
      range: '2021 — Now',
      items: items.filter(h => parseInt(h.year) >= 2021),
    },
  ]
})
</script>

<template>
  <div>
    <CommonPageHero
      title="History"
      subtitle="1994년부터 시작된 30년의 여정"
      eyebrow="About · 03"
      background="/images/hero/hero-1.jpg"
    />

    <!-- Stat 헤더 -->
    <section class="bg-paper py-24 border-b border-paper-line">
      <div class="container-x grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        <div>
          <div class="text-7xl md:text-9xl font-bold tracking-tightest text-ink leading-none">30+</div>
          <p class="text-ink-muted mt-4">YEARS OF HERITAGE</p>
        </div>
        <div class="md:col-span-2">
          <p class="text-ink-dim text-lg leading-relaxed max-w-2xl">
            1994년 광진실업으로 시작해, 부직포·제면 한 길만을 걸어왔습니다.
            5개 생산라인, 4건의 특허, 그리고 COSY FEEL 브랜드로 다음 30년을 준비합니다.
          </p>
        </div>
      </div>
    </section>

    <!-- 시기별 타임라인 -->
    <section v-if="history && history.length > 0" class="bg-paper py-24">
      <div class="container-x">
        <div v-for="g in groups" :key="g.label" class="mb-24 last:mb-0">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            <div class="md:col-span-4 md:sticky md:top-32">
              <p class="eyebrow text-accent-bronze">{{ g.range }}</p>
              <h2 class="mt-4 text-4xl md:text-5xl font-bold tracking-tightest">
                {{ g.label }}
              </h2>
              <p class="text-ink-muted mt-2">{{ g.ko }}</p>
            </div>
            <div class="md:col-span-8">
              <ol class="border-l border-paper-line">
                <li
                  v-for="h in g.items" :key="h.id"
                  class="relative pl-8 pb-8 last:pb-0 group"
                >
                  <div class="absolute left-0 top-1 -translate-x-1/2 w-2 h-2 bg-paper-line group-hover:bg-accent-bronze rounded-full transition-colors" />
                  <p class="text-accent-bronze text-sm font-semibold tracking-wider">{{ h.year }}</p>
                  <h3 class="text-ink text-xl font-semibold mt-1">{{ h.title }}</h3>
                  <p v-if="h.description" class="text-ink-muted text-sm mt-1">{{ h.description }}</p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <p
      v-else
      class="container-x py-32 text-center text-ink-faint border border-dashed border-paper-line"
    >
      [연혁이 아직 등록되지 않았습니다.]
    </p>
  </div>
</template>
