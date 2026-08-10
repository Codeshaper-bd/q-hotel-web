<template>
  <!--
    Room List banner: a static full-bleed photo (no scroll motion — this is a
    secondary page, not the cinematic home hero) with a breadcrumb and title,
    and the reservation console floating over its lower edge. Composes
    <section> directly (not BaseSection) so the photo can bleed to both
    viewport edges while the breadcrumb/title and the console share the xl
    container grid.
  -->
  <section
    aria-labelledby="rooms-banner-title"
    class="relative text-paper"
  >
    <div
      class="relative flex min-h-[26rem] items-center justify-center overflow-hidden py-24 sm:min-h-[28rem]"
    >
      <BaseImage
        src="/images/hero/hero-bannar.png"
        alt=""
        :width="1920"
        :height="400"
        priority
        class="absolute inset-0"
      />

      <div class="relative z-10 flex flex-col items-center gap-4 text-center">
        <BaseBreadcrumb
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Room List' },
          ]"
        />

        <h1
          id="rooms-banner-title"
          class="font-display text-4xl text-paper sm:text-5xl lg:text-[56px] lg:font-semibold"
        >
          {{ initialQuery ? "Select Your Room" : "Discover Your Perfect Stay" }}
        </h1>
      </div>
    </div>

    <!-- Pulled up over the banner's bottom edge; normal flow resumes right
         after it, so nothing below needs absolute positioning to compensate.
         No z-index here (and no isolate on the section above): a stacking
         context would cap the search console's popover panels below the fixed
         header's z-40, hiding the calendar behind it. -->
    <BaseContainer
      size="xl"
      class="relative -mt-14 pb-16 sm:-mt-12 sm:pb-20"
    >
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
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from "~/types/booking";
import { parseBookingRouteQuery, toBookingRouteQuery } from '#imports'

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
