<script setup lang="ts">
import type { SiteSettings } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '사이트 설정' })

const supabase = useSupabaseClient()

const settings = ref<Partial<SiteSettings>>({})
const loading = ref(true)
const saving = ref(false)
const message = ref<string | null>(null)
const error = ref<string | null>(null)

const load = async () => {
  loading.value = true
  const { data } = await supabase.from('site_settings').select('*').eq('id', 1).single()
  if (data) settings.value = data
  loading.value = false
}
await load()

const save = async () => {
  saving.value = true
  error.value = null
  message.value = null
  const payload: any = { ...settings.value }
  delete payload.id
  delete payload.updated_at

  const { error: e } = await supabase.from('site_settings').update(payload).eq('id', 1)
  saving.value = false
  if (e) error.value = e.message
  else {
    message.value = '저장되었습니다.'
    setTimeout(() => { message.value = null }, 3000)
  }
}
</script>

<template>
  <div>
    <AdminPageHeader title="사이트 설정" subtitle="로고, 푸터, 저작권 등 전역 설정" />

    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">브랜딩</h2>
      <AdminFormField label="로고 (커스텀 업로드)" hint="비워두면 기본 BI 로고(/logo/bi-color.svg)가 사용됩니다">
        <AdminImageUploader v-model="settings.logo_url" folder="branding" />
      </AdminFormField>
    </section>

    <section class="space-y-6 mb-12">
      <h2 class="text-xl font-semibold text-ink-dark">푸터</h2>
      <AdminFormField label="푸터 태그라인" hint="브랜드 로고 아래 한 줄">
        <AdminInputText v-model="settings.footer_tagline" placeholder="Premium Filling Materials" />
      </AdminFormField>
      <AdminFormField label="저작권 텍스트" hint="비워두면 자동 생성">
        <AdminInputText v-model="settings.copyright_text" placeholder="© 2026 주식회사 광진실업. All Rights Reserved." />
      </AdminFormField>
    </section>

    <AdminSaveBar
      :saving="saving"
      :message="message"
      :error="error"
      @save="save"
      @cancel="load"
    />
  </div>
</template>
