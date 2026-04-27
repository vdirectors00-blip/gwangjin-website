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

// 모달 열림/선택된 특허
const openedIdx = ref<number | null>(null)
const openedPatent = computed(() => {
  if (openedIdx.value === null) return null
  return sortedPatents.value[openedIdx.value]
})
const openedFile = computed(() => {
  const p = openedPatent.value
  return p && p.cert_number ? (patentFileMap[p.cert_number] || null) : null
})

const imgFailed = ref(false)
const onImgFail = () => { imgFailed.value = true }

const open = (i: number) => {
  imgFailed.value = false
  openedIdx.value = i
}
const close = () => { openedIdx.value = null }

// ESC 키로 닫기
onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})
</script>

<template>
  <div>
    <div class="h-[76px]" />
    <CommonSubNav section="technology" accent="eco" />

    <div id="patents-snap" class="h-[calc(100vh-156px)] overflow-y-auto no-scrollbar">
      <HomeSnapController container="patents-snap" :duration="600" :cooldown="700" />

      <!-- ───── 1. Intro (bronze 변조) ───── -->
      <section class="relative min-h-[calc(100vh-156px)] bg-paper flex items-center px-6 md:px-10 lg:px-16 py-16 overflow-hidden">
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
              <h1 class="italic font-light text-[clamp(40px,5vw,72px)] leading-[1.15] tracking-[-0.025em] text-ink-dim">
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
              <div class="italic font-light text-[clamp(110px,12vw,180px)] text-accent-bronze/80 tracking-[-0.04em] leading-none">
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
                  <span class="italic font-medium text-base md:text-lg tracking-[-0.015em] text-ink truncate pr-4">
                    {{ p.name }}
                  </span>
                  <span class="mono-label text-ink-muted whitespace-nowrap">{{ p.issued_at }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 2. 특허 4건 2x2 그리드 ───── -->
      <section class="min-h-[calc(100vh-156px)] bg-paper-soft border-t border-paper-line flex flex-col px-6 md:px-10 lg:px-16 py-8 md:py-12">
        <div class="max-w-container mx-auto w-full flex-1 flex flex-col">
          <div class="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p class="eyebrow text-ink-muted">Patent Files</p>
              <h2 class="mt-3 italic font-medium text-[clamp(28px,3.5vw,48px)] tracking-[-0.03em]">특허 기록</h2>
            </div>
            <div class="mono-label text-ink-faint hidden md:block">
              CLICK CARD TO VIEW FULL
            </div>
          </div>

          <!-- 2x2 그리드 -->
          <div class="flex-1 flex items-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 w-full max-w-5xl mx-auto">
              <button
                v-for="(p, i) in sortedPatents" :key="p.id"
                type="button"
                @click="open(i)"
                class="group bg-paper p-8 md:p-10 relative text-left cursor-pointer flex flex-col min-h-[220px] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-12px_rgba(139,115,85,0.25)] transition-all duration-500 ease-out-expo overflow-hidden"
              >
                <!-- 모서리 마커 (bronze) -->
                <span class="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-bronze/60 pointer-events-none" />
                <span class="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-bronze/60 pointer-events-none" />
                <span class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent-bronze/60 pointer-events-none" />
                <span class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-bronze/60 pointer-events-none" />

                <!-- 거대한 번호 (배경) -->
                <div class="absolute right-4 top-1/2 -translate-y-1/2 italic font-light text-[clamp(140px,18vw,240px)] text-accent-bronze/[0.06] group-hover:text-accent-bronze/[0.12] transition-colors duration-700 leading-none tracking-[-0.03em] pointer-events-none select-none">
                  {{ String(i + 1).padStart(2, '0') }}
                </div>

                <!-- 헤더 -->
                <div class="relative z-10 flex items-baseline justify-between">
                  <div class="mono-label text-accent-bronze">
                    Patent {{ String(i + 1).padStart(2, '0') }} / {{ String(sortedPatents.length).padStart(2, '0') }}
                  </div>
                  <div class="mono-label text-ink-faint">{{ p.issued_at }}</div>
                </div>

                <!-- 메인 -->
                <div class="relative z-10 mt-auto">
                  <h3 class="italic font-medium text-xl md:text-2xl tracking-[-0.015em] leading-tight group-hover:text-accent-bronze transition-colors duration-500">
                    {{ p.name }}
                  </h3>
                  <p v-if="p.description" class="mt-3 text-ink-dim text-sm font-light leading-relaxed line-clamp-2">
                    {{ p.description }}
                  </p>
                </div>

                <!-- 하단 번호 + VIEW -->
                <div class="relative z-10 mt-6 pt-3 border-t border-paper-line flex justify-between items-baseline text-xs">
                  <span class="font-mono text-ink-muted">{{ p.cert_number }}</span>
                  <span class="mono-label text-accent-bronze opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    VIEW →
                  </span>
                </div>
              </button>
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
              <h2 class="mt-6 italic font-light text-display-sm text-ink">
                국제 표준으로 입증한<br>
                <span class="text-accent-bronze">품질·환경 인증</span>.
              </h2>
            </div>
            <div class="md:col-span-5 md:text-right">
              <NuxtLink
                to="/certifications"
                class="group inline-flex items-center gap-5 md:gap-6"
              >
                <span class="italic text-xl md:text-2xl text-ink group-hover:text-accent-bronze transition-colors duration-500">
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

    <!-- ═══════════════ 모달 오버레이 ═══════════════ -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out-expo"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-400 ease-out-expo"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="openedIdx !== null"
        class="fixed inset-0 z-[100] bg-dark/85 backdrop-blur-md flex items-center justify-center p-6 md:p-10 cursor-pointer"
        @click="close"
      >
        <!-- 모달 콘텐츠 -->
        <Transition
          appear
          enter-active-class="transition-all duration-600 ease-out-expo"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-400"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="openedPatent"
            class="relative max-w-6xl w-full bg-paper flex flex-col md:flex-row max-h-[90vh] overflow-hidden cursor-default"
            @click.stop
          >
            <!-- 닫기 버튼 -->
            <button
              @click="close"
              class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-ink-muted hover:text-accent-bronze transition-colors text-2xl"
              aria-label="Close"
            >
              ×
            </button>

            <!-- 좌: JPG 이미지 (PDF 폴백 제거, JPG만 사용) -->
            <div class="md:w-3/5 bg-paper-soft flex items-center justify-center p-8 md:p-10 relative min-h-[300px]">
              <span class="absolute top-4 left-4 mono-label text-accent-bronze">
                Patent {{ String((openedIdx ?? 0) + 1).padStart(2, '0') }}
              </span>
              <img
                v-if="openedFile && !imgFailed"
                :src="assetUrl(openedFile.img)"
                :alt="openedPatent.name"
                class="max-w-full max-h-[80vh] md:max-h-[78vh] w-auto h-auto object-contain"
                @error="onImgFail"
              />
              <div v-else class="text-center">
                <p class="mono-label text-ink-faint">특허 이미지 대기 중</p>
                <p class="mono-label text-ink-faint mt-2 opacity-60">
                  {{ openedFile ? openedFile.img.split('/').pop() : '' }}
                </p>
              </div>
            </div>

            <!-- 우: 특허 정보 -->
            <div class="md:w-2/5 p-8 md:p-12 flex flex-col">
              <div class="mono-label text-accent-bronze">
                Registered · {{ openedPatent.issued_at }}
              </div>

              <h2 class="mt-6 italic font-medium text-2xl md:text-[32px] leading-tight tracking-[-0.015em]">
                {{ openedPatent.name }}
              </h2>

              <p v-if="openedPatent.description" class="mt-5 text-ink-dim leading-relaxed font-light text-sm md:text-base">
                {{ openedPatent.description }}
              </p>

              <div class="mt-auto pt-6 border-t border-paper-line">
                <div class="flex items-baseline justify-between mb-2">
                  <span class="mono-label text-ink-muted">등록번호</span>
                  <span class="font-mono text-ink">{{ openedPatent.cert_number }}</span>
                </div>
                <div class="flex items-baseline justify-between">
                  <span class="mono-label text-ink-muted">등록일</span>
                  <span class="mono-label text-ink">{{ openedPatent.issued_at }}</span>
                </div>

              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
