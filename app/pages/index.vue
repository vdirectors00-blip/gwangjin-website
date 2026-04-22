<script setup lang="ts">
useHead({ title: '광진실업 | COSY FEEL' })
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-bg via-bg-soft to-bg" />
      <div class="relative container-x text-center">
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold text-ink tracking-tight leading-tight">
          Nature Meets<br>Innovation
        </h1>
        <p class="mt-6 text-lg md:text-xl text-ink-dim max-w-2xl mx-auto">
          Premium Filling Materials for a Comfortable Tomorrow
        </p>
        <div class="mt-10">
          <NuxtLink to="/products" class="btn-primary">View Products</NuxtLink>
        </div>
      </div>
    </section>

    <!-- HIGHLIGHT PRODUCTS -->
    <section class="bg-bg-soft py-24">
      <div class="container-x">
        <div class="text-center mb-16">
          <p class="text-ink-muted text-sm tracking-widest uppercase">Featured</p>
          <h2 class="text-3xl md:text-5xl font-bold text-ink mt-2">Our Filling Materials</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="i in 3" :key="i" class="bg-bg-card border border-white/5 aspect-[4/5] flex items-end p-8 hover:border-white/20 transition">
            <div>
              <div class="text-ink-muted text-xs tracking-widest">0{{ i }}</div>
              <div class="text-ink text-2xl font-semibold mt-2">Product {{ i }}</div>
              <p class="text-ink-faint text-sm mt-2">Placeholder description</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CERTIFICATIONS -->
    <section class="bg-bg-mid py-24">
      <div class="container-x grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border border-white/10 p-10">
          <div class="text-accent-gold text-sm tracking-widest mb-3">CERTIFIED</div>
          <h3 class="text-ink text-2xl font-semibold">OEKO-TEX Standard 100</h3>
          <p class="text-ink-muted mt-3">유해물질 없는 안전한 원단 인증</p>
        </div>
        <div class="border border-white/10 p-10">
          <div class="text-accent-eco text-sm tracking-widest mb-3">CERTIFIED</div>
          <h3 class="text-ink text-2xl font-semibold">GRS Recycled Polyester</h3>
          <p class="text-ink-muted mt-3">친환경 재활용 섬유 국제 인증</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-24">
      <div class="container-x text-center">
        <h2 class="text-3xl md:text-5xl font-bold text-ink">Ready to work with us?</h2>
        <p class="mt-4 text-ink-dim">최고의 충전재 파트너를 찾고 계신가요?</p>
        <div class="mt-10">
          <NuxtLink to="/contact" class="btn-primary">Contact Us</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
