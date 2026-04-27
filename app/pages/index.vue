<script setup lang="ts">
useHead({ title: '광진실업 | COSY FEEL' })

definePageMeta({ layout: 'home' })

const { data: company } = await useCompanyInfo()
const { data: highlights } = await useProducts({ onlyHighlight: true })
const { data: allProducts } = await useProducts()
const { data: certs } = await useCertifications('certification')
const { data: patents } = await useCertifications('patent')

const sections = [
  { key: 'hero',       label: 'HERITAGE',  dark: true  },
  { key: 'intro',      label: 'ABOUT',     dark: false },
  { key: 'materials',  label: 'MATERIALS', dark: false },
  { key: 'technology', label: 'TRUST',     dark: true  },
  { key: 'contact',    label: 'CONTACT',   dark: true  },
]

// stats (DB가 있으면 DB 기반, 없으면 폴백)
const stats = computed(() => {
  const c = company.value
  return [
    { k: '설립',     v: c?.founded_year ? String(c.founded_year) : '1994' },
    { k: '생산 라인', v: String(c?.production_lines ?? 5) },
    { k: '제품군',   v: '15' },
    { k: '등록 특허', v: String(c?.patent_count ?? 4) },
  ]
})

// Materials 시그니처 3종 (하이라이트 우선 → 없으면 F/T·AR·PE 고정)
const signatures = computed(() => {
  const fallback = [
    { code: 'F/T', name: 'Feather Touch',  desc: '실리콘 처리 Conjugate. 깃털 같은 감촉.', tag: 'SIGNATURE', slug: 'ft' },
    { code: 'AR',  name: 'AR',             desc: '중공 + 입체 Crimp, 벌키성과 탄성.',     tag: 'BULKY',     slug: 'ar' },
    { code: 'PE',  name: 'Polyester',      desc: '부직포 범용. Carding성 우수.',          tag: 'VERSATILE', slug: 'pe' },
  ]
  const h = highlights.value
  if (h && h.length >= 3) {
    return h.slice(0, 3).map((p, i) => ({
      code: p.name,
      name: p.korean_name || p.name,
      desc: p.short_desc || '',
      tag: ['SIGNATURE', 'BULKY', 'VERSATILE'][i],
      slug: p.slug,
      image: p.image_url,
    }))
  }
  return fallback
})

