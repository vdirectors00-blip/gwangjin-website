<script setup lang="ts">
useHead({ title: '경영 이념 | 광진실업' })

const { data: company } = await useCompanyInfo()

// desc: \n 위치에서 줄바꿈 (whitespace-pre-line)
const values = computed(() => [
  {
    num: '01',
    en: 'Heritage',
    ko: '축적된 노하우',
    title: '한 길만, 삼십 년.',
    desc: '부직포 및 제면 분야에서만 쌓아 온 시간.\n단순한 연수가 아닌 매일의 디테일이 만든 차이입니다.',
    stat: company.value?.founded_year ? `${new Date().getFullYear() - company.value.founded_year}+ Years` : '30+ Years',
  },
  {
    num: '02',
    en: 'Quality',
    ko: '우수한 품질',
    title: '인증된 신뢰.',
    desc: 'ISO 9001(품질) · 14001(환경) · 한국인증원 QER · 이노비즈.\n자체 특허 4건까지 더한 검증된 시스템.',
    stat: '4 ISO · 4 Patents',
  },
  {
    num: '03',
    en: 'Future',
    ko: '미래 지향',
    title: '다음 세대를 위한 설비.',
    desc: '다섯 번의 라인 증설로 점진적 확장해 온 공장.\n더 조용히, 더 정교하게 다음 세대를 준비합니다.',
    stat: `${company.value?.production_lines || 5} Lines`,
  },
])

// 자동 6초 순환 + 클릭 수동 전환
const activeIdx = ref(0)
const hoverIdx = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const startTimer = () => {
  if (timer) clearInterval(timer)
  timer = setInterval(() => { activeIdx.value = (activeIdx.value + 1) % 3 }, 6000)
}

const selectCard = (i: number) => {
  activeIdx.value = i
  startTimer()
}

onMounted(startTimer)
onBeforeUnmount(() => { if (timer) clearInterval(timer) })
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
      <!-- 배경 이미지 + 오버레이 -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="background-image: url('/images/intro/philosophy.jpg'); filter: grayscale(40%) brightness(0.92);"
      />
      <div class="absolute inset-0 bg-paper-soft/85" />

      <div class="relative z-10 container-narrow grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-center py-16">
        <div class="md:col-span-6">
          <p class="mono-label text-accent-bronze mb-6">Our Principles · 경영 이념</p>
          <h1 class="italic font-light text-[clamp(40px,5.5vw,80px)] leading-[1.15] tracking-[-0.025em] text-ink-dim">
            솜 한 가닥에,<br>
            <span class="text-accent-bronze">삼십 년</span>의 기술.
          </h1>
          <div class="mt-10 w-16 h-px bg-ink/30" />
        </div>

        <div class="md:col-span-6">
          <p class="text-ink-dim text-lg md:text-xl leading-[1.95] font-light">
            우리는 충전재를 단순한 '속 재료'로 생각하지 않습니다.
            매일 닿는 이불의 편안함, 매트리스의 안정감, 겨울옷의 따뜻함 —
            결국 사람의 휴식을 만드는 핵심 소재입니다.
          </p>
          <p class="mt-6 text-ink-muted text-base leading-relaxed font-light">
            그 책임을 알기에 1994년부터 같은 자리에서 한 길만 걸어왔습니다.
          </p>
        </div>
      </div>
    </section>

    <!-- 3가지 가치 -->
    <section class="bg-paper-warm border-t border-paper-line py-24 md:py-32">
      <div class="container-x">
        <div class="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <p class="eyebrow text-ink-muted">Three Values</p>
            <h2 class="mt-4 italic font-medium text-display-md">
              Heritage · Quality · Future
            </h2>
          </div>
          <div class="hidden md:flex items-center gap-2">
            <span
              v-for="(_, i) in values" :key="i"
              :class="[
                'h-px transition-all duration-700 ease-out-expo',
                activeIdx === i ? 'w-10 bg-accent-bronze' : 'w-4 bg-ink/20',
              ]"
            />
          </div>
        </div>

        <div class="flex flex-col md:flex-row gap-5">
          <div
            v-for="(v, i) in values" :key="v.num"
            :class="[
              'bg-paper p-10 md:p-14 flex flex-col transition-all duration-1000 ease-out-expo cursor-pointer overflow-hidden',
              activeIdx === i
                ? 'md:flex-[2.4] md:min-h-[560px]'
                : 'md:flex-[1] md:min-h-[560px]',
            ]"
            @mouseenter="hoverIdx = i"
            @mouseleave="hoverIdx = null"
            @click="selectCard(i)"
          >
            <div
              :class="[
                'italic font-light tracking-[-0.03em] leading-none transition-all duration-1000 ease-out-expo',
                activeIdx === i ? 'text-[clamp(80px,12vw,160px)]' : 'text-[clamp(56px,6vw,88px)]',
                activeIdx === i ? 'text-accent-bronze'
                  : hoverIdx === i ? 'text-accent-bronze-soft' : 'text-ink-faint',
              ]"
            >
              {{ v.num }}
            </div>

            <div
              :class="[
                'mt-auto pt-8 transition-opacity duration-700',
                activeIdx === i ? 'opacity-100' : hoverIdx === i ? 'opacity-90' : 'opacity-70',
              ]"
            >
              <h3
                :class="[
                  'italic font-medium tracking-[-0.02em] whitespace-nowrap transition-all duration-700 ease-out-expo',
                  activeIdx === i ? 'text-[40px] md:text-[48px]' : 'text-[24px] md:text-[28px]',
                  hoverIdx === i && activeIdx !== i ? 'text-accent-bronze' : 'text-ink',
                ]"
              >
                {{ v.en }}
              </h3>
              <p class="text-accent-bronze text-sm mt-1">{{ v.ko }}</p>

              <!-- 상세 — 카드 확장/축소와 동기화 (줄바꿈을 \n으로 고정해서 reflow 없음) -->
              <div
                :class="[
                  'transition-all duration-700 ease-out-expo',
                  activeIdx === i ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 mt-0 opacity-0 overflow-hidden',
                ]"
              >
                <div class="w-12 h-px bg-ink/20 mb-6" />
                <h4 class="italic font-normal text-xl text-ink">{{ v.title }}</h4>
                <!-- desc: 단일 문단 (\n으로 수동 줄바꿈 가능). activeIdxDelayed로 확장 후 표시되어 reflow 없음 -->
                <p class="text-ink-dim leading-relaxed mt-4 font-light whitespace-pre-line">{{ v.desc }}</p>
                <p class="mt-6 text-accent-bronze italic text-2xl font-medium tracking-[-0.02em]">{{ v.stat }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
