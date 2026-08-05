<template>
  <!--
    Dining showcase: a full-screen (viewport minus header) video stage that the
    scroll pins, stepping through one outlet at a time. Footage crossfades while
    the copy leads slightly ahead of it — the outgoing text leaves before the
    frame has finished changing, the incoming text arrives after, which is what
    keeps the change feeling directed rather than mechanical.

    Composes <section> directly (not BaseSection) because the stage must bleed
    to both viewport edges while the copy stays on the xl container grid.

    Mobile, reduced motion and no-JS get every outlet as a plain stacked
    poster-and-copy panel: no pin, no autoplay, all copy still in the HTML.
  -->
  <section
    id="dining"
    ref="sectionRef"
    aria-labelledby="dining-title"
    class="relative isolate overflow-hidden bg-night text-paper"
  >
    <h2 id="dining-title" class="sr-only">Dining at Q Hotel</h2>

    <div ref="stageRef" class="dining-stage relative">
      <article
        v-for="(venue, venueIndex) in venues"
        :key="venue.id"
        class="dining-slide relative min-h-[34rem] motion-safe:lg:absolute motion-safe:lg:inset-0 motion-safe:lg:min-h-0"
        :aria-hidden="isSlideInert(venueIndex) ? 'true' : undefined"
      >
        <div :data-dining-media="venueIndex" class="absolute inset-0 overflow-hidden bg-night">
          <!-- Carries first paint and stays put if the footage never loads -->
          <BaseImage
            :src="venue.poster.src"
            :alt="venue.poster.alt"
            :width="1920"
            :height="1080"
            sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
            class="absolute inset-0 h-full w-full"
          />

          <video
            v-if="shouldPlayVideo"
            :ref="(element: unknown) => registerVideo(element, venueIndex)"
            class="absolute inset-0 h-full w-full object-cover"
            :src="venue.videoSrc"
            :muted="true"
            loop
            playsinline
            preload="metadata"
            aria-hidden="true"
          />

          <!-- Legibility: an even wash plus a heavier foot under the copy -->
          <div class="absolute inset-0 bg-night/30" aria-hidden="true" />
          <div class="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-night/90 via-night/40 to-transparent" aria-hidden="true" />
        </div>

        <div class="absolute inset-0 flex items-end">
          <BaseContainer size="xl">
            <div :data-dining-copy="venueIndex" class="max-w-xl pb-14 sm:pb-20 lg:pb-28">
              <h3 class="font-display text-4xl text-paper sm:text-5xl">
                {{ venue.name }}
              </h3>
              <p class="mt-5 text-sm leading-7 text-paper/80 sm:text-base">
                {{ venue.description }}
              </p>
              <div class="mt-8">
                <!-- Dining detail routes arrive with the restaurant pages; the
                     CTA hands off to the reserve entry point until then -->
                <BaseArrowCta
                  to="#reserve"
                  variant="gold"
                  :tabindex="isSlideInert(venueIndex) ? -1 : 0"
                >
                  Explore Now
                </BaseArrowCta>
              </div>
            </div>
          </BaseContainer>
        </div>
      </article>

      <!-- Position readout: only meaningful while the stage is pinned -->
      <div class="pointer-events-none absolute inset-x-0 bottom-10 hidden motion-safe:lg:block">
        <BaseContainer size="xl">
          <div class="flex items-center justify-end gap-5">
            <span class="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-paper/70">
              {{ counterLabel }}
            </span>
            <span class="h-px w-40 bg-paper/25 xl:w-56" aria-hidden="true">
              <span ref="progressRef" class="block h-px w-full origin-left bg-champagne" />
            </span>
          </div>
        </BaseContainer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type { DiningVenue } from '~/types/dining'

/**
 * Static showcase content (CMS-ready shape).
 *
 * PLACEHOLDER MEDIA: every slide currently points at the hero loop because no
 * dining footage exists yet. Drop the real files into /public/videos/dining/
 * and change `videoSrc` (and each `poster`) here — nothing else needs to move.
 *
 * PLACEHOLDER COPY: only BBQ Restaurant is real. The other two outlets are
 * drafted so the interaction can be built and reviewed; replace with the
 * hotel's actual venue names and descriptions.
 */
