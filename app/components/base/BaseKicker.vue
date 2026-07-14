<template>
  <!-- Section eyebrow chip: the brand mark beside a tracked uppercase label,
       used to introduce sections ("Who We Are", "Select Your Room") -->
  <span :class="kickerClass">
    <!-- Mark sits in its own cell, divided from the label by a hairline -->
    <span class="flex items-center px-4 py-2.5">
      <svg :class="['h-5 w-5 shrink-0', tone === 'ink' ? 'text-champagne' : 'text-ink']" viewBox="0 0 51 50" aria-hidden="true" focusable="false">
        <path
          v-for="(markPath, index) in qHotelLogoPaths"
          :key="index"
          :d="markPath"
          fill="currentColor"
        />
      </svg>
    </span>
    <span
      :class="[
        'flex items-center border-l px-5 py-2.5 text-sm font-medium uppercase leading-5',
        tone === 'ink' ? 'border-paper/20 text-paper' : 'border-line text-ink',
      ]"
    >
      <slot />
    </span>
  </span>
</template>

<script setup lang="ts">
/** `paper` sits on light sections; `ink` sits on dark (ink/night) sections */
const props = withDefaults(defineProps<{
  tone?: 'paper' | 'ink'
}>(), {
  tone: 'paper'
})

const kickerClass = computed(() => [
  'inline-flex items-stretch border',
  props.tone === 'ink' ? 'border-paper/20 bg-paper/5' : 'border-line bg-paper'
])
</script>
