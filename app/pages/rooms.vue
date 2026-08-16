<template>
  <div>
    <RoomsHeroBanner />
    <RoomsListing />
    <FaqSection page="rooms" :initial-open-index="1" />
    <div class="h-[100px]"></div>
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: "Rooms & Suites",
  description:
    "Browse every room and suite at Q Hotel Dhaka — elegant accommodations with modern comforts, sophisticated interiors, and everything you need for a relaxing stay.",
  path: "/rooms",
});
</script>
