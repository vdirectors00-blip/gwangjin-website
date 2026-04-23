<script setup lang="ts">
useHead({ title: 'CEO Message | 광진실업' })

const { data: company } = await useCompanyInfo()
</script>

<template>
  <div>
    <CommonPageHero
      title="CEO Message"
      subtitle="대표 인사말"
      eyebrow="About · 01"
      background="/images/hero/hero-2.jpg"
    />

    <!-- CEO 메시지 풀 -->
    <section class="bg-paper py-32 md:py-40">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div class="md:col-span-5 md:sticky md:top-32">
          <div class="aspect-[3/4] bg-paper-warm overflow-hidden">
            <img
              v-if="company?.ceo_image_url"
              :src="useImageUrl(company.ceo_image_url, { width: 800, format: 'webp' }) || ''"
              :alt="company.ceo_name || 'CEO'"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-ink-faint text-sm">
              [CEO 사진 — 관리자에서 업로드]
            </div>
          </div>
          <div class="mt-6">
            <p class="text-ink-faint text-xs tracking-[0.3em]">FOUNDER & CHAIRMAN</p>
            <p class="text-ink text-3xl font-bold tracking-tightest mt-2">{{ company?.ceo_name || '최광은' }}</p>
            <p class="text-ink-muted text-sm mt-1">{{ company?.company_name || '주식회사 광진실업' }}</p>
          </div>
        </div>

        <div class="md:col-span-7">
          <p class="eyebrow text-ink-muted">A Letter from the Chairman</p>
          <div class="mt-6">
            <img src="/logo/bi-color.svg" alt="COSY FEEL" class="h-16 w-auto mb-6" />
          </div>
          <h2 class="text-4xl md:text-6xl font-bold tracking-tightest leading-tight">
            안녕하세요.<br>
            <span class="text-accent-bronze">COSY FEEL</span> 입니다.
          </h2>

          <div class="mt-12 space-y-6 text-ink-dim text-lg leading-relaxed whitespace-pre-line">
            {{ company?.ceo_message || '[인사말 본문은 관리자 페이지에서 입력 가능합니다.]' }}
          </div>

          <div class="mt-16 pt-8 border-t border-paper-line flex items-center justify-between">
            <p class="text-ink-muted text-sm">
              {{ company?.founded_year ? `Since ${company.founded_year}` : 'Since 1994' }}
            </p>
            <p class="text-ink font-medium">
              회장 {{ company?.ceo_name || '최광은' }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- About 다른 섹션 링크 -->
    <section class="bg-paper-soft py-24 border-t border-paper-line">
      <div class="container-x">
        <p class="eyebrow text-ink-muted mb-10">More about COSY FEEL</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-px bg-paper-line">
          <NuxtLink
            v-for="(p, i) in [
              { num: '02', en: 'Philosophy', ko: '경영 이념', to: '/philosophy' },
              { num: '03', en: 'History',    ko: '연혁',     to: '/history' },
              { num: '04', en: 'Factory',    ko: '생산 시설', to: '/factory' },
            ]" :key="i" :to="p.to"
            class="bg-paper p-10 group hover:bg-paper-warm transition-colors duration-300"
          >
            <div class="text-ink-faint text-sm tracking-[0.3em]">{{ p.num }}</div>
            <h3 class="text-2xl font-bold mt-4">{{ p.en }}</h3>
            <p class="text-ink-muted text-sm mt-1">{{ p.ko }}</p>
            <div class="mt-8 inline-flex items-center text-ink text-sm font-medium group-hover:text-accent-bronze">
              자세히 보기 →
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
