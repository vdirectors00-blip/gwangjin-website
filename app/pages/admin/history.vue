<script setup lang="ts">
import type { HistoryItem } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '연혁 관리' })

const supabase = useSupabaseClient()

const items = ref<HistoryItem[]>([])
const loading = ref(true)

const editing = ref<Partial<HistoryItem> | null>(null)
const isNew = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

const load = async () => {
  loading.value = true
  const { data } = await supabase.from('history_items').select('*').order('sort_order')
  items.value = (data ?? []) as HistoryItem[]
  loading.value = false
}
await load()

const openNew = () => {
  isNew.value = true
  editing.value = {
    year: '',
    title: '',
    description: '',
    sort_order: Math.max(0, ...items.value.map(i => i.sort_order)) + 1,
  }
}

const openEdit = (row: HistoryItem) => {
  isNew.value = false
  editing.value = { ...row }
}

const close = () => {
  editing.value = null
  error.value = null
}

const save = async () => {
  if (!editing.value) return
  saving.value = true
  error.value = null
  const payload: any = { ...editing.value }
  delete payload.id
  delete payload.created_at
  delete payload.updated_at

  const { error: e } = isNew.value
    ? await supabase.from('history_items').insert(payload)
    : await supabase.from('history_items').update(payload).eq('id', editing.value.id)

  saving.value = false
  if (e) error.value = e.message
  else { await load(); close() }
}

const remove = async (row: HistoryItem) => {
  if (!confirm(`"${row.year} ${row.title}" 항목을 삭제할까요?`)) return
  const { error: e } = await supabase.from('history_items').delete().eq('id', row.id)
  if (e) alert(e.message)
  else await load()
}
</script>

<template>
  <div>
    <AdminPageHeader
      title="연혁 관리"
      :subtitle="`표시: /history 페이지 시기별 타임라인 (Foundation/Innovation/Brand/Renewal) — 현재 총 ${items.length}개 항목`"
    >
      <template #actions>
        <button class="px-5 py-2.5 text-sm bg-ink-dark text-white hover:bg-accent-bronze transition" @click="openNew">
          + 연혁 추가
        </button>
      </template>
    </AdminPageHeader>

    <AdminListTable
      :columns="[
        { key: 'sort_order', label: '순서', width: '80px', align: 'center' },
        { key: 'year', label: '연월', width: '140px' },
        { key: 'title', label: '제목' },
        { key: 'description', label: '설명' },
      ]"
      :rows="items"
      empty-text="연혁이 비어있습니다. + 추가 버튼을 누르세요."
      @edit="openEdit"
      @remove="remove"
    />

    <AdminModal
      :open="!!editing"
      :title="isNew ? '연혁 추가' : '연혁 편집'"
      @close="close"
    >
      <div v-if="editing" class="space-y-5">
        <div class="grid grid-cols-3 gap-5">
          <AdminFormField label="연월" required hint="예: 2024.03">
            <AdminInputText v-model="editing.year" placeholder="2024.03" />
          </AdminFormField>
          <AdminFormField label="순서" required hint="작을수록 위쪽">
            <AdminInputText v-model="editing.sort_order" type="number" />
          </AdminFormField>
        </div>
        <AdminFormField label="제목" required>
          <AdminInputText v-model="editing.title" placeholder="예: 5라인 증설" />
        </AdminFormField>
        <AdminFormField label="설명 (선택)">
          <AdminInputTextarea v-model="editing.description" :rows="3" placeholder="간단한 부가 설명" />
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
