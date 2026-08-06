<template>
  <!--
    Static full-bleed cover with a breadcrumb and the reservation console
    floating over its lower edge, matching the Room List banner pattern
    (secondary page, no scroll motion) — and the Figma FAQ hero spec.
  -->
  <section aria-labelledby="faqs-banner-title" class="relative isolate bg-ink text-paper">
    <div class="relative flex min-h-[26rem] items-center justify-center overflow-hidden py-24 sm:min-h-[28rem]">
      <BaseImage
        src="/images/faq/hero-terrace.jpg"
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
              <svg class="h-3.5 w-3.5 text-paper/70" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2 7.5L8 2l6 5.5M3.5 6.5V13a.5.5 0 00.5.5h3v-4h2v4h3a.5.5 0 00.5-.5V6.5" />
              </svg>
              <NuxtLink to="/" class="transition-colors duration-fast hover:text-champagne">Home</NuxtLink>
            </li>
            <li class="flex items-center gap-2" aria-current="page">
              <svg class="h-3 w-3 text-paper/50" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5" />
              </svg>
              <span>FAQs</span>
            </li>
          </ol>
        </nav>

        <h1 id="faqs-banner-title" class="font-display text-4xl text-paper sm:text-5xl">
          Frequently Asked Questions
        </h1>
      </div>
    </div>

    <!-- Pulled up over the banner's bottom edge; normal flow resumes right
         after it, so nothing below needs absolute positioning to compensate -->
    <BaseContainer size="xl" class="relative z-10 -mt-14 pb-16 sm:-mt-16 sm:pb-20">
      <HeroBookingSearch @search="handleSearch" />
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

function handleSearch(query: BookingSearchQuery) {
  // OPERA PMS availability/rate/reservation integration lands here.
  // Until then, the selection travels to /rooms as URL query params (so a
  // refresh or share reproduces it) and also into shared state, which the
  // later /booking step reads to carry the dates through checkout.
  useState<BookingSearchQuery | null>('booking-search-draft', () => null).value = query
  navigateTo({ path: '/rooms', query: toBookingRouteQuery(query) })
}
</script>
