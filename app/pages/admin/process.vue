<script setup lang="ts">
import type { ProcessStep } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '생산 공정 관리' })

const supabase = useSupabaseClient()

const items = ref<ProcessStep[]>([])
const loading = ref(true)

const editing = ref<Partial<ProcessStep> | null>(null)
const isNew = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

const load = async () => {
  loading.value = true
  const { data } = await supabase.from('process_steps').select('*').order('step_number')
  items.value = (data ?? []) as ProcessStep[]
  loading.value = false
}
await load()

const openNew = () => {
  isNew.value = true
  editing.value = {
    step_number: Math.max(0, ...items.value.map(i => i.step_number)) + 1,
    title: '',
    description: '',
    image_url: '',
  }
}
const openEdit = (row: ProcessStep) => { isNew.value = false; editing.value = { ...row } }
const close = () => { editing.value = null; error.value = null }

const save = async () => {
  if (!editing.value) return
  saving.value = true
  error.value = null
  const payload: any = { ...editing.value }
  delete payload.id
  delete payload.created_at
  delete payload.updated_at
  const { error: e } = isNew.value
    ? await supabase.from('process_steps').insert(payload)
    : await supabase.from('process_steps').update(payload).eq('id', editing.value.id)
  saving.value = false
  if (e) error.value = e.message
  else { await load(); close() }
}

const remove = async (row: ProcessStep) => {
  if (!confirm(`"${row.step_number}. ${row.title}" 단계를 삭제할까요?`)) return
  const { error: e } = await supabase.from('process_steps').delete().eq('id', row.id)
  if (e) alert(e.message)
  else await load()
}
</script>

<template>
  <div>
    <AdminPageHeader title="생산 공정 관리" :subtitle="`총 ${items.length}단계`">
      <template #actions>
        <button class="px-5 py-2.5 text-sm bg-ink-dark text-white hover:bg-accent-bronze transition" @click="openNew">
          + 단계 추가
        </button>
      </template>
    </AdminPageHeader>

    <AdminListTable
      :columns="[
        { key: 'step_number', label: '단계', width: '80px', align: 'center' },
        { key: 'title', label: '공정명' },
        { key: 'description', label: '설명' },
      ]"
      :rows="items"
      empty-text="공정이 비어있습니다."
      @edit="openEdit"
      @remove="remove"
    />

    <AdminModal :open="!!editing" :title="isNew ? '공정 추가' : '공정 편집'" @close="close">
      <div v-if="editing" class="space-y-5">
        <AdminFormField label="단계 번호" required>
          <AdminInputText v-model="editing.step_number" type="number" />
        </AdminFormField>
        <AdminFormField label="공정명" required>
          <AdminInputText v-model="editing.title" placeholder="예: 카드기" />
        </AdminFormField>
        <AdminFormField label="설명">
          <AdminInputTextarea v-model="editing.description" :rows="3" />
        </AdminFormField>
        <AdminFormField label="공정 사진 (선택)">
          <AdminImageUploader v-model="editing.image_url" folder="process" />
        </AdminFormField>
      </div>
      <template #footer>
        <button class="px-4 py-2 text-sm text-ink-dark-muted hover:text-ink-dark" @click="close">취소</button>
        <button :disabled="saving" class="px-6 py-2 text-sm bg-ink-dark text-white hover:bg-accent-bronze disabled:opacity-50" @click="save">
          {{ saving ? '저장 중...' : '저장' }}
        </button>
        <p v-if="error" class="text-red-500 text-xs ml-3 self-center">{{ error }}</p>
      </template>
    </AdminModal>
  </div>
</template>
