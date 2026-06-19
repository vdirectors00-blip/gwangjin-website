// 페이지별 SEO 헬퍼 — title·description·canonical·og를 한 번에 설정.
// path는 baseURL 없는 라우트 경로('/', '/about' …). canonical/og:url은
// nuxt.config의 SITE_URL(runtimeConfig.public.siteUrl) 기준 절대주소로 생성.
export function useSeo(opts: { title: string; description: string; path: string }) {
  const base = String(useRuntimeConfig().public.siteUrl || '').replace(/\/+$/, '')
  const url = base + (opts.path === '/' ? '/' : opts.path)

  useHead({
    title: opts.title,
    link: [{ rel: 'canonical', href: url }],
  })

  // useSeoMeta는 name/property별로 중복 없이 갱신 → app.vue 전역 og 값을 페이지값으로 덮어씀
  useSeoMeta({
    description: opts.description,
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogUrl: url,
    twitterTitle: opts.title,
    twitterDescription: opts.description,
  })
}
