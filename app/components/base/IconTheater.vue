<!-- Theater seating capacity icon -->
<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.66602 13.3327C2.66602 13.3327 6.66602 9.33268 6.66602 2.66602" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M29.334 13.3327C29.334 13.3327 25.334 9.33268 25.334 2.66602" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13.3327 2.66602C13.3327 8.53268 8.53268 13.3327 2.66602 13.3327" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.666 2.66602C18.666 8.53268 23.466 13.3327 29.3327 13.3327" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M2.66602 13.334C2.66602 13.334 5.33268 16.0007 5.33268 20.0007" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M29.3327 13.334C29.3327 13.334 26.666 16.0007 26.666 20.0007" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M10.666 20H21.3327" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M2.66602 29.334V28.0007C2.66602 27.2934 2.94697 26.6151 3.44706 26.115C3.94716 25.6149 4.62544 25.334 5.33268 25.334H10.666C11.3733 25.334 12.0515 25.6149 12.5516 26.115C13.0517 26.6151 13.3327 27.2934 13.3327 28.0007V29.334" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M18.666 29.334V28.0007C18.666 27.2934 18.947 26.6151 19.4471 26.115C19.9472 25.6149 20.6254 25.334 21.3327 25.334H26.666C27.3733 25.334 28.0515 25.6149 28.5516 26.115C29.0517 26.6151 29.3327 27.2934 29.3327 28.0007V29.334" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#505155'
})
</script>
