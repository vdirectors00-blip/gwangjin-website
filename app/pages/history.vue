<script setup lang="ts">
useHead({ title: 'History & Certification | 광진실업' })
</script>

<template>
  <div>
    <CommonPageHero title="History & Certification" subtitle="연혁·인증" />

    <section class="py-24">
      <div class="container-x">
        <p class="text-ink-muted text-sm tracking-widest uppercase">Our History</p>
        <h2 class="text-3xl md:text-5xl font-bold text-ink mt-2">회사 연혁</h2>
        <div class="mt-16 space-y-8">
          <div class="border-l border-white/20 pl-8 py-2">
            <div class="text-accent-gold text-sm tracking-widest">TIMELINE</div>
            <p class="text-ink-muted mt-2">[연혁 타임라인 — 관리자 페이지에서 추가]</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-bg-mid py-24">
      <div class="container-x">
        <p class="text-ink-muted text-sm tracking-widest uppercase">Certification</p>
        <h2 class="text-3xl md:text-5xl font-bold text-ink mt-2">인증서</h2>
        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="border border-white/10 p-10">
            <div class="aspect-[4/3] bg-bg-card mb-6" />
            <div class="text-accent-gold text-sm tracking-widest">OEKO-TEX</div>
            <h3 class="text-ink text-xl font-semibold mt-2">Standard 100</h3>
          </div>
          <div class="border border-white/10 p-10">
            <div class="aspect-[4/3] bg-bg-card mb-6" />
            <div class="text-accent-eco text-sm tracking-widest">GRS</div>
            <h3 class="text-ink text-xl font-semibold mt-2">Recycled Polyester</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
