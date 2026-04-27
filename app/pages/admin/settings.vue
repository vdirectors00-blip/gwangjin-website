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
    <AdminPageHeader title="사이트 설정" subtitle="모든 페이지 푸터에 표시되는 저작권 문구" />

    <section class="space-y-6 mb-12">
      <AdminFormField
        label="저작권 텍스트"
        hint="모든 페이지 하단 푸터에 표시됩니다. 비워두면 '© [올해] 주식회사 광진실업 · All Rights Reserved.'가 자동 표시됩니다."
      >
        <AdminInputText
          v-model="settings.copyright_text"
          placeholder="© 2026 주식회사 광진실업 · All Rights Reserved."
        />
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
