<template>
  <div>
    <PageBanner
      title="What We Offer"
      description="Thoughtfully designed spaces and services to make your stay comfortable, convenient, and unforgettable."
      image="/images/facilities/facilities-bannar.png"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Facilities & Amenities' },
      ]"
    >
      <template #console>
        <FacilitiesHighlights />
      </template>
    </PageBanner>
    <FacilitiesAmenitiesSection />
    <FacilitiesRelaxationSection />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: "Facilities & Amenities",
  description:
    "Explore the facilities and amenities at Q Hotel Dhaka — swimming pool, fitness and spa, dining, parking, Wi-Fi, airport shuttle, and more.",
  path: "/facilities-amenities",
});
</script>
