<template>
  <!--
    Meetings & Events: venue cards with a photograph beside capacity and
    venue-size facts, framed by a fine gold rule as in the Figma design. On
    large screens the heading holds while the cards stack beneath it as a deck
    (position: sticky, each card resting a little lower than the one before);
    small screens and reduced-motion keep a plain readable flow.
  -->
  <BaseSection id="meetings-events" labelled-by="meetings-events-title" tone="paper" spacing="lg" container-size="xl">
    <div ref="blockRef" class="venue-block">
      <div ref="headingRef" class="venue-heading">
        <FadeReveal>
          <div class="flex flex-col items-center text-center">
            <BaseKicker>Host With Us</BaseKicker>
            <h2 id="meetings-events-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
              Meetings &amp; Events
            </h2>
          </div>
        </FadeReveal>
      </div>

      <div ref="stackRef" class="venue-stack">
        <article
          v-for="(venue, venueIndex) in venues"
          :key="venue.id"
          :data-venue-card="venueIndex"
          class="venue-card relative grid gap-8 border border-gold/50 bg-paper p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10"
        >
          <!-- Dims a card as the next one covers it. A scrim rather than card
               opacity, so the covered card stays opaque and never shows the
               cards resting beneath it through its own background. -->
          <div
            data-venue-scrim
            class="pointer-events-none absolute inset-0 z-10 bg-paper opacity-0"
            aria-hidden="true"
          />

          <div class="relative aspect-[3/2] overflow-hidden bg-line/40">
            <BaseImage
              :src="venue.image.src"
              :alt="venue.image.alt"
              :width="1596"
              :height="1012"
              sizes="xs:100vw sm:100vw lg:50vw xl:800px"
              class="absolute inset-0"
            />
          </div>

          <div class="flex flex-col">
            <h3 class="font-display text-3xl text-ink sm:text-4xl">
              {{ venue.name }}
            </h3>

            <p class="mt-4 text-sm leading-7 text-muted sm:text-base">
              {{ venue.description }}
            </p>

            <div class="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 class="font-display text-xl text-ink">Capacity:</h4>
                <ul class="mt-4 space-y-2.5 text-sm text-ink/80">
                  <li
                    v-for="capacity in venue.capacities"
                    :key="capacity.layout"
                    class="flex items-center gap-2.5"
                  >
                    <svg class="h-4 w-4 shrink-0 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5" />
                    </svg>
                    {{ capacity.layout }}: {{ capacity.guests }} Guests
                  </li>
                </ul>
              </div>

              <div>
                <h4 class="font-display text-xl text-ink">Venue Size:</h4>
                <ul class="mt-4 space-y-2.5 text-sm text-ink/80">
                  <li class="flex items-center gap-2.5">
                    <svg class="h-4 w-4 shrink-0 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5" />
                    </svg>
                    Area: {{ venue.areaLabel }}
                  </li>
                  <li class="flex items-center gap-2.5">
                    <svg class="h-4 w-4 shrink-0 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5" />
                    </svg>
                    Dimensions: {{ venue.dimensionsLabel }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-4 lg:mt-auto lg:pt-8">
              <BaseArrowCta to="#reserve" variant="gold">
                Book Space
              </BaseArrowCta>
              <BaseArrowCta to="#reserve" variant="ghost">
                View Details
              </BaseArrowCta>
            </div>
          </div>
        </article>

        <!-- Trailing block that gives the last card room to stick, so the
             finished deck rests on screen for a beat. It must be a sibling: a
             margin on the card itself shrinks its own sticky rect by the same
             amount, and container padding sits outside the sticky rect. -->
        <div class="venue-stack-spacer" aria-hidden="true" />
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger'
import type { MeetingVenue } from '~/types/venue'

/** Static showcase content (CMS-ready shape); venue detail pages come later */
const venues: MeetingVenue[] = [
  {
    id: 'business-class-lounge',
    name: 'Business Class Lounge',
    description: 'Adjacent to the Business Class lounge, this private space on the eighth floor accommodates intimate gatherings and full receptions alike. High-speed Wi-Fi and secretarial facilities are available on request.',
    image: { src: '/images/meetings/business-class-lounge.jpg', alt: 'Business Class Lounge with warm armchairs arranged around a round table under a coved ceiling' },
    capacities: [
      { layout: 'Theater', guests: 400 },
      { layout: 'Classroom', guests: 170 },
      { layout: 'U-Shape', guests: 120 },
      { layout: 'Reception', guests: 500 },
      { layout: 'Banquet', guests: 200 },
    ],
    areaLabel: '5,721 sq. ft.',
    dimensionsLabel: '99.6 ft × 57.6 ft × 22 ft',
  },
  {
    id: 'grand-ballroom',
    name: 'Grand Ballroom',
    description: 'Our largest pillar-free venue, suited to weddings, galas, and conferences. Dedicated pre-function space, staging, and in-house catering let one team carry an event from arrival to last dance.',
    image: { src: '/images/meetings/business-class-lounge.jpg', alt: 'Grand Ballroom seating arranged banquet-style beneath warm cove lighting' },
    capacities: [
      { layout: 'Theater', guests: 650 },
      { layout: 'Classroom', guests: 300 },
      { layout: 'U-Shape', guests: 160 },
      { layout: 'Reception', guests: 800 },
      { layout: 'Banquet', guests: 400 },
    ],
    areaLabel: '8,940 sq. ft.',
    dimensionsLabel: '124 ft × 72 ft × 24 ft',
  },
  {
    id: 'executive-boardroom',
    name: 'Executive Boardroom',
    description: 'A quiet, fixed-table boardroom for leadership meetings and private negotiations — video conferencing, writable walls, and butler service within arm’s reach.',
    image: { src: '/images/meetings/business-class-lounge.jpg', alt: 'Executive Boardroom with a fixed conference table and upholstered chairs' },
    capacities: [
      { layout: 'Boardroom', guests: 18 },
      { layout: 'U-Shape', guests: 14 },
      { layout: 'Theater', guests: 30 },
      { layout: 'Classroom', guests: 20 },
      { layout: 'Reception', guests: 40 },
    ],
    areaLabel: '780 sq. ft.',
    dimensionsLabel: '36 ft × 22 ft × 12 ft',
  },
]

const blockRef = ref<HTMLElement | null>(null)
const headingRef = ref<HTMLElement | null>(null)
const stackRef = ref<HTMLElement | null>(null)

const { gsap, createContext, prefersReducedMotion } = useGsap()
const { addCleanup } = useAnimationCleanup()
const nuxtApp = useNuxtApp()
const ScrollTrigger = nuxtApp.$ScrollTrigger as typeof ScrollTriggerType | undefined

/**
 * Distance the heading must stop sticking early so it leaves with the deck.
 *
 * A sticky element releases when its own bottom edge meets the bottom of its
 * sticky rect, and that rect is the containing block shrunk by the element's
 * margins. The heading and the deck share a containing block, but the heading
 * rests far higher up the viewport than a full-height card, so on its own it
 * would keep sticking long after the last card has gone — leaving the title
 * stranded over empty paper. Giving it exactly that difference as a bottom
 * margin shrinks its rect by the same amount, and the two release together.
 */
function measureHeadingHold() {
  const blockElement = blockRef.value
  const headingElement = headingRef.value
  const stackElement = stackRef.value
  const cards = stackElement?.querySelectorAll<HTMLElement>('[data-venue-card]')
  const lastCard = cards?.[cards.length - 1]

  if (!blockElement || !headingElement || !lastCard) {
    return
  }

  const headingTop = Number.parseFloat(window.getComputedStyle(headingElement).top) || 0
  const cardTop = Number.parseFloat(window.getComputedStyle(lastCard).top) || 0
  const headingBottom = headingTop + headingElement.offsetHeight
  const cardBottom = cardTop + lastCard.offsetHeight

  blockElement.style.setProperty('--venue-heading-hold', `${Math.max(0, cardBottom - headingBottom)}px`)
}

onMounted(async () => {
  await nextTick()

  const stackElement = stackRef.value

  if (!stackElement || !gsap || !ScrollTrigger || prefersReducedMotion.value) {
    return
  }

  const mediaMatcher = gsap.matchMedia()

  // The deck only exists where the cards are sticky (lg and up); everywhere
  // else the plain vertical flow stays untouched.
  mediaMatcher.add('(min-width: 1024px)', () => {
    // Remeasure before ScrollTrigger takes its own measurements, so a resize
    // or a font swap cannot leave the heading holding the wrong distance
    measureHeadingHold()
    ScrollTrigger.addEventListener('refreshInit', measureHeadingHold)

    const context = createContext(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-venue-card]', stackElement)

      if (cards.length < 2) {
        return
      }

      // Each card recedes and dims while the next one travels up and covers
      // it, so the resting deck reads as depth rather than a flat pile.
      cards.forEach((card, index) => {
        const nextCard = cards[index + 1]
        if (!nextCard) {
          return
        }

        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: nextCard,
            start: 'top bottom',
            // The next card stops at its own sticky offset, so the cover is
            // complete there — reading it back keeps CSS the single source.
            end: () => `top ${Number.parseFloat(window.getComputedStyle(nextCard).top) || 0}px`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })

        // Shrink from the top edge so the strip left peeking above the
        // covering card stays put while the card settles back into the deck
        timeline
          .to(card, { scale: 0.94, transformOrigin: 'center top' }, 0)
          .to(card.querySelector('[data-venue-scrim]'), { opacity: 0.55 }, 0)
      })
    }, stackElement)

    return () => {
      ScrollTrigger.removeEventListener('refreshInit', measureHeadingHold)
      blockRef.value?.style.removeProperty('--venue-heading-hold')
      context?.revert()
    }
  })

  addCleanup(() => mediaMatcher.revert())
})
</script>

