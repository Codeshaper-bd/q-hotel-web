<!-- Banquet capacity icon (champagne coupe toast) -->
<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 17.333C16 17.333 20.3333 13.333 20.3333 9.333C20.3333 6.939 18.394 5 16 5C13.606 5 11.6667 6.939 11.6667 9.333C11.6667 13.333 16 17.333 16 17.333Z" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16 17.333V25" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.333 25H20.667" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8 5.333L8.833 7L10.5 7.833L8.833 8.667L8 10.333L7.167 8.667L5.5 7.833L7.167 7L8 5.333Z" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M23 9.333L23.667 10.667L25 11.333L23.667 12L23 13.333L22.333 12L21 11.333L22.333 10.667L23 9.333Z" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#505155'
})
</script>
