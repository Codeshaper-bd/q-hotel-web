<template>
  <div>
    <PageBanner
      title="Comfort That Feels Like Home"
      description="Perfect for business travelers, relocations, and extended stays of 10 nights or more."
      :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Long Stays' }]"
      image="/images/hero/lounge-suite.jpg"
    >
      <template #console>
        <div class="mx-auto flex max-w-[1316px] flex-col gap-6 border border-champagne bg-white p-2.5 lg:flex-row lg:items-center lg:gap-10">
          <div class="shrink-0 lg:max-w-[18rem] bg-[#F9F0DB] p-2.5">
            <h2 class="font-display font-semibold text-2xl  text-ink mb-1">Plan Your Long Stay</h2>
            <p class="text-sm leading-6 text-[#505155]">
              Tell us your stay details and we'll get back to you with the best offer.
            </p>
          </div>
          <div class="hidden h-16 w-px shrink-0 bg-line lg:block" aria-hidden="true" />
          <HeroBookingSearch
            tone="light"
            popover-direction="down"
            :show-special-rates="false"
            empty-state
            check-in-placeholder="Check in Date"
            check-out-placeholder="Check Out Date"
            placeholder-class="text-[18px] font-semibold text-[#505155]"
            submit-label="Search"
            @search="handleSearch"
          />
        </div>
      </template>
    </PageBanner>
    <LongStayBenefits />
    <LongStaySavings />
    <LongStayAmenities />
    <LongStayRoomSection />
    <div class="h-10"></div>
  </div>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from "~/types/booking";
import { toBookingRouteQuery } from "#imports";

useSeoMetaData({
  title: "Long Stays",
  description:
    "Extended stays at Q Hotel Dhaka - long-stay rates, thoughtful amenities, and recommended rooms and suites for business travelers, relocations, and stays of 10 nights or more.",
  path: "/long-stay",
});

function handleSearch(query: BookingSearchQuery) {
  navigateTo({ path: "/rooms", query: toBookingRouteQuery(query) });
}
</script>