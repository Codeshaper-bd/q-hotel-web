<template>
  <div :class="containerClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}>(), {
  size: 'lg'
})

const sizeClasses: Record<NonNullable<typeof props.size>, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-none'
}

const containerClass = computed(() => [
  'mx-auto w-full px-5 sm:px-6 lg:px-8',
  sizeClasses[props.size]
])
</script>
