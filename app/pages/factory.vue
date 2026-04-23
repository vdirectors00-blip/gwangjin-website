<script setup lang="ts">
useHead({ title: 'Factory | 광진실업' })

const { data: steps } = await useProcessSteps()
const { data: gallery } = await useFactoryGallery()
</script>

<template>
  <div>
    <CommonPageHero
      title="Factory"
      subtitle="생산 시설과 공정"
      eyebrow="About · 04"
      background="/images/hero/hero-2.jpg"
    />

    <!-- Intro -->
    <section class="bg-paper py-32 md:py-40">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <div class="md:col-span-2 hidden md:block">
          <div class="text-7xl md:text-9xl font-light text-ink/10 leading-none">04</div>
        </div>
        <div class="md:col-span-7">
          <p class="eyebrow text-ink-muted">Production</p>
          <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
            5개 생산라인,<br>6단계 정밀 공정
          </h2>
        </div>
        <div class="md:col-span-3 flex md:justify-end items-end">
          <div class="text-right">
            <div class="text-5xl font-bold text-accent-bronze tracking-tightest">5</div>
            <p class="text-ink-muted text-sm mt-1">Active Lines</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6단계 공정 -->
    <section class="bg-paper-soft py-32 border-t border-paper-line">
      <div class="container-x">
        <p class="eyebrow text-ink-muted">Process Flow</p>
        <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest">생산 공정</h2>

        <div class="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-paper-line">
          <div
            v-for="s in (steps || [])" :key="s.id"
            class="bg-paper p-10 md:p-12 group hover:bg-paper-warm transition-colors duration-500"
          >
            <div class="flex items-baseline justify-between">
              <div class="text-ink-faint text-5xl font-light tracking-tightest">
                {{ String(s.step_number).padStart(2, '0') }}
              </div>
              <div class="text-accent-bronze text-xs tracking-[0.3em]">STEP</div>
            </div>
            <div class="w-12 h-px bg-ink/20 my-8" />
            <h3 class="text-ink text-2xl font-bold">{{ s.title }}</h3>
            <p v-if="s.description" class="text-ink-dim text-sm mt-3 leading-relaxed">
              {{ s.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 시설 갤러리 -->
    <section class="bg-paper py-32">
      <div class="container-x">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-end mb-16">
          <div class="md:col-span-7">
            <p class="eyebrow text-ink-muted">Facility Gallery</p>
            <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest">생산 시설</h2>
          </div>
          <div class="md:col-span-5 md:text-right">
            <p class="text-ink-dim leading-relaxed">
              자체 공장에서 입고-가공-출하 전 과정을 직접 운영합니다.
            </p>
          </div>
        </div>

        <div v-if="gallery && gallery.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <div
            v-for="(g, i) in gallery" :key="g.id"
            :class="['overflow-hidden bg-paper-warm', i % 5 === 0 ? 'aspect-[4/5] md:row-span-2' : 'aspect-[4/3]']"
          >
            <img
              :src="useImageUrl(g.image_url, { width: 1000, format: 'webp', quality: 80 }) || ''"
              :alt="g.caption || ''"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out-expo"
            />
          </div>
        </div>

        <p
          v-else
          class="py-32 text-center text-ink-faint border border-dashed border-paper-line"
        >
          [공장 사진은 관리자 페이지에서 업로드합니다.]
        </p>
      </div>
    </section>
  </div>
</template>
