<!--
  Two-column details grid for dining/venue information.
  Each block shows an icon, uppercase label, and bullet-separated values.
  Responsive: stacks on mobile, 2 columns on md+.
-->
<template>
 
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
      <div
        v-for="item in items"
        :key="item.label"
        class="flex flex-col"
      >
        <div class="mb-3 flex items-center gap-2">
          <component
            :is="item.icon"
            v-bind="item.iconProps"
            class="h-5 w-5 text-ink/60"
          />
          <span class="text-base text-[#0F0F10] uppercase">
            {{ item.label }}
          </span>
        </div>
        <p class="flex flex-wrap items-center gap-2 text-sm text-[#373737]">
          <template v-for="(value, index) in item.values" :key="value">
            <span>{{ value }}</span>
            <span v-if="index < item.values.length - 1" aria-hidden="true">•</span>
          </template>
        </p>
      </div>
    </div>

</template>

<script setup lang="ts">
import type { Component } from 'vue'

type DetailItem = {
  label: string
  values: string[]
  icon: Component
  iconProps?: Record<string, unknown>
}

defineProps<{
  items: DetailItem[]
}>()
</script>
