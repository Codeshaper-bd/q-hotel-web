<template>
  <section
    id="hero"
    ref="sectionRef"
    aria-labelledby="home-title"
    class="relative min-h-svh overflow-hidden bg-night text-paper"
  >
    <!-- Letter-to-video reveal: the "Q" mark opens up into full-bleed footage -->
    <HeroMaskReveal :progress="scrollProgress" :video-src="heroVideoSrc" :poster="heroPoster" />

    <!-- Final hero UI: server-rendered for SEO, revealed as the footage fills.
         Headline block above, the reservation console floating on its own
         full-width row beneath — each element staggers in on arrival. -->
    <div
      ref="heroUiRef"
      :class="['relative flex min-h-svh flex-col justify-end', isUiActive ? '' : 'pointer-events-none']"
    >
      <BaseContainer size="xl" class="w-full pb-12 pt-32 sm:pb-14">
        <div class="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,44rem)] xl:gap-20">
          <div class="max-w-2xl">
            <h1
              id="home-title"
              ref="titleRef"
              class="mt-5 font-display text-xl leading-[1.04] sm:text-4xl "
            >
              Retreat To Our Stylish Hotel In Dhaka
            </h1>
            <p
              ref="leadRef"
              class="mt-4 max-w-xl text-lg xl:text-xl"
            >
              Whether you seek adventure, culture, or calm — we’ve got the perfect experience for every kind of traveler.
            </p>
          </div>

          <div ref="consoleRef">
            <HeroBookingSearch @search="handleSearch" />
          </div>
        </div>
      </BaseContainer>
    </div>

    <!-- Scroll cue for the journey: label over a slow, sweeping hairline -->
    <div
      ref="scrollHintRef"
      class="pointer-events-none absolute inset-x-0 bottom-8 flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      <span class="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-paper/50">
        Scroll to enter
      </span>
      <span class="hero-scroll-line h-10 w-px overflow-hidden">
        <span class="block h-full w-full bg-gradient-to-b from-champagne/80 via-champagne/40 to-transparent" />
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

const sectionRef = ref<HTMLElement | null>(null)
const heroUiRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const leadRef = ref<HTMLElement | null>(null)
const consoleRef = ref<HTMLElement | null>(null)
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
  // Touch/small screens get a shorter journey: same arrival, less scrolling —
  // the intro should welcome, never gatekeep, on mobile
  const journeyEnd = window.matchMedia('(max-width: 1023px)').matches ? '+=240%' : '+=380%'

  createContext(() => {
    isUiActive.value = false
    isMenuRevealed.value = false
    isNavGlassAllowed.value = false
    gsap.set([titleRef.value, leadRef.value, consoleRef.value], { opacity: 0, y: 26 })

    // Pacing: the dolly-through completes by ~55% and the last ~40% is a held
    // beat of clean full-bleed video, so the next section never chases the Q
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: journeyEnd,
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          scrollProgress.value = self.progress
          // The menu slides in a beat BEFORE the Q finishes dissolving (~0.54)
          isMenuRevealed.value = self.progress > 0.4
          // The hero UI follows right behind the dissolve — arrival, not wait
          isUiActive.value = self.progress > 0.52
          // The nav stays glass-free over the footage until the hero is
          // nearly done; its backdrop belongs to the page beyond
          isNavGlassAllowed.value = self.progress > 0.93
        },
      },
    })

    timeline
      // Pad the timeline to exactly 1 so tween positions read as journey
      // progress (a scrubbed timeline maps scroll to TIME, and its duration
      // is otherwise just the last tween's end)
      .set({}, {}, 1)
      // Hint fades as the Q begins to open
      .to(scrollHintRef.value, { opacity: 0, duration: 0.05, ease: 'none' }, 0.02)
      // Arrival choreography: headline → lead → reservation console,
      // starting as the stage dissolve finishes so there is no empty beat
      .to(titleRef.value, { opacity: 1, y: 0, duration: 0.07, ease: 'none' }, 0.53)
      .to(leadRef.value, { opacity: 1, y: 0, duration: 0.07, ease: 'none' }, 0.57)
      .to(consoleRef.value, { opacity: 1, y: 0, duration: 0.08, ease: 'none' }, 0.6)
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

<style scoped>
/* Scroll cue: the hairline sweeps down and rests, like a slow exhale.
   Transform-only; collapsed by the global reduced-motion rules. */
@keyframes hero-scroll-sweep {
  0% {
    transform: translateY(-100%);
  }

  55% {
    transform: translateY(0);
  }

  80% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(100%);
  }
}

.hero-scroll-line > span {
  animation: hero-scroll-sweep 2.6s var(--ease-premium) infinite;
}
</style>
