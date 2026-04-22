<template>
  <div class="min-h-screen bg-bg text-ink flex flex-col">
    <CommonSiteHeader />
    <main class="flex-1 pt-20">
      <slot />
    </main>
    <CommonSiteFooter />
  </div>
</template>
