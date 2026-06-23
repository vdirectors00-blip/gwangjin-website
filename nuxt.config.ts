// https://nuxt.com/docs/api/configuration/nuxt-config

// ── 사이트 정식 주소(canonical) ──────────────────────────────────────────────
// 도메인 연결 시 여기 한 줄만 바꾸면 sitemap·canonical·og:url·JSON-LD 전부 따라감.
// (CI에서 NUXT_PUBLIC_SITE_URL 환경변수로 덮어쓸 수도 있음)
const SITE_URL = (process.env.NUXT_PUBLIC_SITE_URL
  || 'https://www.cosyfeel.co.kr').replace(/\/+$/, '')

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  // GitHub Pages 배포 — repo 이름 base path 자동 적용
  // (CI에서 NUXT_APP_BASE_URL=/gwangjin-website/ 환경변수로 주입)
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      htmlAttrs: { lang: 'ko' },
      title: '광진실업 | COSY FEEL — Premium Filling Materials',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '광진실업 COSY FEEL — 1994년부터 30년, ISO 9001·14001 인증과 4건의 특허를 기반으로 한 부직포·제면 충전재 전문 제조사. 캐시미어·알파카·스마트셀·그래핀 등 20가지 충전재 라인업.' },
      ],
      // favicon·og 등 head 링크/메타는 app/app.vue 에서 baseURL 처리하여 주입
    },
  },

  // 정적 사이트 생성 (SSG)
  nitro: {
    preset: 'github-pages',
    prerender: {
      crawlLinks: true,
      routes: [
        '/', '/about', '/philosophy', '/history', '/factory',
        '/certifications', '/patents', '/products', '/contact',
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
  ],

  // 사이트맵 모듈(@nuxtjs/sitemap) — 빌드 시 /sitemap.xml 자동 생성
  site: {
    url: SITE_URL,
    name: '광진실업 COSY FEEL',
  },
  sitemap: {
    // 프리렌더된 9개 정적 라우트만 노출 (페이로드/내부 경로 제외)
    exclude: ['/200.html', '/404.html'],
  },

  // canonical·og:url·JSON-LD에서 참조하는 사이트 주소 (composable/app.vue)
  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
    },
  },

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },
})
