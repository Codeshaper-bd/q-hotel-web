<template>
  <!--
    Long Stay banner: a static full-bleed photo with breadcrumb/title, and a
    "Plan Your Long Stay" console floating over the lower edge — same
    composition as RoomsHeroBanner, with an intro panel ahead of the
    reservation console instead of a bare search bar.
  -->
  <section
    aria-labelledby="long-stay-banner-title"
    class="relative isolate text-paper"
  >
    <div class="relative flex min-h-[26rem] items-center justify-center overflow-hidden py-24 sm:min-h-[28rem]">
      <BaseImage
        src="/images/hero/lounge-suite.jpg"
        alt=""
        :width="1920"
        :height="800"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />
      <div class="absolute inset-0 bg-ink/70" aria-hidden="true" />

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
              >Home</NuxtLink>
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
              <span>Long Stays</span>
            </li>
          </ol>
        </nav>

        <h1
          id="long-stay-banner-title"
          class="font-display text-4xl text-paper sm:text-5xl"
        >
          Comfort That Feels Like Home
        </h1>
        <p class="max-w-xl text-base text-paper/85">
          Perfect for business travelers, relocations, and extended stays of 10 nights or more.
        </p>
      </div>
    </div>

    <!-- Pulled up over the banner's bottom edge; normal flow resumes right
         after it, so nothing below needs absolute positioning to compensate -->
    <BaseContainer
      size="xl"
      class="relative z-10 -mt-14 pb-16 sm:-mt-12 sm:pb-20"
    >
      <div class="mx-auto flex max-w-[1316px] flex-col gap-6 border border-champagne bg-paper p-6 shadow-[0_28px_80px_-28px] shadow-ink/40 sm:p-8 lg:flex-row lg:items-center lg:gap-10">
        <div class="shrink-0 lg:max-w-[18rem]">
          <h2 class="font-display text-2xl text-ink">Plan Your Long Stay</h2>
          <p class="mt-2 text-sm leading-6 text-ink/70">
            Tell us your stay details and we'll get back to you with the best offer.
          </p>
        </div>
        <div class="hidden h-16 w-px shrink-0 bg-line lg:block" aria-hidden="true" />
        <HeroBookingSearch
          tone="light"
          submit-label="Search"
          @search="handleSearch"
        />
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'
import { toBookingRouteQuery } from '#imports'

function handleSearch(query: BookingSearchQuery) {
  navigateTo({ path: '/rooms', query: toBookingRouteQuery(query) })
}
</script>
