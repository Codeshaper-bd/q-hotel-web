<template>
  <!-- Reusable section title: a display h2 in the project's serif face, used
       for centered editorial headings. Its words rise in on scroll, like the hero
       headline (useWordReveal). The design lives in the component default;
       titleClass only tweaks (merged over) it. -->
  <h2 :id="id" ref="titleRef" :class="[titleBase, titleClass]">
    <slot />
  </h2>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  id?: string
  /** Extra Tailwind classes merged over the built-in design. */
  titleClass?: string
}>(), {
  titleClass: "",
})

const titleRef = ref<HTMLElement | null>(null)
useWordReveal(titleRef)

const titleBase =
  "font-display text-center text-4xl font-medium leading-tight text-ink  sm:text-5xl lg:text-[56px]"
</script>