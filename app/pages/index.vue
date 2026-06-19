<script setup lang="ts">
useSeo({
  title: '광진실업 | COSY FEEL',
  description: '주식회사 광진실업(COSY FEEL) — 1994년부터 부직포·제면 분야에서 이불솜과 침대 부자재를 생산하는 충전재 전문 제조사. ISO 9001·14001 인증, 특허 4건, 20가지 충전재 라인업.',
  path: '/',
})

definePageMeta({ layout: 'home' })

const { data: company } = await useCompanyInfo()
const { data: allProducts } = await useProducts()
const { data: certs } = await useCertifications('certification')
const { data: patents } = await useCertifications('patent')

const sections = [
  { key: 'hero',       label: 'HERITAGE',  dark: true  },
  { key: 'intro',      label: 'ABOUT',     dark: false },
  { key: 'technology', label: 'TRUST',     dark: true  },
  { key: 'contact',    label: 'CONTACT',   dark: true  },
]

// 제품 수: DB 기준 (없으면 12 폴백)
const productCount = computed(() => allProducts.value?.length || 12)

// stats — 메인레퍼 스타일 (큰 숫자 + 작은 단위 + 하단 라벨)
const stats = computed(() => {
  const c = company.value
  return [
    { num: c?.founded_year ? String(c.founded_year) : '1994', unit: '년',   label: '설립' },
    { num: String(c?.production_lines ?? 5),                  unit: '라인', label: '생산 시설' },
    { num: String(productCount.value),                       unit: '종',   label: '제품군' },
    { num: String(c?.patent_count ?? 4),                      unit: '건',   label: '등록 특허' },
  ]
})

// 인트로 섹션 소재 이미지용
const assetUrl = useAssetUrl()

// cert_type "이노비즈(Inno-Biz)" → 모바일에서 한글 / (영문) 두 줄 분리
const splitCertType = (str: string): [string, string?] => {
  const m = str.match(/^(.+?)\s*(\([^)]+\))$/)
  return m ? [m[1]!.trim(), m[2]] : [str]
}

// cert name "기술혁신형 중소기업 인증" → 모바일에서 마지막 단어("인증") 분리
const splitCertName = (str: string): [string, string?] => {
  const idx = str.lastIndexOf(' ')
  if (idx <= 0 || str.length <= 6) return [str]
  return [str.slice(0, idx), str.slice(idx + 1)]
}
</script>

