<template>
  <div>
    <PageBanner
      :title="initialQuery ? 'Select Your Room' : 'Discover Your Perfect Stay'"
      :breadcrumb="[{ label: 'Home', to: '/' }, { label: 'Room List' }]"
      image="/images/hero/hero-bannar.png"
    >
      <template #console>
        <div class="max-w-[1316px] mx-auto">
          <HeroBookingSearch
            :key="route.fullPath"
            tone="light"
            empty-state
            popover-direction="down"
            :submit-label="initialQuery ? 'Modify Search' : 'Search'"
            :initial-query="initialQuery"
            @search="handleSearch"
          />
        </div>
      </template>
    </PageBanner>
    <RoomsListing />
    <FaqSection page="rooms" :initial-open-index="1" />
    <div class="h-[100px]"></div>
  </div>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from "~/types/booking";
import { parseBookingRouteQuery, toBookingRouteQuery } from "#imports";

useSeoMetaData({
  title: "Rooms & Suites",
  description:
    "Browse every room and suite at Q Hotel Dhaka — elegant accommodations with modern comforts, sophisticated interiors, and everything you need for a relaxing stay.",
  path: "/rooms",
});

const route = useRoute();

// The URL is the source of truth for what this console displays: a plain
// nav link to /rooms carries no query, so it correctly shows no stale
// selection even if a search was made earlier in the session.
const initialQuery = computed(
  () => parseBookingRouteQuery(route.query) ?? undefined,
);

function handleSearch(query: BookingSearchQuery) {
  // OPERA PMS availability/rate integration lands here; until then the
  // listing below stays the same static catalog regardless of the query.
  useState<BookingSearchQuery | null>(
    "booking-search-draft",
    () => null,
  ).value = query;
  navigateTo(
    { path: "/rooms", query: toBookingRouteQuery(query) },
    { replace: true },
  );
}
</script>
