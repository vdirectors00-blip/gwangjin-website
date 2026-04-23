<script setup lang="ts">
useHead({ title: 'Philosophy | 광진실업' })

const { data: company } = await useCompanyInfo()

const values = computed(() => [
  {
    num: '01',
    en: 'Heritage',
    ko: '축적된 노하우',
    title: '1994년부터 한 길',
    desc: company.value?.business_area || '부직포 및 제면 분야에서 30년간 축적해온 기술과 노하우. 단순한 시간이 아니라, 매일의 디테일이 만든 차이입니다.',
    stat: company.value?.founded_year ? `${new Date().getFullYear() - company.value.founded_year}+ Years` : '30+ Years',
  },
  {
    num: '02',
    en: 'Quality',
    ko: '우수한 품질',
    title: '인증된 신뢰',
    desc: '국제 표준 ISO 9001(품질) · ISO 14001(환경) 인증과 한국인증원 검증, 그리고 4건의 자체 특허로 입증된 품질 시스템.',
    stat: '4 ISO Cert · 4 Patents',
  },
  {
    num: '03',
    en: 'Future',
    ko: '미래 지향',
    title: '다음 세대를 위한 설비',
    desc: '5개 생산라인의 단계적 증설(1999, 2008, 2012, 2019, 2021)로 다양한 제품에 대응. 미래지향적 시스템으로 더 나은 충전재를 만듭니다.',
    stat: `${company.value?.production_lines || 5} Production Lines`,
  },
])
</script>

<template>
  <div>
    <CommonPageHero
      title="Philosophy"
      subtitle="우리가 일하는 방식"
      eyebrow="About · 02"
      background="/images/hero/hero-3.jpg"
    />

    <!-- Intro -->
    <section class="bg-paper py-32 md:py-40">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div class="md:col-span-2 hidden md:block">
          <div class="text-7xl md:text-9xl font-light text-ink/10 leading-none">02</div>
        </div>
        <div class="md:col-span-10">
          <p class="eyebrow text-ink-muted">Our Way</p>
          <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight max-w-3xl">
            "솜 한 가닥에 30년의 기술이 담깁니다."
          </h2>
          <p class="mt-8 text-ink-dim text-lg leading-relaxed max-w-3xl">
            우리는 충전재가 단순히 '속을 채우는 재료'라고 생각하지 않습니다.
            매일 닿는 이불의 편안함, 매트리스의 안정감, 패딩의 따뜻함 ─
            결국 사람의 휴식을 만드는 핵심 소재입니다.
            그 책임을 알기에 1994년부터 같은 자리에서 한 길만 걸어왔습니다.
          </p>
        </div>
      </div>
    </section>

    <!-- 3가지 가치 -->
    <section class="bg-paper-warm py-32 md:py-40 border-t border-paper-line">
      <div class="container-x">
        <p class="eyebrow text-ink-muted text-center">Three Values</p>
        <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest text-center">
          Heritage · Quality · Future
        </h2>

        <div class="mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-line">
          <div
            v-for="v in values" :key="v.num"
            class="bg-paper p-12 md:p-14 flex flex-col"
          >
            <div class="text-ink-faint text-sm tracking-[0.3em]">{{ v.num }}</div>
            <h3 class="text-4xl font-bold mt-6 text-ink">{{ v.en }}</h3>
            <p class="text-accent-bronze text-sm mt-2">{{ v.ko }}</p>

            <div class="w-12 h-px bg-ink/20 my-8" />

            <h4 class="text-ink text-xl font-semibold">{{ v.title }}</h4>
            <p class="text-ink-dim leading-relaxed mt-4 flex-1">{{ v.desc }}</p>

            <div class="mt-10 pt-6 border-t border-paper-line">
              <p class="text-accent-bronze text-2xl font-bold tracking-tightest">{{ v.stat }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 비전 / 마무리 -->
    <section class="bg-dark text-paper py-32">
      <div class="container-x">
        <p class="eyebrow text-ink-inverse-muted text-center">Looking Forward</p>
        <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest text-center max-w-4xl mx-auto leading-tight">
          편안한 휴식을 만드는<br>다음 30년
        </h2>
        <p class="mt-10 text-ink-inverse-dim text-lg text-center max-w-3xl mx-auto leading-relaxed">
          축적된 노하우와 미래지향적 설비로,
          고객이 신뢰할 수 있는 충전재 파트너가 되겠습니다.
        </p>
        <div class="mt-12 flex justify-center gap-3">
          <NuxtLink to="/products" class="btn-light">제품 보기</NuxtLink>
          <NuxtLink to="/contact" class="btn-ghost-light">문의하기</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
