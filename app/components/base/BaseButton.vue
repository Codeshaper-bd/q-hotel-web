<template>
  <component
    :is="href ? NuxtLink : 'button'"
    :to="href"
    :type="href ? undefined : type"
    :class="buttonClass"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'

const props = withDefaults(defineProps<{
  href?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
}>(), {
  type: 'button',
  variant: 'primary'
})

const variants: Record<NonNullable<typeof props.variant>, string> = {
  primary: 'bg-ink text-paper hover:bg-moss',
  secondary: 'bg-paper text-ink ring-1 ring-line hover:bg-ink hover:text-paper',
  ghost: 'bg-transparent text-ink ring-1 ring-line hover:border-ink',
  outline: 'bg-transparent text-paper ring-1 ring-paper/30 hover:bg-paper/10 hover:ring-paper/60',
}

const buttonClass = computed(() => [
  'inline-flex min-h-11 items-center justify-center rounded-sm px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-colors duration-normal ease-premium focus-visible:outline-ocean',
  variants[props.variant]
])
</script>
