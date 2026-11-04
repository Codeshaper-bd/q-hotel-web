<template>
  <div>
    <HeroSection />
    <RoomsSection />
    <FacilitiesSection />
    <MeetingsEventsSection />
    <DiningSection />
    <LocationSection />

    <!-- The attractions page holds the full neighbourhood guide -->
    <FadeReveal class="mt-12 flex justify-center">
      <BaseArrowCta to="/nearby-locations" variant="gold">
        Nearby Locations
      </BaseArrowCta>
    </FadeReveal>

    <FaqSection />
    <div class="h-[160px]"></div>
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
