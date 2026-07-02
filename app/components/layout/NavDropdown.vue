<template>
  <div
    :id="id"
    role="region"
    :aria-label="`${label} submenu`"
    class="absolute left-0 top-full z-50 min-w-[200px] border border-paper/10 bg-ink py-2 shadow-xl"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <ul role="list">
      <li v-for="item in items" :key="item.href">
        <NuxtLink
          :to="item.href"
          class="flex items-center gap-3 px-5 py-2.5 text-sm text-paper/60 transition-colors duration-fast hover:bg-paper/5 hover:text-paper focus-visible:bg-paper/5 focus-visible:text-paper"
          @click="$emit('navigate')"
        >
          <span
            class="h-px w-1.5 shrink-0 bg-copper/50 transition-all duration-fast"
            aria-hidden="true"
          />
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { NavLink } from '~/types/navigation'

defineProps<{
  id: string
  label: string
  items: NavLink[]
}>()

defineEmits<{
  mouseenter: []
  mouseleave: []
  navigate: []
}>()
</script>
