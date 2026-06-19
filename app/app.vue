<script setup lang="ts">
// GitHub Pages sub-path 배포 대응: 정적 자산 href에 baseURL prepend
const config = useRuntimeConfig()
const baseURL = config.app.baseURL
// 정식 주소(canonical) — nuxt.config의 SITE_URL 한 곳에서 관리, 도메인 연결 시 자동 반영
const SITE = String(config.public.siteUrl || '').replace(/\/+$/, '')
const OG_TITLE = '광진실업 | COSY FEEL — Premium Filling Materials'
const OG_DESC = '광진실업 COSY FEEL — 1994년부터 30년, ISO 9001·14001 인증과 4건의 특허를 기반으로 한 부직포·제면 충전재 전문 제조사. 캐시미어·알파카·스마트셀·그래핀 등 20가지 충전재 라인업.'

// 회사 정보 구조화 데이터(JSON-LD) — 검색엔진이 업체명·연락처·주소를 인식
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '주식회사 광진실업',
  alternateName: 'COSY FEEL',
  url: `${SITE}/`,
  logo: `${SITE}/apple-touch-icon.png`,
  image: `${SITE}/og-image.png`,
  description: OG_DESC,
  telephone: '+82-32-582-4147',
  email: 'kjin137@naver.com',
  foundingDate: '1994',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KR',
    addressRegion: '인천광역시',
    addressLocality: '서구',
    streetAddress: '가정로 58번길 3 (가좌동)',
  },
}

useHead({
  script: [
    { type: 'application/ld+json', innerHTML: JSON.stringify(orgJsonLd) },
  ],
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
