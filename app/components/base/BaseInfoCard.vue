<!--
  Three-column info card with icon, uppercase label, and value.
  Used on dining/venue pages for contact, hours, dress code, etc.
  Responsive: stacks on mobile, three columns on md+.
-->
<template>
  <div class="bg-[#FCF8F0] p-6 sm:p-8">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
      <div
        v-for="item in items"
        :key="item.label"
        class="flex flex-col items-center text-center"
      >
        <component
          :is="item.icon"
          class="mb-3 h-6 w-6 text-ink/70"
        />
        <span class="mb-1.5 text-sm font-medium uppercase  text-[#505155]">
          {{ item.label }}
        </span>
        <div class="text-sm font-medium text-[#0F0F10]">
          <template v-if="item.lines">
            <p v-for="(line, i) in item.lines" :key="i">
              {{ line }}
            </p>
          </template>
          <template v-else>
            {{ item.value }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

type InfoItem = {
  label: string
  value?: string
  lines?: string[]
  icon: Component
}

defineProps<{
  items: InfoItem[]
}>()
</script>
