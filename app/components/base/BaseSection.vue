<template>
  <section :id="id" :aria-labelledby="labelledBy" :class="sectionClass">
    <BaseContainer :size="containerSize">
      <slot />
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  id?: string
  labelledBy?: string
  tone?: 'paper' | 'ink' | 'moss'
  spacing?: 'sm' | 'md' | 'lg'
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}>(), {
  tone: 'paper',
  spacing: 'lg',
  containerSize: 'lg'
})

const toneClasses: Record<NonNullable<typeof props.tone>, string> = {
  paper: 'bg-paper text-ink',
  ink: 'bg-ink text-paper',
  moss: 'bg-moss text-paper'
}

const spacingClasses: Record<NonNullable<typeof props.spacing>, string> = {
  sm: 'py-14 sm:py-16',
  md: 'py-20 sm:py-24',
  lg: 'py-24 sm:py-32'
}

const sectionClass = computed(() => [
  toneClasses[props.tone],
  spacingClasses[props.spacing]
])
</script>
