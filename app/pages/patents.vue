<script setup lang="ts">
useHead({ title: 'Patents | 광진실업' })

const { data: patents } = await useCertifications('patent')
</script>

<template>
  <div>
    <CommonPageHero
      title="Patents"
      subtitle="자체 기술로 등록한 특허"
      eyebrow="Technology & Certifications · 02"
      background="/images/hero/hero-1.jpg"
    />

    <!-- Intro -->
    <section class="bg-paper py-32 md:py-40">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
        <div class="md:col-span-7">
          <p class="eyebrow text-ink-muted">Registered Technology</p>
          <h2 class="mt-6 text-3xl md:text-5xl font-bold tracking-tightest leading-tight">
            기술 혁신의 증거,<br>4건의 등록 특허
          </h2>
          <p class="mt-8 text-ink-dim text-lg leading-relaxed max-w-2xl">
            2010년부터 2012년까지 집중적으로 등록한 4건의 특허는
            광진실업이 단순 제조사가 아닌 기술 기반의 충전재 전문 기업임을 보여줍니다.
          </p>
        </div>
        <div class="md:col-span-5 md:text-right">
          <div class="text-7xl font-bold text-accent-eco tracking-tightest">{{ patents?.length || 4 }}</div>
          <p class="text-ink-muted text-sm mt-1">REGISTERED PATENTS</p>
        </div>
      </div>
    </section>

    <!-- 특허 리스트 -->
    <section class="bg-paper-soft py-24 border-t border-paper-line">
      <div class="container-x">
        <div v-if="patents && patents.length > 0" class="space-y-px bg-paper-line">
          <div
            v-for="(p, i) in patents" :key="p.id"
            class="bg-paper p-10 md:p-14 group hover:bg-paper-warm transition-colors duration-300"
          >
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div class="md:col-span-2">
                <div class="text-6xl font-bold text-ink/15 tracking-tightest leading-none">
                  {{ String(i + 1).padStart(2, '0') }}
                </div>
              </div>
              <div class="md:col-span-7">
                <p class="eyebrow text-accent-eco">PATENT</p>
                <h3 class="text-ink text-2xl md:text-3xl font-bold mt-4 leading-tight">
                  {{ p.name }}
                </h3>
                <p v-if="p.description" class="text-ink-dim mt-4 leading-relaxed">
                  {{ p.description }}
                </p>
              </div>
              <div class="md:col-span-3 md:text-right">
                <div v-if="p.cert_number" class="text-ink font-mono text-sm">
                  {{ p.cert_number }}
                </div>
                <div v-if="p.issued_at" class="text-ink-muted text-sm mt-1">
                  {{ p.issued_at }} 등록
                </div>
              </div>
            </div>
          </div>
        </div>

        <p v-else class="py-32 text-center text-ink-faint border border-dashed border-paper-line">
          [특허 데이터가 비어있습니다.]
        </p>
      </div>
    </section>

    <!-- 인증 페이지 링크 -->
    <section class="bg-dark text-paper py-24">
      <div class="container-x grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p class="eyebrow text-ink-inverse-muted">Also See</p>
          <h2 class="mt-6 text-3xl md:text-4xl font-bold tracking-tightest">
            국제 표준으로 입증한<br>
            <span class="text-accent-bronze-soft">품질·환경 인증</span>
          </h2>
        </div>
        <div class="md:text-right">
          <NuxtLink to="/certifications" class="btn-light">품질 인증 보기 →</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
