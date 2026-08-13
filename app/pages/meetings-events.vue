<template>
  <div>
    <PageBanner
      title="Meetings &amp; Events"
      description="From intimate boardrooms to grand ballrooms, our versatile venues and dedicated event team bring your occasions to life in the heart of Dhaka."
      image="/images/meetings/business-class-lounge.jpg"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Meetings & Events' },
      ]"
    >
      <template #console>
        <div class="mx-auto max-w-[1316px]">
          <HeroBookingSearch
            tone="light"
            popover-direction="down"
            empty-state
            :show-special-rates="false"
            check-in-placeholder="Check in Date"
            check-out-placeholder="Check Out Date"
            placeholder-class="text-[18px] font-semibold text-[#505155]"
            submit-label="Search"
            @search="handleSearch"
          />
        </div>
      </template>
    </PageBanner>
    <BusinessLoungeSection />
    <CapacityOverviewSection />
    <FaqSection />

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