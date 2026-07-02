<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :sizes="sizes"
    :loading="loading"
    :preload="priority"
    :fetchpriority="priority ? 'high' : 'auto'"
    :class="imageClass"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt: string
  width: number
  height: number
  sizes?: string
  priority?: boolean
  fit?: 'cover' | 'contain'
}>(), {
  sizes: 'xs:100vw sm:640px md:768px lg:1024px',
  priority: false,
  fit: 'cover'
})

const loading = computed(() => props.priority ? 'eager' : 'lazy')
const imageClass = computed(() => [
  'h-full w-full',
  props.fit === 'cover' ? 'object-cover' : 'object-contain'
])
</script>
