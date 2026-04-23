<script setup lang="ts">
const year = new Date().getFullYear()
const { data: company } = await useCompanyInfo()
const { data: settings } = await useSiteSettings()
</script>

<template>
  <footer class="bg-dark text-paper">
    <div class="container-x py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
      <div class="md:col-span-5">
        <img src="/logo/bi-white.svg" alt="COSY FEEL" class="h-12 w-auto" />
        <p class="mt-6 text-ink-inverse-dim leading-relaxed max-w-md">
          {{ company?.tagline_en || 'Heritage in Every Fiber' }}<br>
          <span class="text-ink-inverse-faint text-sm">
            {{ company?.tagline || '솜 한 가닥에, 30년의 기술' }}
          </span>
        </p>
        <div class="mt-8 flex items-center gap-3">
          <img src="/logo/ci.svg" alt="광진실업" class="h-8 w-8 opacity-70" />
          <span class="text-ink-inverse-muted text-xs">
            {{ company?.company_name || '주식회사 광진실업' }}
          </span>
        </div>
      </div>

      <div class="md:col-span-3">
        <h4 class="eyebrow text-ink-inverse-faint mb-6">Sitemap</h4>
        <ul class="space-y-2.5 text-ink-inverse-dim text-sm">
          <li><NuxtLink to="/about" class="hover:text-paper">About</NuxtLink></li>
          <li><NuxtLink to="/certifications" class="hover:text-paper">Technology & Certifications</NuxtLink></li>
          <li><NuxtLink to="/products" class="hover:text-paper">Products</NuxtLink></li>
          <li><NuxtLink to="/contact" class="hover:text-paper">Contact</NuxtLink></li>
        </ul>
      </div>

      <div class="md:col-span-4">
        <h4 class="eyebrow text-ink-inverse-faint mb-6">Contact</h4>
        <ul class="space-y-2.5 text-ink-inverse-dim text-sm">
          <li v-if="company?.address">{{ company.address }}</li>
          <li v-if="company?.tel">
            TEL · <a :href="`tel:${company.tel}`" class="hover:text-paper">{{ company.tel }}</a>
          </li>
          <li v-if="company?.email">
            EMAIL · <a :href="`mailto:${company.email}`" class="hover:text-paper">{{ company.email }}</a>
          </li>
          <li v-if="company?.business_hours" class="text-ink-inverse-faint">{{ company.business_hours }}</li>
        </ul>
      </div>
    </div>

    <div class="border-t border-paper/10">
      <div class="container-x py-6 flex flex-col md:flex-row justify-between gap-2 text-ink-inverse-faint text-xs">
        <span>{{ settings?.copyright_text || `© ${year} 주식회사 광진실업. All Rights Reserved.` }}</span>
        <span>Sitemap · Privacy Policy</span>
      </div>
    </div>
  </footer>
</template>
