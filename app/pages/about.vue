<script setup lang="ts">
useHead({ title: 'About | 광진실업' })
</script>

<template>
  <div>
    <CommonPageHero title="About Us" subtitle="주식회사 광진실업" />

    <section class="py-24">
      <div class="container-x grid grid-cols-1 md:grid-cols-5 gap-12">
        <div class="md:col-span-2">
          <div class="aspect-[3/4] bg-bg-card border border-white/10" />
        </div>
        <div class="md:col-span-3 flex flex-col justify-center">
          <p class="text-ink-muted text-sm tracking-widest uppercase">CEO Message</p>
          <h2 class="text-3xl md:text-4xl font-bold text-ink mt-2">대표 인사말</h2>
          <p class="mt-6 text-ink-dim leading-relaxed">
            [대표 인사말 본문 — 관리자 페이지에서 편집]
          </p>
        </div>
      </div>
    </section>

    <section class="bg-bg-mid py-24">
      <div class="container-x">
        <p class="text-ink-muted text-sm tracking-widest uppercase text-center">Our Vision</p>
        <h2 class="text-3xl md:text-5xl font-bold text-ink text-center mt-2">경영 이념</h2>
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(v, i) in [
            { n: '01', t: 'Innovation', d: '지속적인 기술 혁신으로 더 나은 제품을 만듭니다.' },
            { n: '02', t: 'Quality', d: '국제 인증 기반의 엄격한 품질 관리.' },
            { n: '03', t: 'Trust', d: '오랜 경험과 신뢰로 파트너와 함께합니다.' },
          ]" :key="i" class="border border-white/10 p-10">
            <div class="text-ink-faint text-4xl font-light">{{ v.n }}</div>
            <div class="w-10 h-px bg-white/20 mt-6" />
            <h3 class="text-ink text-2xl font-semibold mt-6">{{ v.t }}</h3>
            <p class="text-ink-muted mt-3 text-sm leading-relaxed">{{ v.d }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
