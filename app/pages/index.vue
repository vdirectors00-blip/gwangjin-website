<script setup lang="ts">
useHead({ title: '광진실업 | COSY FEEL' })

const { data: company } = await useCompanyInfo()
const { data: dbSlides } = await useHeroSlides()
const { data: highlights } = await useProducts({ onlyHighlight: true })
const { data: certs } = await useCertifications('certification')
const { data: patents } = await useCertifications('patent')

// DB에 슬라이드 없으면 임시 이미지 3장 폴백
const slides = computed(() => {
  if (dbSlides.value && dbSlides.value.length > 0) return dbSlides.value
  return [
    { media_type: 'image' as const, media_url: '/images/hero/hero-1.jpg' },
    { media_type: 'image' as const, media_url: '/images/hero/hero-2.jpg' },
    { media_type: 'image' as const, media_url: '/images/hero/hero-3.jpg' },
  ]
})

const stats = computed(() => [
  { num: company.value?.founded_year ? new Date().getFullYear() - company.value.founded_year : 30, label: 'Years', sub: 'Heritage Since 1994' },
  { num: company.value?.production_lines || 5, label: 'Lines', sub: 'Active Production' },
  { num: company.value?.patent_count || 4,    label: 'Patents', sub: 'Registered Tech' },
  { num: company.value?.product_count || 10,  label: 'Products', sub: 'Filling Materials' },
])
</script>

