<template>
  <!-- Fixed-aspect photo tile for the benefits bento grid; `aspectClass`
       reserves the frame so the grid never shifts while the image loads. -->
  <div :class="['relative isolate overflow-hidden bg-line/40', aspectClass]">
    <BaseImage
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :sizes="sizes"
      class="absolute inset-0 h-full w-full object-cover"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  width: number
  height: number
  sizes: string
  aspectClass: string
}>()
</script>
