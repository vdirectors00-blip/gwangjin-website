<script setup lang="ts">
import emailjs from '@emailjs/browser'

definePageMeta({ layout: 'home' })
useHead({ title: 'Contact | 광진실업' })

const { data: company } = await useCompanyInfo()
const config = useRuntimeConfig()

const form = reactive({
  name: '', company: '', email: '', phone: '', message: '',
})
const submitting = ref(false)
const submitted = ref(false)
const error = ref<string | null>(null)

const submit = async () => {
  error.value = null
  submitting.value = true
  const { emailjsServiceId, emailjsTemplateId, emailjsPublicKey } = config.public
  if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
    submitting.value = false
    error.value = '문의 폼이 아직 설정되지 않았습니다. 직접 이메일로 연락 부탁드립니다: ' + (company.value?.email || 'info@gwangjin.co.kr')
    return
  }
  try {
    await emailjs.send(
      emailjsServiceId, emailjsTemplateId,
      {
        from_name: form.name, from_company: form.company || '(미입력)',
        from_email: form.email, from_phone: form.phone || '(미입력)',
        message: form.message, to_email: company.value?.email || 'info@gwangjin.co.kr',
      },
      { publicKey: emailjsPublicKey }
    )
    submitted.value = true
  } catch (e: any) {
    error.value = '전송 중 오류가 발생했습니다.'
    console.error('[EmailJS]', e)
  } finally {
    submitting.value = false
  }
}

const resetForm = () => {
  form.name = ''
  form.company = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  submitted.value = false
}
</script>

