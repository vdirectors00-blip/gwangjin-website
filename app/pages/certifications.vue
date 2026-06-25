<script setup lang="ts">
definePageMeta({ layout: 'home' })
useSeo({
  title: '품질·환경 인증 | 광진실업',
  description: '광진실업 품질·환경 인증 — ISO 9001 품질경영, ISO 14001 환경경영, 이노비즈(Inno-Biz) 인증을 보유한 충전재 제조사 COSY FEEL.',
  path: '/certifications',
})

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

const filesFor = (certType: string) => certFiles[certType] || []

// 카드 이미지 로드 실패 추적 (cert.id → 실패 여부)
const thumbFailed = ref<Record<number, boolean>>({})
const onThumbFail = (id: number) => { thumbFailed.value[id] = true }
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
          class="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.30]"
          :style="`background-image:url('${assetUrl('/images/bg/sub-certs.jpg')}'); filter: grayscale(55%) brightness(1.04);`"
        />
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
              <h1 class="font-normal text-[clamp(40px,5vw,72px)] leading-[1.15] tracking-[-0.025em] text-ink-dim">
                <span class="block ink-fade" style="animation-delay: 120ms;">검증된 시스템으로</span>
                <span class="block ink-fade" style="animation-delay: 380ms;">
                  <span class="text-accent-bronze">증명한</span> 신뢰.
                </span>
              </h1>
              <div class="mt-8 w-16 h-px bg-ink/30 ink-fade" style="animation-delay: 640ms;" />
            </div>
            <div class="md:col-span-6">
              <p class="text-ink-dim text-base md:text-lg leading-[1.9] font-normal whitespace-pre-line ink-fade" style="animation-delay: 520ms;">{{
                `ISO 9001(품질) · ISO 14001(환경) · 이노비즈.
세 가지 공식 인증으로 광진실업의 품질·환경 시스템을 외부에 공증합니다.`
              }}</p>
            </div>
          </div>

          <div class="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-end ink-fade" style="animation-delay: 820ms;">
            <div class="md:col-span-4">
              <div class="font-normal text-[clamp(110px,12vw,180px)] text-accent-bronze/80 tracking-[-0.04em] leading-none">03</div>
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

      <!-- ───── 2. Official Records — 인증서 직접 노출 (토글 없음) ───── -->
      <section class="min-h-[calc(100vh-156px)] bg-paper-soft border-t border-paper-line flex flex-col px-6 md:px-10 lg:px-16 py-7 md:py-9">
        <div class="max-w-container mx-auto w-full flex-1 flex flex-col">
          <div class="mb-5 md:mb-7">
            <p class="eyebrow text-ink-muted">Official Records</p>
            <h2 class="mt-3 font-medium text-[clamp(28px,3.5vw,48px)] tracking-[-0.03em]">공식 인증 기록</h2>
          </div>

          <!-- 카드 그리드: 인증서 이미지를 바로 노출 -->
          <div class="flex-1 flex items-start">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mx-auto">
              <div
                v-for="(c, i) in visibleCerts" :key="c.id"
                class="bg-white text-left flex flex-col overflow-hidden border border-paper-line"
              >
                <!-- 인증서 이미지 (대표 1매 직접 노출) -->
                <div class="relative bg-paper-soft h-[clamp(240px,40vh,360px)] overflow-hidden">
                  <img
                    v-if="filesFor(c.cert_type).length && !thumbFailed[c.id]"
                    :src="assetUrl(filesFor(c.cert_type)[0].img)"
                    :alt="`${c.cert_type} 인증서`"
                    class="absolute inset-0 w-full h-full object-contain p-4"
                    loading="lazy"
                    @error="onThumbFail(c.id)"
                  />
                  <div v-else class="absolute inset-0 flex items-center justify-center">
                    <p class="mono-label text-ink-faint">인증서 준비 중</p>
                  </div>

                  <!-- 모서리 마커 -->
                  <span class="absolute top-2 left-2 w-3 h-3 border-t border-l border-accent-bronze/60 pointer-events-none" />
                  <span class="absolute top-2 right-2 w-3 h-3 border-t border-r border-accent-bronze/60 pointer-events-none" />
                  <span class="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-accent-bronze/60 pointer-events-none" />
                  <span class="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-accent-bronze/60 pointer-events-none" />
                </div>

                <!-- 캡션 -->
                <div class="p-5 md:p-6">
                  <div class="flex items-baseline justify-between">
                    <p class="mono-label text-accent-bronze">{{ c.cert_type }}</p>
                    <span class="mono-label text-ink-faint">No. {{ String(i + 1).padStart(2, '0') }}</span>
                  </div>
                  <h3 class="mt-2 font-medium text-lg md:text-xl tracking-[-0.015em] text-ink leading-snug">
                    {{ c.name }}
                  </h3>
                  <div class="mt-4 pt-3 border-t border-paper-line flex justify-between items-baseline text-xs">
                    <span v-if="c.cert_number" class="font-mono text-ink-muted">№ {{ c.cert_number }}</span>
                    <span v-else class="mono-label text-ink-muted">CERTIFIED</span>
                    <span v-if="c.issued_at" class="mono-label text-ink-muted">{{ c.issued_at }}</span>
                  </div>
                </div>
              </div>
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
              <h2 class="mt-6 font-medium text-display-sm text-ink">
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
  </div>
</template>
