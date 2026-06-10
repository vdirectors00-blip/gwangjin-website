// https://nuxt.com/docs/api/configuration/nuxt-config
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
        { name: 'description', content: '광진실업 COSY FEEL — 1994년부터 30년, ISO 9001·14001 인증과 4건의 특허를 기반으로 한 부직포·제면 충전재 전문 제조사. 캐시미어·알파카·스마트셀·그래핀 등 22가지 충전재 라인업.' },
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
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      // Web3Forms access key — 공개돼도 안전(정적 사이트용 설계). 빌드 시 env 주입.
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || '',
    },
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },
})
