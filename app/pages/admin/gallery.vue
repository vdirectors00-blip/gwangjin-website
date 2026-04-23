<script setup lang="ts">
import type { FactoryImage } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '공장 갤러리 관리' })

const supabase = useSupabaseClient()
const { remove: removeFile } = useStorage()

const items = ref<FactoryImage[]>([])
const editing = ref<Partial<FactoryImage> | null>(null)
const isNew = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

const load = async () => {
  const { data } = await supabase.from('factory_gallery').select('*').order('sort_order')
  items.value = (data ?? []) as FactoryImage[]
}
await load()

const openNew = () => {
  isNew.value = true
  editing.value = {
    image_url: '',
    caption: '',
    sort_order: Math.max(0, ...items.value.map(i => i.sort_order)) + 1,
  }
}
const openEdit = (row: FactoryImage) => { isNew.value = false; editing.value = { ...row } }
const close = () => { editing.value = null; error.value = null }

const save = async () => {
  if (!editing.value) return
  if (!editing.value.image_url) {
    error.value = '이미지를 업로드하세요.'
    return
  }
  saving.value = true
  error.value = null
  const payload: any = { ...editing.value }
  delete payload.id
  delete payload.created_at

  const { error: e } = isNew.value
    ? await supabase.from('factory_gallery').insert(payload)
    : await supabase.from('factory_gallery').update(payload).eq('id', editing.value.id)
  saving.value = false
  if (e) error.value = e.message
  else { await load(); close() }
}

const remove = async (row: FactoryImage) => {
  if (!confirm('이 사진을 삭제할까요? (스토리지에서도 삭제됩니다)')) return
  try { await removeFile(row.image_url, 'images') } catch {}
  const { error: e } = await supabase.from('factory_gallery').delete().eq('id', row.id)
  if (e) alert(e.message)
  else await load()
}
</script>

<template>
  <div>
    <AdminPageHeader title="공장 갤러리 관리" :subtitle="`총 ${items.length}장`">
      <template #actions>
        <button class="px-5 py-2.5 text-sm bg-ink-dark text-white hover:bg-accent-bronze transition" @click="openNew">
          + 사진 추가
        </button>
      </template>
    </AdminPageHeader>

    <div v-if="items.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div
        v-for="g in items" :key="g.id"
        class="bg-white border border-paper-line group relative"
      >
        <div class="aspect-[4/3] overflow-hidden bg-paper-soft">
          <img :src="g.image_url" alt="" class="w-full h-full object-cover">
        </div>
        <div class="p-3">
          <p class="text-ink-dark text-sm truncate">{{ g.caption || `#${g.sort_order}` }}</p>
          <div class="mt-2 flex justify-between text-xs">
            <button class="text-ink-dark hover:text-accent-bronze" @click="openEdit(g)">편집</button>
            <button class="text-red-500 hover:text-red-700" @click="remove(g)">삭제</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="py-32 text-center text-ink-dark-muted bg-white border border-paper-line">
      갤러리가 비어있습니다. + 사진 추가 버튼을 눌러 등록하세요.
    </p>

    <AdminModal :open="!!editing" :title="isNew ? '사진 추가' : '사진 편집'" @close="close">
      <div v-if="editing" class="space-y-5">
        <AdminFormField label="이미지" required>
          <AdminImageUploader v-model="editing.image_url" folder="gallery" />
        </AdminFormField>
        <div class="grid grid-cols-2 gap-5">
          <AdminFormField label="순서">
            <AdminInputText v-model="editing.sort_order" type="number" />
          </AdminFormField>
          <AdminFormField label="캡션 (선택)" hint="이미지 alt 텍스트">
            <AdminInputText v-model="editing.caption" placeholder="카드기 작업 모습" />
          </AdminFormField>
        </div>
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
