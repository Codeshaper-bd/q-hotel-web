<template>
  <div>
    <HeroSection />
    <ExperienceSection />
    <CtaSection />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Boutique Hospitality Experience',
  description: 'A premium, performance-focused hospitality website foundation for Q Hotel.',
  path: '/'
})

useHotelSchema()
</script>