<style scoped>
/* Flex column, so the heading's hold margin and the stack's cancelling margin
   cannot collapse into each other the way sibling margins do in block flow */
.venue-block {
  display: flex;
  flex-direction: column;
}

/* Plain block flow, not a grid: a grid item's sticky rect is its own grid area
   (one row), which leaves the cards nothing to travel in */
.venue-stack {
  margin-top: 3rem;
}

.venue-card + .venue-card {
  margin-top: 2rem;
}

/* The spacer only earns its keep where the deck exists */
.venue-stack-spacer {
  display: none;
}

/* Sticky deck on large screens: the heading holds under the fixed header while
   each card rests a little lower than the one before it, so the covered cards
   keep a visible top edge and the next card slides over them. Position-driven,
   so it still reads correctly without JS and for reduced motion (the GSAP
   depth pass is the only enhancement). */
@media (min-width: 1024px) {
  /* Holds flush against the fixed header, with the breathing room carried as
     padding rather than a top offset: the background has to be one unbroken
     band, or cards passing behind the heading show through the gap. Paints
     above the deck so they pass behind it cleanly. */
  .venue-heading {
    position: sticky;
    top: var(--header-height);
    z-index: 20;
    background: rgb(var(--color-paper));

    /* The band's breathing room is padding, not a top offset, so the paper
       stays unbroken; the negative margin takes that padding back out of the
       layout, keeping this section's spacing rhythm identical to the others */
    margin-top: -2rem;
    padding-top: 2rem;
    padding-bottom: 1.5rem;

    /* Measured at runtime; the fallback keeps no-JS close enough that the
       heading never strands itself above an empty deck */
    margin-bottom: var(--venue-heading-hold, 30rem);
  }

  .venue-stack {
    /* Deck rests below the held heading, not under the header */
    --venue-deck-top: calc(var(--header-height) + 10rem);

    /* Cancels the heading's hold margin, leaving the shared title-to-content
       gap (4rem, of which the heading's padding-bottom already spends 1.5rem) */
    margin-top: calc(2.5rem - var(--venue-heading-hold, 30rem));
  }

  .venue-card {
    position: sticky;
    top: var(--venue-deck-top);
  }

  .venue-card + .venue-card {
    margin-top: 4rem;
  }

  .venue-stack-spacer {
    display: block;
    height: 8rem;
  }

  /* Each card rests a little lower than the one before, so a covered card
     keeps a visible top edge and the deck reads as depth */
  .venue-card:nth-child(2) {
    top: calc(var(--venue-deck-top) + 1rem);
  }

  .venue-card:nth-child(3) {
    top: calc(var(--venue-deck-top) + 2rem);
  }

  .venue-card:nth-child(4) {
    top: calc(var(--venue-deck-top) + 3rem);
  }

  .venue-card:nth-child(5) {
    top: calc(var(--venue-deck-top) + 4rem);
  }
}
</style>
