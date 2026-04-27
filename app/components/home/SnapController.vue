<script setup lang="ts">
// Claude Design의 SnapController 포팅 — 휠/키/터치 이벤트를 가로채서
// 섹션 간 이동을 900ms ease-out-cubic로 부드럽게 애니메이션
const props = defineProps<{
  container: string      // scroll container id (e.g. 'snap')
  duration?: number      // 애니메이션 시간 (default 200ms)
  cooldown?: number      // 휠 이벤트 사이 최소 간격 (default 500ms — rapid scroll 방지)
}>()

const duration = props.duration ?? 200
const cooldown = props.cooldown ?? 500

onMounted(() => {
  // 모바일은 기본 스크롤 유지 (터치 감촉 네이티브가 더 좋음)
  if (window.innerWidth <= 768) return

  const snap = document.getElementById(props.container)
  if (!snap) return

  const ease = (t: number) => 1 - Math.pow(1 - t, 3)  // ease-out-cubic
  let animating = false
  const sectionH = () => snap.clientHeight || window.innerHeight
  const maxScrollTop = () => snap.scrollHeight - snap.clientHeight
  const maxIdx = () => {
    // ceil + 1로 푸터까지 스크롤 가능하게
    return Math.max(0, Math.ceil(maxScrollTop() / sectionH()))
  }

  const animateTo = (idx: number) => {
    idx = Math.max(0, Math.min(maxIdx(), idx))
    const from = snap.scrollTop
    // 마지막 구간은 실제 최대 스크롤 위치로 클램프 (푸터 전체 노출)
    const to = Math.min(maxScrollTop(), idx * sectionH())
    if (Math.abs(to - from) < 2) { animating = false; return }
    animating = true
    const t0 = performance.now()
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / duration)
      snap.scrollTop = from + (to - from) * ease(p)
      if (p < 1) requestAnimationFrame(step)
      else animating = false
    }
    requestAnimationFrame(step)
  }

  // 공개 API (DotNav가 이걸로 호출 가능)
  ;(window as any).__snapGo = animateTo

  // 스크롤 방향별로 올바른 snap 타겟 계산
  // - 정확히 snap 위치에 있으면: +1/-1
  // - 중간(부분 스크롤) 상태: 방향에 맞게 ceil/floor
  // → 푸터에서 위로 스크롤할 때 Contact로 정확히 돌아감
  const nextIdx = (down: boolean) => {
    const exact = snap.scrollTop / sectionH()
    const rounded = Math.round(exact)
    const atSnap = Math.abs(exact - rounded) < 0.02
    if (atSnap) return rounded + (down ? 1 : -1)
    return down ? Math.ceil(exact) : Math.floor(exact)
  }

  // 휠 — 애니 200ms + 쿨다운 500ms (rapid scroll 누적 방지)
  let wheelLock = 0
  const onWheel = (e: WheelEvent) => {
    e.preventDefault()                                 // 항상 기본 스크롤 막기
    if (animating) return                              // 애니 중엔 무시
    const now = performance.now()
    if (now - wheelLock < cooldown) return             // 쿨다운 중엔 무시
    if (Math.abs(e.deltaY) < 8) return                 // 너무 작은 휠 움직임 무시
    wheelLock = now
    animateTo(nextIdx(e.deltaY > 0))
  }
  snap.addEventListener('wheel', onWheel, { passive: false })

  // 키보드
  const onKey = (e: KeyboardEvent) => {
    if (animating) return
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); animateTo(nextIdx(true)) }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); animateTo(nextIdx(false)) }
    else if (e.key === 'Home') { e.preventDefault(); animateTo(0) }
    else if (e.key === 'End') { e.preventDefault(); animateTo(maxIdx()) }
  }
  window.addEventListener('keydown', onKey)

  // 터치
  let touchStartY = 0, touchStartT = 0
  const onTS = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; touchStartT = performance.now() }
  const onTE = (e: TouchEvent) => {
    if (animating) return
    const dy = touchStartY - e.changedTouches[0].clientY
    const dt = performance.now() - touchStartT
    if (Math.abs(dy) < 40 || dt > 800) return
    animateTo(nextIdx(dy > 0))
  }
  snap.addEventListener('touchstart', onTS, { passive: true })
  snap.addEventListener('touchend', onTE, { passive: true })

  onBeforeUnmount(() => {
    snap.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKey)
    snap.removeEventListener('touchstart', onTS)
    snap.removeEventListener('touchend', onTE)
    delete (window as any).__snapGo
  })
})
</script>

<template>
  <span />
</template>
