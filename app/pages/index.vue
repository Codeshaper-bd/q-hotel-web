<template>
  <div>
    <HeroSection />
    <AboutSection />
    <RoomsSection />
    <FacilitiesSection />
    <MeetingsEventsSection />
    <DiningSection />
    <OffersSection />
    <ReviewsSection />
    <InstagramSection />
    <FaqSection />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Arrive in Quiet Luxury',
  description: 'Q Hotel Dhaka — refined rooms, thoughtful service, and warm hospitality for business and leisure travelers in Uttara, Dhaka. Check availability and reserve your stay.',
  path: '/'
})

useHotelSchema()
</script>
