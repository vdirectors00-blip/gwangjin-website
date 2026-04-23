<template>
  <div class="min-h-screen bg-paper text-ink flex flex-col">
    <CommonSiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <CommonSiteFooter />
  </div>
</template>
