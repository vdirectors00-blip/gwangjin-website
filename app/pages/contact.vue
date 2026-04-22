<script setup lang="ts">
useHead({ title: 'Contact | 광진실업' })

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  message: '',
})

const submitting = ref(false)
const submitted = ref(false)

const submit = () => {
  submitting.value = true
  // TODO: EmailJS 또는 Formspree 연동
  setTimeout(() => {
    submitting.value = false
    submitted.value = true
  }, 500)
}
</script>

<template>
  <div>
    <CommonPageHero title="Contact Us" subtitle="문의하기" />

    <section class="py-24">
      <div class="container-x grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <p class="text-ink-muted text-sm tracking-widest uppercase">Information</p>
          <h2 class="text-3xl md:text-4xl font-bold text-ink mt-2">회사 정보</h2>
          <dl class="mt-10 space-y-6">
            <div>
              <dt class="text-ink-muted text-xs tracking-widest">ADDRESS</dt>
              <dd class="text-ink mt-2">인천광역시 서구 가정로 58번길 3 (가좌동)</dd>
            </div>
            <div>
              <dt class="text-ink-muted text-xs tracking-widest">TEL</dt>
              <dd class="text-ink mt-2">032-582-4149</dd>
            </div>
            <div>
              <dt class="text-ink-muted text-xs tracking-widest">EMAIL</dt>
              <dd class="text-ink mt-2">info@gwangjin.co.kr</dd>
            </div>
            <div>
              <dt class="text-ink-muted text-xs tracking-widest">HOURS</dt>
              <dd class="text-ink mt-2">월-금 09:00-18:00</dd>
            </div>
          </dl>
          <div class="mt-10 aspect-video bg-bg-card border border-white/10 flex items-center justify-center text-ink-faint">
            [카카오맵 임베드 예정]
          </div>
        </div>

        <div>
          <p class="text-ink-muted text-sm tracking-widest uppercase">Inquiry</p>
          <h2 class="text-3xl md:text-4xl font-bold text-ink mt-2">문의하기</h2>
          <form v-if="!submitted" class="mt-10 space-y-5" @submit.prevent="submit">
            <input v-model="form.name" required type="text" placeholder="이름 *" class="w-full bg-bg-mid border border-white/10 px-4 py-3 text-ink placeholder-ink-faint focus:border-white/40 outline-none">
            <input v-model="form.company" type="text" placeholder="회사명" class="w-full bg-bg-mid border border-white/10 px-4 py-3 text-ink placeholder-ink-faint focus:border-white/40 outline-none">
            <input v-model="form.email" required type="email" placeholder="이메일 *" class="w-full bg-bg-mid border border-white/10 px-4 py-3 text-ink placeholder-ink-faint focus:border-white/40 outline-none">
            <input v-model="form.phone" type="tel" placeholder="전화번호" class="w-full bg-bg-mid border border-white/10 px-4 py-3 text-ink placeholder-ink-faint focus:border-white/40 outline-none">
            <textarea v-model="form.message" required rows="6" placeholder="문의 내용 *" class="w-full bg-bg-mid border border-white/10 px-4 py-3 text-ink placeholder-ink-faint focus:border-white/40 outline-none resize-none" />
            <button type="submit" :disabled="submitting" class="btn-primary w-full">
              {{ submitting ? '전송 중...' : '문의 보내기' }}
            </button>
          </form>
          <div v-else class="mt-10 border border-white/10 p-10 text-center">
            <h3 class="text-ink text-xl font-semibold">감사합니다</h3>
            <p class="text-ink-muted mt-2">빠른 시일 내에 답변드리겠습니다.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
