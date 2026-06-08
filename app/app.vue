<script setup lang="ts">
// GitHub Pages sub-path 배포 대응: 정적 자산 href에 baseURL prepend
const baseURL = useRuntimeConfig().app.baseURL
const SITE = 'https://vdirectors00-blip.github.io/gwangjin-website'
const OG_TITLE = '광진실업 | COSY FEEL — Premium Filling Materials'
const OG_DESC = '광진실업 COSY FEEL — 1994년부터 30년, ISO 9001·14001 인증과 4건의 특허를 기반으로 한 부직포·제면 충전재 전문 제조사. 캐시미어·알파카·스마트셀·그래핀 등 22가지 충전재 라인업.'

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` },
    { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` },
    { rel: 'apple-touch-icon', sizes: '180x180', href: `${baseURL}apple-touch-icon.png` },
    { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500&family=JetBrains+Mono:wght@400;500;600&display=swap',
    },
  ],
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: '광진실업 COSY FEEL' },
    { property: 'og:title', content: OG_TITLE },
    { property: 'og:description', content: OG_DESC },
    { property: 'og:image', content: `${SITE}/og-image.png` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: `${SITE}/` },
    { property: 'og:locale', content: 'ko_KR' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: OG_TITLE },
    { name: 'twitter:description', content: OG_DESC },
    { name: 'twitter:image', content: `${SITE}/og-image.png` },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
