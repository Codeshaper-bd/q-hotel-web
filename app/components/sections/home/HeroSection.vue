<template>
  <section
    id="hero"
    ref="sectionRef"
    aria-labelledby="home-title"
    class="relative min-h-svh overflow-hidden bg-night text-paper"
  >
    <!-- Cinematic aerial→lobby arrival journey (server-rendered images) -->
    <HeroArrivalVisual :progress="scrollProgress" />

    <!-- Final hero UI: server-rendered for SEO, revealed at the end of the journey -->
    <div
      ref="heroUiRef"
      :class="['relative flex min-h-svh items-center', isUiActive ? '' : 'pointer-events-none']"
    >
      <BaseContainer size="xl" class="w-full">
        <div class="grid items-center gap-10 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div class="max-w-2xl">
            <p class="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-champagne">
              Q Hotel Dhaka
            </p>
            <h1 id="home-title" class="font-display text-4xl leading-[1.02] sm:text-6xl lg:text-7xl">
              A new standard of luxury stay in Dhaka.
            </h1>
            <p class="mt-6 max-w-xl text-base leading-8 text-paper/70 sm:text-lg">
              Discover elegant rooms, refined dining, and seamless hospitality
              designed for modern travelers.
            </p>
          </div>

          <HeroBookingSearch @search="handleSearch" />
        </div>
      </BaseContainer>
    </div>

    <!-- Scroll hint for the journey -->
    <div
      ref="scrollHintRef"
      class="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      <span class="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-paper/50">
        Scroll to arrive
      </span>
      <span class="h-8 w-px bg-gradient-to-b from-champagne/70 to-transparent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

const sectionRef = ref<HTMLElement | null>(null)
const heroUiRef = ref<HTMLElement | null>(null)
const scrollHintRef = ref<HTMLElement | null>(null)

const scrollProgress = ref(0)
// Defaults to interactive so reduced-motion and no-JS users can always book;
// the scroll journey (when it runs) takes over and re-enables it at the end
const isUiActive = ref(true)

const { gsap, createContext } = useGsap()

onMounted(() => {
  if (!sectionRef.value || !gsap) {
    return
  }

  // createContext is a no-op under reduced motion: no pin, no scrub, and the
  // hero renders as a static, fully usable section over the aerial view
  createContext(() => {
    isUiActive.value = false
    gsap.set(heroUiRef.value, { opacity: 0, y: 48 })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          scrollProgress.value = self.progress
          isUiActive.value = self.progress > 0.85
        },
      },
    })

    timeline
      // Hint disappears as the drone approach begins
      .to(scrollHintRef.value, { opacity: 0, duration: 0.05, ease: 'none' }, 0.02)
      // The hero UI arrives once the lobby has settled
      .to(heroUiRef.value, { opacity: 1, y: 0, duration: 0.12, ease: 'none' }, 0.86)
  }, sectionRef.value)
})

function handleSearch(query: BookingSearchQuery) {
  // OPERA PMS availability/rate/reservation integration lands here.
  // Until the reservations flow exists, the selection is kept for handoff.
  useState<BookingSearchQuery | null>('booking-search-draft', () => null).value = query
}
</script>
