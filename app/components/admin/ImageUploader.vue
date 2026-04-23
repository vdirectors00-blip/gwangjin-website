<script setup lang="ts">
const props = defineProps<{
  modelValue: string | null | undefined
  folder?: string                      // storage 폴더 (예: 'products', 'gallery')
  bucket?: 'images' | 'videos'         // 기본 'images'
  accept?: string                      // 기본 'image/*'
}>()

const emit = defineEmits<{
  'update:modelValue': [string | null]
}>()

const { upload, remove } = useStorage()

const uploading = ref(false)
const error = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const onFile = async (e: Event) => {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  error.value = null
  uploading.value = true
  try {
    const { url } = await upload(f, props.bucket || 'images', props.folder || '')
    emit('update:modelValue', url)
  } catch (e: any) {
    error.value = e?.message || '업로드 실패'
  } finally {
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

const onRemove = async () => {
  if (!props.modelValue) return
  if (!confirm('이미지를 삭제할까요?')) return
  try {
    await remove(props.modelValue, props.bucket || 'images')
  } catch (e) {
    // storage에 없어도 모델값은 비우기
  }
  emit('update:modelValue', null)
}
</script>

<template>
  <div class="space-y-3">
    <!-- 미리보기 -->
    <div
      v-if="modelValue"
      class="relative w-48 aspect-[4/3] bg-paper-soft border border-paper-line overflow-hidden group"
    >
      <video
        v-if="bucket === 'videos'"
        :src="modelValue" muted loop autoplay playsinline
        class="w-full h-full object-cover"
      />
      <img
        v-else
        :src="modelValue" alt="preview"
        class="w-full h-full object-cover"
      >
      <button
        type="button"
        class="absolute top-2 right-2 bg-white/90 text-ink-dark text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition"
        @click="onRemove"
      >
        삭제
      </button>
    </div>

    <!-- 업로드 버튼 -->
    <label class="inline-flex items-center gap-2 cursor-pointer">
      <input
        ref="fileInput"
        type="file"
        :accept="accept || (bucket === 'videos' ? 'video/*' : 'image/*')"
        :disabled="uploading"
        class="sr-only"
        @change="onFile"
      >
      <span class="inline-flex items-center px-4 py-2 text-sm bg-ink-dark text-white hover:bg-accent-bronze transition">
        {{ uploading ? '업로드 중...' : (modelValue ? '교체' : '+ 파일 선택') }}
      </span>
      <span v-if="bucket === 'videos'" class="text-xs text-ink-dark-muted">최대 50MB · MP4/WebM</span>
      <span v-else class="text-xs text-ink-dark-muted">최대 10MB · JPG/PNG/WebP</span>
    </label>

    <p v-if="error" class="text-red-500 text-xs">{{ error }}</p>
  </div>
</template>
