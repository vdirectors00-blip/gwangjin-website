<script setup lang="ts">
import emailjs from '@emailjs/browser'

useHead({ title: 'Contact | 광진실업' })

const { data: company } = await useCompanyInfo()
const config = useRuntimeConfig()

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
})

const submitting = ref(false)
const submitted = ref(false)
const error = ref<string | null>(null)

const submit = async () => {
  error.value = null
  submitting.value = true

  // EmailJS 키가 없으면 mailto 폴백
  const { emailjsServiceId, emailjsTemplateId, emailjsPublicKey } = config.public
  if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
    submitting.value = false
    error.value = '문의 폼이 아직 설정되지 않았습니다. 직접 이메일로 연락 부탁드립니다: ' + (company.value?.email || 'info@gwangjin.co.kr')
    return
  }

  try {
    await emailjs.send(
      emailjsServiceId,
      emailjsTemplateId,
      {
        from_name: form.name,
        from_company: form.company || '(미입력)',
        from_email: form.email,
        from_phone: form.phone || '(미입력)',
        message: form.message,
        to_email: company.value?.email || 'info@gwangjin.co.kr',
      },
      { publicKey: emailjsPublicKey }
    )
    submitted.value = true
  } catch (e: any) {
    error.value = '전송 중 오류가 발생했습니다. 잠시 후 다시 시도하거나 이메일로 연락 부탁드립니다.'
    console.error('[EmailJS]', e)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div>
    <CommonPageHero
      title="Contact"
      subtitle="문의 · 샘플 요청 · 거래 상담"
      eyebrow="Get in Touch"
      background="/images/hero/hero-3.jpg"
    />

    <!-- 정보 + 폼 -->
    <section class="bg-paper py-32">
      <div class="container-x grid grid-cols-1 md:grid-cols-12 gap-12">
        <!-- 회사 정보 -->
        <div class="md:col-span-5">
          <p class="eyebrow text-ink-muted">Company</p>
          <h2 class="mt-6 text-3xl md:text-4xl font-bold tracking-tightest">
            {{ company?.company_name || '주식회사 광진실업' }}
          </h2>

          <dl class="mt-12 space-y-7">
            <div v-if="company?.address" class="border-b border-paper-line pb-5">
              <dt class="text-ink-muted text-xs tracking-[0.3em]">ADDRESS</dt>
              <dd class="text-ink mt-2 text-lg">{{ company.address }}</dd>
            </div>
            <div v-if="company?.tel" class="border-b border-paper-line pb-5">
              <dt class="text-ink-muted text-xs tracking-[0.3em]">TEL</dt>
              <dd class="mt-2">
                <a :href="`tel:${company.tel}`" class="text-ink text-lg hover:text-accent-bronze">
                  {{ company.tel }}
                </a>
              </dd>
            </div>
            <div v-if="company?.email" class="border-b border-paper-line pb-5">
              <dt class="text-ink-muted text-xs tracking-[0.3em]">EMAIL</dt>
              <dd class="mt-2">
                <a :href="`mailto:${company.email}`" class="text-ink text-lg hover:text-accent-bronze">
                  {{ company.email }}
                </a>
              </dd>
            </div>
            <div v-if="company?.business_hours" class="border-b border-paper-line pb-5">
              <dt class="text-ink-muted text-xs tracking-[0.3em]">HOURS</dt>
              <dd class="text-ink mt-2 text-lg">{{ company.business_hours }}</dd>
            </div>
          </dl>

          <div class="mt-10 aspect-video bg-paper-warm overflow-hidden">
            <div v-if="company?.kakao_map_embed" class="w-full h-full" v-html="company.kakao_map_embed" />
            <div v-else class="w-full h-full flex items-center justify-center text-ink-faint text-sm">
              [카카오맵 임베드 — 관리자에서 입력]
            </div>
          </div>
        </div>

        <!-- 폼 -->
        <div class="md:col-span-7 md:pl-12">
          <p class="eyebrow text-ink-muted">Inquiry</p>
          <h2 class="mt-6 text-3xl md:text-4xl font-bold tracking-tightest">
            무엇이든 편하게<br>물어보세요
          </h2>
          <p class="mt-6 text-ink-dim leading-relaxed">
            샘플 요청, 단가 협의, 신규 거래 문의 등 모든 비즈니스 상담을 환영합니다.
            영업일 기준 1~2일 내 회신드립니다.
          </p>

          <form v-if="!submitted" class="mt-12 space-y-5" @submit.prevent="submit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input v-model="form.name" required type="text" placeholder="이름 *"
                class="w-full bg-paper-soft border border-paper-line px-4 py-4 text-ink placeholder-ink-faint focus:border-ink outline-none transition">
              <input v-model="form.company" type="text" placeholder="회사명"
                class="w-full bg-paper-soft border border-paper-line px-4 py-4 text-ink placeholder-ink-faint focus:border-ink outline-none transition">
              <input v-model="form.email" required type="email" placeholder="이메일 *"
                class="w-full bg-paper-soft border border-paper-line px-4 py-4 text-ink placeholder-ink-faint focus:border-ink outline-none transition">
              <input v-model="form.phone" type="tel" placeholder="전화번호"
                class="w-full bg-paper-soft border border-paper-line px-4 py-4 text-ink placeholder-ink-faint focus:border-ink outline-none transition">
            </div>
            <textarea v-model="form.message" required rows="7" placeholder="문의 내용 *"
              class="w-full bg-paper-soft border border-paper-line px-4 py-4 text-ink placeholder-ink-faint focus:border-ink outline-none transition resize-none" />
            <button type="submit" :disabled="submitting" class="btn-dark w-full md:w-auto">
              {{ submitting ? '전송 중...' : '문의 보내기 →' }}
            </button>
            <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
            <p class="text-ink-muted text-xs">
              * 표시는 필수 입력 항목입니다.
            </p>
          </form>
          <div v-else class="mt-12 border border-paper-line p-12 text-center bg-paper-soft">
            <p class="eyebrow text-accent-bronze">Thank You</p>
            <h3 class="text-ink text-2xl font-bold mt-4">감사합니다</h3>
            <p class="text-ink-muted mt-3">빠른 시일 내에 답변드리겠습니다.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
