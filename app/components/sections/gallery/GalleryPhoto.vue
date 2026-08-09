<template>
  <!-- Fixed-aspect photo tile for the Featured Highlights mosaic; the wrapper
       carries the aspect ratio and flex sizing so BaseImage can fill it. -->
  <div :class="['overflow-hidden bg-line/40', aspectClass, basisClass]">
    <BaseImage
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      sizes="xs:100vw sm:50vw lg:20vw"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  width: number
  height: number
  aspectClass: string
  basisClass?: string
}>()
</script>