<template>
  <div>
    <!-- ============================================================
      1. HERO — 풀스크린 영상/이미지 crossfade
    ============================================================== -->
    <section class="relative h-screen flex items-end overflow-hidden">
      <HomeHeroCrossfade :slides="slides" />

      <!-- 어두운 베일 -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/20 pointer-events-none" />

      <!-- 텍스트 레이어 -->
      <div class="relative container-x pb-32 md:pb-40 z-10 w-full text-paper">
        <p class="eyebrow text-paper/70">COSY FEEL · Since 1994</p>
        <h1 class="text-6xl md:text-8xl lg:text-[8.5rem] font-bold tracking-tightest leading-[0.95] mt-8">
          {{ company?.tagline_en || 'Heritage in Every Fiber' }}
        </h1>
        <div class="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <p class="text-lg md:text-xl text-paper/80 max-w-xl">
            {{ company?.tagline || '솜 한 가닥에, 30년의 기술' }}
          </p>
          <div class="flex gap-3">
            <NuxtLink to="/products" class="btn-light">View Products</NuxtLink>
            <NuxtLink to="/contact" class="btn-ghost-light">Contact</NuxtLink>
          </div>
        </div>
      </div>

      <!-- 스크롤 인디케이터 -->
      <div class="absolute bottom-4 left-6 text-paper/50 text-xs tracking-[0.3em]">
        SCROLL
      </div>
    </section>

    <!-- ============================================================
      2. INTRO — 따뜻한 라이트, 큰 타이포 한 줄
    ============================================================== -->
    <section class="bg-paper py-32 md:py-48">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <div v-reveal class="md:col-span-2 hidden md:block">
          <div class="text-7xl md:text-9xl font-light text-ink/10 leading-none">01</div>
        </div>
        <div v-reveal:[100] class="md:col-span-7">
          <p class="eyebrow text-ink-muted">Who We Are</p>
          <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
            부직포와 제면 분야 30년,<br>
            축적된 기술이 만드는 충전재
          </h2>
          <p class="mt-8 text-ink-dim text-lg leading-relaxed max-w-2xl">
            {{ company?.business_area || '광진실업은 부직포 및 제면 분야에서 여러 해 동안 축적해온 기술과 노하우를 바탕으로, 여러 브랜드의 이불솜 및 침대 부자재를 생산하고 있습니다.' }}
          </p>
        </div>
        <div v-reveal:[200] class="md:col-span-3 flex md:justify-end">
          <NuxtLink to="/about" class="btn-outline-dark">About COSY FEEL →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ============================================================
      3. NUMBERS — 따뜻한 차콜, 큰 숫자 스탯
    ============================================================== -->
    <section class="bg-dark text-paper py-32">
      <div class="container-x">
        <p class="eyebrow text-ink-inverse-muted">02 · By the Numbers</p>
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-paper/10">
          <div
            v-for="(s, i) in stats" :key="s.label"
            v-reveal="i * 100"
            class="bg-dark p-10 md:p-12"
          >
            <div class="flex items-baseline gap-1">
              <div class="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tightest text-paper">
                {{ s.num }}
              </div>
              <div v-if="s.label === 'Years'" class="text-2xl text-accent-bronze-soft">+</div>
            </div>
            <div class="mt-4 text-paper text-sm font-medium">{{ s.label }}</div>
            <div class="text-ink-inverse-muted text-xs mt-1">{{ s.sub }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
      4. FEATURED PRODUCTS — 라이트, 카테고리 카드
    ============================================================== -->
    <section class="bg-paper-soft py-32 md:py-40">
      <div class="container-x">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div class="md:col-span-7">
            <p class="eyebrow text-ink-muted">03 · Products</p>
            <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest">
              우리의 핵심 충전재
            </h2>
          </div>
          <div class="md:col-span-5 md:text-right">
            <p class="text-ink-dim leading-relaxed">
              합성·천연·기능성 소재를 아우르는 10가지 라인업.
            </p>
            <NuxtLink to="/products" class="inline-block mt-4 text-ink font-medium hover:text-accent-bronze">
              전체 라인업 →
            </NuxtLink>
          </div>
        </div>

        <div v-if="highlights && highlights.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-line">
          <NuxtLink
            v-for="(p, i) in highlights" :key="p.id"
            :to="`/products#${p.slug}`"
            class="group relative aspect-[3/4] overflow-hidden bg-paper-warm flex items-end p-8 hover:bg-paper transition-all duration-500"
          >
            <img
              v-if="p.image_url"
              :src="useImageUrl(p.image_url, { width: 800, format: 'webp', quality: 80 }) || ''"
              :alt="p.name"
              class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out-expo"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
            <div class="relative text-paper">
              <div class="text-paper/70 text-xs tracking-[0.3em]">0{{ i + 1 }}</div>
              <div class="text-3xl font-bold mt-3">{{ p.name }}</div>
              <p v-if="p.short_desc" class="text-paper/80 text-sm mt-2">{{ p.short_desc }}</p>
            </div>
          </NuxtLink>
        </div>

        <!-- 폴백: 데이터 없을 때 -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-line">
          <div v-for="(label, i) in ['F/T (Feather Touch)', 'Tencel', 'Wool']" :key="i"
            class="aspect-[3/4] bg-paper-warm flex items-end p-8">
            <div>
              <div class="text-ink-faint text-xs tracking-[0.3em]">0{{ i + 1 }}</div>
              <div class="text-ink text-3xl font-bold mt-3">{{ label }}</div>
              <p class="text-ink-muted text-sm mt-2">[관리자 페이지에서 등록]</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
      5. PHILOSOPHY — 베이지, 3가지 가치 (Heritage / Quality / Future)
    ============================================================== -->
    <section class="bg-paper-warm py-32 md:py-40">
      <div class="container-x">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div class="md:col-span-7">
            <p class="eyebrow text-ink-muted">04 · Philosophy</p>
            <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
              우리가 일하는 방식
            </h2>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(v, i) in [
              { num: '01', en: 'Heritage', ko: '축적된 노하우', desc: '1994년부터 부직포·제면 한 길. 30년이 만든 디테일과 노하우.' },
              { num: '02', en: 'Quality',  ko: '우수한 품질',   desc: 'ISO 인증 + 한국인증원 검증된 품질·환경 시스템.' },
              { num: '03', en: 'Future',   ko: '미래지향',     desc: '5라인 + 4건의 특허로 다음 세대의 충전재를 만듭니다.' },
            ]" :key="i"
            v-reveal="i * 150"
            class="bg-paper p-10 md:p-12 hover:shadow-lg transition-shadow duration-500"
          >
            <div class="text-ink-faint text-sm tracking-[0.3em]">{{ v.num }}</div>
            <h3 class="text-3xl font-bold mt-6">{{ v.en }}</h3>
            <p class="text-accent-bronze text-sm mt-1">{{ v.ko }}</p>
            <div class="w-12 h-px bg-ink/20 my-6" />
            <p class="text-ink-dim leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
      6. TECHNOLOGY & CERTIFICATIONS — 다크 드라마틱
    ============================================================== -->
    <section class="bg-dark text-paper py-32 md:py-40">
      <div class="container-x">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div class="md:col-span-7">
            <p class="eyebrow text-ink-inverse-muted">05 · Technology & Certifications</p>
            <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
              기술과 인증으로<br>증명한 신뢰
            </h2>
          </div>
          <div class="md:col-span-5 md:text-right">
            <p class="text-ink-inverse-dim leading-relaxed">
              국제 표준 인증과 자체 특허로 입증된 기술력.
            </p>
            <NuxtLink to="/certifications" class="inline-block mt-4 text-paper font-medium hover:text-accent-bronze-soft">
              전체 인증 보기 →
            </NuxtLink>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10">
          <!-- 인증 -->
          <div class="bg-dark p-10 md:p-12">
            <div class="eyebrow text-accent-bronze-soft mb-6">Quality Certifications</div>
            <ul class="space-y-3">
              <li v-for="c in (certs?.slice(0, 4) || [])" :key="c.id"
                class="flex justify-between items-start py-3 border-b border-paper/10">
                <span class="text-paper font-medium">{{ c.cert_type }}</span>
                <span class="text-ink-inverse-muted text-sm text-right">{{ c.name }}</span>
              </li>
              <li v-if="!certs || certs.length === 0" class="text-ink-inverse-faint text-sm">
                ISO 9001 · ISO 14001 · 한국인증원 · Inno-Biz
              </li>
            </ul>
          </div>
          <!-- 특허 -->
          <div class="bg-dark p-10 md:p-12">
            <div class="eyebrow text-accent-eco-soft mb-6">Patents · {{ patents?.length || 4 }}건</div>
            <ul class="space-y-3">
              <li v-for="p in (patents?.slice(0, 4) || [])" :key="p.id"
                class="py-3 border-b border-paper/10">
                <div class="text-paper text-sm font-medium">{{ p.name }}</div>
                <div v-if="p.cert_number" class="text-ink-inverse-muted text-xs mt-1">
                  {{ p.cert_number }} · {{ p.issued_at }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
      7. CEO MESSAGE PREVIEW — 라이트, 인사말 미리보기
    ============================================================== -->
    <section class="bg-paper-soft py-32 md:py-40">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div class="md:col-span-5">
          <div class="aspect-[4/5] bg-paper-warm overflow-hidden">
            <img
              v-if="company?.ceo_image_url"
              :src="useImageUrl(company.ceo_image_url, { width: 600, format: 'webp' }) || ''"
              :alt="company.ceo_name || 'CEO'"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-ink-faint text-sm">
              [CEO 사진]
            </div>
          </div>
        </div>
        <div class="md:col-span-7">
          <p class="eyebrow text-ink-muted">06 · CEO Message</p>
          <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
            안녕하세요.<br>
            <span class="text-accent-bronze">COSY FEEL</span> 입니다.
          </h2>
          <p class="mt-8 text-ink-dim leading-relaxed text-lg">
            우수하고 깨끗한 제품과 고객에 대한 신뢰를 바탕으로 침장업계 품질을 위해 힘쓰고, 최고의 설비와 풍부한 기술과 경험을 바탕으로 더 좋은 제품을 제공하기 위해 언제나 노력하고 있습니다.
          </p>
          <p class="mt-6 text-ink font-medium">
            회장 {{ company?.ceo_name || '최광은' }}
          </p>
          <NuxtLink to="/about" class="inline-block mt-8 text-ink font-medium hover:text-accent-bronze">
            인사말 전문 보기 →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ============================================================
      8. CTA — 다크
    ============================================================== -->
    <section class="bg-dark text-paper py-32 md:py-40">
      <div class="container-x grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p class="eyebrow text-accent-bronze-soft">07 · Get in Touch</p>
          <h2 class="mt-6 text-4xl md:text-6xl font-bold tracking-tightest leading-tight">
            함께할<br>파트너를<br>찾으시나요?
          </h2>
        </div>
        <div class="md:text-right">
          <p class="text-ink-inverse-dim text-lg max-w-md md:ml-auto">
            샘플 요청, 단가 협의, 신규 거래 문의 등 무엇이든 편하게 연락주세요.
          </p>
          <div class="mt-10 flex flex-col md:flex-row md:justify-end gap-3">
            <NuxtLink to="/contact" class="btn-light">문의하기</NuxtLink>
            <a v-if="company?.tel" :href="`tel:${company.tel}`" class="btn-ghost-light">
              📞 {{ company.tel }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
