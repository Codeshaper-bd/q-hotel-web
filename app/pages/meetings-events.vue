<template>
  <div>
    <PageBanner
      title="Meetings &amp; Events"
      description="From intimate boardrooms to grand ballrooms, our versatile venues and dedicated event team bring your occasions to life in the heart of Dhaka."
      image="/images/meetings/business-class-lounge.jpg"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Meetings & Events' },
      ]"
    />
    <FaqSection />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Meetings & Events',
  description: 'Meetings and events at Q Hotel Dhaka — versatile venues, dedicated planning, and catering for conferences, weddings, and private celebrations.',
  path: '/meetings-events',
})
</script>