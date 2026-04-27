<script setup lang="ts">
useHead({ title: '생산 시설 | 광진실업' })

const { data: steps } = await useProcessSteps()
const { data: gallery } = await useFactoryGallery()

// 공정 단계별 이미지 매핑 (파일명 기준)
const stepImageMap = ['reserve', 'card', 'form', 'dry', 'cool', 'winding']
const stepImage = (n: number) => {
  const slug = stepImageMap[n - 1] || 'reserve'
  return `/images/process/step-${n}-${slug}.jpg`
}
</script>

<template>
  <div>
    <div class="h-[76px]" />
    <CommonSubNav section="about" />

    <!-- Intro — 풀스크린 + 배경 이미지 -->
    <section
      class="relative flex items-center overflow-hidden"
      style="min-height: calc(100vh - 156px);"
    >
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/images/intro/factory.jpg'); filter: grayscale(30%) brightness(0.88);"
      />
      <div class="absolute inset-0 bg-paper-warm/80" />

      <div class="relative z-10 container-narrow grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center py-16">
        <div class="md:col-span-6">
          <p class="mono-label text-accent-bronze mb-6">Our Plant · 생산 시설</p>
          <h1 class="italic font-light text-[clamp(40px,5.5vw,80px)] leading-[1.15] tracking-[-0.025em] text-ink-dim">
            다섯 개의 라인,<br>
            <span class="text-accent-bronze">여섯 단계</span>의 공정.
          </h1>
          <div class="mt-10 w-16 h-px bg-ink/30" />
        </div>

        <div class="md:col-span-6">
          <p class="text-ink-dim text-lg md:text-xl leading-[1.95] font-light">
            자체 공장에서 입고 — 가공 — 출하 전 과정을 직접 운영합니다.
            점진적으로 확장해 온 생산라인과 정밀한 6단계 공정으로
            다양한 소재와 규격에 대응할 수 있는 체계를 갖췄습니다.
          </p>
          <!-- 스탯 -->
          <div class="mt-12 grid grid-cols-3 gap-0 border-t border-b border-paper-line/60 bg-paper/50 backdrop-blur-sm">
            <div v-for="(s, i) in [
              { k: 'Lines', v: '5' },
              { k: 'Steps', v: '6' },
              { k: 'Since', v: '1994' },
            ]" :key="s.k"
              :class="['px-4 py-6', i > 0 ? 'border-l border-paper-line/60' : '']"
            >
              <div class="mono-label text-ink-muted">{{ s.k }}</div>
              <div class="text-[32px] italic font-medium tracking-[-0.02em] text-ink mt-1 leading-none">{{ s.v }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6단계 공정 — zigzag editorial -->
    <section class="bg-paper border-t border-paper-line py-24 md:py-32">
      <div class="container-x">
        <div class="flex items-end justify-between mb-16 md:mb-20">
          <div>
            <p class="eyebrow text-ink-muted">Process Flow</p>
            <h2 class="mt-6 italic font-medium text-display-md">생산 공정</h2>
          </div>
          <div class="hidden md:block mono-label text-ink-faint">
            6 STEPS &nbsp;·&nbsp; FROM RAW TO ROLL
          </div>
        </div>

        <!-- zigzag 레이아웃 -->
        <div class="space-y-24 md:space-y-32">
          <div
            v-for="(s, i) in (steps || [])" :key="s.id"
            v-reveal="(i % 2) * 100"
            class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center"
          >
            <!-- 이미지 -->
            <div
              :class="[
                'md:col-span-7',
                i % 2 === 0 ? 'md:order-1' : 'md:order-2',
              ]"
            >
              <div class="relative aspect-[4/3] overflow-hidden bg-paper-warm group">
                <img
                  :src="stepImage(s.step_number)"
                  :alt="s.title"
                  class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out-expo"
                />
                <!-- 큰 숫자 오버레이 -->
                <div
                  class="absolute top-4 left-4 italic font-light text-[clamp(56px,8vw,120px)] text-paper/90 leading-none tracking-[-0.03em]"
                  style="text-shadow: 0 2px 20px rgba(26,24,20,0.25);"
                >
                  {{ String(s.step_number).padStart(2, '0') }}
                </div>
                <!-- STEP 라벨 -->
                <div class="absolute top-4 right-4 mono-label text-paper/90 bg-dark/30 backdrop-blur-sm px-3 py-1">
                  STEP {{ s.step_number }}
                </div>
              </div>
            </div>

            <!-- 텍스트 -->
            <div
              :class="[
                'md:col-span-5',
                i % 2 === 0 ? 'md:order-2 md:pl-8' : 'md:order-1 md:pr-8 md:text-right',
              ]"
            >
              <div class="mono-label text-accent-bronze">
                Step {{ String(s.step_number).padStart(2, '0') }} &nbsp;·&nbsp; {{ s.step_number }} of {{ (steps || []).length }}
              </div>
              <h3 class="mt-5 italic font-medium text-[clamp(32px,4vw,56px)] tracking-[-0.02em] leading-none">
                {{ s.title }}
              </h3>
              <div
                :class="[
                  'my-6 h-px bg-ink/20 w-16',
                  i % 2 === 1 ? 'md:ml-auto' : '',
                ]"
              />
              <p v-if="s.description" class="text-ink-dim leading-relaxed font-light text-base md:text-lg">
                {{ s.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 갤러리 -->
    <section class="bg-paper-soft border-t border-paper-line py-24">
      <div class="container-x">
        <div class="flex items-end justify-between mb-10">
          <div>
            <p class="eyebrow text-ink-muted">Facility Gallery</p>
            <h2 class="mt-6 italic font-medium text-display-md">생산 시설</h2>
          </div>
        </div>

        <div v-if="gallery && gallery.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div
            v-for="(g, i) in gallery" :key="g.id"
            :class="['overflow-hidden bg-paper-warm', i % 5 === 0 ? 'aspect-[4/5] md:row-span-2' : 'aspect-[4/3]']"
          >
            <img
              :src="useImageUrl(g.image_url, { width: 1000, format: 'webp', quality: 80 }) || ''"
              :alt="g.caption || ''"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-[1000ms] ease-out-expo"
            />
          </div>
        </div>
        <p v-else class="py-24 text-center text-ink-faint border border-dashed border-paper-line">
          [공장 사진은 관리자 페이지에서 업로드합니다.]
        </p>
      </div>
    </section>

    <!-- TOP 버튼 -->
    <CommonTopButton />
  </div>
</template>
