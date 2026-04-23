<script setup lang="ts">
defineProps<{
  saving?: boolean
  message?: string | null            // 성공 메시지
  error?: string | null
}>()

defineEmits<{
  save: []
  cancel: []
}>()
</script>

<template>
  <div class="sticky bottom-0 -mx-10 mt-10 px-10 py-4 bg-white border-t border-paper-line flex items-center justify-between">
    <div class="text-sm">
      <span v-if="error" class="text-red-500">⚠ {{ error }}</span>
      <span v-else-if="message" class="text-accent-eco">✓ {{ message }}</span>
      <span v-else class="text-ink-dark-muted">변경사항을 저장하세요.</span>
    </div>
    <div class="flex gap-2">
      <button
        type="button" class="px-4 py-2 text-sm text-ink-dark-muted hover:text-ink-dark"
        @click="$emit('cancel')"
      >
        취소
      </button>
      <button
        type="button" :disabled="saving"
        class="px-6 py-2 text-sm bg-ink-dark text-white hover:bg-accent-bronze transition disabled:opacity-50"
        @click="$emit('save')"
      >
        {{ saving ? '저장 중...' : '저장' }}
      </button>
    </div>
  </div>
</template>
