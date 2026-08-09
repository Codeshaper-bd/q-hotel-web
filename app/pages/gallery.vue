<template>
  <div>
    <GalleryHeroBanner />
    <GalleryFeaturedHighlights />
    <GalleryAllGallery />
    <GalleryNewsletterSection />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Gallery',
  description: 'A glimpse of Q Hotel Dhaka - browse photos of our elegant rooms, world-class dining, exceptional facilities, and memorable guest moments.',
  path: '/gallery'
})
</script>
