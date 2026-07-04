<template>
  <!-- Section eyebrow chip: the brand mark beside a tracked uppercase label,
       used to introduce sections ("Who We Are", "Select Your Room") -->
  <span :class="kickerClass">
    <svg :class="['h-3.5 w-3.5 shrink-0', tone === 'ink' ? 'text-champagne' : 'text-copper']" viewBox="0 0 51 50" aria-hidden="true" focusable="false">
      <path
        v-for="(markPath, index) in qHotelLogoPaths"
        :key="index"
        :d="markPath"
        fill="currentColor"
      />
    </svg>
    <span :class="['text-[0.6rem] font-semibold uppercase tracking-[0.24em]', tone === 'ink' ? 'text-paper/75' : 'text-ink/70']">
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
  'inline-flex items-center gap-2.5 border px-4 py-2',
  props.tone === 'ink' ? 'border-paper/20 bg-paper/5' : 'border-line bg-paper'
])
</script>
