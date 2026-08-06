<template>
  <section
    id="hero"
    ref="sectionRef"
    aria-labelledby="home-title"
    class="relative flex min-h-svh flex-col justify-end overflow-hidden bg-night text-paper"
  >
    <!-- Full-bleed cover photo with a fixed dark scrim, server-rendered so the
         hero reads instantly — no reveal choreography to wait through. -->
    <div aria-hidden="true" class="absolute inset-0">
      <BaseImage
        src="/images/hero/lounge-suite.jpg"
        alt=""
        :width="2500"
        :height="1567"
        priority
        class="h-full w-full"
      />
      <div class="absolute inset-0 bg-ink/40" />
    </div>

    <BaseContainer size="xl" class="relative w-full pb-12 pt-32 sm:pb-14">
      <div class="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,56.125rem)] xl:gap-20">
        <div ref="textRef" class="max-w-2xl">
          <h1
            id="home-title"
            class="font-display text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl xl:text-[4.5rem] xl:leading-[80px]"
          >
            Retreat To Our Stylish Hotel In Dhaka
          </h1>
          <p class="mt-4 max-w-xl text-lg xl:max-w-[41rem] xl:text-xl xl:leading-[30px]">
            Whether you seek adventure, culture, or calm, we’ve got the perfect experience for every kind of traveler.
          </p>
        </div>

        <div ref="consoleRef">
          <HeroBookingSearch @search="handleSearch" />
        </div>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

const sectionRef = ref<HTMLElement | null>(null)
const textRef = ref<HTMLElement | null>(null)
const consoleRef = ref<HTMLElement | null>(null)

const { gsap, createContext } = useGsap()

onMounted(() => {
  if (!sectionRef.value || !gsap) {
    return
  }

  // A quiet arrival, not a scroll-driven journey: the hero is fully usable
  // the instant it paints, and this just softens the first frame.
  // A no-op under reduced motion (createContext short-circuits), so the
  // headline, lead and console simply render in place.
  createContext(() => {
    gsap.from([textRef.value, consoleRef.value], {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
    })
  }, sectionRef.value)
})

function handleSearch(query: BookingSearchQuery) {
  // OPERA PMS availability/rate/reservation integration lands here.
  // Until then, the selection travels to /rooms as URL query params (so a
  // refresh or share reproduces it) and also into shared state, which the
  // later /booking step reads to carry the dates through checkout.
  useState<BookingSearchQuery | null>('booking-search-draft', () => null).value = query
  navigateTo({ path: '/rooms', query: toBookingRouteQuery(query) })
}
</script>
