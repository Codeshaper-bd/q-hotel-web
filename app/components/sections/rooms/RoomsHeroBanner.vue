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
    class="relative isolate text-paper"
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
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-sm text-paper/85">
            <li class="flex items-center gap-1.5">
              <svg
                class="h-3.5 w-3.5 text-paper/70"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2 7.5L8 2l6 5.5M3.5 6.5V13a.5.5 0 00.5.5h3v-4h2v4h3a.5.5 0 00.5-.5V6.5"
                />
              </svg>
              <NuxtLink
                to="/"
                class="transition-colors duration-fast hover:text-champagne"
                >Home</NuxtLink
              >
            </li>
            <li class="flex items-center gap-2" aria-current="page">
              <svg
                class="h-3 w-3 text-paper/50"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 3l5 5-5 5"
                />
              </svg>
              <span>Room List</span>
            </li>
          </ol>
        </nav>

        <h1
          id="rooms-banner-title"
          class="font-display text-4xl text-paper sm:text-5xl"
        >
          {{ initialQuery ? "Select Your Room" : "Discover Your Perfect Stay" }}
        </h1>
      </div>
    </div>

    <!-- Pulled up over the banner's bottom edge; normal flow resumes right
         after it, so nothing below needs absolute positioning to compensate -->
    <BaseContainer
      size="xl"
      class="relative z-10 -mt-14 pb-16 sm:-mt-12 sm:pb-20"
    >
      <div class="max-w-[1316px] mx-auto">
        <HeroBookingSearch
          :key="route.fullPath"
          tone="light"
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
