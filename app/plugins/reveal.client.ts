// ===========================================================================
// Scroll Reveal — `v-reveal` 디렉티브
// 사용: <div v-reveal>...</div> 또는 <div v-reveal:up>, <div v-reveal:fade>
// 뷰포트 진입 시 .is-visible 클래스 추가 → CSS로 fade/up 애니메이션
// ===========================================================================

export default defineNuxtPlugin((nuxtApp) => {
  if (!('IntersectionObserver' in window)) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
  )

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')
      // 지연 (binding.value: ms 단위 지연)
      if (binding.value && typeof binding.value === 'number') {
        el.style.transitionDelay = `${binding.value}ms`
      }
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer.unobserve(el)
    },
  })
})
