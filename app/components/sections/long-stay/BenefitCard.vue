<template>
  <!-- Icon-badge + heading row, paragraph below indented to the heading —
       used for the four utility cards in the long-stay benefits bento grid.
       `shade` alternates the two warm-cream surfaces the design pairs a card
       with its icon badge (each card uses the opposite tone for its badge). -->
  <div :class="['flex flex-col gap-4 p-6', shade === 'sand' ? 'bg-sand' : 'bg-cream']">
    <div class="flex items-center gap-3">
      <span :class="['flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-copper', shade === 'sand' ? 'bg-cream' : 'bg-sand']" aria-hidden="true">
        <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path v-for="(iconPath, index) in iconPaths" :key="index" :d="iconPath" />
        </svg>
      </span>
      <h3 class="font-display text-2xl font-semibold text-ink">{{ title }}</h3>
    </div>
    <p class="pl-[4.25rem] text-sm leading-5 text-ink/70">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description: string
  iconPaths: string[]
  shade?: 'cream' | 'sand'
}>(), {
  shade: 'cream',
})
</script>
