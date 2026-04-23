<script setup lang="ts">
type Column = {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

defineProps<{
  columns: Column[]
  rows: Record<string, any>[]
  emptyText?: string
}>()

defineEmits<{
  edit: [row: Record<string, any>]
  remove: [row: Record<string, any>]
}>()
</script>

<template>
  <div class="bg-white border border-paper-line">
    <table class="w-full text-sm">
      <thead class="bg-paper-soft border-b border-paper-line">
        <tr>
          <th
            v-for="c in columns" :key="c.key"
            :style="c.width ? `width:${c.width}` : ''"
            :class="['text-ink-dark font-medium px-4 py-3', `text-${c.align || 'left'}`]"
          >
            {{ c.label }}
          </th>
          <th class="px-4 py-3 text-right w-32">관리</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="rows.length === 0">
          <td :colspan="columns.length + 1" class="px-4 py-12 text-center text-ink-dark-muted">
            {{ emptyText || '데이터가 없습니다.' }}
          </td>
        </tr>
        <tr
          v-for="row in rows" :key="row.id"
          class="border-t border-paper-line hover:bg-paper-soft"
        >
          <td
            v-for="c in columns" :key="c.key"
            :class="['px-4 py-3 text-ink-dark', `text-${c.align || 'left'}`]"
          >
            <slot :name="`cell-${c.key}`" :row="row" :value="row[c.key]">
              {{ row[c.key] }}
            </slot>
          </td>
          <td class="px-4 py-3 text-right space-x-2">
            <button
              class="text-xs text-ink-dark hover:text-accent-bronze"
              @click="$emit('edit', row)"
            >
              편집
            </button>
            <button
              class="text-xs text-red-500 hover:text-red-700"
              @click="$emit('remove', row)"
            >
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
