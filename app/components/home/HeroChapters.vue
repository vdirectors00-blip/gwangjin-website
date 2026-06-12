<script setup lang="ts">
// GitHub Pages base path 자동 적용 (인라인 background-image url은 자동 처리 안 됨)
const baseURL = useRuntimeConfig().app.baseURL
const withBase = (path: string) => `${baseURL}${path.replace(/^\//, '')}`

const chapters = [
  {
    chapter: '01 — HERITAGE',
    mainA: '섬유, 한 가닥의',
    mainB: '일.',
    sub: '솜 한 가닥에,\n삼십 년.',
    hueA: '#3D3328',
    hueB: '#1A1814',
    lineOpacity: 0.30,
    focus: '72% 50%',
    image: '/images/hero/hero-1.jpg',     // 따뜻한 니트 소재(거리감) — 원료·시작
  },
  {
    chapter: '02 — CRAFT',
    mainA: '보이지 않는',
    mainB: '자리의 기술.',
    sub: '이불 속, 매트리스의 결,\n겨울옷의 안쪽.',
    hueA: '#2F3A32',
    hueB: '#161916',
    lineOpacity: 0.24,
    focus: '25% 60%',
    image: '/images/hero/hero-2.jpg',  // 따뜻한 니트 throw(거리감) — 기술·소재
  },
  {
    chapter: '03 — PROMISE',
    mainA: '온도와 감촉을',
    mainB: '짓다.',
    sub: '1994년부터,\n조용히 품질로 증명합니다.',
    hueA: '#4A3A28',
    hueB: '#1A1510',
    lineOpacity: 0.36,
    focus: '50% 42%',
    image: '/images/hero/hero-3.jpg',  // 정돈된 침대(가로, 따뜻한 톤) — 완성·약속
  },
]

const cur = ref(0)
const paused = ref(false)
const hover = ref<'L' | 'R' | null>(null)
const INTERVAL = 5000   // 자동 전환 간격

const go = (n: number) => { cur.value = ((n % chapters.length) + chapters.length) % chapters.length }
const next = () => go(cur.value + 1)
const prev = () => go(cur.value - 1)

let timer: ReturnType<typeof setInterval> | null = null
const startTimer = () => {
  if (timer) clearInterval(timer)
  if (paused.value) return
  timer = setInterval(next, INTERVAL)
}
onMounted(() => {
  startTimer()
  watch([paused, cur], startTimer)
})
onBeforeUnmount(() => { if (timer) clearInterval(timer) })

const slide = computed(() => chapters[cur.value])
// 섬유 라인 (고정 개수, idx별 wobble)
const fiberLines = (idx: number) => {
  return Array.from({ length: 42 }, (_, i) => {
    const y = 150 + i * 20 + idx * 6
    const wobble = Math.sin(i * (0.55 + idx * 0.18)) * (55 + idx * 10)
    return {
      d: `M -100 ${y} Q 400 ${y + wobble} 720 ${y + wobble * 0.3} T 1540 ${y - wobble * 0.5}`,
      strokeWidth: 0.5 + (i % 3) * 0.25,
      opacity: 0.3 + (i % 5) * 0.1,
    }
  })
}
</script>

