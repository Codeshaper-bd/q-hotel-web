<template>
  <div>
    <LongStayHeroBanner />
    <LongStayBenefits />
    <LongStaySavings />
    <LongStayAmenities />
    <RoomsSection :show-tabs="false" spacing="sm" />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Long Stays',
  description: 'Extended stays at Q Hotel Dhaka - long-stay rates, thoughtful amenities, and recommended rooms and suites for business travelers, relocations, and stays of 10 nights or more.',
  path: '/long-stay'
})
</script>
