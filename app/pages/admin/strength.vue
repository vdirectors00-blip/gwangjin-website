<script setup lang="ts">
import type { StrengthSection } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: 'Strength 섹션 관리' })

const supabase = useSupabaseClient()

const items = ref<StrengthSection[]>([])
const editing = ref<Partial<StrengthSection> | null>(null)
const isNew = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

const load = async () => {
  const { data } = await supabase.from('strength_sections').select('*').order('sort_order')
  items.value = (data ?? []) as StrengthSection[]
}
await load()

const openNew = () => {
  isNew.value = true
  editing.value = {
    slug: '',
    title: '',
    badge: '',
    description: '',
    image_url: '',
    accent_color: '#8B7355',
    layout_dir: 'left',
    sort_order: Math.max(0, ...items.value.map(i => i.sort_order)) + 1,
  }
}
const openEdit = (row: StrengthSection) => { isNew.value = false; editing.value = { ...row } }
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
    ? await supabase.from('strength_sections').insert(payload)
    : await supabase.from('strength_sections').update(payload).eq('id', editing.value.id)
  saving.value = false
  if (e) error.value = e.message
  else { await load(); close() }
}

const remove = async (row: StrengthSection) => {
  if (!confirm(`"${row.title}" 섹션을 삭제할까요?`)) return
  const { error: e } = await supabase.from('strength_sections').delete().eq('id', row.id)
  if (e) alert(e.message)
  else await load()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Strength 섹션 관리" subtitle="강점 섹션 (사용 안 할 시 비워두기)">
      <template #actions>
        <button class="px-5 py-2.5 text-sm bg-ink-dark text-white hover:bg-accent-bronze transition" @click="openNew">
          + 섹션 추가
        </button>
      </template>
    </AdminPageHeader>

    <p class="text-ink-dark-muted text-sm mb-6">
      현재 사이트는 인증·특허를 별도 페이지로 강조하므로 이 섹션은 비워둬도 됩니다. 추가 강점 콘텐츠가 생기면 여기에 등록하세요.
    </p>

    <AdminListTable
      :columns="[
        { key: 'sort_order', label: '순서', width: '70px', align: 'center' },
        { key: 'slug', label: 'Slug', width: '120px' },
        { key: 'badge', label: '배지' },
        { key: 'title', label: '제목' },
      ]"
      :rows="items"
      empty-text="등록된 섹션이 없습니다."
      @edit="openEdit"
      @remove="remove"
    />

    <AdminModal :open="!!editing" :title="isNew ? '섹션 추가' : '섹션 편집'" size="lg" @close="close">
      <div v-if="editing" class="space-y-5">
        <div class="grid grid-cols-2 gap-5">
          <AdminFormField label="Slug" required hint="URL 식별자, 영문">
            <AdminInputText v-model="editing.slug" placeholder="oekotex" />
          </AdminFormField>
          <AdminFormField label="순서" required>
            <AdminInputText v-model="editing.sort_order" type="number" />
          </AdminFormField>
        </div>
        <div class="grid grid-cols-2 gap-5">
          <AdminFormField label="배지 텍스트">
            <AdminInputText v-model="editing.badge" placeholder="OEKO-TEX Standard 100" />
          </AdminFormField>
          <AdminFormField label="포인트 컬러" hint="hex 코드">
            <AdminInputText v-model="editing.accent_color" placeholder="#8B7355" />
          </AdminFormField>
        </div>
        <AdminFormField label="제목" required hint="줄바꿈은 \n 사용">
          <AdminInputText v-model="editing.title" placeholder="유해물질 없는\n안전한 원단" />
        </AdminFormField>
        <AdminFormField label="설명">
          <AdminInputTextarea v-model="editing.description" :rows="4" />
        </AdminFormField>
        <AdminFormField label="이미지 위치">
          <select v-model="editing.layout_dir" class="w-full bg-white border border-paper-line px-4 py-2.5 text-ink-dark focus:border-ink-dark outline-none">
            <option value="left">왼쪽 (이미지) | 오른쪽 (텍스트)</option>
            <option value="right">오른쪽 (이미지) | 왼쪽 (텍스트)</option>
          </select>
        </AdminFormField>
        <AdminFormField label="이미지">
          <AdminImageUploader v-model="editing.image_url" folder="strength" />
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
