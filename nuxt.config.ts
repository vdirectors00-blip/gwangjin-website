// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      htmlAttrs: { lang: 'ko' },
      title: '광진실업 | COSY FEEL — Premium Filling Materials',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '광진실업 COSY FEEL — 1994년부터 30년, ISO 9001/14001 인증 + 4건 특허 기반의 부직포·제면 충전재 전문 제조사. F/T, AR, Tencel, Wool 등 10가지 라인업.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  supabase: {
    redirect: false,
    types: '~/types/database.types.ts',
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },
})
