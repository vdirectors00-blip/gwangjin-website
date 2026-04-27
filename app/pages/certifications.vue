<script setup lang="ts">
definePageMeta({ layout: 'home' })
useHead({ title: '품질·환경 인증 | 광진실업' })

const { data: certs } = await useCertifications('certification')

// 한국인증원 QER 표시 제외
const visibleCerts = computed(() =>
  (certs.value || []).filter(c => !c.cert_type.includes('한국인증원'))
)

const certFiles: Record<string, Array<{ pdf: string; img: string; label: string }>> = {
  'ISO 9001': [
    { pdf: '/certificates/iso-9001.pdf', img: '/certificates/images/iso-9001-kor.jpg', label: '국문' },
    { pdf: '/certificates/iso-9001.pdf', img: '/certificates/images/iso-9001-eng.jpg', label: 'ENG' },
  ],
  'ISO 14001': [
    { pdf: '/certificates/iso-14001.pdf', img: '/certificates/images/iso-14001-kor.jpg', label: '국문' },
    { pdf: '/certificates/iso-14001.pdf', img: '/certificates/images/iso-14001-eng.jpg', label: 'ENG' },
  ],
  '이노비즈(Inno-Biz)': [
    { pdf: '/certificates/innobiz.pdf',   img: '/certificates/images/innobiz.jpg',       label: '확인서' },
  ],
}

const assetUrl = useAssetUrl()

const selectedIdx = ref<number | null>(null)
const selectedCert = computed(() => {
  if (selectedIdx.value === null) return null
  return visibleCerts.value[selectedIdx.value]
})
const selectedFiles = computed(() => {
  const c = selectedCert.value
  return c ? (certFiles[c.cert_type] || []) : []
})

const selectCert = (i: number) => {
  selectedIdx.value = selectedIdx.value === i ? null : i
}

const imgFailed = ref<Record<number, boolean>>({})
const onImgFail = (idx: number) => { imgFailed.value[idx] = true }

// ESC 키로 모달(모바일) 닫기
onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') selectedIdx.value = null
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})

// 1-file일 때 이미지 자연 비율을 측정해서 JPG 컨테이너 너비에 반영 (여백 최소화)
const oneFileAspect = ref<number>(0.71)   // 기본 A4 포트레이트
const CONTAINER_H = 480
const CONTAINER_MAX_W = 1152

watch(selectedIdx, (idx) => {
  if (idx === null) return
  const files = selectedFiles.value
  if (files.length !== 1) return
  const img = new Image()
  img.onload = () => {
    if (img.naturalHeight > 0) {
      oneFileAspect.value = img.naturalWidth / img.naturalHeight
    }
  }
  img.src = files[0].img
})

const onefileJpgPct = computed(() => {
  const imgWidth = CONTAINER_H * oneFileAspect.value
  return Math.min(44, (imgWidth / CONTAINER_MAX_W) * 100)
})

// ─── 카드 위치 계산 (absolute layout) ───
// 기본: 3개 카드 균등 배치 (각 31%, 갭 3.5%)
// 선택 시: 해당 카드는 왼쪽 0%로 이동 + 38% 너비, 다른 카드는 제자리에서 흐려짐
const cardStyle = (i: number) => {
  const defaultLeft = i * 34.5
  const defaultWidth = 31

  const sel = selectedIdx.value
  if (sel === null) {
    return {
      left: `${defaultLeft}%`,
      width: `${defaultWidth}%`,
      opacity: 1,
      transform: 'scale(1)',
      filter: 'blur(0)',
      zIndex: 1,
      pointerEvents: 'auto',
    }
  }
  if (sel === i) {
    const numFiles = (certFiles[visibleCerts.value[i].cert_type] || []).length
    // 2 파일: 40%, 1 파일: JPG 너비 맞춰서 남은 공간
    const width = numFiles > 1 ? '40%' : `${Math.max(50, 96 - onefileJpgPct.value)}%`
    return {
      left: '0%',
      width,
      opacity: 1,
      transform: 'scale(1)',
      filter: 'blur(0)',
      zIndex: 10,
      pointerEvents: 'auto',
      boxShadow: '0 30px 60px -15px rgba(139,115,85,0.45)',
    }
  }
  return {
    left: `${defaultLeft}%`,
    width: `${defaultWidth}%`,
    opacity: 0.18,
    transform: 'scale(0.95)',
    filter: 'blur(4px)',
    zIndex: 1,
    pointerEvents: 'none',
  }
}

