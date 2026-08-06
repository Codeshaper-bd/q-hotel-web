<template>
  <!--
    Full-bleed dark cover, same photographic language as the other secondary
    banners, holding the error message and a working reservation console —
    so a guest who lands here can still search a stay without leaving the
    page. `Opps! Sorry!!!` is a large decorative lead-in, not a heading;
    the real (smaller) <h1> below it is what actually names the page state.
  -->
  <section aria-labelledby="error-title" class="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-night text-paper">
    <div aria-hidden="true" class="absolute inset-0">
      <BaseImage
        src="/images/error/not-found-lounge.jpg"
        alt=""
        :width="1920"
        :height="900"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="h-full w-full"
      />
      <div class="absolute inset-0 bg-ink/70" />
    </div>

    <BaseContainer size="xl" class="relative z-10 flex flex-col items-center gap-10 py-24 text-center">
      <div class="flex flex-col items-center gap-4">
        <p class="font-display text-4xl font-semibold text-paper sm:text-5xl">
          Opps! Sorry!!!
        </p>
        <h1 id="error-title" class="font-display text-2xl font-semibold text-paper sm:text-3xl">
          {{ headline }}
        </h1>
        <p class="max-w-xl text-base leading-7 text-paper/80 sm:text-lg">
          {{ message }}
        </p>
        <BaseArrowCta to="/" variant="gold" class="mt-2">
          Back To Homepage
        </BaseArrowCta>
      </div>

      <HeroBookingSearch @search="handleSearch" />
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

const props = withDefaults(defineProps<{
  statusCode?: number
}>(), {
  statusCode: 404,
})

const headline = computed(() => props.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong')
const message = computed(() => props.statusCode === 404
  ? "We looked everywhere, but couldn't find the page you requested. Shall we start a new exploration?"
  : 'An unexpected error occurred on our end. Please try again, or head back to the homepage.')

function handleSearch(query: BookingSearchQuery) {
  useState<BookingSearchQuery | null>('booking-search-draft', () => null).value = query
  navigateTo('/rooms')
}
</script>
