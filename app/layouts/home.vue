<!--
  Home 전용 레이아웃: 스냅 스크롤 컨테이너를 페이지 내부에 두기 위해
  헤더만 있고 Footer는 페이지 안에서 직접 렌더링
-->
<template>
  <div class="min-h-screen bg-white text-ink">
    <CommonSiteHeader />
    <slot />
  </div>
</template>