<template>
  <div>
    <!-- dot nav (우측) -->
    <HomeDotNav :sections="sections" container="snap" />
    <!-- 커스텀 스냅 스크롤 컨트롤러 -->
    <HomeSnapController container="snap" :duration="1000" :cooldown="1100" />

    <!-- 스냅 컨테이너 -->
    <div id="snap" class="snap-container">
      <!-- ================================================
        1. HERO — 단일 정적 화면 (가정집 침실)
      ================================================ -->
      <section class="snap-section h-[88vh] md:h-screen">
        <HomeHeroChapters />
      </section>

      <!-- ================================================
        2. INTRO — 메인레퍼 스타일 (좌 카피 + 우 큰숫자 통계)
      ================================================ -->
      <section class="snap-section bg-white px-6 md:px-10 lg:px-16 py-20 md:py-0 flex items-center">
        <div class="max-w-[1280px] mx-auto w-full">
          <!-- 상단: 좌 카피 + 우 이미지 -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
            <!-- 좌: 헤드라인 + 카피 + CTA -->
            <div class="md:col-span-6">
              <p class="eyebrow text-ink-muted">About · 소개</p>
              <h2 v-reveal="120" class="mt-7 font-light text-[clamp(28px,3.6vw,48px)] leading-[1.18] tracking-[-0.03em] text-ink-dim">
                보이지 않는 곳에서,<br>
                <span class="text-accent-bronze">하루의 온도</span>를 만듭니다.
              </h2>
              <p class="mt-7 font-light text-[clamp(13px,1.05vw,16px)] leading-[1.85] tracking-[-0.01em] text-ink-dim max-w-md">
                <span v-reveal="200" class="block">이불 속의 솜, 매트리스의 결, 겨울옷의 안쪽.</span>
                <span v-reveal="340" class="block">드러나지 않아도 가장 가까이에서</span>
                <span v-reveal="480" class="block">감촉과 온도를 결정하는 재료를 만듭니다.</span>
              </p>

              <NuxtLink
                to="/about"
                class="group mt-9 inline-flex items-center gap-2 rounded-full pl-5 pr-2.5 py-2 bg-white border border-ink text-ink text-[11px] font-medium tracking-[0.06em] uppercase hover:bg-ink hover:text-paper hover:-translate-y-0.5 hover:shadow-lg transition-all duration-500 ease-out-expo"
              >
                <span>About COSY&nbsp;FEEL</span>
                <span class="inline-flex items-center justify-center w-5 h-5 rounded-full border border-paper-line group-hover:bg-white group-hover:border-paper group-hover:translate-x-0.5 group-hover:-rotate-45 transition-all duration-500 ease-out-expo">
                  <svg width="9" height="9" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </NuxtLink>
            </div>

            <!-- 우: 이미지 (소재/직물) -->
            <div v-reveal="280" class="md:col-span-6">
              <div class="relative aspect-[4/3] overflow-hidden bg-paper-warm">
                <div
                  class="absolute inset-0 bg-cover bg-center transition-transform duration-[1400ms] ease-out-expo hover:scale-[1.04]"
                  :style="`background-image:url('${assetUrl('/images/bg/about.jpg')}'); filter: grayscale(20%) contrast(1.02);`"
                />
                <!-- 코너 프레임 -->
                <span class="absolute top-3 left-3 w-5 h-5 border-t border-l border-paper/70 pointer-events-none" />
                <span class="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-paper/70 pointer-events-none" />
              </div>
            </div>
          </div>

          <!-- 하단: 통계 스트립 (전체 폭) -->
          <div v-reveal="200" class="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-8 border-t border-paper-line pt-8">
            <div
              v-for="(s, i) in stats" :key="s.label"
              :class="['relative', i > 0 ? 'md:border-l md:border-paper-line md:pl-8' : '']"
            >
              <div class="flex items-baseline">
                <span class="text-[clamp(36px,4vw,56px)] font-medium tracking-[-0.02em] text-accent-bronze leading-none">
                  {{ s.num }}
                </span>
                <span class="ml-1 text-base text-ink-muted font-light">{{ s.unit }}</span>
              </div>
              <p class="mt-3 text-xs text-ink-muted tracking-wider">{{ s.label }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================
        3. TECHNOLOGY / TRUST — 흰 배경
      ================================================ -->
      <section class="snap-section bg-white text-ink px-6 md:px-10 lg:px-16 py-20 md:py-0 flex items-center relative overflow-hidden">
        <!-- 원형 스탬프 우상 -->
        <div
          aria-hidden
          class="absolute top-[8%] right-[4%] w-44 h-44 rounded-full border border-ink/10 flex items-center justify-center -rotate-12"
        >
          <div class="absolute inset-3 rounded-full border border-dashed border-ink/15" />
          <div class="font-mono text-[9px] tracking-[0.32em] text-ink/40 text-center leading-relaxed">
            CERTIFIED<br>SINCE<br>1994
          </div>
        </div>

        <div class="relative z-10 max-w-[1300px] mx-auto w-full">
          <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-16 mb-16 md:mb-24">
            <div>
              <p v-reveal class="eyebrow text-ink-muted">Technology · Trust</p>
              <h2 class="mt-11 font-medium text-display-md text-ink leading-[1.02]">
                <span v-reveal="220" class="block">증명서는</span>
                <span v-reveal="420" class="block">우리가 드리는 조용한 약속.</span>
              </h2>
            </div>
            <div v-reveal="620" class="text-[13px] text-ink-dim max-w-[280px] leading-[1.7] md:text-right">
              국제 표준과 자체 기술로 쌓아 온 인증과 특허.<br>
              <NuxtLink to="/certifications" class="text-accent-bronze text-xs hover:opacity-80">
                전체 인증 보기&nbsp;&nbsp;→
              </NuxtLink>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <!-- 인증 — 라이트 톤 -->
            <div>
              <div class="mono-label text-ink-muted mb-9">
                CERTIFICATIONS &nbsp;·&nbsp; {{ certs?.length || 4 }}
              </div>
              <div class="border-t border-ink/20">
                <div
                  v-for="c in (certs || [])" :key="c.id"
                  v-reveal="100"
                  class="group flex justify-between items-baseline gap-3 py-6 px-4 border-b border-ink/10 cursor-default hover:bg-ink/[0.03] transition-colors duration-400"
                >
                  <!-- 좌: cert_type — 셀 안에서만 모바일 줄바꿈 (이노비즈 / (Inno-Biz)) -->
                  <span class="font-medium text-[20px] md:text-[22px] tracking-[-0.015em] text-ink group-hover:text-accent-bronze transition-colors duration-400 leading-tight">
                    <template v-for="(part, idx) in splitCertType(c.cert_type)" :key="idx">
                      <br v-if="idx > 0" class="md:hidden">
                      <span>{{ part }}</span>
                    </template>
                  </span>
                  <!-- 우: name — 셀 안에서만 모바일 줄바꿈 (앞부분 / 인증) -->
                  <span class="text-[11px] md:text-xs text-ink-muted tracking-[0.12em] group-hover:text-ink-dim transition-colors duration-400 leading-relaxed text-right">
                    <template v-for="(part, idx) in splitCertName(c.name)" :key="idx">
                      <br v-if="idx > 0" class="md:hidden">
                      <span>{{ part }}</span>
                    </template>
                  </span>
                </div>
              </div>
            </div>

            <!-- 특허 — 라이트 톤 -->
            <div>
              <div class="mono-label text-accent-bronze mb-9">
                PATENTS &nbsp;·&nbsp; {{ patents?.length || 4 }} REGISTERED
              </div>
              <div class="border-t border-ink/20">
                <div
                  v-for="p in (patents || [])" :key="p.id"
                  v-reveal="200"
                  class="group py-6 px-4 border-b border-ink/10 cursor-default hover:bg-ink/[0.03] transition-colors duration-400"
                >
                  <div class="font-medium text-lg tracking-[-0.01em] text-ink group-hover:text-accent-bronze transition-colors duration-400 leading-snug">
                    {{ p.name }}
                  </div>
                  <div class="mt-2 mono-label text-ink-muted group-hover:text-ink-dim transition-colors duration-400">
                    {{ p.cert_number }} &nbsp;·&nbsp; {{ p.issued_at }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================
        4. CONTACT — Cut-corner cards (paper-soft 회색으로 Footer와 구분)
      ================================================ -->
      <section class="snap-section bg-paper-soft text-ink px-6 md:px-10 lg:px-16 py-20 md:py-0 flex items-center relative overflow-hidden">
        <div class="max-w-[1320px] mx-auto w-full relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-[6fr_5fr] gap-12 md:gap-24 items-center">
            <!-- 좌측 카피 -->
            <div>
              <p v-reveal class="eyebrow text-ink-muted">Inquiries</p>
              <h2 v-reveal="180" class="mt-10 font-light text-display-lg text-ink">
                편하게,<br>
                <span class="text-accent-bronze">말씀</span>주세요.
              </h2>
              <p v-reveal="360" class="mt-10 text-[15px] leading-[1.85] text-ink-dim font-light max-w-[460px]">
                담당자가 직접 답변드립니다.
              </p>

              <NuxtLink
                to="/contact"
                class="group mt-16 inline-flex items-center gap-6 py-3.5 text-ink relative"
              >
                <span class="font-normal text-[28px] tracking-[-0.02em] group-hover:text-accent-bronze group-hover:translate-x-0.5 transition-all duration-500 ease-out-expo">
                  문의 보내기
                </span>
                <span class="inline-flex items-center justify-center w-12 h-12 rounded-full border border-ink/40 group-hover:border-accent-bronze group-hover:text-accent-bronze group-hover:translate-x-3 group-hover:-rotate-45 transition-all duration-500 ease-out-expo">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span class="absolute left-0 bottom-1.5 h-px bg-accent-bronze w-0 group-hover:w-[calc(100%-60px)] transition-[width] duration-500 ease-out-expo" />
              </NuxtLink>
            </div>

            <!-- 우측: 네모 → 아키텍처 블루프린트 스타일 카드 -->
            <div class="flex flex-col gap-3.5">
              <div
                v-for="(c, i) in [
                  { k: 'TEL',   v: company?.tel || '032-582-4147',             sub: '대표 전화' },
                  { k: 'EMAIL', v: company?.email || 'kjin137@naver.com',    sub: '이메일 문의' },
                  { k: 'VISIT', v: company?.address || '인천 서구 가정로 58번길 3', sub: '본사 · 공장 방문' },
                  { k: 'HOURS', v: company?.business_hours || '월 — 금 08:30 - 17:30', sub: '업무 시간' },
                ]" :key="c.k"
                v-reveal="i * 100"
                class="group relative px-8 py-7 bg-ink/[0.02] hover:bg-ink/[0.04] hover:-translate-x-3 transition-all duration-500 ease-out-expo cursor-default overflow-hidden"
              >
                <!-- 외곽 1px 하이라인 (모든 변) -->
                <span class="absolute inset-0 border border-ink/15 group-hover:border-ink/35 transition-colors duration-500 pointer-events-none" />
                <!-- 좌측 bronze 엑센트 바 (hover) -->
                <span class="absolute left-0 top-4 bottom-4 w-[2px] bg-accent-bronze scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500 ease-out-expo" />
                <!-- 상단-우측 L 브래킷 (아키텍처 블루프린트 마크) -->
                <span class="absolute top-0 right-0 w-4 h-4 pointer-events-none">
                  <span class="absolute top-0 right-0 w-4 h-px bg-ink/40 group-hover:bg-accent-bronze transition-colors duration-500" />
                  <span class="absolute top-0 right-0 w-px h-4 bg-ink/40 group-hover:bg-accent-bronze transition-colors duration-500" />
                </span>
                <!-- 하단-좌측 L 브래킷 (대칭) -->
                <span class="absolute bottom-0 left-0 w-4 h-4 pointer-events-none">
                  <span class="absolute bottom-0 left-0 w-4 h-px bg-ink/40 group-hover:bg-accent-bronze transition-colors duration-500" />
                  <span class="absolute bottom-0 left-0 w-px h-4 bg-ink/40 group-hover:bg-accent-bronze transition-colors duration-500" />
                </span>

                <div class="relative mono-label text-ink-muted group-hover:text-accent-bronze transition-colors duration-500">
                  {{ String(i + 1).padStart(2, '0') }} &nbsp;/&nbsp; {{ c.k }}
                </div>
                <!-- 폰트 사이즈 고정 (흔들림 방지) -->
                <div class="relative mt-2.5 font-normal text-xl tracking-[-0.015em] text-ink leading-tight">
                  {{ c.v }}
                </div>
                <div class="relative mt-1.5 text-[11px] tracking-[0.2em] text-ink-muted group-hover:text-ink-dim transition-colors duration-500">
                  {{ c.sub }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================
        Footer (마지막 섹션)
      ================================================ -->
      <CommonSiteFooter />
    </div>
  </div>
</template>
