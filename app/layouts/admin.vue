<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async () => {
  await supabase.auth.signOut()
  await navigateTo('/admin/login')
}

const nav = [
  { label: '대시보드', to: '/admin' },
  { label: '메인 배너', to: '/admin/hero' },
  { label: '회사 정보', to: '/admin/company' },
  { label: '제품', to: '/admin/products' },
  { label: '연혁', to: '/admin/history' },
  { label: '인증서', to: '/admin/certifications' },
  { label: '생산공정', to: '/admin/process' },
  { label: '공장 갤러리', to: '/admin/gallery' },
  { label: 'Strength', to: '/admin/strength' },
  { label: '사이트 설정', to: '/admin/settings' },
]
</script>

<template>
  <div class="min-h-screen bg-bg-light-soft text-ink-dark flex">
    <aside class="w-64 bg-bg border-r border-white/5 text-ink flex-shrink-0 flex flex-col">
      <div class="p-6 border-b border-white/5">
        <div class="text-lg font-bold">Admin</div>
        <div class="text-ink-faint text-xs mt-1">{{ user?.email }}</div>
      </div>
      <nav class="flex-1 p-3">
        <NuxtLink
          v-for="item in nav" :key="item.to" :to="item.to"
          class="block px-3 py-2.5 text-sm text-ink-dim hover:bg-white/5 hover:text-ink rounded"
          active-class="bg-white/10 text-ink"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="p-3 border-t border-white/5">
        <NuxtLink to="/" class="block px-3 py-2 text-sm text-ink-faint hover:text-ink">
          ← 사이트로 돌아가기
        </NuxtLink>
        <button class="block w-full text-left px-3 py-2 text-sm text-ink-faint hover:text-ink" @click="logout">
          로그아웃
        </button>
      </div>
    </aside>

    <main class="flex-1 overflow-x-hidden">
      <div class="p-10">
        <slot />
      </div>
    </main>
  </div>
</template>
