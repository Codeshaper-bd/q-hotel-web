<template>
  <section
    id="hero"
    ref="sectionRef"
    aria-labelledby="home-title"
    class="relative min-h-svh overflow-hidden bg-night text-paper"
  >
    <!-- Letter-to-video reveal: the "Q" mark opens up into full-bleed footage -->
    <HeroMaskReveal :progress="scrollProgress" :video-src="heroVideoSrc" :poster="heroPoster" />

    <!-- Final hero UI: server-rendered for SEO, revealed as the footage fills -->
    <div
      ref="heroUiRef"
      :class="['relative flex min-h-svh flex-col justify-end', isUiActive ? '' : 'pointer-events-none']"
    >
      <BaseContainer size="xl" class="w-full pb-12 pt-32 sm:pb-14">
        <div class="grid items-end gap-8 xl:grid-cols-[1fr_auto] xl:gap-12">
          <div class="max-w-2xl">
            <h1 id="home-title" class="font-display text-4xl leading-[1.05] sm:text-6xl xl:text-7xl">
              Retreat to our stylish hotel in Dhaka
            </h1>
            <p class="mt-4 max-w-xl text-base leading-8 text-paper/75 sm:text-lg">
              Whether you seek adventure, culture, or calm — we've got the
              perfect experience for every kind of traveler.
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
        Scroll to enter
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

// Hero media. The existing aerial footage keeps the effect working today —
// swap to the dedicated loop (e.g. /videos/hero/hero-loop.mp4) when it lands.
// heroPoster doubles as the video poster and the reduced-motion still.
const heroVideoSrc = '/videos/hero/hero-loop.mp4'
const heroPoster = '/images/hero/lobby-interior.jpg'

const scrollProgress = ref(0)
// Defaults to interactive so reduced-motion and no-JS users can always book;
// the scroll journey (when it runs) takes over and re-enables it at the end
const isUiActive = ref(true)

// Header/menu visibility, consumed by AppHeader (same cross-component pattern
// as 'preloader-complete'). Defaults to visible so SSR, no-JS, reduced-motion,
// and every non-home page always have the menu; the scroll journey hides it
// until the Q has zoomed away.
const isMenuRevealed = useState('hero-menu-revealed', () => true)

// The nav's glass backdrop is held off until the hero is nearly finished, so
// the menu first appears transparent over the clean full-bleed footage
const isNavGlassAllowed = useState('hero-nav-glass', () => true)

const { gsap, createContext } = useGsap()

onMounted(() => {
  if (!sectionRef.value || !gsap) {
    return
  }

  // createContext is a no-op under reduced motion: no pin, no scrub, and the
  // hero renders as a static, fully usable section over the still poster
  createContext(() => {
    isUiActive.value = false
    isMenuRevealed.value = false
    isNavGlassAllowed.value = false
    gsap.set(heroUiRef.value, { opacity: 0, y: 48 })

    // Pacing: the dolly-through completes by ~55% and the last ~40% is a held
    // beat of clean full-bleed video, so the next section never chases the Q
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=380%',
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          scrollProgress.value = self.progress
          // The menu slides in a beat BEFORE the Q finishes dissolving (~0.54)
          isMenuRevealed.value = self.progress > 0.45
          // The hero UI follows once the footage owns the frame
          isUiActive.value = self.progress > 0.6
          // The nav stays glass-free over the footage until the hero is
          // nearly done; its backdrop belongs to the page beyond
          isNavGlassAllowed.value = self.progress > 0.93
        },
      },
    })

    timeline
      // Hint fades as the Q begins to open
      .to(scrollHintRef.value, { opacity: 0, duration: 0.05, ease: 'none' }, 0.02)
      // The hero UI arrives once the footage has filled the frame
      .to(heroUiRef.value, { opacity: 1, y: 0, duration: 0.08, ease: 'none' }, 0.62)
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  // Never strand a hidden header or glass-free nav on other routes
  isMenuRevealed.value = true
  isNavGlassAllowed.value = true
})

function handleSearch(query: BookingSearchQuery) {
  // OPERA PMS availability/rate/reservation integration lands here.
  // Until the reservations flow exists, the selection is kept for handoff.
  useState<BookingSearchQuery | null>('booking-search-draft', () => null).value = query
}
</script>
