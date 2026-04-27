<template>
  <div class="min-h-screen bg-white text-ink flex flex-col">
    <CommonSiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <CommonSiteFooter />
  </div>
</template>

<style>
/* default 레이아웃 페이지들은 본문이 고정 헤더 아래서 시작 */
</style>
