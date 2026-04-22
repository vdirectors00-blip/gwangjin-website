<script setup lang="ts">
definePageMeta({ layout: false })
useHead({ title: '관리자 로그인' })

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref<string | null>(null)
const loading = ref(false)

watch(user, (v) => {
  if (v) {
    const redirect = (route.query.redirect as string) || '/admin'
    navigateTo(redirect, { replace: true })
  }
}, { immediate: true })

const login = async () => {
  error.value = null
  loading.value = true
  const { error: e } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  })
  loading.value = false
  if (e) error.value = e.message
}
</script>

<template>
  <div class="min-h-screen bg-bg text-ink flex items-center justify-center p-6">
    <div class="w-full max-w-md">
      <div class="text-center mb-10">
        <div class="text-ink font-bold text-2xl">COSY FEEL</div>
        <div class="text-ink-muted text-sm mt-2">관리자 로그인</div>
      </div>
      <form class="space-y-4" @submit.prevent="login">
        <input v-model="email" type="email" required placeholder="이메일" class="w-full bg-bg-mid border border-white/10 px-4 py-3 text-ink placeholder-ink-faint focus:border-white/40 outline-none">
        <input v-model="password" type="password" required placeholder="비밀번호" class="w-full bg-bg-mid border border-white/10 px-4 py-3 text-ink placeholder-ink-faint focus:border-white/40 outline-none">
        <button type="submit" :disabled="loading" class="btn-primary w-full">
          {{ loading ? '로그인 중...' : '로그인' }}
        </button>
        <p v-if="error" class="text-red-400 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>
