<script setup lang="ts">
useHead({ title: 'Strength | 광진실업' })
</script>

<template>
  <div>
    <CommonPageHero title="Our Strength" subtitle="차별화된 경쟁력" />

    <section class="py-24">
      <div class="container-x grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div class="text-accent-gold text-sm tracking-widest">OEKO-TEX Standard 100</div>
          <h2 class="text-3xl md:text-4xl font-bold text-ink mt-3">
            유해물질 없는<br>안전한 원단
          </h2>
          <p class="text-ink-dim mt-6 leading-relaxed">
            [OEKO-TEX 설명 — 관리자 페이지에서 편집]
          </p>
        </div>
        <div class="aspect-[4/5] bg-bg-card border border-white/10" />
      </div>
    </section>

    <section class="bg-white text-ink-dark py-24">
      <div class="container-x grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div class="aspect-[4/5] bg-bg-light-soft order-2 md:order-1" />
        <div class="order-1 md:order-2">
          <div class="text-accent-eco text-sm tracking-widest">GRS Recycled Polyester</div>
          <h2 class="text-3xl md:text-4xl font-bold text-ink-dark mt-3">
            친환경 재활용<br>인증 섬유
          </h2>
          <p class="text-ink-dark-muted mt-6 leading-relaxed">
            [GRS 설명 — 관리자 페이지에서 편집]
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
