<script setup lang="ts">
import type { Product, SpecRow } from '~/types/database.types'
import { PRODUCT_TRAITS } from '~/types/database.types'

definePageMeta({ layout: 'admin', middleware: 'auth' })
useHead({ title: '제품 관리' })

const supabase = useSupabaseClient()

const items = ref<Product[]>([])
const editing = ref<Partial<Product> | null>(null)
const isNew = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

const useTagsText = ref('')   // 콤마 구분 입력용

const load = async () => {
  const { data } = await supabase.from('products').select('*').order('sort_order')
  items.value = (data ?? []) as Product[]
}
await load()

const openNew = () => {
  isNew.value = true
  editing.value = {
    slug: '',
    name: '',
    korean_name: '',
    short_desc: '',
    long_desc: '',
    image_url: '',
    spec_table: [],
    use_tags: [],
    sort_order: Math.max(0, ...items.value.map(i => i.sort_order)) + 1,
    is_highlight: false,
    is_published: true,
    trait_lightweight: false,
    trait_warmth: false,
    trait_down_alt: false,
    trait_eco: false,
    trait_hypoallergenic: false,
    trait_washable: false,
    trait_resilient: false,
    trait_breathable: false,
  }
  useTagsText.value = ''
}

const openEdit = (row: Product) => {
  isNew.value = false
  editing.value = { ...row, spec_table: [...(row.spec_table || [])] }
  useTagsText.value = (row.use_tags || []).join(', ')
}

const close = () => { editing.value = null; error.value = null; useTagsText.value = '' }

// 스펙 테이블 행 추가/삭제
const addSpecRow = () => {
  if (!editing.value) return
  if (!editing.value.spec_table) editing.value.spec_table = []
  editing.value.spec_table.push({ label: '', value: '' })
}
const removeSpecRow = (i: number) => {
  if (!editing.value?.spec_table) return
  editing.value.spec_table.splice(i, 1)
}

const save = async () => {
  if (!editing.value) return
  saving.value = true
  error.value = null

  // use_tags 콤마 분리
  const tags = useTagsText.value
    .split(',').map(t => t.trim()).filter(Boolean)

  const payload: any = {
    ...editing.value,
    use_tags: tags,
  }
  delete payload.id
  delete payload.created_at
  delete payload.updated_at

  const { error: e } = isNew.value
    ? await supabase.from('products').insert(payload)
    : await supabase.from('products').update(payload).eq('id', editing.value.id)

  saving.value = false
  if (e) error.value = e.message
  else { await load(); close() }
}

const remove = async (row: Product) => {
  if (!confirm(`"${row.name}" 제품을 삭제할까요?`)) return
  const { error: e } = await supabase.from('products').delete().eq('id', row.id)
  if (e) alert(e.message)
  else await load()
}
</script>