// JPG 컨테이너: 우측에서 슬라이드 인
// 2개: 56% 고정 / 1개: 이미지 자연 비율에 맞춰 자동 (여백 제거)
const jpgStyle = computed(() => {
  if (selectedIdx.value === null) {
    return { width: '0%', opacity: 0, pointerEvents: 'none' }
  }
  const width = selectedFiles.value.length > 1 ? '56%' : `${onefileJpgPct.value}%`
  return { width, opacity: 1, pointerEvents: 'auto' }
})
</script>

<template>
  <div>
    <div class="h-[76px]" />
    <CommonSubNav section="technology" accent="eco" />

    <div id="cert-snap" class="h-[calc(100vh-156px)] overflow-y-auto no-scrollbar">
      <HomeSnapController container="cert-snap" :duration="600" :cooldown="700" />

      <!-- ───── 1. Intro ───── -->
      <section class="relative min-h-[calc(100vh-156px)] bg-white flex items-center px-6 md:px-10 lg:px-16 py-16 overflow-hidden">
        <div
          class="absolute inset-0 pointer-events-none opacity-50"
          style="background-image: linear-gradient(to right, rgba(139,115,85,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,115,85,0.06) 1px, transparent 1px); background-size: 80px 80px;"
        />
        <div class="relative z-10 max-w-container mx-auto w-full">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
            <div class="md:col-span-6">
              <p class="mono-label text-accent-bronze mb-6 ink-fade" style="animation-delay: 0ms;">
                Certifications · 품질·환경 인증
              </p>
              <h1 class="font-light text-[clamp(40px,5vw,72px)] leading-[1.15] tracking-[-0.025em] text-ink-dim">
                <span class="block ink-fade" style="animation-delay: 120ms;">검증된 시스템으로</span>
                <span class="block ink-fade" style="animation-delay: 380ms;">
                  <span class="text-accent-bronze">증명한</span> 신뢰.
                </span>
              </h1>
              <div class="mt-8 w-16 h-px bg-ink/30 ink-fade" style="animation-delay: 640ms;" />
            </div>
            <div class="md:col-span-6">
              <p class="text-ink-dim text-base md:text-lg leading-[1.9] font-light whitespace-pre-line ink-fade" style="animation-delay: 520ms;">{{
                `ISO 9001(품질) · ISO 14001(환경) · 이노비즈.
세 가지 공식 인증으로 광진실업의 품질·환경 시스템을 외부에 공증합니다.`
              }}</p>
            </div>
          </div>

          <div class="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end ink-fade" style="animation-delay: 820ms;">
            <div class="md:col-span-4">
              <div class="font-light text-[clamp(110px,12vw,180px)] text-accent-bronze/80 tracking-[-0.04em] leading-none">03</div>
              <p class="mono-label text-ink-muted mt-3">Active Certifications</p>
            </div>
            <div class="md:col-span-8 md:border-l md:border-paper-line md:pl-10">
              <ul class="space-y-3">
                <li v-for="item in [
                  { name: 'ISO 9001',   sub: '품질경영시스템 — KS Q' },
                  { name: 'ISO 14001',  sub: '환경경영시스템 — KSI' },
                  { name: 'Inno-Biz',   sub: '기술혁신형 중소기업' },
                ]" :key="item.name"
                  class="flex items-baseline justify-between border-b border-paper-line/60 pb-3"
                >
                  <span class="font-medium text-lg md:text-xl tracking-[-0.015em] text-ink">{{ item.name }}</span>
                  <span class="mono-label text-ink-muted">{{ item.sub }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 2. Official Records (슬라이드 인터랙션) ───── -->
      <section class="min-h-[calc(100vh-156px)] bg-paper-soft border-t border-paper-line flex flex-col px-6 md:px-10 lg:px-16 py-8 md:py-10">
        <div class="max-w-container mx-auto w-full flex-1 flex flex-col">
          <div class="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <p class="eyebrow text-ink-muted">Official Records</p>
              <h2 class="mt-3 font-medium text-[clamp(28px,3.5vw,48px)] tracking-[-0.03em]">공식 인증 기록</h2>
            </div>
            <Transition
              enter-active-class="transition duration-500" enter-from-class="opacity-0" enter-to-class="opacity-100"
              leave-active-class="transition duration-300" leave-from-class="opacity-100" leave-to-class="opacity-0"
            >
              <button v-if="selectedIdx !== null" @click="selectedIdx = null"
                class="mono-label text-ink-muted hover:text-accent-bronze transition-colors"
              >
                ← 전체 보기
              </button>
            </Transition>
          </div>

          <!-- 본문: 클릭 영역을 본문 전체로 확장 -->
          <div
            class="flex-1 flex items-center justify-center min-h-0"
            :class="selectedIdx !== null ? 'cursor-pointer' : ''"
            @click="selectedIdx = null"
          >
            <!-- Desktop: absolute layout with sliding -->
            <div
              class="hidden md:block relative w-full max-w-6xl mx-auto"
              style="height: 480px;"
            >
              <!-- 3 카드 (absolute positioned) -->
              <button
                v-for="(c, i) in visibleCerts" :key="c.id"
                type="button"
                @click.stop="selectCert(i)"
                class="absolute top-0 bottom-0 bg-white p-8 md:p-10 group flex flex-col text-left overflow-hidden"
                style="transition: all 700ms cubic-bezier(0.16, 1, 0.3, 1);"
                :style="cardStyle(i)"
              >
                <span class="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-bronze/60 pointer-events-none" />
                <span class="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-bronze/60 pointer-events-none" />
                <span class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent-bronze/60 pointer-events-none" />
                <span class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-bronze/60 pointer-events-none" />

                <!-- 도장 -->
                <div
                  :class="[
                    'absolute top-6 right-6 w-14 h-14 rounded-full border border-dashed flex items-center justify-center transition-all duration-700 ease-out-expo',
                    selectedIdx === i ? 'border-accent-bronze rotate-0' : 'border-accent-bronze/40 -rotate-12 group-hover:rotate-0',
                  ]"
                >
                  <div class="absolute inset-1 rounded-full border border-accent-bronze/30" />
                  <div class="text-center relative z-10">
                    <div class="mono-label text-accent-bronze text-[7px] leading-tight">VERIFIED</div>
                    <div class="font-mono text-accent-bronze text-[9px] mt-0.5">★</div>
                  </div>
                </div>

                <div class="mono-label text-accent-bronze">
                  No. {{ String(i + 1).padStart(2, '0') }} / {{ String(visibleCerts.length).padStart(2, '0') }}
                </div>

                <div class="mt-auto">
                  <p class="mono-label text-ink-muted">{{ c.cert_type }}</p>
                  <h3
                    :class="[
                      'italic font-medium tracking-[-0.015em] leading-tight transition-all duration-700 ease-out-expo',
                      selectedIdx === i ? 'text-3xl md:text-[34px] mt-3' : 'text-xl md:text-2xl mt-2',
                    ]"
                  >
                    {{ c.name }}
                  </h3>
                  <p
                    v-if="c.description && selectedIdx === i"
                    class="mt-3 text-ink-dim leading-relaxed font-light text-sm"
                  >
                    {{ c.description }}
                  </p>
                </div>

                <div class="mt-4 pt-3 border-t border-paper-line flex justify-between items-baseline text-xs">
                  <span v-if="c.cert_number" class="font-mono text-ink-muted">№ {{ c.cert_number }}</span>
                  <span v-else class="font-mono text-ink-muted">CERTIFIED</span>
                  <span v-if="c.issued_at" class="mono-label text-ink-muted">{{ c.issued_at }}</span>
                </div>
              </button>

              <!-- JPG 컨테이너 (우측 슬라이드 인) -->
              <div
                class="absolute top-0 bottom-0 right-0 overflow-hidden"
                style="transition: all 700ms cubic-bezier(0.16, 1, 0.3, 1);"
                :style="jpgStyle"
                @click.stop
              >
                <div class="h-full pl-6">
                  <div
                    :class="[
                      'grid gap-3 md:gap-4 h-full',
                      selectedFiles.length === 1 ? 'grid-cols-1' : 'grid-cols-2',
                    ]"
                  >
                    <div
                      v-for="(file, fi) in selectedFiles" :key="fi"
                      class="relative bg-white border border-accent-bronze/40 overflow-hidden"
                    >
                      <img
                        v-if="!imgFailed[fi]"
                        :src="assetUrl(file.img)"
                        :alt="file.label"
                        class="absolute inset-0 w-full h-full object-contain bg-white"
                        loading="lazy"
                        @error="onImgFail(fi)"
                      />
                      <iframe
                        v-else
                        :src="`${assetUrl(file.pdf)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`"
                        class="absolute inset-0 w-full h-full pointer-events-none"
                        loading="lazy"
                      />
                      <div v-if="selectedFiles.length > 1" class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-3 py-2">
                        <div class="mono-label text-accent-bronze">{{ file.label }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile: 카드 stack — 클릭 시 풀스크린 모달 (patents 패턴)
              부모 div의 @click="selectedIdx = null" 버블링 차단 위해 @click.stop -->
            <div class="md:hidden w-full space-y-4" @click.stop>
              <button v-for="(c, i) in visibleCerts" :key="c.id"
                type="button"
                @click.stop="selectCert(i)"
                class="w-full bg-white p-6 text-left border border-accent-bronze/30 hover:border-accent-bronze/60 transition-colors block relative"
              >
                <!-- 모서리 마커 -->
                <span class="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-bronze/60 pointer-events-none" />
                <span class="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-bronze/60 pointer-events-none" />
                <span class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent-bronze/60 pointer-events-none" />
                <span class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-bronze/60 pointer-events-none" />

                <p class="mono-label text-accent-bronze">{{ c.cert_type }}</p>
                <h3 class="font-medium text-xl mt-2">{{ c.name }}</h3>
                <div class="mt-4 pt-3 border-t border-paper-line flex justify-between items-baseline">
                  <span v-if="c.cert_number" class="font-mono text-ink-muted text-xs">№ {{ c.cert_number }}</span>
                  <span v-else class="mono-label text-ink-muted">CERTIFIED</span>
                  <span class="mono-label text-accent-bronze">VIEW →</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 3. Next + Footer (라이트 paper-soft 톤) ───── -->
      <section class="min-h-[calc(100vh-156px)] bg-paper-soft text-ink flex flex-col border-t border-paper-line/60">
        <div class="flex-1 flex items-center px-6 md:px-10 lg:px-16 py-16">
          <div class="max-w-container mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div class="md:col-span-7">
              <p class="eyebrow text-ink-muted">Next</p>
              <h2 class="mt-6 font-light text-display-sm text-ink">
                자체 기술의 또 다른 증명,<br>
                <span class="text-accent-bronze">등록 특허 4건</span>.
              </h2>
            </div>
            <div class="md:col-span-5 md:text-right">
              <NuxtLink
                to="/patents"
                class="group inline-flex items-center gap-5 md:gap-6"
              >
                <span class="text-xl md:text-2xl text-ink group-hover:text-accent-bronze transition-colors duration-500">
                  특허 보기
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

    <!-- ═══════════════ 모바일 전용 모달 (patents 패턴) ═══════════════ -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out-expo"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-400 ease-out-expo"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedIdx !== null && selectedCert"
        class="md:hidden fixed inset-0 z-[100] bg-dark/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        @click="selectedIdx = null"
      >
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
            class="relative max-w-md w-full max-h-[90vh] bg-white flex flex-col overflow-hidden cursor-default"
            @click.stop
          >
            <!-- 닫기 -->
            <button
              @click="selectedIdx = null"
              class="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center text-ink-muted hover:text-accent-bronze transition-colors text-2xl"
              aria-label="Close"
            >
              ×
            </button>

            <!-- 헤더 -->
            <div class="px-6 pt-7 pb-4 border-b border-paper-line">
              <p class="mono-label text-accent-bronze">{{ selectedCert.cert_type }}</p>
              <h2 class="mt-2 font-medium text-2xl tracking-[-0.015em]">{{ selectedCert.name }}</h2>
            </div>

            <!-- 인증서 이미지(들) -->
            <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-paper-soft">
              <div
                v-for="(file, fi) in selectedFiles" :key="fi"
                class="relative aspect-[3/4] bg-white border border-accent-bronze/40 overflow-hidden"
              >
                <img
                  v-if="!imgFailed[fi]"
                  :src="assetUrl(file.img)"
                  :alt="file.label"
                  class="absolute inset-0 w-full h-full object-contain bg-white"
                  loading="lazy"
                  @error="onImgFail(fi)"
                />
                <iframe
                  v-else
                  :src="`${assetUrl(file.pdf)}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`"
                  class="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
                <div
                  v-if="selectedFiles.length > 1"
                  class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm px-3 py-2"
                >
                  <div class="mono-label text-accent-bronze">{{ file.label }}</div>
                </div>
              </div>
              <p v-if="selectedFiles.length === 0" class="text-center text-ink-faint text-sm py-8">
                인증서 파일 준비 중
              </p>
            </div>

            <!-- 푸터 -->
            <div
              v-if="selectedCert.cert_number || selectedCert.issued_at"
              class="px-6 py-4 border-t border-paper-line flex items-baseline justify-between text-xs"
            >
              <span v-if="selectedCert.cert_number" class="font-mono text-ink-muted">
                № {{ selectedCert.cert_number }}
              </span>
              <span v-else />
              <span v-if="selectedCert.issued_at" class="mono-label text-ink-muted">
                {{ selectedCert.issued_at }}
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
