<template>
  <div class="min-h-screen bg-paper text-ink">
    <AppHeader />
    <main id="main-content">
      <ErrorHeroBanner :status-code="error.status" />
      <FaqSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

useSeoMetaData({
  title: props.error.status === 404 ? 'Page Not Found' : 'Something Went Wrong',
  description: 'The page you are looking for could not be found. Return to Q Hotel Dhaka and continue exploring our rooms, dining, and amenities.',
  path: '/404'
})

useSeoMeta({
  robots: 'noindex, nofollow'
})
</script>