// 제품 수: 하드코딩 15 (마케팅 숫자. 실제 DB 제품이 적어도 라인업 총 15개로 표기)
const productCount = 15

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
        1. HERO — 3 chapters crossfade
      ================================================ -->
      <section class="snap-section h-[88vh] md:h-screen">
        <HomeHeroChapters />
      </section>

      <!-- ================================================
        2. INTRO — A Quiet Note
      ================================================ -->
      <section class="snap-section bg-paper px-6 md:px-10 lg:px-16 py-20 md:py-0 flex items-center">
        <div class="max-w-[1200px] mx-auto w-full">
          <p class="eyebrow text-ink-muted">A Quiet Note · 소개</p>

          <!-- 카피: 크기 줄임 (clamp 24~40px) + leading 약간 여유 -->
          <p class="mt-12 italic font-light text-[clamp(22px,2.5vw,36px)] leading-[1.42] tracking-[-0.02em] text-ink max-w-[820px]">
            <span v-reveal class="block">우리는 드러나지 않는<br class="md:hidden"> 자리의 재료를 만듭니다.</span>
            <span v-reveal="180" class="block">이불 속의 솜, 매트리스의 결,<br class="md:hidden"> 겨울옷의 안쪽.</span>
            <span v-reveal="360" class="block">
              <span class="text-accent-bronze">보이지 않아도 가장 가까이</span>에서
            </span>
            <span v-reveal="540" class="block">하루의 온도와 감촉을 결정하는 일.</span>
          </p>

          <!-- 스탯 4개 — 카피와 간격 확보 (mt-20 md:mt-28) -->
          <div v-reveal="720" class="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-b border-paper-line">
            <div
              v-for="(s, i) in stats" :key="s.k"
              :class="[
                'px-5 py-7 flex flex-col gap-2',
                i > 0 ? 'md:border-l md:border-paper-line' : '',
                i === 1 || i === 3 ? 'border-l border-paper-line md:border-l' : '',
              ]"
            >
              <div class="mono-label text-ink-muted">{{ s.k }}</div>
              <div class="text-[32px] italic font-medium tracking-[-0.02em] text-ink leading-none">{{ s.v }}</div>
            </div>
          </div>

          <!-- About CTA pill -->
          <div class="mt-10 flex justify-end">
            <NuxtLink
              to="/about"
              class="group inline-flex items-center gap-2 rounded-full pl-5 pr-2.5 py-2 bg-paper border border-ink text-ink text-[11px] font-medium tracking-[0.06em] uppercase hover:bg-ink hover:text-paper hover:-translate-y-0.5 hover:shadow-lg transition-all duration-500 ease-out-expo"
            >
              <span>About COSY&nbsp;FEEL</span>
              <span class="inline-flex items-center justify-center w-5 h-5 rounded-full border border-paper-line group-hover:bg-paper group-hover:border-paper group-hover:translate-x-0.5 group-hover:-rotate-45 transition-all duration-500 ease-out-expo">
                <svg width="9" height="9" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6">
                  <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ================================================
        3. MATERIALS — 3 signatures (헤더 여유 + 카드 축소)
      ================================================ -->
      <section class="snap-section bg-paper-soft border-t border-paper-line px-6 md:px-10 lg:px-16 py-20 md:py-0 flex items-center overflow-hidden">
        <div class="max-w-[1300px] mx-auto w-full py-10 md:py-12">
          <!-- 헤더 (gap·여백 더 축소) -->
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr_240px] gap-4 md:gap-10 items-end mb-6 md:mb-8">
            <div v-reveal>
              <p class="eyebrow text-ink-muted">Materials</p>
            </div>
            <h2 v-reveal="150" class="m-0 italic font-medium text-[clamp(28px,3.5vw,48px)] tracking-[-0.03em] leading-none text-ink">
              대표하는 세 가지.
            </h2>
            <div v-reveal="300" class="text-[13px] text-ink-dim leading-relaxed md:text-right">
              우리를 대표하는 충전재<br>
              <span class="text-ink-muted text-[11px] tracking-caps-xs">THREE SIGNATURE LINES</span>
            </div>
          </div>

          <!-- 카드 그리드 (aspect 1/1 정사각형으로 더 작게) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <NuxtLink
              v-for="(p, i) in signatures" :key="p.slug"
              :to="`/products#${p.slug}`"
              v-reveal="400 + i * 160"
              class="group block text-inherit no-underline cursor-pointer"
            >
              <div class="relative aspect-[5/6] overflow-hidden bg-paper border border-transparent group-hover:border-ink transition-all duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-[1.025] group-hover:shadow-[0_18px_40px_-12px_rgba(26,24,20,0.18)]">
                <div
                  v-if="p.image"
                  class="absolute inset-0 bg-cover bg-center"
                  :style="`background-image:url('${p.image}'); filter: grayscale(55%) contrast(1.05) brightness(0.96);`"
                />
                <div
                  v-else
                  class="absolute inset-0 flex items-center justify-center"
                  :style="`background: linear-gradient(135deg, rgba(250,248,244,0.35) 0%, rgba(230,224,210,0.25) 100%);`"
                >
                  <div class="italic font-light text-[clamp(60px,7vw,110px)] text-ink opacity-80 tracking-[-0.04em] leading-none">
                    {{ p.code }}
                  </div>
                </div>
                <span class="absolute top-3 left-3 mono-label text-ink">
                  {{ String(i + 1).padStart(2, '0') }}
                </span>
                <span class="absolute top-3 right-3 mono-label text-accent-bronze font-semibold">
                  {{ p.tag }}
                </span>
                <div class="absolute right-4 bottom-4 w-9 h-9 rounded-full bg-ink text-paper flex items-center justify-center text-sm opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 ease-out-expo">
                  ↗
                </div>
              </div>

              <div class="mt-4 flex justify-between items-baseline">
                <div>
                  <div class="italic font-medium text-[22px] md:text-[26px] tracking-[-0.02em] text-ink group-hover:text-accent-bronze transition-colors duration-300 leading-none">
                    {{ p.name }}
                  </div>
                  <div class="mt-2 text-[12px] text-ink-dim leading-[1.55] max-w-xs">
                    {{ p.desc }}
                  </div>
                </div>
                <div class="mono-label text-ink-faint whitespace-nowrap">{{ p.code }}</div>
              </div>
            </NuxtLink>
          </div>

          <!-- 푸터: 데스크탑은 한 줄 (좌 라벨 / 우 CTA), 모바일은 세로 (위 라벨, 아래 CTA) -->
          <div class="mt-6 pt-5 border-t border-paper-line flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-0">
            <div class="mono-label text-ink-muted">
              3 / {{ productCount }} &nbsp;·&nbsp; 시그니처 라인
            </div>
            <NuxtLink
              to="/products"
              class="inline-flex items-center gap-3 text-sm text-ink font-medium pb-1 border-b border-ink hover:text-accent-bronze hover:border-accent-bronze transition-colors whitespace-nowrap self-start md:self-auto"
            >
              전체 제품군 {{ productCount }}개 보기 <span class="text-base">→</span>
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- ================================================
        4. TECHNOLOGY / TRUST — Certifications + Patents
      ================================================ -->
      <section class="snap-section bg-dark text-paper px-6 md:px-10 lg:px-16 py-20 md:py-0 flex items-center relative overflow-hidden">
        <!-- 원형 스탬프 우상 -->
        <div
          aria-hidden
          class="absolute top-[8%] right-[4%] w-44 h-44 rounded-full border border-paper/10 flex items-center justify-center -rotate-12"
        >
          <div class="absolute inset-3 rounded-full border border-dashed border-paper/15" />
          <div class="font-mono text-[9px] tracking-[0.32em] text-paper/30 text-center leading-relaxed">
            CERTIFIED<br>SINCE<br>1994
          </div>
        </div>

        <div class="relative z-10 max-w-[1300px] mx-auto w-full">
          <div class="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end gap-16 mb-16 md:mb-24">
            <div>
              <p v-reveal class="eyebrow text-paper/50">Technology · Trust</p>
              <h2 class="mt-11 italic font-medium text-display-md text-paper leading-[1.02]">
                <span v-reveal="220" class="block">증명서는</span>
                <span v-reveal="420" class="block">우리가 드리는 조용한 약속.</span>
              </h2>
            </div>
            <div v-reveal="620" class="text-[13px] text-paper/60 max-w-[280px] leading-[1.7] md:text-right">
              국제 표준과 자체 기술로 쌓아 온 인증과 특허.<br>
              <NuxtLink to="/certifications" class="text-accent-bronze-soft text-xs hover:opacity-80">
                전체 인증 보기&nbsp;&nbsp;→
              </NuxtLink>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <!-- 인증 — 폰트 사이즈 변화 제거, 컬러+bg만 변화 (흔들림 방지) -->
            <div>
              <div class="mono-label text-paper/50 mb-9">
                CERTIFICATIONS &nbsp;·&nbsp; {{ certs?.length || 4 }}
              </div>
              <div class="border-t border-paper/20">
                <div
                  v-for="c in (certs || [])" :key="c.id"
                  v-reveal="100"
                  class="group flex justify-between items-baseline gap-3 py-6 px-4 border-b border-paper/10 cursor-default hover:bg-paper/5 transition-colors duration-400"
                >
                  <!-- 좌: cert_type — 셀 안에서만 모바일 줄바꿈 (이노비즈 / (Inno-Biz)) -->
                  <span class="italic font-medium text-[20px] md:text-[22px] tracking-[-0.015em] text-paper group-hover:text-accent-bronze-soft transition-colors duration-400 leading-tight">
                    <template v-for="(part, idx) in splitCertType(c.cert_type)" :key="idx">
                      <br v-if="idx > 0" class="md:hidden">
                      <span>{{ part }}</span>
                    </template>
                  </span>
                  <!-- 우: name — 셀 안에서만 모바일 줄바꿈 (앞부분 / 인증) -->
                  <span class="text-[11px] md:text-xs text-paper/55 tracking-[0.12em] group-hover:text-paper/85 transition-colors duration-400 leading-relaxed text-right">
                    <template v-for="(part, idx) in splitCertName(c.name)" :key="idx">
                      <br v-if="idx > 0" class="md:hidden">
                      <span>{{ part }}</span>
                    </template>
                  </span>
                </div>
              </div>
            </div>

            <!-- 특허 — 폰트 사이즈 고정, 컬러만 변화 -->
            <div>
              <div class="mono-label text-accent-bronze-soft mb-9">
                PATENTS &nbsp;·&nbsp; {{ patents?.length || 4 }} REGISTERED
              </div>
              <div class="border-t border-paper/20">
                <div
                  v-for="p in (patents || [])" :key="p.id"
                  v-reveal="200"
                  class="group py-6 px-4 border-b border-paper/10 cursor-default hover:bg-paper/5 transition-colors duration-400"
                >
                  <div class="italic font-medium text-lg tracking-[-0.01em] text-paper group-hover:text-accent-bronze-soft transition-colors duration-400 leading-snug">
                    {{ p.name }}
                  </div>
                  <div class="mt-2 mono-label text-paper/50 group-hover:text-paper/75 transition-colors duration-400">
                    {{ p.cert_number }} &nbsp;·&nbsp; {{ p.issued_at }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================================================
        5. CONTACT — Cut-corner cards
      ================================================ -->
      <section class="snap-section bg-dark text-paper px-6 md:px-10 lg:px-16 py-20 md:py-0 flex items-center relative overflow-hidden">
        <div class="max-w-[1320px] mx-auto w-full relative z-10">
          <div class="grid grid-cols-1 md:grid-cols-[6fr_5fr] gap-12 md:gap-24 items-center">
            <!-- 좌측 카피 -->
            <div>
              <p v-reveal class="eyebrow text-paper/50">Inquiries</p>
              <h2 v-reveal="180" class="mt-10 italic font-light text-display-lg text-paper">
                편하게,<br>
                <span class="text-accent-bronze-soft">말씀</span>주세요.
              </h2>
              <p v-reveal="360" class="mt-10 text-[15px] leading-[1.85] text-paper/70 font-light max-w-[460px]">
                담당자가 직접 답변드립니다.
              </p>

              <NuxtLink
                to="/contact"
                class="group mt-16 inline-flex items-center gap-6 py-3.5 text-paper relative"
              >
                <span class="italic font-normal text-[28px] tracking-[-0.02em] group-hover:text-accent-bronze-soft group-hover:translate-x-0.5 transition-all duration-500 ease-out-expo">
                  문의 보내기
                </span>
                <span class="inline-flex items-center justify-center w-12 h-12 rounded-full border border-paper/40 group-hover:border-accent-bronze-soft group-hover:text-accent-bronze-soft group-hover:translate-x-3 group-hover:-rotate-45 transition-all duration-500 ease-out-expo">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.2">
                    <path d="M3 7H11M11 7L7 3M11 7L7 11" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
                <span class="absolute left-0 bottom-1.5 h-px bg-accent-bronze-soft w-0 group-hover:w-[calc(100%-60px)] transition-[width] duration-500 ease-out-expo" />
              </NuxtLink>
            </div>

            <!-- 우측: 네모 → 아키텍처 블루프린트 스타일 카드 -->
            <div class="flex flex-col gap-3.5">
              <div
                v-for="(c, i) in [
                  { k: 'TEL',   v: company?.tel || '032-582-4149',             sub: '대표 전화' },
                  { k: 'EMAIL', v: company?.email || 'info@gwangjin.co.kr',    sub: '이메일 문의' },
                  { k: 'VISIT', v: company?.address || '인천 서구 가정로 58번길 3', sub: '본사 · 공장 방문' },
                  { k: 'HOURS', v: company?.business_hours || '월 — 금 09:00-18:00', sub: '업무 시간' },
                ]" :key="c.k"
                v-reveal="i * 100"
                class="group relative px-8 py-7 bg-paper/[0.025] hover:bg-paper/[0.06] hover:-translate-x-3 transition-all duration-500 ease-out-expo cursor-default overflow-hidden"
              >
                <!-- 외곽 1px 하이라인 (모든 변) -->
                <span class="absolute inset-0 border border-paper/15 group-hover:border-paper/35 transition-colors duration-500 pointer-events-none" />
                <!-- 좌측 bronze 엑센트 바 (hover) -->
                <span class="absolute left-0 top-4 bottom-4 w-[2px] bg-accent-bronze-soft scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-500 ease-out-expo" />
                <!-- 상단-우측 L 브래킷 (아키텍처 블루프린트 마크) -->
                <span class="absolute top-0 right-0 w-4 h-4 pointer-events-none">
                  <span class="absolute top-0 right-0 w-4 h-px bg-paper/40 group-hover:bg-accent-bronze-soft transition-colors duration-500" />
                  <span class="absolute top-0 right-0 w-px h-4 bg-paper/40 group-hover:bg-accent-bronze-soft transition-colors duration-500" />
                </span>
                <!-- 하단-좌측 L 브래킷 (대칭) -->
                <span class="absolute bottom-0 left-0 w-4 h-4 pointer-events-none">
                  <span class="absolute bottom-0 left-0 w-4 h-px bg-paper/40 group-hover:bg-accent-bronze-soft transition-colors duration-500" />
                  <span class="absolute bottom-0 left-0 w-px h-4 bg-paper/40 group-hover:bg-accent-bronze-soft transition-colors duration-500" />
                </span>

                <div class="relative mono-label text-paper/50 group-hover:text-accent-bronze-soft transition-colors duration-500">
                  {{ String(i + 1).padStart(2, '0') }} &nbsp;/&nbsp; {{ c.k }}
                </div>
                <!-- 폰트 사이즈 고정 (흔들림 방지) -->
                <div class="relative mt-2.5 italic font-normal text-xl tracking-[-0.015em] text-paper leading-tight">
                  {{ c.v }}
                </div>
                <div class="relative mt-1.5 text-[11px] tracking-[0.2em] text-paper/40 group-hover:text-paper/60 transition-colors duration-500">
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
