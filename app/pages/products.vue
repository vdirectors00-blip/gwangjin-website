<script setup lang="ts">
import { PRODUCT_TRAITS } from '~/types/database.types'

useHead({ title: 'Products | 광진실업' })

const { data: products } = await useProducts()
</script>

<template>
  <div>
    <CommonPageHero
      title="Products"
      subtitle="COSY FEEL의 충전재 라인업"
      eyebrow="Products"
      background="/images/hero/hero-2.jpg"
    />

    <!-- Intro -->
    <section class="bg-paper py-32 md:py-40">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <div class="md:col-span-7">
          <p class="eyebrow text-ink-muted">Product Lineup</p>
          <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
            합성·천연·기능성 소재를<br>아우르는 라인업
          </h2>
        </div>
        <div class="md:col-span-5 md:text-right">
          <div class="text-7xl font-bold text-accent-bronze tracking-tightest">{{ products?.length || 10 }}</div>
          <p class="text-ink-muted text-sm mt-1">FILLING MATERIALS</p>
        </div>
      </div>
    </section>

    <!-- 매트릭스 -->
    <section v-if="products && products.length > 0" class="bg-paper-soft py-24 border-t border-paper-line">
      <div class="container-x">
        <p class="eyebrow text-ink-muted">Characteristics</p>
        <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest">특성 매트릭스</h2>

        <div class="mt-12 overflow-x-auto bg-paper">
          <table class="w-full border-collapse text-sm min-w-[720px]">
            <thead>
              <tr class="border-b border-paper-line">
                <th class="text-left p-5 text-ink-muted font-medium">Product</th>
                <th
                  v-for="t in PRODUCT_TRAITS" :key="t.key"
                  class="text-center p-5 text-ink-muted font-medium whitespace-nowrap"
                >
                  {{ t.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="p in products" :key="p.id"
                class="border-b border-paper-line/60 hover:bg-paper-warm transition-colors"
              >
                <td class="p-5">
                  <a :href="`#${p.slug}`" class="text-ink hover:text-accent-bronze font-semibold">
                    {{ p.name }}
                  </a>
                  <p v-if="p.korean_name" class="text-ink-muted text-xs mt-1">{{ p.korean_name }}</p>
                </td>
                <td v-for="t in PRODUCT_TRAITS" :key="t.key" class="text-center">
                  <span v-if="p[t.key]" class="text-accent-bronze text-2xl">●</span>
                  <span v-else class="text-paper-line text-xl">·</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 제품 상세 -->
    <template v-if="products && products.length > 0">
      <section
        v-for="(p, idx) in products" :id="p.slug" :key="p.id"
        :class="[idx % 2 === 0 ? 'bg-paper' : 'bg-paper-warm', 'py-24 md:py-32 border-t border-paper-line']"
      >
        <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div :class="idx % 2 === 0 ? 'md:col-span-6 md:order-1' : 'md:col-span-6 md:order-2'">
            <div class="aspect-[4/5] bg-paper-soft overflow-hidden">
              <img
                v-if="p.image_url"
                :src="useImageUrl(p.image_url, { width: 1200, format: 'webp', quality: 85 }) || ''"
                :alt="p.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center text-ink-faint text-sm">
                [제품 이미지]
              </div>
            </div>
          </div>
          <div :class="idx % 2 === 0 ? 'md:col-span-6 md:order-2' : 'md:col-span-6 md:order-1'">
            <div class="text-ink-faint text-sm tracking-[0.3em]">{{ String(idx + 1).padStart(2, '0') }}</div>
            <h3 class="mt-4 text-4xl md:text-5xl font-bold tracking-tightest">{{ p.name }}</h3>
            <p v-if="p.korean_name" class="text-accent-bronze mt-2">{{ p.korean_name }}</p>
            <p v-if="p.short_desc" class="text-ink-dim mt-6 text-lg">{{ p.short_desc }}</p>
            <p v-if="p.long_desc" class="text-ink-muted mt-4 leading-relaxed whitespace-pre-line">
              {{ p.long_desc }}
            </p>

            <div v-if="p.use_tags && p.use_tags.length > 0" class="mt-8 flex flex-wrap gap-2">
              <span v-for="tag in p.use_tags" :key="tag"
                class="text-xs px-3 py-1.5 border border-ink/20 text-ink-dim">
                {{ tag }}
              </span>
            </div>

            <table v-if="p.spec_table && p.spec_table.length > 0" class="mt-8 w-full text-sm">
              <tbody>
                <tr v-for="row in p.spec_table" :key="row.label" class="border-b border-paper-line">
                  <td class="py-3 pr-4 text-ink-muted w-1/3">{{ row.label }}</td>
                  <td class="py-3 text-ink">{{ row.value }}</td>
                </tr>
              </tbody>
            </table>

            <!-- 특성 매트릭스 (개별 제품) -->
            <div class="mt-8 grid grid-cols-4 gap-2">
              <div
                v-for="t in PRODUCT_TRAITS" :key="t.key"
                :class="[
                  'text-center py-2 text-xs border',
                  p[t.key] ? 'bg-ink text-paper border-ink' : 'bg-transparent text-ink-faint border-paper-line',
                ]"
              >
                {{ t.label }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>

    <!-- 제품 데이터 없을 때 -->
    <section v-else class="bg-paper-soft py-32 border-t border-paper-line">
      <div class="container-x">
        <p class="text-center text-ink-faint py-32 border border-dashed border-paper-line">
          [제품이 아직 등록되지 않았습니다. 관리자 페이지에서 추가하세요.]
        </p>
      </div>
    </section>
  </div>
</template>
