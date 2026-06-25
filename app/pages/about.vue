<script setup lang="ts">
useSeo({
  title: 'CEO 인사말 | 광진실업',
  description: 'COSY FEEL 광진실업 대표 인사말 — 부직포·제면 분야의 기술과 노하우로 우수한 이불솜·침대 부자재를 생산하는 (주)광진실업의 경영 철학을 소개합니다.',
  path: '/about',
})

const { data: company } = await useCompanyInfo()
const assetUrl = useAssetUrl()
</script>

<template>
  <div>
    <!-- 상단 여백 (헤더와 간격) -->
    <div class="h-[76px]" />

    <!-- About 서브 네비 -->
    <CommonSubNav section="about" />

    <!-- ================================================
      CEO 인사말 — AVANTdeco 스타일 2-column
    ================================================ -->
    <section class="relative bg-white py-24 md:py-36 overflow-hidden">
      <!-- 은은한 텍스처 배경 -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-[0.30] pointer-events-none"
        :style="`background-image:url('${assetUrl('/images/bg/sub-about.jpg')}'); filter: grayscale(58%) brightness(1.06); -webkit-mask-image: linear-gradient(to right, black 0%, black 30%, transparent 68%); mask-image: linear-gradient(to right, black 0%, black 30%, transparent 68%);`"
      />
      <div class="relative container-narrow grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 items-start">
        <!-- 좌: 큰 한글 카피 -->
        <div class="md:col-span-5">
          <p class="mono-label text-accent-bronze mb-6">A Letter · 인사말</p>
          <h1 class="font-normal text-[clamp(32px,4.5vw,56px)] leading-[1.25] tracking-[-0.025em] text-ink-dim">
            편안한 휴식을 짓는<br>
            <span class="text-accent-bronze">삼십 년</span>의 한 길.
          </h1>
          <!-- 작은 액센트 라인 -->
          <div class="mt-10 w-16 h-px bg-ink/30" />
        </div>

        <!-- 우: 인사말 본문 + 서명 -->
        <div class="md:col-span-7">
          <div
            class="text-ink-dim text-base md:text-lg leading-[1.95] font-normal whitespace-pre-line"
          >{{ company?.ceo_message || '[인사말 본문은 관리자 페이지에서 입력 가능합니다.]' }}</div>

          <!-- 서명 — 이탤릭 세리프 -->
          <div class="mt-16 flex items-baseline justify-end gap-4">
            <span class="mono-label text-ink-muted">회장</span>
            <span
              class="font-serif text-[32px] md:text-[40px] text-ink tracking-[0.1em]"
              style="font-weight: 400;"
            >
              최 광 은
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================
      브랜드 아이덴티티 — BI/CI 2분할
    ================================================ -->
    <section class="bg-paper-soft border-t border-paper-line py-20 md:py-28">
      <div class="container-narrow">
        <p class="eyebrow text-ink-muted mb-12 text-center">Our Identity · 브랜드 구조</p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-line">
          <!-- BI — 브랜드 -->
          <div class="bg-white p-12 md:p-16 flex flex-col items-center text-center">
            <!-- 고정 높이 이미지 영역 (BI/CI 라벨 정렬 맞춤) -->
            <div class="h-48 md:h-64 flex items-center justify-center">
              <img
                :src="assetUrl('/logo/bi-color.svg')"
                alt="COSY FEEL"
                class="h-28 md:h-36 w-auto"
              />
            </div>
            <div class="mt-8 mono-label text-accent-bronze">
              BRAND IDENTITY
            </div>
            <p class="mt-3 text-lg text-ink font-medium">COSY FEEL</p>
            <p class="mt-2 text-ink-dim text-sm leading-relaxed max-w-xs font-normal">
              편안한 휴식을 짓는 프리미엄 충전재 브랜드.<br>
              2015년 출시 이후, 품질로 증명합니다.
            </p>
          </div>

          <!-- CI — 기업 -->
          <div class="bg-white p-12 md:p-16 flex flex-col items-center text-center">
            <!-- 고정 높이 이미지 영역 — BI와 동일 -->
            <div class="h-48 md:h-64 flex items-center justify-center">
              <img
                :src="assetUrl('/logo/ci.svg')"
                alt="광진실업"
                class="h-36 md:h-48 w-auto"
              />
            </div>
            <div class="mt-8 mono-label text-accent-bronze">
              CORPORATE IDENTITY
            </div>
            <p class="mt-3 text-lg text-ink font-medium">주식회사 광진실업</p>
            <p class="mt-2 text-ink-dim text-sm leading-relaxed max-w-xs font-normal">
              1994년 설립. 부직포·제면 한 길만 걸어온<br>
              충전재 전문 제조사.
            </p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
