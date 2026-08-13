<!-- Clock icon -->
<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.9993 29.3327C23.3631 29.3327 29.3327 23.3631 29.3327 15.9993C29.3327 8.63555 23.3631 2.66602 15.9993 2.66602C8.63555 2.66602 2.66602 8.63555 2.66602 15.9993C2.66602 23.3631 8.63555 29.3327 15.9993 29.3327Z"
      :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16 8V16L21.3333 18.6667" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#505155'
})
</script>