const venues: DiningVenue[] = [
  {
    id: 'bbq-restaurant',
    name: 'BBQ Restaurant',
    description: 'Charcoal-grilled specialties in a double-height dining room of stone, timber, and low evening light — our signature restaurant pairs bold flavors with an unhurried, convivial setting.',
    poster: { src: '/images/dining/bbq-restaurant.jpg', alt: 'Q Hotel BBQ Restaurant dining room with ring chandeliers, stone feature wall, and city-view windows' },
    videoSrc: '/videos/hero/hero-loop.mp4',
  },
  {
    id: 'sky-lounge',
    name: 'Sky Lounge & Bar',
    description: 'Dhaka at dusk from the top floor: a low-lit bar of brass and smoked glass, where a short list of classics and a longer one of rare malts carry the evening past midnight.',
    poster: { src: '/images/dining/bbq-restaurant.jpg', alt: 'Rooftop lounge and bar with brass detailing and city views at dusk' },
    videoSrc: '/videos/hero/hero-loop.mp4',
  },
  {
    id: 'atrium-cafe',
    name: 'The Atrium Café',
    description: 'An all-day room under glass — breakfast that runs long, a patisserie counter worth the detour, and coffee served with the kind of quiet that makes a table hard to leave.',
    poster: { src: '/images/dining/bbq-restaurant.jpg', alt: 'All-day café under a glass atrium with a patisserie counter and marble tables' },
    videoSrc: '/videos/hero/hero-loop.mp4',
  },
]

const sectionRef = ref<HTMLElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
const videoElements = ref<HTMLVideoElement[]>([])

/** Footage is a desktop, full-motion enhancement; posters carry everyone else */
const shouldPlayVideo = ref(false)
const activeIndex = ref(0)
/** True once the slides are stacked on top of each other, so only one shows */
const isStageStacked = ref(false)
/** Footage decodes only while the section is actually on screen */
const isSectionVisible = ref(false)

const { gsap, createContext, prefersReducedMotion } = useGsap()
const { addCleanup } = useAnimationCleanup()
const nuxtApp = useNuxtApp()
const ScrollTrigger = nuxtApp.$ScrollTrigger as typeof ScrollTriggerType | undefined

const counterLabel = computed(() => {
  const current = String(activeIndex.value + 1).padStart(2, '0')
  const total = String(venues.length).padStart(2, '0')
  return `${current} — ${total}`
})

/** Hidden from assistive tech and taken out of the tab order while covered */
function isSlideInert(index: number) {
  return isStageStacked.value && index !== activeIndex.value
}

/** Index-keyed, so playback never targets the wrong outlet's footage */
function registerVideo(element: unknown, index: number) {
  if (element instanceof HTMLVideoElement) {
    videoElements.value[index] = element
  }
}

/** Only the outlet on screen decodes frames; the rest stay paused */
function syncPlayback() {
  videoElements.value.forEach((video, index) => {
    const shouldPlay = isStageStacked.value
      && isSectionVisible.value
      && index === activeIndex.value

    if (shouldPlay && video.paused) {
      video.play().catch(() => {
        // Autoplay rejected: the poster image simply remains
      })
    }
    else if (!shouldPlay && !video.paused) {
      video.pause()
    }
  })
}

watch([activeIndex, isStageStacked, isSectionVisible], syncPlayback)

