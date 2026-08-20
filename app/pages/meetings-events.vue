<template>
  <div>
    <PageBanner
      title="Your Perfect Event Starts Here"
      title-class="text-4xl lg:text-[72px] font-semibold lg:leading-20"
      description-class="max-w-[1032px] text-lg font-medium text-white mt-2" 
      description="Versatile event spaces, modern amenities, and personalized service come together to create seamless, memorable experiences for every meeting, celebration, and special occasion."
      image="/images/meetings/meeting-bannar.png"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Meetings & Events' },
      ]"
    >
    </PageBanner>
    <VenueShowcaseSection />
    <FaqSection page="meetings" />
    <div class="h-[100px]" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'
import { toBookingRouteQuery } from '#imports'

function handleSearch(query: BookingSearchQuery) {
  navigateTo({ path: '/rooms', query: toBookingRouteQuery(query) })
}

useSeoMetaData({
  title: 'Meetings & Events',
  description: 'Meetings and events at Q Hotel Dhaka — versatile venues, dedicated planning, and catering for conferences, weddings, and private celebrations.',
  path: '/meetings-events',
})
</script>