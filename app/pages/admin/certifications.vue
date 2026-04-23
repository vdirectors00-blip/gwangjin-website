<script setup lang="ts">
import type { Certification } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '인증·특허 관리' })

const supabase = useSupabaseClient()

const items = ref<Certification[]>([])
const filter = ref<'all' | 'certification' | 'patent'>('all')
const loading = ref(true)

const editing = ref<Partial<Certification> | null>(null)
const isNew = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

const filteredItems = computed(() => {
  if (filter.value === 'all') return items.value
  return items.value.filter(i => i.category === filter.value)
})

const load = async () => {
  loading.value = true
  const { data } = await supabase.from('certifications').select('*').order('sort_order')
  items.value = (data ?? []) as Certification[]
  loading.value = false
}
await load()

const openNew = () => {
  isNew.value = true
  editing.value = {
    cert_type: '',
    name: '',
    cert_number: '',
    issued_at: '',
    description: '',
    image_url: '',
    category: filter.value === 'patent' ? 'patent' : 'certification',
    sort_order: Math.max(0, ...items.value.map(i => i.sort_order)) + 1,
  }
}

const openEdit = (row: Certification) => {
  isNew.value = false
  editing.value = { ...row }
}

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
    ? await supabase.from('certifications').insert(payload)
    : await supabase.from('certifications').update(payload).eq('id', editing.value.id)

  saving.value = false
  if (e) error.value = e.message
  else { await load(); close() }
}

const remove = async (row: Certification) => {
  if (!confirm(`"${row.name}" 항목을 삭제할까요?`)) return
  const { error: e } = await supabase.from('certifications').delete().eq('id', row.id)
  if (e) alert(e.message)
  else await load()
}
</script>

<template>
  <div>
    <AdminPageHeader title="인증·특허 관리" :subtitle="`인증 ${items.filter(i => i.category === 'certification').length}건 · 특허 ${items.filter(i => i.category === 'patent').length}건`">
      <template #actions>
        <button class="px-5 py-2.5 text-sm bg-ink-dark text-white hover:bg-accent-bronze transition" @click="openNew">
          + 추가
        </button>
      </template>
    </AdminPageHeader>

    <!-- 필터 탭 -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="f in [
          { key: 'all', label: '전체' },
          { key: 'certification', label: '인증' },
          { key: 'patent', label: '특허' },
        ]" :key="f.key"
        :class="[
          'px-4 py-2 text-sm border transition',
          filter === f.key ? 'bg-ink-dark text-white border-ink-dark' : 'bg-white text-ink-dark border-paper-line hover:border-ink-dark',
        ]"
        @click="filter = f.key as any"
      >
        {{ f.label }}
      </button>
    </div>

    <AdminListTable
      :columns="[
        { key: 'sort_order', label: '순서', width: '70px', align: 'center' },
        { key: 'category', label: '구분', width: '100px' },
        { key: 'cert_type', label: '종류' },
        { key: 'name', label: '명칭' },
        { key: 'cert_number', label: '번호' },
      ]"
      :rows="filteredItems"
      empty-text="등록된 항목이 없습니다."
      @edit="openEdit"
      @remove="remove"
    >
      <template #cell-category="{ value }">
        <span :class="['text-xs px-2 py-0.5', value === 'patent' ? 'bg-accent-eco/15 text-accent-eco' : 'bg-accent-bronze/15 text-accent-bronze']">
          {{ value === 'patent' ? '특허' : '인증' }}
        </span>
      </template>
    </AdminListTable>

    <AdminModal
      :open="!!editing"
      :title="isNew ? '항목 추가' : '항목 편집'"
      size="lg"
      @close="close"
    >
      <div v-if="editing" class="space-y-5">
        <div class="grid grid-cols-2 gap-5">
          <AdminFormField label="구분" required>
            <select v-model="editing.category" class="w-full bg-white border border-paper-line px-4 py-2.5 text-ink-dark focus:border-ink-dark outline-none">
              <option value="certification">인증 (ISO 등)</option>
              <option value="patent">특허</option>
            </select>
          </AdminFormField>
          <AdminFormField label="순서" required>
            <AdminInputText v-model="editing.sort_order" type="number" />
          </AdminFormField>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <AdminFormField label="종류" required hint="예: ISO 9001, 특허">
            <AdminInputText v-model="editing.cert_type" placeholder="ISO 9001" />
          </AdminFormField>
          <AdminFormField label="등록일" hint="예: 2024.03">
            <AdminInputText v-model="editing.issued_at" placeholder="2024.03" />
          </AdminFormField>
        </div>
        <AdminFormField label="명칭" required>
          <AdminInputText v-model="editing.name" placeholder="품질경영시스템 인증" />
        </AdminFormField>
        <AdminFormField label="번호 (선택)">
          <AdminInputText v-model="editing.cert_number" placeholder="제10-1138980호" />
        </AdminFormField>
        <AdminFormField label="설명 (선택)">
          <AdminInputTextarea v-model="editing.description" :rows="3" />
        </AdminFormField>
        <AdminFormField label="인증서 이미지 (선택)">
          <AdminImageUploader v-model="editing.image_url" folder="certifications" />
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
