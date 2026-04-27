<script setup lang="ts">
const year = new Date().getFullYear()
const { data: company } = await useCompanyInfo()
const { data: settings } = await useSiteSettings()
const assetUrl = useAssetUrl()
</script>

<template>
  <footer class="bg-paper text-ink px-6 md:px-10 lg:px-16 pt-16 pb-10 border-t border-ink/20">
    <div class="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-8 md:gap-12 items-start">
      <!-- 브랜드 -->
      <div class="col-span-2 md:col-span-1">
        <img
          :src="assetUrl('/logo/bi-color.svg')"
          alt="COSY FEEL"
          class="h-9 w-auto block"
        />
        <div class="mt-5 italic font-light text-[15px] text-ink-dim leading-[1.5] tracking-[-0.01em]">
          솜 한 가닥에,<br>삼십 년의 기술.
        </div>
        <div class="mt-5 mono-label text-ink-muted">
          주식회사 광진실업 · Since {{ company?.founded_year || 1994 }}
        </div>
        <!-- CI 심볼 — 크기 키움 + 선명도 올림 -->
        <div class="mt-7 flex items-center gap-4">
          <img
            :src="assetUrl('/logo/ci.svg')"
            alt="광진실업 CI"
            class="h-12 w-auto opacity-80 block"
          />
          <div class="w-px h-6 bg-ink/20" />
          <div class="mono-label text-ink-muted">CORPORATE&nbsp;IDENTITY</div>
        </div>
      </div>

      <!-- Sitemap -->
      <div class="text-xs text-ink-dim leading-[2]">
        <div class="mono-label text-ink-muted mb-3.5">SITEMAP</div>
        <NuxtLink to="/about" class="block hover:text-accent-bronze transition-colors">About</NuxtLink>
        <NuxtLink to="/products" class="block hover:text-accent-bronze transition-colors">Products</NuxtLink>
        <NuxtLink to="/certifications" class="block hover:text-accent-bronze transition-colors">Technology</NuxtLink>
        <NuxtLink to="/contact" class="block hover:text-accent-bronze transition-colors">Contact</NuxtLink>
      </div>

      <!-- Contact -->
      <div class="text-xs text-ink-dim leading-[2]">
        <div class="mono-label text-ink-muted mb-3.5">CONTACT</div>
        <span v-if="company?.tel">{{ company.tel }}</span><br>
        <span v-if="company?.email">{{ company.email }}</span><br>
        <span v-if="company?.business_hours">{{ company.business_hours }}</span>
      </div>

      <!-- Address -->
      <div class="text-xs text-ink-dim leading-[2] md:text-right">
        <div class="mono-label text-ink-muted mb-3.5">ADDRESS</div>
        {{ company?.address || '인천광역시 서구 가정로 58번길 3' }}
      </div>
    </div>

    <div class="max-w-[1280px] mx-auto mt-12 pt-6 border-t border-paper-line/60 flex flex-col md:flex-row justify-between gap-2 text-[11px] text-ink-muted tracking-[0.15em]">
      <span>{{ settings?.copyright_text || `© ${year} 주식회사 광진실업 · All Rights Reserved.` }}</span>
      <span>Privacy &nbsp;·&nbsp; Sitemap</span>
    </div>
  </footer>
</template>
