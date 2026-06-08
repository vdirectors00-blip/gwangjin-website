<script setup lang="ts">
definePageMeta({ layout: 'home' })
useHead({ title: '특허 | 광진실업' })

const assetUrl = useAssetUrl()

const { data: patents } = await useCertifications('patent')

// 등록일 기준 연대순 정렬 (오래된 것 → 최신)
const sortedPatents = computed(() => {
  if (!patents.value) return []
  return [...patents.value].sort((a, b) => {
    const aDate = a.issued_at || ''
    const bDate = b.issued_at || ''
    return aDate.localeCompare(bDate)
  })
})

// 각 특허의 파일 매핑 (cert_number 기준)
const patentFileMap: Record<string, { pdf: string; img: string }> = {
  '제10-1138980호': { pdf: '/certificates/patent-10-1138980.pdf', img: '/certificates/images/patent-10-1138980.jpg' },
  '제10-1138979호': { pdf: '/certificates/patent-10-1138979.pdf', img: '/certificates/images/patent-10-1138979.jpg' },
  '제10-1169060호': { pdf: '/certificates/patent-10-1169060.pdf', img: '/certificates/images/patent-10-1169060.jpg' },
  '제10-0994645호': { pdf: '/certificates/patent-10-0994645.pdf', img: '/certificates/images/patent-10-0994645.jpg' },
}
const fileFor = (p: { cert_number: string | null }) =>
  p.cert_number ? (patentFileMap[p.cert_number] || null) : null

// 카드 이미지 로드 실패 추적 (id → 실패 여부)
const thumbFailed = ref<Record<number, boolean>>({})
const onThumbFail = (id: number) => { thumbFailed.value[id] = true }
</script>