<template>
  <div>
    <AdminPageHeader title="제품 관리" :subtitle="`총 ${items.length}개 (하이라이트 ${items.filter(i => i.is_highlight).length}개)`">
      <template #actions>
        <button class="px-5 py-2.5 text-sm bg-ink-dark text-white hover:bg-accent-bronze transition" @click="openNew">
          + 제품 추가
        </button>
      </template>
    </AdminPageHeader>

    <AdminListTable
      :columns="[
        { key: 'sort_order', label: '순서', width: '70px', align: 'center' },
        { key: 'slug', label: 'Slug', width: '120px' },
        { key: 'name', label: '제품명' },
        { key: 'korean_name', label: '한글명' },
        { key: 'is_highlight', label: '하이라이트', width: '100px', align: 'center' },
        { key: 'is_published', label: '공개', width: '80px', align: 'center' },
      ]"
      :rows="items"
      empty-text="제품이 없습니다."
      @edit="openEdit"
      @remove="remove"
    >
      <template #cell-is_highlight="{ value }">
        <span :class="value ? 'text-accent-bronze' : 'text-ink-dark-faint'">{{ value ? '★' : '·' }}</span>
      </template>
      <template #cell-is_published="{ value }">
        <span :class="value ? 'text-accent-eco' : 'text-red-400'">{{ value ? '●' : '×' }}</span>
      </template>
    </AdminListTable>

    <AdminModal :open="!!editing" :title="isNew ? '제품 추가' : '제품 편집'" size="lg" @close="close">
      <div v-if="editing" class="space-y-6">
        <!-- 기본 정보 -->
        <div>
          <h4 class="text-sm font-semibold text-ink-dark-muted uppercase tracking-wider mb-4">기본 정보</h4>
          <div class="grid grid-cols-2 gap-5">
            <AdminFormField label="Slug" required hint="URL용 영문 (예: ft, tencel)">
              <AdminInputText v-model="editing.slug" placeholder="ft" />
            </AdminFormField>
            <AdminFormField label="순서">
              <AdminInputText v-model="editing.sort_order" type="number" />
            </AdminFormField>
          </div>
          <div class="grid grid-cols-2 gap-5 mt-5">
            <AdminFormField label="제품명 (메인)" required>
              <AdminInputText v-model="editing.name" placeholder="F/T" />
            </AdminFormField>
            <AdminFormField label="제품명 (한글/부제)">
              <AdminInputText v-model="editing.korean_name" placeholder="Feather Touch · 깃털감" />
            </AdminFormField>
          </div>
          <AdminFormField label="짧은 설명 (1줄)" class="mt-5">
            <AdminInputText v-model="editing.short_desc" placeholder="새의 깃털 느낌. 실리콘 처리한 Conjugate 섬유" />
          </AdminFormField>
          <AdminFormField label="상세 설명" class="mt-5" hint="여러 단락 가능">
            <AdminInputTextarea v-model="editing.long_desc" :rows="6" />
          </AdminFormField>
        </div>

        <!-- 이미지 -->
        <div>
          <h4 class="text-sm font-semibold text-ink-dark-muted uppercase tracking-wider mb-4">이미지</h4>
          <AdminFormField label="대표 이미지">
            <AdminImageUploader v-model="editing.image_url" folder="products" />
          </AdminFormField>
        </div>

        <!-- 사용 태그 -->
        <div>
          <h4 class="text-sm font-semibold text-ink-dark-muted uppercase tracking-wider mb-4">사용 태그</h4>
          <AdminFormField label="태그 (쉼표 구분)" hint="예: 이불솜, 패딩, 베개">
            <AdminInputText v-model="useTagsText" placeholder="이불솜, 패딩, 베개" />
          </AdminFormField>
        </div>

        <!-- 특성 매트릭스 -->
        <div>
          <h4 class="text-sm font-semibold text-ink-dark-muted uppercase tracking-wider mb-4">특성 매트릭스</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 bg-paper-soft p-5">
            <AdminInputCheckbox
              v-for="t in PRODUCT_TRAITS" :key="t.key"
              v-model="editing[t.key]"
              :label="t.label"
            />
          </div>
        </div>

        <!-- 스펙 표 -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-sm font-semibold text-ink-dark-muted uppercase tracking-wider">스펙 표 (선택)</h4>
            <button class="text-xs text-ink-dark hover:text-accent-bronze" @click="addSpecRow">+ 행 추가</button>
          </div>
          <div v-if="editing.spec_table && editing.spec_table.length > 0" class="space-y-2">
            <div v-for="(row, i) in editing.spec_table" :key="i" class="grid grid-cols-12 gap-2 items-center">
              <div class="col-span-4">
                <AdminInputText v-model="row.label" placeholder="항목 (예: 데니어)" />
              </div>
              <div class="col-span-7">
                <AdminInputText v-model="row.value" placeholder="값 (예: 1.5d)" />
              </div>
              <button class="col-span-1 text-red-500 hover:text-red-700 text-sm" @click="removeSpecRow(i)">×</button>
            </div>
          </div>
          <p v-else class="text-xs text-ink-dark-muted">행이 없습니다. + 행 추가 버튼으로 추가.</p>
        </div>

        <!-- 게시 설정 -->
        <div>
          <h4 class="text-sm font-semibold text-ink-dark-muted uppercase tracking-wider mb-4">게시 설정</h4>
          <div class="space-y-3">
            <AdminInputCheckbox v-model="editing.is_highlight" label="홈 페이지 하이라이트 카드에 노출 (3개 권장)" />
            <AdminInputCheckbox v-model="editing.is_published" label="공개 (체크 해제 시 사이트에서 숨김)" />
          </div>
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
