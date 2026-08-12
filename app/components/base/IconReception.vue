<!-- Reception table capacity icon -->
<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.99935 26.6673C3.64573 26.6673 3.30659 26.5268 3.05654 26.2768C2.80649 26.0267 2.66602 25.6876 2.66602 25.334V24.0007C2.66602 23.2934 2.94697 22.6151 3.44706 22.115C3.94716 21.6149 4.62544 21.334 5.33268 21.334H26.666C27.3733 21.334 28.0515 21.6149 28.5516 22.115C29.0517 22.6151 29.3327 23.2934 29.3327 24.0007V25.334C29.3327 25.6876 29.1922 26.0267 28.9422 26.2768C28.6921 26.5268 28.353 26.6673 27.9993 26.6673H3.99935Z" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M26.6673 21.3327C26.6673 18.5037 25.5435 15.7906 23.5431 13.7902C21.5427 11.7898 18.8296 10.666 16.0007 10.666C13.1717 10.666 10.4586 11.7898 8.45818 13.7902C6.45779 15.7906 5.33398 18.5037 5.33398 21.3327" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16 5.33398V10.6673" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M13.334 5.33398H18.6673" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#505155'
})
</script>
