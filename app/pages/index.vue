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
    <LocationSection />
    <FaqSection />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'Retreat To Our Stylish Hotel In Dhaka',
  description: 'Q Hotel Dhaka — refined rooms, thoughtful service, and warm hospitality for business and leisure travelers in Uttara, Dhaka. Check availability and reserve your stay.',
  path: '/'
})

useHotelSchema()
</script>
