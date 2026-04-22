<script setup lang="ts">
useHead({ title: 'Products | 광진실업' })

const traits = ['경량', '보온', '다운대체', '친환경', '저자극', '세탁OK', '탄성복원', '흡습통기']
const products = [
  { slug: 'conju', name: 'Conju', desc: '복합 중공사 폴리에스터' },
  { slug: 'polarfil', name: 'Polarfil', desc: 'PTT+PET 다운 대체' },
  { slug: 'microfiber', name: 'Micro Fiber', desc: '극세사 알러지 차단' },
  { slug: 'lowdenier', name: 'Low Denier', desc: '초극세 경량 충전' },
  { slug: 'tencel', name: 'Tencel', desc: '유칼립투스 친환경' },
  { slug: 'wool', name: 'Washable Wool', desc: '호주산 울 세탁 가능' },
  { slug: 'cotton', name: 'Cotton', desc: '천연 면 온습도 조절' },
  { slug: 'recycledpet', name: 'Recycled PET', desc: 'GRS 재활용 원사' },
]
</script>

<template>
  <div>
    <CommonPageHero title="Product Lineup" subtitle="COSY FEEL 충전재 라인업" />

    <section class="py-24">
      <div class="container-x">
        <p class="text-ink-muted text-sm tracking-widest uppercase">Characteristics</p>
        <h2 class="text-3xl md:text-5xl font-bold text-ink mt-2">특성 매트릭스</h2>
        <div class="mt-12 overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="border-b border-white/20">
                <th class="text-left py-4 pr-4 text-ink-muted font-normal">Product</th>
                <th v-for="t in traits" :key="t" class="text-center px-3 py-4 text-ink-muted font-normal whitespace-nowrap">
                  {{ t }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in products" :key="p.slug" class="border-b border-white/5 hover:bg-white/5">
                <td class="py-4 pr-4">
                  <a :href="`#${p.slug}`" class="text-ink hover:text-accent-gold font-medium">{{ p.name }}</a>
                </td>
                <td v-for="t in traits" :key="t" class="text-center text-ink-faint">·</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section
      v-for="(p, idx) in products" :id="p.slug" :key="p.slug"
      :class="[idx % 2 === 0 ? 'bg-bg' : 'bg-bg-mid', 'py-24']"
    >
      <div class="container-x grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div :class="idx % 2 === 0 ? 'md:order-1' : 'md:order-2'">
          <div class="aspect-[4/3] bg-bg-card border border-white/10" />
        </div>
        <div :class="idx % 2 === 0 ? 'md:order-2' : 'md:order-1'">
          <div class="text-ink-faint text-sm tracking-widest">0{{ idx + 1 }}</div>
          <h3 class="text-3xl md:text-4xl font-bold text-ink mt-3">{{ p.name }}</h3>
          <p class="text-ink-dim mt-4">{{ p.desc }}</p>
          <p class="text-ink-faint mt-6 text-sm">[상세 설명 — 관리자 페이지에서 편집]</p>
        </div>
      </div>
    </section>
  </div>
</template>
