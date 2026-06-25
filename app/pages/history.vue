<script setup lang="ts">
definePageMeta({ layout: 'home' })
useSeo({
  title: '연혁 | 광진실업',
  description: '광진실업 연혁 — 1994년 설립부터 현재까지 부직포·제면 충전재 제조사로 걸어온 (주)광진실업의 발자취를 소개합니다.',
  path: '/history',
})

const { data: history } = await useHistoryItems()
const assetUrl = useAssetUrl()

const groups = computed(() => {
  if (!history.value) return []
  const items = history.value
  return [
    { label: 'Foundation', ko: '창업과 성장',   range: '1994 — 2010', bg: 'bg-white',      items: items.filter(h => parseInt(h.year) <= 2010) },
    { label: 'Innovation', ko: '기술 혁신',     range: '2011 — 2014', bg: 'bg-paper-soft', items: items.filter(h => parseInt(h.year) >= 2011 && parseInt(h.year) <= 2014) },
    { label: 'Brand',      ko: '브랜드 도약',   range: '2015 — 2020', bg: 'bg-paper-warm', items: items.filter(h => parseInt(h.year) >= 2015 && parseInt(h.year) <= 2020) },
    { label: 'Renewal',    ko: '재정립과 성장', range: '2021 — Now',  bg: 'bg-white',      items: items.filter(h => parseInt(h.year) >= 2021) },
  ]
})
</script>

<template>
  <div>
    <div class="h-[76px]" />
    <CommonSubNav section="about" />

    <div
      id="history-snap"
      class="h-[calc(100vh-156px)] overflow-y-auto no-scrollbar"
    >
      <HomeSnapController container="history-snap" :duration="600" :cooldown="700" />

      <!-- ───── Intro (풀스크린) ───── -->
      <section class="relative min-h-[calc(100vh-156px)] bg-white flex items-center px-6 md:px-10 lg:px-16 py-16 overflow-hidden">
        <!-- 은은한 텍스처 배경 -->
        <div
          class="absolute inset-0 bg-cover bg-center opacity-[0.24] pointer-events-none"
          :style="`background-image:url('${assetUrl('/images/bg/sub-history.jpg')}'); filter: grayscale(50%) brightness(1.12);`"
        />
        <div class="relative max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center">
          <div class="md:col-span-5">
            <p class="mono-label text-accent-bronze mb-6">Our Journey · 연혁</p>
            <h1 class="font-normal text-[clamp(36px,4.5vw,64px)] leading-[1.2] tracking-[-0.025em] text-ink-dim">
              <span class="whitespace-nowrap">1994년부터,</span><br>
              <span class="text-accent-bronze">삼십 년</span>의 여정.
            </h1>
            <div class="mt-10 w-16 h-px bg-ink/30" />
          </div>

          <div class="md:col-span-7">
            <p class="text-ink-dim text-base md:text-lg leading-[1.95] font-normal">
              광진실업으로 시작해 부직포·제면 한 길만을 걸어왔습니다.
              다섯 개 생산라인, 네 건의 특허, 그리고 COSY FEEL 브랜드로
              다음 삼십 년을 준비합니다.
            </p>
            <div class="mt-12 grid grid-cols-3 gap-0 border-t border-b border-ink/25">
              <div v-for="(s, i) in [
                { k: 'Since', v: '1994' },
                { k: 'Lines', v: '5' },
                { k: 'Patents', v: '4' },
              ]" :key="s.k"
                :class="['px-4 py-6', i > 0 ? 'border-l border-ink/25' : '']"
              >
                <div class="mono-label text-ink-muted">{{ s.k }}</div>
                <div class="text-[32px] font-medium tracking-[-0.02em] text-ink mt-1 leading-none">{{ s.v }}</div>
              </div>
            </div>
            <p class="mt-8 mono-label text-ink-faint">
              SCROLL ↓ &nbsp;·&nbsp; FOUR CHAPTERS
            </p>
          </div>
        </div>
      </section>

      <!-- ───── 4개 챕터 (풀스크린, 좌우 번갈아) ───── -->
      <section
        v-for="(g, gi) in groups" :key="g.label"
        :class="[g.bg, 'min-h-[calc(100vh-156px)] flex items-center px-6 md:px-10 lg:px-16 py-12 border-t border-paper-line']"

      >
        <div class="max-w-[1400px] mx-auto w-full">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            <!-- TITLE -->
            <div
              :class="[
                'md:col-span-5',
                gi % 2 === 1 ? 'md:order-2' : 'md:order-1',
              ]"
            >
              <div class="mono-label text-accent-bronze">{{ g.range }}</div>
              <h2
                class="mt-4 font-normal leading-none tracking-[-0.03em] text-ink whitespace-nowrap"
                style="font-size: clamp(44px, 5.5vw, 80px);"
              >
                {{ g.label }}
              </h2>
              <p class="mt-4 text-ink-muted text-lg">{{ g.ko }}</p>
              <div class="mt-10 flex items-center gap-3">
                <span class="mono-label text-ink-faint">Chapter {{ String(gi + 1).padStart(2, '0') }}</span>
                <span class="w-8 h-px bg-ink/20" />
                <span class="mono-label text-ink-faint">{{ String(groups.length).padStart(2, '0') }}</span>
              </div>
            </div>

            <!-- ITEMS — 간결한 2-col 리스트 (날짜 좌 · 내용 우) -->
            <div
              :class="[
                'md:col-span-7 md:max-h-[65vh] md:overflow-y-auto no-scrollbar',
                gi % 2 === 1 ? 'md:order-1' : 'md:order-2',
              ]"
            >
              <div class="divide-y divide-paper-line">
                <div
                  v-for="(h, i) in g.items" :key="h.id"
                  v-reveal="i * 100"
                  class="group grid grid-cols-[100px_1fr] md:grid-cols-[130px_1fr] gap-4 md:gap-8 py-5 items-baseline"
                >
                  <!-- 날짜 (좌측) -->
                  <div class="mono-label text-accent-bronze group-hover:text-ink transition-colors pt-0.5">
                    {{ h.year }}
                  </div>
                  <!-- 내용 (우측) -->
                  <div>
                    <h3 class="text-lg md:text-xl font-medium tracking-[-0.01em] leading-tight text-ink group-hover:text-accent-bronze transition-colors">
                      {{ h.title }}
                    </h3>
                    <p v-if="h.description" class="text-ink-muted text-sm mt-1.5 font-normal leading-relaxed">
                      {{ h.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 푸터 (snap 컨테이너 마지막 섹션) -->
      <CommonSiteFooter />
    </div>

    <!-- TOP 버튼 (snap 컨테이너 스크롤 기반) -->
    <CommonTopButton container="history-snap" />
  </div>
</template>