<template>
  <div>
    <div class="h-[76px]" />

    <div id="contact-snap" class="h-[calc(100vh-76px)] overflow-y-auto no-scrollbar">
      <HomeSnapController container="contact-snap" :duration="600" :cooldown="700" />

      <!-- ───── 1. Inquiry ───── -->
      <section class="min-h-[calc(100vh-76px)] bg-paper-soft flex flex-col px-6 md:px-10 lg:px-16 py-8 md:py-12">
        <div class="max-w-container mx-auto w-full flex-1 flex flex-col">
          <!-- 헤더 -->
          <div class="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p class="eyebrow text-accent-bronze ink-fade" style="animation-delay: 0ms;">Contact</p>
              <h2 class="mt-3 font-light text-[clamp(32px,4.2vw,56px)] tracking-[-0.025em] text-ink-dim ink-fade" style="animation-delay: 120ms;">
                편하게, <span class="text-accent-bronze">말씀</span>주세요.
              </h2>
              <p class="mt-3 text-ink-dim font-light text-sm md:text-base ink-fade" style="animation-delay: 280ms;">
                담당자가 직접 검토 후 영업일 기준 1~2일 내 회신드립니다.
              </p>
            </div>
            <div class="mono-label text-ink-faint hidden md:block">
              SECURE · EMAILJS
            </div>
          </div>

          <!-- 본문: 좌 연락처 / 우 폼 -->
          <div class="flex-1 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
            <!-- 좌: 빠른 연락처 (TEL/EMAIL/HOURS) -->
            <aside class="md:col-span-4 md:sticky md:top-8">
              <p class="mono-label text-accent-bronze">Quick Contact</p>
              <h3 class="mt-4 font-light text-xl md:text-2xl tracking-[-0.02em] text-ink">
                {{ company?.company_name || '주식회사 광진실업' }}
              </h3>

              <div class="mt-8 space-y-5">
                <div v-if="company?.tel" class="border-l-2 border-accent-bronze/40 pl-4">
                  <p class="mono-label text-ink-muted">TEL</p>
                  <a :href="`tel:${company.tel}`" class="mt-1 font-medium text-lg text-ink hover:text-accent-bronze transition-colors block">
                    {{ company.tel }}
                  </a>
                </div>
                <div v-if="company?.email" class="border-l-2 border-paper-line pl-4">
                  <p class="mono-label text-ink-muted">EMAIL</p>
                  <a :href="`mailto:${company.email}`" class="mt-1 font-medium text-lg text-ink hover:text-accent-bronze transition-colors block break-all">
                    {{ company.email }}
                  </a>
                </div>
                <div v-if="company?.business_hours" class="border-l-2 border-paper-line pl-4">
                  <p class="mono-label text-ink-muted">HOURS</p>
                  <p class="mt-1 font-medium text-lg text-ink">{{ company.business_hours }}</p>
                </div>
              </div>

              <div class="mt-10 pt-6 border-t border-paper-line">
                <p class="mono-label text-ink-faint">담당자가 직접 답변드립니다.</p>
              </div>
            </aside>

            <!-- 우: 폼 -->
            <div class="md:col-span-8">
              <form v-if="!submitted" class="space-y-5" @submit.prevent="submit">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <label class="block group">
                    <span class="mono-label text-ink-muted block mb-2 group-focus-within:text-accent-bronze transition-colors">NAME *</span>
                    <input v-model="form.name" required type="text" placeholder="홍길동"
                      class="w-full bg-transparent border-0 border-b border-paper-line px-0 py-3 text-ink placeholder-ink-faint focus:border-accent-bronze outline-none transition font-light text-lg">
                  </label>
                  <label class="block group">
                    <span class="mono-label text-ink-muted block mb-2 group-focus-within:text-accent-bronze transition-colors">COMPANY</span>
                    <input v-model="form.company" type="text" placeholder="회사명 (선택)"
                      class="w-full bg-transparent border-0 border-b border-paper-line px-0 py-3 text-ink placeholder-ink-faint focus:border-accent-bronze outline-none transition font-light text-lg">
                  </label>
                  <label class="block group">
                    <span class="mono-label text-ink-muted block mb-2 group-focus-within:text-accent-bronze transition-colors">EMAIL *</span>
                    <input v-model="form.email" required type="email" placeholder="you@example.com"
                      class="w-full bg-transparent border-0 border-b border-paper-line px-0 py-3 text-ink placeholder-ink-faint focus:border-accent-bronze outline-none transition font-light text-lg">
                  </label>
                  <label class="block group">
                    <span class="mono-label text-ink-muted block mb-2 group-focus-within:text-accent-bronze transition-colors">PHONE</span>
                    <input v-model="form.phone" type="tel" placeholder="010-0000-0000"
                      class="w-full bg-transparent border-0 border-b border-paper-line px-0 py-3 text-ink placeholder-ink-faint focus:border-accent-bronze outline-none transition font-light text-lg">
                  </label>
                </div>

                <label class="block group pt-2">
                  <span class="mono-label text-ink-muted block mb-2 group-focus-within:text-accent-bronze transition-colors">MESSAGE *</span>
                  <textarea v-model="form.message" required rows="5" placeholder="문의 내용을 자유롭게 작성해 주세요."
                    class="w-full bg-transparent border-0 border-b border-paper-line px-0 py-3 text-ink placeholder-ink-faint focus:border-accent-bronze outline-none transition font-light text-base leading-relaxed resize-none" />
                </label>

                <div class="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <p v-if="error" class="text-red-600 text-sm font-light">{{ error }}</p>
                  <p v-else class="mono-label text-ink-faint">* 필수 항목</p>

                  <button type="submit" :disabled="submitting"
                    class="group inline-flex items-center gap-5 self-start md:self-auto disabled:opacity-50 disabled:cursor-not-allowed">
                    <span class="text-xl md:text-2xl text-ink group-hover:text-accent-bronze transition-colors duration-500">
                      {{ submitting ? '전송 중' : '문의 보내기' }}
                    </span>
                    <span class="relative w-14 h-14 rounded-full border border-ink/30 group-hover:border-accent-bronze group-hover:translate-x-2 group-hover:-rotate-45 flex items-center justify-center transition-all duration-500 ease-out-expo">
                      <svg class="w-5 h-5 text-ink group-hover:text-accent-bronze transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>

              <!-- 전송 완료 -->
              <Transition
                appear
                enter-active-class="transition-all duration-700 ease-out-expo"
                enter-from-class="opacity-0 translate-y-4"
                enter-to-class="opacity-100 translate-y-0"
              >
                <div v-if="submitted" class="relative bg-white p-10 md:p-14 overflow-hidden">
                  <span class="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-bronze/60 pointer-events-none" />
                  <span class="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-bronze/60 pointer-events-none" />
                  <span class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent-bronze/60 pointer-events-none" />
                  <span class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-bronze/60 pointer-events-none" />

                  <p class="mono-label text-accent-bronze">Thank You</p>
                  <h3 class="mt-4 font-light text-3xl md:text-4xl tracking-[-0.02em]">
                    문의가 <span class="text-accent-bronze">접수</span>되었습니다.
                  </h3>
                  <p class="mt-4 text-ink-dim font-light leading-relaxed">
                    영업일 기준 1~2일 내 담당자가 직접 회신드립니다.<br>
                    급한 건은 <a :href="`tel:${company?.tel || ''}`" class="text-ink hover:text-accent-bronze transition-colors underline underline-offset-4">{{ company?.tel || '대표 전화' }}</a>로 연락 부탁드립니다.
                  </p>
                  <button @click="resetForm"
                    class="mt-8 mono-label text-ink-muted hover:text-accent-bronze transition-colors">
                    ← 새 문의 작성
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>

      <!-- ───── 2. Visit + Footer (라이트 paper-warm 톤) ───── -->
      <section class="min-h-[calc(100vh-76px)] bg-paper-warm text-ink flex flex-col border-t border-paper-line/60">
        <div class="flex-1 flex flex-col px-6 md:px-10 lg:px-16 py-10 md:py-14">
          <div class="max-w-container mx-auto w-full flex-1 flex flex-col">
            <!-- 좌 헤더+ADDRESS+CTA / 우 지도(전체 높이) -->
            <div class="flex-1 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-stretch min-h-0">
              <!-- 좌: Visit Us 헤더 + ADDRESS + 안내 + 카카오맵 링크 -->
              <div class="md:col-span-5 flex flex-col justify-center">
                <p class="eyebrow text-ink-muted">Visit Us</p>
                <h2 class="mt-4 font-light text-[clamp(32px,4.2vw,56px)] tracking-[-0.025em] text-ink">
                  직접 방문도 <span class="text-accent-bronze">환영합니다</span>.
                </h2>

                <div class="mt-12">
                  <p class="mono-label text-accent-bronze">ADDRESS</p>
                  <p v-if="company?.address" class="mt-4 font-light text-2xl md:text-3xl text-ink leading-[1.45] tracking-[-0.015em]">
                    {{ company.address }}
                  </p>
                  <p v-else class="mt-4 font-light text-2xl md:text-3xl text-ink/60 leading-[1.45]">
                    주소 등록 대기 중
                  </p>
                </div>

                <div class="mt-10 w-12 h-px bg-ink/30" />
                <p class="mt-6 mono-label text-ink-muted">
                  방문 전 <a :href="`tel:${company?.tel || ''}`" class="text-ink-dim hover:text-accent-bronze transition-colors underline underline-offset-4">전화 연락</a> 부탁드립니다.
                </p>

                <a v-if="company?.address"
                  :href="`https://map.kakao.com/?q=${encodeURIComponent(company.address)}`"
                  target="_blank" rel="noopener"
                  class="group mt-6 inline-flex items-center gap-4 self-start"
                >
                  <span class="text-base md:text-lg text-ink group-hover:text-accent-bronze transition-colors duration-500">
                    카카오맵에서 보기
                  </span>
                  <span class="relative w-11 h-11 rounded-full border border-ink/30 group-hover:border-accent-bronze group-hover:translate-x-1 group-hover:-rotate-45 flex items-center justify-center transition-all duration-500 ease-out-expo">
                    <svg class="w-4 h-4 text-ink group-hover:text-accent-bronze transition-colors duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>

              <!-- 우: 지도 (섹션 전체 높이 차지) -->
              <div class="md:col-span-7">
                <!-- 모바일: 명시적 높이 420px (viewport 충분히 커서 마커·줌 컨트롤 안 잘림)
                     데스크탑: 기존 grid stretch + min-h-[520px] -->
                <div class="relative w-full h-[420px] md:h-full md:min-h-[520px] bg-white border border-ink/15 overflow-hidden">
                  <span class="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent-bronze/60 pointer-events-none z-10" />
                  <span class="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent-bronze/60 pointer-events-none z-10" />
                  <span class="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent-bronze/60 pointer-events-none z-10" />
                  <span class="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent-bronze/60 pointer-events-none z-10" />

                  <!-- 카카오맵: iframe·script 둘 다 지원 (script는 v-html에서 실행 안 되므로 별도 컴포넌트) -->
                  <CommonKakaoMapEmbed
                    v-if="company?.kakao_map_embed"
                    :embed-code="company.kakao_map_embed"
                    class="absolute inset-0"
                  />
                  <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-ink-faint">
                    <p class="mono-label">MAP</p>
                    <p class="mt-2 font-light text-sm">카카오맵 임베드 — 관리자에서 입력</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CommonSiteFooter />
      </section>
    </div>
  </div>
</template>
