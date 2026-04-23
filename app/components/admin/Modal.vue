<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title: string
  size?: 'sm' | 'md' | 'lg'
}>()

const emit = defineEmits<{
  close: []
}>()

watch(() => props.open, (v) => {
  if (typeof document !== 'undefined') {
    document.documentElement.style.overflow = v ? 'hidden' : ''
  }
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-200"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 overflow-y-auto"
      @click.self="emit('close')"
    >
      <div
        :class="[
          'bg-white shadow-xl w-full overflow-hidden flex flex-col my-8',
          size === 'sm' ? 'max-w-md' : size === 'lg' ? 'max-w-4xl' : 'max-w-2xl',
        ]"
      >
        <header class="flex items-center justify-between px-6 py-4 border-b border-paper-line">
          <h3 class="text-lg font-semibold text-ink-dark">{{ title }}</h3>
          <button class="text-ink-dark-muted hover:text-ink-dark text-2xl leading-none" @click="emit('close')">
            ×
          </button>
        </header>
        <div class="px-6 py-6 overflow-y-auto flex-1">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="px-6 py-4 border-t border-paper-line flex justify-end gap-2">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Transition>
</template>
