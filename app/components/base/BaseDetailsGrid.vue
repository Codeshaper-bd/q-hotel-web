<!--
  Two-column details grid for dining/venue information.
  Each block shows an icon, uppercase label, and bullet-separated values.
  Responsive: stacks on mobile, 2 columns on md+.
-->
<template>
  <div class="rounded-md bg-cream p-6 sm:p-8">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
      <div
        v-for="item in items"
        :key="item.label"
        class="flex flex-col"
      >
        <div class="mb-3 flex items-center gap-2">
          <component
            :is="item.icon"
            class="h-5 w-5 text-ink/60"
          />
          <span class="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-ink/70">
            {{ item.label }}
          </span>
        </div>
        <p class="text-sm leading-relaxed text-ink/80">
          {{ item.values.join(' • ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

type DetailItem = {
  label: string
  values: string[]
  icon: Component
}

defineProps<{
  items: DetailItem[]
}>()
</script>
