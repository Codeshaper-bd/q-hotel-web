<template>
  <div>
    <PageBanner
      title="Savor Every Moment"
      description="From international favorites to local delicacies, our restaurants and lounges offer exceptional dining experiences in elegant settings."
      image="/images/dining/bbq-restaurant.jpg"
      :breadcrumb="[
        { label: 'Home', to: '/' },
        { label: 'Dining' },
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
    <DiningVenues />
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
  title: 'Dining',
  description: 'From international favorites to local delicacies, Q Hotel Dhaka restaurants and lounges offer exceptional dining experiences in elegant settings.',
  path: '/dining',
})
</script>