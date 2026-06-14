<script setup lang="ts">
// GitHub Pages base path 자동 적용 (인라인 background-image url은 자동 처리 안 됨)
const baseURL = useRuntimeConfig().app.baseURL
const withBase = (path: string) => `${baseURL}${path.replace(/^\//, '')}`

// 단일 정적 히어로 — 3챕터를 하단 3분할 트립틱으로 한 화면에 (클라 요청 6/14)
const image = '/images/hero/hero-main.jpg'   // 가정집 침실 · 흰 침구 (클라 제공)
const hueA = '#3D3328'
const hueB = '#1A1814'
const focus = '50% 45%'

const items = [
  { no: '01', label: 'HERITAGE', head: '섬유, 한 가닥의', accent: '일.', sub: '솜 한 가닥에, 삼십 년.' },
  { no: '02', label: 'CRAFT',    head: '가장 가까운 곳의', accent: '온기.', sub: '이불 속, 매트리스의 결, 겨울옷의 안쪽.' },
  { no: '03', label: 'PROMISE',  head: '온도와 감촉을', accent: '짓다.', sub: '1994년부터 조용히 품질로 증명합니다.' },
]

// 대표(큰) 위치가 계속 순환 — 이미지는 고정, 어느 챕터가 대표인지만 바뀜
const cur = ref(2)   // 03 PROMISE 부터 시작
const paused = ref(false)
const INTERVAL = 4500

const go = (n: number) => { cur.value = ((n % items.length) + items.length) % items.length }
const next = () => go(cur.value + 1)

const featured = computed(() => items[cur.value])
const others = computed(() => items.filter((_, i) => i !== cur.value))

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

// 섬유 라인 (브랜드 모티프, 사진 위 아주 약하게)
const fiberLines = Array.from({ length: 42 }, (_, i) => {
  const y = 150 + i * 20
  const wobble = Math.sin(i * 0.55) * 55
  return {
    d: `M -100 ${y} Q 400 ${y + wobble} 720 ${y + wobble * 0.3} T 1540 ${y - wobble * 0.5}`,
    strokeWidth: 0.5 + (i % 3) * 0.25,
    opacity: 0.3 + (i % 5) * 0.1,
  }
})
</script>

