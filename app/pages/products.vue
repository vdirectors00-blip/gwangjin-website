<script setup lang="ts">
import { PRODUCT_TRAITS } from '~/types/database.types'

definePageMeta({ layout: 'home' })
useHead({ title: 'Products | 광진실업' })

const { data: products } = await useProducts()
const items = computed(() => products.value || [])

// 매트릭스 호버
const hoveredIdx = ref<number | null>(null)

// 모달
const openedIdx = ref<number | null>(null)
const openedProduct = computed(() => {
  if (openedIdx.value === null) return null
  return items.value[openedIdx.value]
})
const openModal = (i: number) => { openedIdx.value = i }
const closeModal = () => { openedIdx.value = null }

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})

// 제품별 활성 특성 키 목록
const activeTraits = (p: typeof items.value[0]) =>
  PRODUCT_TRAITS.filter(t => (p as any)[t.key])
const activeTraitsCount = (p: typeof items.value[0]) => activeTraits(p).length

// 소재 카테고리 (제품리스트 12종 기준 — 클라이언트 최종 확인 필요)
const categoryMap: Record<string, { label: string; colorClass: string }> = {
  // 천연
  'cashmere':        { label: 'NATURAL',    colorClass: 'text-accent-bronze' },
  'mohair':          { label: 'NATURAL',    colorClass: 'text-accent-bronze' },
  'alpaca':          { label: 'NATURAL',    colorClass: 'text-accent-bronze' },
  'silk':            { label: 'NATURAL',    colorClass: 'text-accent-bronze' },
  // 친환경 (셀룰로오스·식물 유래)
  'smartcel':        { label: 'ECO',        colorClass: 'text-accent-bronze' },
  'seacell':         { label: 'ECO',        colorClass: 'text-accent-bronze' },
  'polafil':         { label: 'ECO',        colorClass: 'text-accent-bronze' },
  // 기능성
  'flame-retardant': { label: 'FUNCTIONAL', colorClass: 'text-ink-muted' },
  'micro-padding':   { label: 'FUNCTIONAL', colorClass: 'text-ink-muted' },
  'eco-hot-fiber':   { label: 'FUNCTIONAL', colorClass: 'text-ink-muted' },
  'graphene':        { label: 'FUNCTIONAL', colorClass: 'text-ink-muted' },
  'fresh':           { label: 'FUNCTIONAL', colorClass: 'text-ink-muted' },
}
const getCategory = (slug: string) =>
  categoryMap[slug] || { label: 'OTHER', colorClass: 'text-ink-muted' }

// 제품 이미지 — DB 이미지가 있으면 그걸, 없으면 slug 기준 로컬 스톡 이미지로 폴백
const assetUrl = useAssetUrl()
const productImage = (p: typeof items.value[0]) =>
  p.image_url
    ? useImageUrl(p.image_url, { width: 800, format: 'webp' })
    : assetUrl(`/images/products/${p.slug}.jpg`)
</script>

