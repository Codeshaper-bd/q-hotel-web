<template>
  <div>
    <PageBanner
      title="What We Offer"
      description="Thoughtfully designed spaces and services to make your stay comfortable, convenient, and unforgettable."
      image="/images/gallery/hero.jpg"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Facilities & Amenities' },
      ]"
    />
    <FacilitiesAmenitiesSection />
    <FaqSection />
    <div class="h-[100px]" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Facilities & Amenities',
  description: 'Explore the facilities and amenities at Q Hotel Dhaka — swimming pool, fitness and spa, dining, parking, Wi-Fi, airport shuttle, and more.',
  path: '/facilities-amenities',
})
</script>
