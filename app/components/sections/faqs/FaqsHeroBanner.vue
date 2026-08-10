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
        <BaseBreadcrumb
          :items="[
            { label: 'Home', to: '/' },
            { label: 'FAQs' },
          ]"
        />

        <h1 id="faqs-banner-title" class="font-display text-4xl text-paper sm:text-5xl lg:text-[56px] lg:font-semibold">
          Frequently Asked Questions
        </h1>
      </div>
    </div>

    <!-- Pulled up over the banner's bottom edge; normal flow resumes right
         after it, so nothing below needs absolute positioning to compensate -->
    <BaseContainer size="xl" class="relative z-10 -mt-14 pb-16 sm:-mt-16 sm:pb-20">
      <HeroBookingSearch tone="light" @search="handleSearch" />
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'
import { toBookingRouteQuery } from '#imports'

function handleSearch(query: BookingSearchQuery) {
  // OPERA PMS availability/rate/reservation integration lands here.
  // Until then, the selection travels to /rooms as URL query params (so a
  // refresh or share reproduces it) and also into shared state, which the
  // later /booking step reads to carry the dates through checkout.
  useState<BookingSearchQuery | null>('booking-search-draft', () => null).value = query
  navigateTo({ path: '/rooms', query: toBookingRouteQuery(query) })
}
</script>
