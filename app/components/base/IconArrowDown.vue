<!-- Down arrow icon -->
<template>
  <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 0.5V11.1667M8.5 7.16667L4.5 11.1667L0.5 7.16667"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#0F0F10'
})
</script>