<template>
  <div>
    <div class="h-[76px]" />

    <div id="products-snap" class="h-[calc(100vh-76px)] overflow-y-auto no-scrollbar">
      <HomeSnapController container="products-snap" :duration="1000" :cooldown="1100" />

      <!-- ───── 1. Hero ───── -->
      <section class="relative min-h-[calc(100vh-76px)] bg-white flex items-center px-6 md:px-10 lg:px-16 overflow-hidden">
        <!-- 은은한 소재 사진 배경 -->
        <div
          class="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.30]"
          :style="`background-image:url('${assetUrl('/images/bg/sub-products.jpg')}'); filter: grayscale(40%) brightness(1.04);`"
        />
        <!-- 그리드 배경 -->
        <div
          class="absolute inset-0 pointer-events-none opacity-50"
          style="background-image: linear-gradient(to right, rgba(139,115,85,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,115,85,0.06) 1px, transparent 1px); background-size: 80px 80px;"
        />

        <div class="relative z-10 max-w-container mx-auto w-full">
          <p class="mono-label text-accent-bronze mb-6 ink-fade" style="animation-delay: 0ms;">
            Products · 충전재 라인업
          </p>
          <h1 class="font-light text-[clamp(56px,8vw,140px)] leading-[0.95] tracking-[-0.035em] text-ink-dim">
            <span class="block ink-fade" style="animation-delay: 180ms;">Twelve</span>
            <span class="block ink-fade" style="animation-delay: 480ms;">
              <span class="text-accent-bronze">Filling</span> Materials.
            </span>
          </h1>
          <div class="mt-12 w-16 h-px bg-ink/30 ink-fade" style="animation-delay: 820ms;" />
          <p class="mt-10 mono-label text-ink-faint ink-fade" style="animation-delay: 1100ms;">
            Scroll ↓ &nbsp;·&nbsp; Three Sections
          </p>
        </div>
      </section>

      <!-- ───── 2. Matrix (호버 인터랙션 — 폰트 사이즈 고정, 색만 변화)
        모바일: 표가 너무 커서 사용성 떨어짐 → 데스크탑(md+) 전용
      ───── -->
      <section class="min-h-[calc(100vh-76px)] bg-paper-soft border-t border-paper-line hidden md:flex flex-col px-6 md:px-10 lg:px-16 py-6 md:py-8">
        <div class="max-w-container mx-auto w-full flex-1 flex flex-col">
          <!-- 헤더 -->
          <div class="flex items-end justify-between mb-4 md:mb-6">
            <div>
              <p class="eyebrow text-ink-muted">Characteristic Matrix</p>
              <h2 class="mt-2 font-medium text-[clamp(24px,3vw,40px)] tracking-[-0.03em]">특성 매트릭스</h2>
            </div>
            <div class="mono-label text-ink-faint hidden md:block">
              HOVER TO EXPLORE
            </div>
          </div>

          <!-- 본문: 좌 사이드바 + 우 히트맵 -->
          <div class="flex-1 flex items-center min-h-0">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 w-full">
              <!-- 좌: 제품 리스트 (폰트 사이즈 고정 — 색·border만 변화) -->
              <div class="md:col-span-3 hidden md:block">
                <p class="mono-label text-ink-muted mb-3">Products · {{ items.length }}</p>
                <ul>
                  <li
                    v-for="(p, i) in items" :key="p.id"
                    :class="[
                      'py-1 pl-3 text-sm cursor-default transition-colors duration-300 border-l-2',
                      hoveredIdx === i
                        ? 'border-accent-bronze bg-accent-bronze/5'
                        : 'border-transparent',
                      hoveredIdx !== null && hoveredIdx !== i ? 'opacity-40' : 'opacity-100',
                    ]"
                    @mouseenter="hoveredIdx = i"
                    @mouseleave="hoveredIdx = null"
                  >
                    <div
                      :class="[
                        'italic tracking-[-0.01em] text-sm leading-tight transition-colors duration-300',
                        hoveredIdx === i ? 'font-semibold text-accent-bronze' : 'font-medium text-ink',
                      ]"
                    >
                      {{ p.name }}
                    </div>
                    <div
                      v-if="p.korean_name"
                      :class="[
                        'text-[11px] leading-tight transition-colors duration-300',
                        hoveredIdx === i ? 'text-ink-muted' : 'text-ink-faint',
                      ]"
                    >
                      {{ p.korean_name }}
                    </div>
                  </li>
                </ul>
              </div>

              <!-- 우: 매트릭스 (행 높이·폰트 사이즈 고정 — 색·weight·underline만 변화) -->
              <div class="md:col-span-9 overflow-x-auto no-scrollbar">
                <table class="w-full border-collapse text-sm min-w-[640px]">
                  <thead>
                    <tr class="border-b border-paper-line">
                      <th class="text-left pb-2 pr-4 text-ink-muted font-medium text-[13px]">Product</th>
                      <!-- 헤더: 폰트 사이즈 고정 — 호버된 제품이 가진 특성은 bronze + underline -->
                      <th
                        v-for="t in PRODUCT_TRAITS" :key="t.key"
                        class="text-center px-2 pb-2 tracking-tight whitespace-nowrap align-bottom"
                      >
                        <span
                          :class="[
                            'inline-block text-[13px] pb-0.5 border-b-2 transition-colors duration-300',
                            hoveredIdx !== null && items[hoveredIdx] && (items[hoveredIdx] as any)[t.key]
                              ? 'text-accent-bronze font-bold border-accent-bronze'
                              : hoveredIdx !== null
                                ? 'text-ink-faint font-medium border-transparent'
                                : 'text-ink font-semibold border-transparent',
                          ]"
                        >
                          {{ t.label }}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(p, pi) in items" :key="p.id"
                      :class="[
                        'border-b border-paper-line/60 transition-colors duration-300',
                        hoveredIdx === pi ? 'bg-accent-bronze/5' : '',
                        hoveredIdx !== null && hoveredIdx !== pi ? 'opacity-40' : 'opacity-100',
                      ]"
                      @mouseenter="hoveredIdx = pi"
                      @mouseleave="hoveredIdx = null"
                    >
                      <td class="py-1.5 pr-4 md:hidden">
                        <span class="font-medium text-sm">{{ p.name }}</span>
                      </td>
                      <td class="py-1.5 pr-4 hidden md:table-cell">
                        <!-- 폰트 사이즈 고정 (text-[13px]) — 색·weight만 변화 -->
                        <span
                          :class="[
                            'italic text-[13px] transition-colors duration-300',
                            hoveredIdx === pi ? 'font-semibold text-accent-bronze' : 'font-medium text-ink-muted',
                          ]"
                        >
                          {{ p.name }}
                        </span>
                      </td>
                      <!-- 셀: 사이즈 고정, 존재여부만 색으로 -->
                      <td
                        v-for="t in PRODUCT_TRAITS" :key="t.key"
                        class="text-center px-2 py-1.5"
                      >
                        <div
                          :class="[
                            'mx-auto w-3.5 h-3.5 transition-colors duration-300',
                            (p as any)[t.key]
                              ? (hoveredIdx === pi ? 'bg-accent-bronze' : 'bg-accent-bronze/70')
                              : 'bg-paper-line/40',
                          ]"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 3. Card Grid (컴팩트 5×3) ───── -->
      <section class="min-h-[calc(100vh-76px)] bg-white border-t border-paper-line flex flex-col px-6 md:px-10 lg:px-16 py-8 md:py-10">
        <div class="max-w-container mx-auto w-full flex-1 flex flex-col">
          <div class="flex items-end justify-between mb-6 md:mb-8">
            <div>
              <p class="eyebrow text-ink-muted">Product Cards</p>
              <h2 class="mt-3 font-medium text-[clamp(28px,3.5vw,48px)] tracking-[-0.03em]">제품 카드</h2>
            </div>
            <div class="mono-label text-ink-faint hidden md:block">
              CLICK TO VIEW DETAIL
            </div>
          </div>

          <div class="flex-1 flex items-center">
            <!-- 그리드: 모바일 2col, 태블릿 3col, 데스크톱 5col -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 w-full">
              <button
                v-for="(p, i) in items" :key="p.id"
                type="button"
                @click="openModal(i)"
                class="group relative bg-paper-soft border border-paper-line text-left p-4 md:p-5 hover:bg-paper-warm hover:border-accent-bronze/50 hover:-translate-y-1 transition-all duration-500 ease-out-expo min-h-[180px] flex flex-col cursor-pointer overflow-hidden"
              >
                <!-- 좌측 bronze 스트라이프 (trait 4개 이상 = "signature") -->
                <span
                  v-if="activeTraitsCount(p) >= 4"
                  class="absolute left-0 top-6 bottom-6 w-[2px] bg-accent-bronze/70 transition-all duration-500 ease-out-expo group-hover:top-0 group-hover:bottom-0 group-hover:bg-accent-bronze pointer-events-none"
                />

                <!-- 제품 이미지 배경 (은은하게) + 종이 오버레이 (가독성) -->
                <div
                  class="absolute inset-0 bg-cover bg-center opacity-[0.22] group-hover:opacity-45 transition-opacity duration-500 pointer-events-none"
                  :style="`background-image:url('${productImage(p)}'); filter: grayscale(45%) contrast(1.02);`"
                />
                <div class="absolute inset-0 bg-paper-soft/80 group-hover:bg-paper-warm/70 transition-colors duration-500 pointer-events-none" />

                <!-- 상단: 카테고리 태그 + 번호 -->
                <div class="relative flex items-baseline justify-between mb-3">
                  <span class="mono-label" :class="getCategory(p.slug).colorClass">
                    {{ getCategory(p.slug).label }}
                  </span>
                  <span class="mono-label text-ink-faint">{{ String(i + 1).padStart(2, '0') }}</span>
                </div>

                <!-- 제품명 -->
                <div class="relative">
                  <h3 class="font-medium text-base md:text-lg tracking-[-0.015em] text-ink group-hover:text-accent-bronze transition-colors line-clamp-2 leading-tight">
                    {{ p.name }}
                  </h3>
                  <p v-if="p.korean_name" class="text-[11px] text-ink-muted mt-1 line-clamp-1">
                    {{ p.korean_name }}
                  </p>
                </div>

                <!-- 하단: 특성 도트 + VIEW 화살표 -->
                <div class="relative mt-auto pt-3 border-t border-paper-line/60 flex items-center justify-between">
                  <div class="flex items-center gap-1">
                    <div
                      v-for="t in PRODUCT_TRAITS" :key="t.key"
                      :class="[
                        'w-1.5 h-1.5 rounded-full transition-colors duration-300',
                        (p as any)[t.key] ? 'bg-accent-bronze' : 'bg-paper-line',
                      ]"
                      :title="t.label"
                    />
                    <span class="mono-label text-ink-faint ml-2">{{ activeTraitsCount(p) }}/08</span>
                  </div>
                  <span class="mono-label text-accent-bronze opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    VIEW →
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 4. Next + Footer (라이트 paper-soft 톤) ───── -->
      <section class="min-h-[calc(100vh-76px)] bg-paper-soft text-ink flex flex-col border-t border-paper-line/60">
        <div class="flex-1 flex items-center px-6 md:px-10 lg:px-16 py-16">
          <div class="max-w-container mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div class="md:col-span-7">
              <p class="eyebrow text-ink-muted">Next</p>
              <h2 class="mt-6 font-light text-display-sm text-ink">
                제품에 대한 문의가 있다면,<br>
                <span class="text-accent-bronze">편하게 연락주세요</span>.
              </h2>
            </div>
            <div class="md:col-span-5 md:text-right">
              <NuxtLink
                to="/contact"
                class="group inline-flex items-center gap-5 md:gap-6"
              >
                <span class="text-xl md:text-2xl text-ink group-hover:text-accent-bronze transition-colors duration-500">
                  문의하기
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

    <!-- ═══════════════ 제품 상세 모달 ═══════════════ -->
    <Transition
      enter-active-class="transition-all duration-500 ease-out-expo"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-400 ease-out-expo"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="openedIdx !== null && openedProduct"
        class="fixed inset-0 z-[100] bg-dark/85 backdrop-blur-md flex items-center justify-center p-6 md:p-10 cursor-pointer"
        @click="closeModal"
      >
        <Transition
          appear
          enter-active-class="transition-all duration-600 ease-out-expo"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-400"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            class="relative max-w-6xl w-full bg-white flex flex-col md:flex-row max-h-[90vh] overflow-hidden cursor-default"
            @click.stop
          >
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-ink-muted hover:text-accent-bronze transition-colors text-2xl"
              aria-label="Close"
            >
              ×
            </button>

            <!-- 좌: 제품 이미지 (전체 커버) -->
            <div class="md:w-2/5 bg-paper-soft relative min-h-[240px] md:min-h-[400px] overflow-hidden">
              <img
                :src="productImage(openedProduct) || ''"
                :alt="openedProduct.name"
                class="absolute inset-0 w-full h-full object-cover"
                @error="(e) => { (e.target as HTMLImageElement).src = assetUrl('/images/bg/subpage.jpg') }"
              />
              <span class="absolute top-4 left-4 mono-label text-paper bg-dark/35 backdrop-blur-sm px-2.5 py-1">
                Product {{ String(openedIdx + 1).padStart(2, '0') }}
              </span>
            </div>

            <!-- 우: 상세 정보 -->
            <div class="md:w-3/5 p-8 md:p-12 flex flex-col overflow-y-auto no-scrollbar">
              <div class="mono-label text-accent-bronze">
                {{ String(openedIdx + 1).padStart(2, '0') }} / {{ String(items.length).padStart(2, '0') }}
              </div>

              <h2 class="mt-5 font-medium text-3xl md:text-[40px] leading-tight tracking-[-0.02em]">
                {{ openedProduct.name }}
              </h2>
              <p v-if="openedProduct.korean_name" class="text-accent-bronze text-base md:text-lg mt-2">
                {{ openedProduct.korean_name }}
              </p>

              <p v-if="openedProduct.short_desc" class="mt-5 text-ink-dim text-base md:text-lg font-light">
                {{ openedProduct.short_desc }}
              </p>
              <p v-if="openedProduct.long_desc" class="mt-4 text-ink-muted text-sm md:text-base leading-relaxed whitespace-pre-line font-light">
                {{ openedProduct.long_desc }}
              </p>

              <!-- 태그 -->
              <div v-if="openedProduct.use_tags && openedProduct.use_tags.length > 0" class="mt-6 flex flex-wrap gap-2">
                <span
                  v-for="tag in openedProduct.use_tags" :key="tag"
                  class="text-xs px-3 py-1 border border-accent-bronze/40 text-ink-dim"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- 특성 매트릭스 -->
              <div class="mt-6">
                <p class="mono-label text-ink-muted mb-3">Characteristics</p>
                <div class="grid grid-cols-4 gap-1.5">
                  <div
                    v-for="t in PRODUCT_TRAITS" :key="t.key"
                    :class="[
                      'text-center py-2 text-xs border transition-colors',
                      (openedProduct as any)[t.key]
                        ? 'bg-accent-bronze text-paper border-accent-bronze'
                        : 'bg-transparent text-ink-faint border-paper-line',
                    ]"
                  >
                    {{ t.label }}
                  </div>
                </div>
              </div>

              <!-- 스펙 (있으면) -->
              <table v-if="openedProduct.spec_table && openedProduct.spec_table.length > 0" class="mt-6 w-full text-sm">
                <tbody>
                  <tr v-for="row in openedProduct.spec_table" :key="row.label" class="border-b border-paper-line">
                    <td class="py-2 pr-4 mono-label text-ink-muted w-1/3">{{ row.label }}</td>
                    <td class="py-2 text-ink">{{ row.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>