onMounted(async () => {
  shouldPlayVideo.value = !prefersReducedMotion.value
    && window.matchMedia('(min-width: 1024px)').matches

  await nextTick()

  const sectionElement = sectionRef.value
  const stageElement = stageRef.value

  if (!sectionElement || !stageElement || !gsap || !ScrollTrigger || prefersReducedMotion.value) {
    return
  }

  // Playback follows what is actually on screen. A ScrollTrigger cannot answer
  // that here: the pin makes this very section position: fixed, so a trigger on
  // it reports "gone" while the stage is still filling the viewport. An
  // observer watches the rendered box instead, pinned or not.
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isSectionVisible.value = entry?.isIntersecting ?? false
  })

  visibilityObserver.observe(sectionElement)
  addCleanup(() => visibilityObserver.disconnect())

  const mediaMatcher = gsap.matchMedia()

  // The pinned stage only exists on large screens; narrower viewports keep the
  // readable stacked panels
  mediaMatcher.add('(min-width: 1024px)', () => {
    const context = createContext(() => {
      const mediaLayers = gsap.utils.toArray<HTMLElement>('[data-dining-media]', stageElement)
      const copyLayers = gsap.utils.toArray<HTMLElement>('[data-dining-copy]', stageElement)

      if (mediaLayers.length < 2) {
        return
      }

      const stepCount = mediaLayers.length - 1
      const headerHeight = readHeaderHeight()

      // Only the first outlet is visible at rest; the rest wait, slightly
      // overscaled, so their reveal carries a settle rather than a hard cut
      mediaLayers.forEach((layer, index) => {
        gsap.set(layer, { autoAlpha: index === 0 ? 1 : 0, scale: index === 0 ? 1 : 1.08 })
      })
      copyLayers.forEach((layer, index) => {
        gsap.set(layer, { autoAlpha: index === 0 ? 1 : 0, y: index === 0 ? 0 : 28 })
      })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          // Rest the stage directly under the fixed header, so the footage
          // fills the viewport below the navbar
          start: () => `top top+=${headerHeight}`,
          end: () => `+=${mediaLayers.length * window.innerHeight * 0.8}`,
          pin: true,
          scrub: 0.8,
          // Always settle on a whole outlet, never mid-crossfade
          snap: {
            snapTo: 1 / stepCount,
            duration: { min: 0.25, max: 0.6 },
            ease: 'power2.out',
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            activeIndex.value = Math.min(
              venues.length - 1,
              Math.max(0, Math.round(self.progress * stepCount)),
            )
          },
        },
      })

      for (let index = 1; index < mediaLayers.length; index += 1) {
        const step = index - 1

        timeline
          // Copy leaves first — the frame is still changing behind it
          .to(copyLayers[step] as HTMLElement, {
            autoAlpha: 0,
            y: -28,
            duration: 0.4,
            ease: 'power2.in',
          }, step)
          .to(mediaLayers[step] as HTMLElement, {
            autoAlpha: 0,
            scale: 1.06,
            duration: 1,
            ease: 'none',
          }, step)
          .to(mediaLayers[index] as HTMLElement, {
            autoAlpha: 1,
            scale: 1,
            duration: 1,
            ease: 'none',
          }, step)
          // ...and the new copy arrives once the new frame has taken hold
          .to(copyLayers[index] as HTMLElement, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          }, step + 0.5)
      }

      timeline.fromTo(progressRef.value, {
        scaleX: 1 / mediaLayers.length,
      }, {
        scaleX: 1,
        duration: stepCount,
        ease: 'none',
      }, 0)

    }, sectionElement)

    isStageStacked.value = true

    return () => {
      isStageStacked.value = false
      isSectionVisible.value = false
      context?.revert()
    }
  })

  addCleanup(() => {
    mediaMatcher.revert()

    // Stop decoding and let the browser release the buffers
    videoElements.value.forEach((video) => {
      video.pause()
      video.removeAttribute('src')
      video.load()
    })
    videoElements.value = []
  })
})
</script>

<style scoped>
/* Pinned full-bleed stage: the viewport minus the fixed header, so the footage
   sits directly below the navbar. Only where the pin actually runs — mobile and
   reduced motion keep the stacked panels in normal flow. */
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  .dining-stage {
    position: relative;
    height: calc(100svh - var(--header-height));
    overflow: hidden;
  }

  .dining-slide {
    height: 100%;
    width: 100%;
  }
}
</style>
