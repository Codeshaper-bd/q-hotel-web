<template>
  <!--
    Long Stay banner: a static full-bleed photo with breadcrumb/title, and a
    "Plan Your Long Stay" console floating over the lower edge — same
    composition as RoomsHeroBanner, with an intro panel ahead of the
    reservation console instead of a bare search bar.
  -->
  <section
    aria-labelledby="long-stay-banner-title"
    class="relative text-paper"
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
        <BaseBreadcrumb
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Long Stays' },
          ]"
        />

        <h1
          id="long-stay-banner-title"
          class="font-display text-4xl text-paper sm:text-5xl lg:text-[56px] lg:font-semibold"
        >
          Comfort That Feels Like Home
        </h1>
        <p class="max-w-xl text-lg font-medium text-paper">
          Perfect for business travelers, relocations, and extended stays of 10 nights or more.
        </p>
      </div>
    </div>

    <!-- Pulled up over the banner's bottom edge; normal flow resumes right
         after it, so nothing below needs absolute positioning to compensate.
         No z-index here (and no isolate on the section above): a stacking
         context would cap the search console's popover panels below the
         following sections, hiding the calendar behind them. -->
    <BaseContainer
      size="xl"
      class="relative -mt-14 pb-16 sm:-mt-12 sm:pb-20"
    >
      <div class="mx-auto flex max-w-[1316px] flex-col gap-6 border border-champagne bg-paper p-6 shadow-[0_28px_80px_-28px] shadow-ink/40 sm:p-8 lg:flex-row lg:items-center lg:gap-10">
        <div class="shrink-0 lg:max-w-[18rem]">
          <h2 class="font-display font-semibold text-2xl  text-ink">Plan Your Long Stay</h2>
          <p class="text-sm leading-6 text-ink/70">
            Tell us your stay details and we'll get back to you with the best offer.
          </p>
        </div>
        <div class="hidden h-16 w-px shrink-0 bg-line lg:block" aria-hidden="true" />
        <HeroBookingSearch
          tone="light"
          popover-direction="down"
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
