// ===========================================================================
// v-reveal 디렉티브 — Intersection Observer 기반 fade-up 애니메이션
//
// SSR 안전:
//   - getSSRProps: SSR 렌더 시 빈 props 반환 (기본 reveal 클래스만 미리 박힘)
//   - mounted/unmounted: 클라이언트에서만 IntersectionObserver 동작
//
// 사용:
//   <div v-reveal>...</div>          기본
//   <div v-reveal="200">...</div>    200ms 지연
// ===========================================================================

let observer: IntersectionObserver | null = null

const ensureObserver = () => {
  if (observer || typeof window === 'undefined') return observer
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer!.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  )
  return observer
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    getSSRProps() {
      // SSR에서 attribute 따로 안 붙임. .reveal 클래스는 mounted/CSS에서 처리
      return {}
    },
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      if (binding.value && typeof binding.value === 'number') {
        el.style.transitionDelay = `${binding.value}ms`
      }
      const obs = ensureObserver()
      obs?.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})
