<script setup lang="ts">
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const logout = async () => {
  await supabase.auth.signOut()
  await navigateTo('/admin/login')
}

// 사이트 페이지 단위 그룹핑 (사용자가 어느 사이트 페이지를 수정하는지 직관적으로)
const navGroups = [
  {
    group: '메인 페이지',
    page: '/',
    items: [
      { label: '회사 정보·통계', to: '/admin/company',        desc: 'Footer/Contact + Intro 통계 숫자' },
      { label: '시그니처 제품',   to: '/admin/products',       desc: 'Materials 섹션 (하이라이트 3개)' },
      { label: '인증·특허',       to: '/admin/certifications', desc: 'Trust 섹션 리스트' },
    ],
  },
  {
    group: 'About (회사소개)',
    page: '/about, /history, /factory',
    items: [
      { label: 'CEO 인사말',     to: '/admin/company',  desc: '/about 페이지 인사말 본문' },
      { label: '연혁',           to: '/admin/history',  desc: '/history 타임라인' },
      { label: '생산 공정',       to: '/admin/process',  desc: '/factory 6단계' },
      { label: '공장 갤러리',     to: '/admin/gallery',  desc: '/factory 시설 사진' },
    ],
  },
  {
    group: 'Products (제품)',
    page: '/products',
    items: [
      { label: '제품 관리', to: '/admin/products', desc: '카드 + 매트릭스 + 모달 상세' },
    ],
  },
  {
    group: 'Technology (기술·인증)',
    page: '/certifications, /patents',
    items: [
      { label: '인증·특허 관리', to: '/admin/certifications', desc: 'ISO·이노비즈 + 등록 특허' },
    ],
  },
  {
    group: 'Contact (문의)',
    page: '/contact',
    items: [
      { label: '회사 정보·지도', to: '/admin/company',  desc: 'TEL·이메일·주소·카카오맵' },
    ],
  },
  {
    group: '기타',
    page: '',
    items: [
      { label: '사이트 설정', to: '/admin/settings', desc: '푸터 저작권 문구' },
    ],
  },
]
</script>

<template>
  <div class="min-h-screen bg-bg-light-soft text-ink-dark flex">
    <aside class="w-64 bg-bg border-r border-white/10 flex-shrink-0 flex flex-col">
      <!-- 좌측 상단 'Admin' 클릭 시 대시보드로 -->
      <NuxtLink
        to="/admin"
        class="block p-6 border-b border-white/10 hover:bg-white/5 transition-colors group"
      >
        <div class="text-xl font-bold text-paper group-hover:text-accent-bronze-soft transition-colors tracking-tight">
          Admin
        </div>
        <div class="text-paper/40 text-xs mt-1.5">{{ user?.email }}</div>
      </NuxtLink>

      <nav class="flex-1 overflow-y-auto p-3 space-y-5">
        <!-- 대시보드는 단독 -->
        <NuxtLink
          to="/admin"
          class="block px-3 py-2.5 rounded hover:bg-white/5 group"
          active-class="bg-white/10"
        >
          <div class="text-sm text-paper/85 group-hover:text-paper font-medium">📊 대시보드</div>
        </NuxtLink>

        <!-- 사이트 페이지 단위 그룹 -->
        <div v-for="g in navGroups" :key="g.group" class="space-y-0.5">
          <!-- 그룹 헤더: 클릭 X. bronze + 굵게로 명확히 분리 -->
          <div class="px-3 pt-2 pb-2 cursor-default select-none border-l-2 border-accent-bronze-soft/70 bg-white/[0.03]">
            <div class="text-[13px] font-bold text-accent-bronze-soft uppercase tracking-[0.08em]">
              {{ g.group }}
            </div>
            <div v-if="g.page" class="text-[10px] text-paper/40 mt-0.5 font-mono">{{ g.page }}</div>
          </div>
          <!-- 클릭 가능 항목 -->
          <NuxtLink
            v-for="item in g.items" :key="item.label"
            :to="item.to"
            class="block pl-6 pr-3 py-2 rounded hover:bg-white/5 group"
            active-class="bg-white/10"
          >
            <div class="text-sm text-paper/85 group-hover:text-paper font-medium">{{ item.label }}</div>
            <div class="text-[11px] text-paper/45 mt-0.5 leading-tight">{{ item.desc }}</div>
          </NuxtLink>
        </div>
      </nav>

      <div class="p-3 border-t border-white/10 space-y-1">
        <NuxtLink to="/" class="block px-3 py-2 text-sm text-paper/60 hover:text-paper transition-colors">
          ← 사이트로 돌아가기
        </NuxtLink>
        <button class="block w-full text-left px-3 py-2 text-sm text-paper/60 hover:text-paper transition-colors" @click="logout">
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