<template>
  <section
    class="relative h-full bg-dark text-paper overflow-hidden"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <!-- 배경 (crossfade 3장) -->
    <div
      v-for="(s, i) in chapters" :key="i"
      :class="[
        'absolute inset-0 transition-opacity duration-[1200ms] ease-out-expo',
        cur === i ? 'opacity-100' : 'opacity-0',
      ]"
    >
      <!-- 0. 사진 배경 (grayscale 50%, 어둡게) -->
      <div
        v-if="s.image"
        class="absolute inset-0 bg-cover bg-center"
        :style="`background-image: url('${withBase(s.image)}'); filter: grayscale(28%) brightness(0.95);`"
      />
      <!-- 1. 그라데이션 컬러 오버레이 -->
      <div
        class="absolute inset-0 mix-blend-multiply"
        :style="`background: linear-gradient(135deg, ${s.hueA} 0%, ${s.hueB} 100%); opacity: 0.32;`"
      />
      <!-- 2. 포커스 라이트 -->
      <div
        class="absolute inset-0"
        :style="`background: radial-gradient(1400px 900px at ${s.focus}, rgba(181,155,122,0.18), transparent 62%), radial-gradient(900px 700px at 10% 90%, rgba(139,115,85,0.08), transparent 65%);`"
      />
      <!-- 3. SVG 섬유 라인 (사진 위에 약하게) -->
      <svg
        viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        class="absolute inset-0 w-full h-full"
        :style="`opacity:${s.lineOpacity}`"
      >
        <defs>
          <linearGradient :id="`heroFiber-${i}`" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" stop-color="#D6BFA0" stop-opacity="0" />
            <stop offset="0.4" stop-color="#D6BFA0" stop-opacity="0.55" />
            <stop offset="0.7" stop-color="#8B7355" stop-opacity="0.45" />
            <stop offset="1" stop-color="#1A1814" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path
          v-for="(f, j) in fiberLines(i)" :key="j"
          :d="f.d"
          :stroke="`url(#heroFiber-${i})`"
          :stroke-width="f.strokeWidth"
          fill="none"
          :opacity="f.opacity"
        />
      </svg>
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(26,24,20,0.16) 0%, transparent 28%, transparent 50%, rgba(26,24,20,0.58) 100%);"
      />
    </div>

    <!-- 좌/우 화살표 — 데스크탑 전용 (모바일은 도트 인디케이터로 조작) -->
    <button
      @mouseenter="hover = 'L'" @mouseleave="hover = null"
      @click="prev"
      aria-label="Previous"
      :class="[
        'absolute left-6 md:left-16 top-1/2 -translate-y-1/2 w-12 h-12 z-10 text-paper hidden md:flex items-center justify-center transition-opacity duration-300',
        hover === 'L' ? 'opacity-90' : 'opacity-30',
      ]"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M15 6l-6 6 6 6" />
      </svg>
    </button>
    <button
      @mouseenter="hover = 'R'" @mouseleave="hover = null"
      @click="next"
      aria-label="Next"
      :class="[
        'absolute right-6 md:right-20 top-1/2 -translate-y-1/2 w-12 h-12 z-10 text-paper hidden md:flex items-center justify-center transition-opacity duration-300',
        hover === 'R' ? 'opacity-90' : 'opacity-30',
      ]"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
        <path d="M9 6l6 6-6 6" />
      </svg>
    </button>

    <!-- 콘텐츠 -->
    <div class="relative z-10 h-full max-w-container mx-auto px-6 md:px-10 lg:px-16 flex flex-col justify-end pb-24 md:pb-32">
      <!-- 상단 메타 (모바일은 tracking·텍스트 압축) -->
      <div class="absolute top-32 left-6 md:left-10 right-6 md:right-10 flex justify-between items-baseline gap-3">
        <div class="text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.4em] text-paper/55 font-medium whitespace-nowrap">
          EST.&nbsp;&nbsp;1994&nbsp;&nbsp;·&nbsp;&nbsp;인천
        </div>
        <div
          :key="`chap-${cur}`"
          class="text-[11px] md:text-[22px] tracking-[0.2em] md:tracking-[0.3em] text-paper/75 font-medium animate-fade-up whitespace-nowrap"
        >
          {{ slide.chapter }}
        </div>
      </div>

      <!-- 메인 카피 — 글자 크기 반으로 (clamp 22~78), italic 제거, weight font-medium -->
      <div :key="`txt-${cur}`" class="animate-fade-up">
        <h1 class="m-0 font-sans font-medium text-[clamp(22px,5vw,78px)] leading-[0.95] tracking-[-0.035em]">
          {{ slide.mainA }}<br>
          <!-- 강조 단어 — bronze 톤 -->
          <span class="inline-block text-accent-bronze-soft font-semibold animate-hero-accent origin-bottom-left">
            {{ slide.mainB }}
          </span>
        </h1>

        <div class="mt-8 md:mt-10">
          <p class="text-[15px] md:text-[17px] leading-[1.75] max-w-md text-paper/85 font-normal whitespace-pre-line m-0">
            {{ slide.sub }}
          </p>
        </div>
      </div>
    </div>

    <!-- 인디케이터 — 시각은 얇은 라인, 실제 클릭 영역은 충분히 크게 -->
    <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
      <button
        v-for="(_, i) in chapters" :key="i"
        @click="go(i)"
        :aria-label="`Slide ${i + 1}`"
        class="relative w-16 md:w-20 h-8 p-0 border-0 bg-transparent cursor-pointer flex items-center justify-center group"
      >
        <!-- 실제 얇은 라인 (시각적) -->
        <span class="relative block w-full h-px">
          <span class="absolute inset-0 bg-white/25 group-hover:bg-white/40 transition-colors" />
          <span
            :key="`fill-${i}-${cur}-${paused}`"
            class="absolute left-0 top-0 bottom-0 bg-white"
            :style="`width: ${cur === i ? '100%' : (i < cur ? '100%' : '0%')}; transition: width ${cur === i && !paused ? INTERVAL + 'ms linear' : '300ms ease'};`"
          />
        </span>
      </button>
    </div>

    <!-- 하단 얇은 선 -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
  </section>
</template>
