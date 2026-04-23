<script setup lang="ts">
useHead({ title: 'Quality Certifications | 광진실업' })

const { data: certs } = await useCertifications('certification')
</script>

<template>
  <div>
    <CommonPageHero
      title="Quality Certifications"
      subtitle="국제 표준으로 검증된 품질·환경 시스템"
      eyebrow="Technology & Certifications · 01"
      background="/images/hero/hero-3.jpg"
    />

    <!-- Intro -->
    <section class="bg-paper py-32 md:py-40">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <div class="md:col-span-7">
          <p class="eyebrow text-ink-muted">Certified Quality</p>
          <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
            ISO와 한국인증원으로<br>입증한 시스템
          </h2>
          <p class="mt-8 text-ink-dim text-lg leading-relaxed max-w-2xl">
            품질경영(ISO 9001) · 환경경영(ISO 14001) · 한국인증원 Q E R · 이노비즈.
            네 가지 공식 인증으로 광진실업의 품질·환경 시스템을 외부에 공증합니다.
          </p>
        </div>
        <div class="md:col-span-5 md:text-right">
          <div class="text-7xl font-bold text-accent-bronze tracking-tightest">{{ certs?.length || 4 }}</div>
          <p class="text-ink-muted text-sm mt-1">OFFICIAL CERTIFICATIONS</p>
        </div>
      </div>
    </section>

    <!-- 인증 카드 -->
    <section class="bg-paper-warm py-24 border-t border-paper-line">
      <div class="container-x">
        <div v-if="certs && certs.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper-line">
          <div
            v-for="c in certs" :key="c.id"
            class="bg-paper p-12 md:p-14"
          >
            <div class="aspect-[4/3] bg-paper-soft mb-8 overflow-hidden flex items-center justify-center">
              <img
                v-if="c.image_url"
                :src="useImageUrl(c.image_url, { width: 1000, format: 'webp', quality: 90 }) || ''"
                :alt="c.name"
                class="w-full h-full object-contain"
              />
              <div v-else class="text-ink-faint text-sm">[인증서 이미지 — 관리자에서 업로드]</div>
            </div>

            <p class="eyebrow text-accent-bronze">{{ c.cert_type }}</p>
            <h3 class="text-ink text-2xl font-bold mt-4">{{ c.name }}</h3>
            <p v-if="c.description" class="text-ink-dim mt-3 leading-relaxed">{{ c.description }}</p>

            <div class="mt-8 pt-6 border-t border-paper-line flex justify-between text-sm">
              <span v-if="c.cert_number" class="text-ink-muted">{{ c.cert_number }}</span>
              <span v-if="c.issued_at" class="text-ink-muted">{{ c.issued_at }}</span>
            </div>
          </div>
        </div>

        <p v-else class="py-32 text-center text-ink-faint border border-dashed border-paper-line">
          [인증 데이터가 비어있습니다.]
        </p>
      </div>
    </section>

    <!-- 특허 페이지 링크 -->
    <section class="bg-dark text-paper py-24">
      <div class="container-x grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p class="eyebrow text-ink-inverse-muted">Next</p>
          <h2 class="mt-6 text-3xl md:text-4xl font-bold tracking-tightest">
            기술력의 또 다른 증명,<br>
            <span class="text-accent-bronze-soft">자체 특허 4건</span>
          </h2>
        </div>
        <div class="md:text-right">
          <NuxtLink to="/patents" class="btn-light">특허 보기 →</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