<template>
  <div>
    <div class="h-[76px]" />
    <CommonSubNav section="technology" accent="eco" />

    <div id="patents-snap" class="h-[calc(100vh-156px)] overflow-y-auto no-scrollbar">
      <HomeSnapController container="patents-snap" :duration="600" :cooldown="700" />

      <!-- ───── 1. Intro (bronze 변조) ───── -->
      <section class="relative min-h-[calc(100vh-156px)] bg-white flex items-center px-6 md:px-10 lg:px-16 py-16 overflow-hidden">
        <!-- 은은한 사진 배경 -->
        <div
          class="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.30]"
          :style="`background-image:url('${assetUrl('/images/bg/sub-patents.jpg')}'); filter: grayscale(35%) brightness(1.04);`"
        />
        <!-- 그리드 배경: bronze 톤 -->
        <div
          class="absolute inset-0 pointer-events-none opacity-50"
          style="background-image: linear-gradient(to right, rgba(139,115,85,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,115,85,0.06) 1px, transparent 1px); background-size: 80px 80px;"
        />

        <div class="relative z-10 max-w-container mx-auto w-full">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
            <div class="md:col-span-6">
              <p class="mono-label text-accent-bronze mb-6 ink-fade" style="animation-delay: 0ms;">
                Patents · 특허
              </p>
              <h1 class="font-light text-[clamp(40px,5vw,72px)] leading-[1.15] tracking-[-0.025em] text-ink-dim">
                <span class="block ink-fade" style="animation-delay: 120ms;">자체 기술의</span>
                <span class="block ink-fade" style="animation-delay: 380ms;">
                  <span class="text-accent-bronze">증거</span>.
                </span>
              </h1>
              <div class="mt-8 w-16 h-px bg-ink/30 ink-fade" style="animation-delay: 640ms;" />
            </div>
            <div class="md:col-span-6">
              <p class="text-ink-dim text-base md:text-lg leading-[1.9] font-light whitespace-pre-line ink-fade" style="animation-delay: 520ms;">{{
                `광진실업이 직접 개발한 제조 기술과 장비.
산업의 표준을 만들어 가는 자체 R&D의 기록입니다.`
              }}</p>
            </div>
          </div>

          <!-- Editorial stat: 04 + 특허 리스트 (ink-fade 순차 등장) -->
          <div
            class="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end"
          >
            <div class="md:col-span-4 ink-fade" style="animation-delay: 820ms;">
              <div class="font-light text-[clamp(110px,12vw,180px)] text-accent-bronze/80 tracking-[-0.04em] leading-none">
                {{ String(sortedPatents.length).padStart(2, '0') }}
              </div>
              <p class="mono-label text-ink-muted mt-3">Registered Patents</p>
            </div>

            <div class="md:col-span-8 md:border-l md:border-paper-line md:pl-10">
              <ul class="space-y-3">
                <li
                  v-for="(p, i) in sortedPatents" :key="p.id"
                  class="flex items-baseline justify-between border-b border-paper-line/60 pb-3 ink-fade"
                  :style="`animation-delay: ${1000 + i * 180}ms`"
                >
                  <span class="font-medium text-base md:text-lg tracking-[-0.015em] text-ink truncate pr-4">
                    {{ p.name }}
                  </span>
                  <span class="mono-label text-ink-muted whitespace-nowrap">{{ p.issued_at }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 2. 특허 4건 — 특허증 이미지 직접 노출 (가로 와이드 카드, 토글 없음) ───── -->
      <section class="min-h-[calc(100vh-156px)] bg-paper-soft border-t border-paper-line flex flex-col px-6 md:px-10 lg:px-16 py-10 md:py-14">
        <div class="max-w-container mx-auto w-full flex-1 flex flex-col">
          <div class="mb-8 md:mb-10">
            <p class="eyebrow text-ink-muted">Patent Files</p>
            <h2 class="mt-3 font-medium text-[clamp(28px,3.5vw,48px)] tracking-[-0.03em]">특허 기록</h2>
          </div>

          <!-- 가로 와이드 카드: 이미지(좌) + 정보(우), 2열 -->
          <div class="flex-1 flex items-center">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-7 md:gap-9 w-full max-w-7xl mx-auto">
              <div
                v-for="(p, i) in sortedPatents" :key="p.id"
                class="bg-white flex flex-row overflow-hidden border border-paper-line"
              >
                <!-- 특허증 이미지 직접 노출 (좌) -->
                <div class="relative bg-paper-soft w-[32%] shrink-0 self-stretch min-h-[243px] overflow-hidden">
                  <img
                    v-if="fileFor(p) && !thumbFailed[p.id]"
                    :src="assetUrl(fileFor(p)!.img)"
                    :alt="`${p.name} 특허증`"
                    class="absolute inset-0 w-full h-full object-contain p-3"
                    loading="lazy"
                    @error="onThumbFail(p.id)"
                  />
                  <div v-else class="absolute inset-0 flex items-center justify-center">
                    <p class="mono-label text-ink-faint">특허증 준비 중</p>
                  </div>

                  <!-- 모서리 마커 -->
                  <span class="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent-bronze/60 pointer-events-none" />
                  <span class="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent-bronze/60 pointer-events-none" />
                </div>

                <!-- 정보 (우) -->
                <div class="flex-1 px-6 py-5 md:px-9 md:py-7 flex flex-col">
                  <div class="flex items-baseline justify-between">
                    <span class="mono-label text-accent-bronze">Patent {{ String(i + 1).padStart(2, '0') }}</span>
                    <span class="mono-label text-ink-faint">{{ p.issued_at }}</span>
                  </div>
                  <h3 class="mt-3 font-medium text-lg md:text-xl tracking-[-0.02em] leading-snug text-ink whitespace-nowrap">
                    {{ p.name }}
                  </h3>
                  <p v-if="p.description" class="mt-3 text-ink-dim text-sm font-light leading-relaxed">
                    {{ p.description }}
                  </p>
                  <div class="mt-auto pt-4 border-t border-paper-line">
                    <span class="font-mono text-ink-muted text-xs">{{ p.cert_number }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 3. Next (인증 링크) + Footer (라이트 paper-warm 톤) ───── -->
      <section class="min-h-[calc(100vh-156px)] bg-paper-warm text-ink flex flex-col border-t border-paper-line/60">
        <div class="flex-1 flex items-center px-6 md:px-10 lg:px-16 py-16">
          <div class="max-w-container mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div class="md:col-span-7">
              <p class="eyebrow text-ink-muted">Also See</p>
              <h2 class="mt-6 font-light text-display-sm text-ink">
                국제 표준으로 입증한<br>
                <span class="text-accent-bronze">품질·환경 인증</span>.
              </h2>
            </div>
            <div class="md:col-span-5 md:text-right">
              <NuxtLink
                to="/certifications"
                class="group inline-flex items-center gap-5 md:gap-6"
              >
                <span class="text-xl md:text-2xl text-ink group-hover:text-accent-bronze transition-colors duration-500">
                  인증 보기
                </span>
                <span class="relative w-14 h-14 rounded-full border border-ink/30 group-hover:border-accent-bronze group-hover:translate-x-2 group-hover:-rotate-45 flex items-center justify-center transition-all duration-500 ease-out-expo">
                  <svg class="w-5 h-5 text-ink group-hover:text-accent-bronze transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </NuxtLink>
            </div>
          </div>
        </div>
        <CommonSiteFooter />
      </section>
    </div>
  </div>
</template>