<template>
  <section
    class="relative h-full bg-dark text-paper overflow-hidden"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <!-- 배경 (단일 고정) -->
    <div class="absolute inset-0">
      <!-- 0. 사진 배경 -->
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="`background-image: url('${withBase(image)}'); filter: grayscale(14%) brightness(0.98);`"
      />
      <!-- 1. 그라데이션 컬러 오버레이 (아주 약하게) -->
      <div
        class="absolute inset-0 mix-blend-multiply"
        :style="`background: linear-gradient(135deg, ${hueA} 0%, ${hueB} 100%); opacity: 0.18;`"
      />
      <!-- 2. 포커스 라이트 -->
      <div
        class="absolute inset-0"
        :style="`background: radial-gradient(1400px 900px at ${focus}, rgba(181,155,122,0.14), transparent 62%), radial-gradient(900px 700px at 10% 90%, rgba(139,115,85,0.08), transparent 65%);`"
      />
      <!-- 3. SVG 섬유 라인 (사진 위에 약하게) -->
      <svg
        viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        class="absolute inset-0 w-full h-full"
        style="opacity:0.16"
      >
        <defs>
          <linearGradient id="heroFiber" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" stop-color="#D6BFA0" stop-opacity="0" />
            <stop offset="0.4" stop-color="#D6BFA0" stop-opacity="0.55" />
            <stop offset="0.7" stop-color="#8B7355" stop-opacity="0.45" />
            <stop offset="1" stop-color="#1A1814" stop-opacity="0" />
          </linearGradient>
        </defs>
        <path
          v-for="(f, j) in fiberLines" :key="j"
          :d="f.d"
          stroke="url(#heroFiber)"
          :stroke-width="f.strokeWidth"
          fill="none"
          :opacity="f.opacity"
        />
      </svg>
      <!-- 4. 가독성 스크림 — 좌측·하단 강화 -->
      <div
        class="absolute inset-0"
        style="background: linear-gradient(180deg, rgba(26,24,20,0.20) 0%, transparent 30%, transparent 40%, rgba(26,24,20,0.62) 100%);"
      />
      <div
        class="absolute inset-0"
        style="background: linear-gradient(90deg, rgba(26,24,20,0.50) 0%, rgba(26,24,20,0.12) 44%, transparent 62%);"
      />
    </div>

    <!-- 콘텐츠 -->
    <div class="relative z-10 h-full max-w-container mx-auto px-6 md:px-10 lg:px-16 flex flex-col justify-end pb-20 md:pb-28">
      <!-- 상단 메타 -->
      <div class="absolute top-32 left-6 md:left-10 right-6 md:right-10 flex justify-between items-baseline gap-3">
        <div class="text-[10px] md:text-[11px] tracking-[0.2em] md:tracking-[0.4em] text-paper/65 font-medium whitespace-nowrap">
          EST.&nbsp;&nbsp;1994&nbsp;&nbsp;·&nbsp;&nbsp;인천
        </div>
        <div class="text-[11px] md:text-[15px] tracking-[0.2em] md:tracking-[0.3em] text-paper/75 font-medium whitespace-nowrap">
          COSY&nbsp;FEEL
        </div>
      </div>

      <!-- 대표 1 + 보조 2 (대표 위치 순환) -->
      <!-- 대표 헤드라인 (cur 챕터) -->
      <div :key="`feat-${cur}`" class="animate-fade-up">
        <div class="font-mono text-[11px] md:text-[13px] tracking-[0.24em] lowercase text-paper/55 leading-none mb-5 md:mb-6">
          {{ featured.label }}
        </div>
        <h1 class="m-0 font-sans font-medium text-[clamp(34px,5.6vw,80px)] leading-[0.98] tracking-[-0.035em]">
          {{ featured.head }}<br>
          <span class="inline-block text-accent-bronze-soft font-semibold animate-hero-accent origin-bottom-left">{{ featured.accent }}</span>
        </h1>
        <p class="mt-6 md:mt-7 text-[14px] md:text-[16px] leading-[1.7] text-paper/85 font-normal max-w-md m-0">
          {{ featured.sub }}
        </p>
      </div>

      <!-- 보조 2 (나머지 챕터) -->
      <div :key="`others-${cur}`" class="mt-10 md:mt-12 border-t border-paper/18 pt-7 md:pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 max-w-3xl">
        <div
          v-for="(it, i) in others" :key="it.no"
          class="animate-fade-up"
          :style="`animation-delay:${(i + 1) * 100}ms`"
        >
          <div class="font-mono text-[10px] md:text-[11px] tracking-[0.24em] lowercase text-paper/50 leading-none">
            {{ it.label }}
          </div>
          <h2 class="mt-3 m-0 font-sans font-medium text-[clamp(18px,1.9vw,24px)] leading-[1.15] tracking-[-0.02em]">
            {{ it.head }} <span class="text-accent-bronze-soft font-semibold">{{ it.accent }}</span>
          </h2>
          <p class="mt-1.5 text-[12px] md:text-[13px] leading-[1.55] text-paper/75 font-normal m-0">
            {{ it.sub }}
          </p>
        </div>
      </div>
    </div>

    <!-- 인디케이터 — 얇은 라인 (진행 + 클릭) -->
    <div class="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
      <button
        v-for="(_, i) in items" :key="i"
        @click="go(i)"
        :aria-label="`Chapter ${i + 1}`"
        class="relative w-16 md:w-20 h-8 p-0 border-0 bg-transparent cursor-pointer flex items-center justify-center group"
      >
        <span class="relative block w-full h-px">
          <span class="absolute inset-0 bg-white/25 group-hover:bg-white/40 transition-colors" />
          <span
            :key="`fill-${i}-${cur}-${paused}`"
            class="absolute left-0 top-0 bottom-0 bg-white"
            :style="`width: ${cur === i ? '100%' : '0%'}; transition: width ${cur === i && !paused ? INTERVAL + 'ms linear' : '300ms ease'};`"
          />
        </span>
      </button>
    </div>

    <!-- 하단 얇은 선 -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
  </section>
</template>
