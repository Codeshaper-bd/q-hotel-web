<!-- U-shape table capacity icon -->
<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.6738 20.0195L21.0038 27.3502L28.3338 20.0195" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M21.0027 27.3504V13.3191C21.0027 8.53172 17.122 4.65039 12.3347 4.65039C7.54602 4.65039 3.66602 8.53172 3.66602 13.3191V27.3504" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#505155'
})
</script>
