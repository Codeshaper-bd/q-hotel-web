<template>
  <!-- Thin copper rule + Cormorant heading + gray subtext — the text
       counterpart paired with a photo throughout the Featured Highlights
       mosaic. -->
  <div :class="['flex w-full flex-col justify-center gap-4 self-stretch bg-white p-4', basisClass]">
    <hr class="w-[2.875rem] border-t-2 border-copper">
    <div class="flex flex-col gap-2.5">
      <p class="font-display text-xl font-semibold text-ink">{{ title }}</p>
      <p class="text-sm text-ink/65">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  basisClass?: string
}>()
</script>
