<template>
  <NuxtLink :to="to" class="group inline-flex items-center gap-2 text-sm font-medium">
    <span class="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-normal ease-premium group-hover:bg-[length:0_1px]">
      <slot />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  to: string
}>()
</script>
