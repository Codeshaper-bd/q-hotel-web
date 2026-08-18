<template>
  <!-- Reusable section title: a display h2 in the project's serif face, used
       for centered editorial headings. Carries data-reveal-item so FadeReveal
       staggers it with its neighbors. The design lives in the component
       default; titleClass only tweaks (merged over) it. -->
  <h2 :id="id" data-reveal-item :class="[titleBase, titleClass]">
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

const titleBase =
  "mt-10 font-display text-4xl font-medium leading-tight text-ink sm:mt-12 sm:text-5xl lg:text-[56px]"
</script>