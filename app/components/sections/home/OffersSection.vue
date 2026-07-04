<template>
  <!--
    Offers & Packages: a scroll-snap teaser carousel of tall offer cards with
    paging arrows and a scroll-linked progress rule, as in the Figma design.
    Native horizontal scrolling keeps it touch, keyboard, and screen-reader
    friendly without extra JavaScript weight.
  -->
  <BaseSection id="offers" labelled-by="offers-title" tone="paper" spacing="lg" container-size="xl">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Only For You</BaseKicker>
        <h2 id="offers-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
          Offers &amp; Packages
        </h2>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div
        ref="carouselViewportRef"
        class="scrollbar-quiet -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:mt-16 lg:px-0 motion-reduce:scroll-auto"
        aria-label="Current offers and packages"
      >
        <article
          v-for="offer in offers"
          :key="offer.id"
          data-carousel-card
          class="group relative w-[78vw] max-w-sm shrink-0 snap-start sm:w-[46%] lg:w-[calc((100%-3rem)/3)] lg:max-w-none"
        >
          <div class="relative aspect-[27/35] overflow-hidden bg-line/40">
            <BaseImage
              :src="offer.image.src"
              :alt="offer.image.alt"
              :width="1080"
              :height="1400"
              sizes="xs:78vw sm:46vw lg:33vw xl:540px"
              class="absolute inset-0 transition-transform duration-slow ease-premium motion-safe:group-hover:scale-105"
            />
            <!-- Hover/focus affordance; the card link itself carries the action -->
            <span
              class="pointer-events-none absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-champagne px-4 py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-night opacity-0 transition-opacity duration-normal group-focus-within:opacity-100 motion-safe:group-hover:opacity-100"
              aria-hidden="true"
            >
              More Details
              <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          </div>

          <h3 class="mt-5 font-display text-2xl text-ink">
            <NuxtLink to="#reserve" class="offer-card-link focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean">
              {{ offer.title }}
            </NuxtLink>
          </h3>
          <p class="mt-2.5 line-clamp-3 text-sm leading-6 text-muted">
            {{ offer.description }}
          </p>
        </article>
      </div>
    </FadeReveal>

    <!-- Paging controls + scroll-linked progress rule -->
    <div class="mt-10 flex items-center justify-center gap-5">
      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors duration-fast enabled:hover:border-copper enabled:hover:text-copper disabled:opacity-40"
        :disabled="!canScrollBack"
        aria-label="Previous offers"
        @click="scrollByCard(-1)"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m0 0l6-6m-6 6l6 6" />
        </svg>
      </button>

      <div class="carousel-progress h-px w-40 bg-line" aria-hidden="true" />

      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors duration-fast enabled:hover:border-copper enabled:hover:text-copper disabled:opacity-40"
        :disabled="!canScrollForward"
        aria-label="Next offers"
        @click="scrollByCard(1)"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-6-6m6 6l-6 6" />
        </svg>
      </button>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { OfferPackage } from '~/types/offer'

/** Static teaser content (CMS-ready shape); offer detail pages come later */
const offers: OfferPackage[] = [
  {
    id: 'readymade-meal',
    title: 'Readymade Meal For You',
    description: 'Arrive to a table already set — a chef-prepared welcome meal served in-room or at the restaurant, timed to your check-in.',
    image: { src: '/images/offers/readymade-meal.jpg', alt: 'Gourmet burger platter with fries and onion rings on dark slate' },
  },
  {
    id: 'stressless-spa',
    title: 'Most Stressless Spa',
    description: 'A full-body signature treatment with warm oils and quiet hands — unwind completely before dinner without leaving the hotel.',
    image: { src: '/images/offers/stressless-spa.jpg', alt: 'Spa therapist giving a relaxing back massage by candlelight' },
  },
  {
    id: 'unlimited-swimming',
    title: 'Unlimited Time Swimming',
    description: 'All-day access to the outdoor pool for the length of your stay — morning laps, afternoon floats, and golden-hour swims included.',
    image: { src: '/images/offers/swimming.jpg', alt: 'Sunlit swimming pool with a chrome ladder and clear turquoise water' },
  },
  {
    id: 'stroke-ready',
    title: 'Stroke Ready For You',
    description: 'A targeted deep-tissue session tuned for travelers — release long-flight shoulders and desk-day backs in fifty focused minutes.',
    image: { src: '/images/offers/stressless-spa.jpg', alt: 'Massage therapist easing tension across a guest\'s shoulders' },
  },
]

const carouselViewportRef = ref<HTMLElement | null>(null)
const { scrollProgress, canScrollBack, canScrollForward, scrollByCard } = useScrollCarousel(carouselViewportRef)

/** Progress consumed by the scoped rule via CSS variable (no inline styles) */
const progressStyle = computed(() => `${Math.round(scrollProgress.value * 100)}%`)
</script>

<style scoped>
/* Stretched link: the title link's hit area covers the whole card */
.offer-card-link::after {
  content: '';
  inset: 0;
  position: absolute;
}

/* Hide the horizontal scrollbar without disabling scrolling */
.scrollbar-quiet {
  scrollbar-width: none;
}

.scrollbar-quiet::-webkit-scrollbar {
  display: none;
}

/* Scroll-linked progress rule: width comes from the carousel composable */
.carousel-progress {
  position: relative;
}

.carousel-progress::after {
  background: rgb(var(--color-copper));
  content: '';
  inset: 0 auto 0 0;
  position: absolute;
  transition: width var(--duration-fast) linear;
  width: v-bind(progressStyle);
}
</style>
