<!-- Classroom capacity icon -->
<template>
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.6673 28.0007V24.0007C18.6673 23.2934 18.3864 22.6151 17.8863 22.115C17.3862 21.6149 16.7079 21.334 16.0007 21.334C15.2934 21.334 14.6151 21.6149 14.115 22.115C13.6149 22.6151 13.334 23.2934 13.334 24.0007V28.0007" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M24 6.57812V28.0008" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.33398 8.00059L14.8087 2.94726C15.1788 2.7623 15.5869 2.66602 16.0007 2.66602C16.4144 2.66602 16.8225 2.7623 17.1927 2.94726L26.6673 8.00059" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M7.99935 14.666L3.30602 17.5287C3.11062 17.6476 2.94911 17.8149 2.83703 18.0143C2.72495 18.2137 2.66605 18.4386 2.66602 18.6673V25.3327C2.66602 26.0399 2.94697 26.7182 3.44706 27.2183C3.94716 27.7184 4.62544 27.9993 5.33268 27.9993H26.666C27.3733 27.9993 28.0515 27.7184 28.5516 27.2183C29.0517 26.7182 29.3327 26.0399 29.3327 25.3327V18.666C29.3324 18.4375 29.2734 18.2129 29.1613 18.0137C29.0493 17.8145 28.8879 17.6475 28.6927 17.5287L23.9993 14.666" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M8 6.57812V28.0008" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M16.0007 14.6673C17.4734 14.6673 18.6673 13.4734 18.6673 12.0007C18.6673 10.5279 17.4734 9.33398 16.0007 9.33398C14.5279 9.33398 13.334 10.5279 13.334 12.0007C13.334 13.4734 14.5279 14.6673 16.0007 14.6673Z" :stroke="color" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  color?: string
}>(), {
  color: '#505155'
})
</script>
