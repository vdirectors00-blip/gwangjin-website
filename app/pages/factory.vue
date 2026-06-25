<script setup lang="ts">
useSeo({
  title: '생산 시설 | 광진실업',
  description: '광진실업 생산 시설 — 원료 입고부터 완제품까지, 생산 라인과 설비로 이불솜·충전재를 만드는 COSY FEEL의 생산 공정을 소개합니다.',
  path: '/factory',
})

const { data: steps } = await useProcessSteps()
const { data: gallery } = await useFactoryGallery()

// GitHub Pages base path 자동 적용
const baseURL = useRuntimeConfig().app.baseURL
const withBase = (path: string) => `${baseURL}${path.replace(/^\//, '')}`

const stepCount = computed(() => (steps.value || []).length)
const hasGallery = computed(() => (gallery.value || []).length > 0)

// 공정 단계별 사진 (public/images/process/step-N-slug.jpg)
const stepImageMap = ['reserve', 'card', 'form', 'dry', 'cool', 'winding']
const stepImage = (n: number) =>
  withBase(`/images/process/step-${n}-${stepImageMap[n - 1] || 'reserve'}.jpg`)
</script>

<template>
  <div>
    <div class="h-[76px]" />
    <CommonSubNav section="about" />

    <!-- ───── Intro — 컴팩트 배경 (풀스크린 X) ───── -->
    <section class="relative overflow-hidden border-b border-paper-line">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="`background-image: url('${withBase('/images/intro/factory.jpg')}'); filter: grayscale(35%) brightness(0.9);`"
      />
      <div class="absolute inset-0 bg-paper-warm/85" />

      <div class="relative z-10 container-narrow grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center py-20 md:py-28">
        <div class="md:col-span-7">
          <p class="mono-label text-accent-bronze mb-5">Our Plant · 생산 시설</p>
          <h1 class="font-normal text-[clamp(34px,4.6vw,64px)] leading-[1.12] tracking-[-0.025em] text-ink-dim">
            다섯 개의 라인,<br>
            <span class="text-accent-bronze">{{ stepCount || 6 }}단계</span>의 공정.
          </h1>
          <p class="mt-7 text-ink-dim text-base md:text-lg leading-[1.85] font-normal max-w-xl">
            자체 공장에서 입고 — 가공 — 출하 전 과정을 직접 운영합니다.
            점진적으로 확장해 온 생산라인과 정밀한 공정으로
            다양한 소재와 규격에 대응합니다.
          </p>
        </div>

        <!-- 스탯 -->
        <div class="md:col-span-5">
          <div class="grid grid-cols-3 border-t border-b border-paper-line/70 bg-white/55 backdrop-blur-sm">
            <div v-for="(s, i) in [
              { k: 'Lines', v: '5' },
              { k: 'Steps', v: String(stepCount || 6) },
              { k: 'Since', v: '1994' },
            ]" :key="s.k"
              :class="['px-4 py-6', i > 0 ? 'border-l border-paper-line/70' : '']"
            >
              <div class="mono-label text-ink-muted">{{ s.k }}</div>
              <div class="text-[30px] font-medium tracking-[-0.02em] text-ink mt-1 leading-none">{{ s.v }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ───── 생산 공정 — 카드 그리드 (한 화면 정리) ───── -->
    <section class="bg-white border-b border-paper-line py-24 md:py-36">
      <div class="container-x">
        <div class="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p class="eyebrow text-ink-muted">Process Flow</p>
            <h2 class="mt-5 font-medium text-display-md">생산 공정</h2>
          </div>
          <div class="hidden md:block mono-label text-ink-faint">
            {{ stepCount || 6 }} STEPS &nbsp;·&nbsp; FROM RAW TO ROLL
          </div>
        </div>

        <!-- 카드: 모바일 1 / 태블릿 2 / 데스크탑 3 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <div
            v-for="s in (steps || [])" :key="s.id"
            class="group relative overflow-hidden bg-paper-soft border border-paper-line p-7 md:p-9 min-h-[320px] flex flex-col hover:border-accent-bronze/50 hover:-translate-y-1 transition-all duration-500 ease-out-expo"
          >
            <!-- 공정 사진 배경 (약하게) -->
            <div
              class="absolute inset-0 bg-cover bg-center opacity-[0.16] group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              :style="`background-image:url('${stepImage(s.step_number)}'); filter: grayscale(35%) contrast(1.02);`"
            />
            <div class="absolute inset-0 bg-paper-soft/55 group-hover:bg-paper-warm/45 transition-colors duration-500 pointer-events-none" />

            <!-- 거대한 번호 배경 (우하단) -->
            <div class="absolute right-3 -bottom-3 font-normal text-[clamp(80px,9vw,120px)] text-accent-bronze/[0.07] group-hover:text-accent-bronze/[0.14] transition-colors duration-500 leading-none tracking-[-0.04em] pointer-events-none select-none">
              {{ String(s.step_number).padStart(2, '0') }}
            </div>

            <!-- 상단: STEP 라벨 -->
            <div class="relative mono-label text-accent-bronze">
              STEP {{ String(s.step_number).padStart(2, '0') }}
            </div>

            <!-- 제목 -->
            <h3 class="relative mt-4 font-medium text-2xl md:text-[28px] tracking-[-0.02em] text-ink leading-tight group-hover:text-accent-bronze transition-colors duration-300">
              {{ s.title }}
            </h3>
            <div class="relative my-4 h-px w-12 bg-ink/20 group-hover:bg-accent-bronze/50 transition-colors duration-500" />

            <!-- 설명 -->
            <p v-if="s.description" class="relative text-ink-dim text-sm md:text-[15px] leading-relaxed font-normal">
              {{ s.description }}
            </p>
          </div>
        </div>

        <p v-if="!(steps && steps.length)" class="py-16 text-center text-ink-faint border border-dashed border-paper-line">
          [공정 단계는 관리자 페이지에서 등록합니다.]
        </p>
      </div>
    </section>

    <!-- ───── 시설 사진 (있을 때만, 컴팩트 3분할) ───── -->
    <section v-if="hasGallery" class="bg-paper-soft py-16 md:py-20">
      <div class="container-x">
        <div class="flex items-end justify-between mb-8">
          <div>
            <p class="eyebrow text-ink-muted">Facility</p>
            <h2 class="mt-5 font-medium text-display-sm">생산 현장</h2>
          </div>
          <div class="mono-label text-ink-faint hidden md:block">{{ gallery!.length }} PHOTOS</div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div
            v-for="g in gallery" :key="g.id"
            class="group relative aspect-[4/3] overflow-hidden bg-paper-warm"
          >
            <img
              :src="useImageUrl(g.image_url, { width: 800, format: 'webp', quality: 80 }) || ''"
              :alt="g.caption || ''"
              class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div
              v-if="g.caption"
              class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/65 to-transparent px-4 py-3"
            >
              <p class="text-paper text-xs md:text-sm font-normal">{{ g.caption }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TOP 버튼 -->
    <CommonTopButton />
  </div>
</template>
