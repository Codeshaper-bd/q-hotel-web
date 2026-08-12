<template>
  <!--
    Dining banner: a static full-bleed photo with breadcrumb, title, and an
    intro statement — same composition as LongStayHeroBanner, with the
    reservation console pulled up over the banner's bottom edge exactly like
    the /rooms banner.
  -->
  <section
    aria-labelledby="dining-banner-title"
    class="relative text-paper"
  >
    <div class="relative flex min-h-[26rem] items-center justify-center overflow-hidden py-24 sm:min-h-[28rem]">
      <BaseImage
        src="/images/dining/bbq-restaurant.jpg"
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
            { label: 'Dining' },
          ]"
        />

        <h1
          id="dining-banner-title"
          class="font-display text-4xl text-paper sm:text-5xl lg:text-[56px] lg:font-semibold"
        >
          Savor Every Moment
        </h1>
        <p class="max-w-xl text-lg font-medium text-paper">
          From international favorites to local delicacies, our restaurants and lounges offer exceptional dining experiences in elegant settings.
        </p>
      </div>
    </div>

    <!-- Pulled up over the banner's bottom edge; normal flow resumes right
         after it, so nothing below needs absolute positioning to compensate.
         No z-index here (and no isolate on the section above): a stacking
         context would cap the search console's popover panels below the
         fixed header's z-40, hiding the calendar behind it. -->
    <BaseContainer size="xl" class="relative -mt-14 pb-16 sm:-mt-12 sm:pb-20">
      <div class="max-w-[1316px] mx-auto">
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