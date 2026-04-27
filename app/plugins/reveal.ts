// ===========================================================================
// v-reveal 디렉티브 — Intersection Observer 기반 fade-up
// 뷰포트 진입/이탈 모두 반응 (재진입 시에도 애니메이션 다시 재생)
// ===========================================================================

let observer: IntersectionObserver | null = null

const ensureObserver = () => {
  if (observer || typeof window === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
        else entry.target.classList.remove('is-visible')
      })
    },
    { threshold: [0, 0.15, 0.3], rootMargin: '0px 0px -10% 0px' }
  )
  return observer
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() { return {} },
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value && typeof binding.value === 'number') {
        el.style.transitionDelay = `${binding.value}ms`
      }
      ensureObserver()?.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
