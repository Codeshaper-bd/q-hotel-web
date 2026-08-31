<template>
  <!--
    Meetings & Events: venue cards with a photograph beside capacity and
    venue-size facts, framed by a fine gold rule as in the Figma design. On
    large screens the heading holds while the cards stack beneath it as a deck
    (position: sticky, each card resting a little lower than the one before);
    small screens and reduced-motion keep a plain readable flow.
  -->
  <BaseSection
    id="meetings-events"
    labelled-by="meetings-events-title"
    tone="paper"
    spacing="lg"
    container-size="xl"
  >
    <div ref="blockRef" class="venue-block">
      <div ref="headingRef" class="venue-heading">
        <FadeReveal>
          <div class="flex flex-col items-center text-center">
            <BaseKicker>Host With Us</BaseKicker>
            <h2
              id="meetings-events-title"
              class="mt-6 font-display text-4xl text-ink sm:text-5xl lg:text-[56px] font-semibold"
            >
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
            <h3
              class="font-display text-3xl text-ink sm:text-4xl lg:text-[44px] font-semibold"
            >
              {{ venue.name }}
            </h3>

            <p
              class="mt-4 text-sm leading-7 text-muted sm:text-base lg:text-lg font-medium"
            >
              {{ venue.description }}
            </p>

            <div class="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <h4
                  class="font-display text-xl text-ink lg:text-2xl font-semibold"
                >
                  Capacity:
                </h4>
                <ul class="mt-4 space-y-2.5 text-sm text-ink/80">
                  <li
                    v-for="capacity in venue.capacities"
                    :key="capacity.layout"
                    class="flex items-center gap-2.5 text-base"
                  >
                    <svg
                      class="h-4 w-4 shrink-0 text-copper"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5"
                      />
                    </svg>
                    {{ capacity.layout }}: {{ capacity.guests }} Guests
                  </li>
                </ul>
              </div>

              <div>
                <h4
                  class="font-display text-xl text-ink lg:text-2xl font-semibold"
                >
                  Venue Size:
                </h4>
                <ul class="mt-4 space-y-2.5 text-base text-ink/80">
                  <li class="flex items-center gap-2.5">
                    <svg
                      class="h-4 w-4 shrink-0 text-copper"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5"
                      />
                    </svg>
                    {{ venue.areaLabel }}
                  </li>
                  <li
                    v-if="venue.dimensionsLabel"
                    class="flex items-center gap-2.5"
                  >
                    <svg
                      class="h-4 w-4 shrink-0 text-copper"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 4.5h15v15h-15z M8 12.5l2.5 2.5L16 9.5"
                      />
                    </svg>
                    Dimensions: {{ venue.dimensionsLabel }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-8 flex flex-wrap gap-4 lg:mt-auto lg:pt-8">
              <BaseArrowCta
                variant="gold"
                @click="openReservation({ name: venue.name, image: venue.image.src })"
              >
                Book Space
              </BaseArrowCta>
              <BaseArrowCta variant="ghost" @click="isDetailsOpen = true">
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

  <!-- Venue details reuse the same shared popup as the rooms section: both
       are static demo content today, so they stay visually identical until
       each gets its own API-backed data. -->
  <RoomDetailsDialog v-model:open="isDetailsOpen" />

  <!-- Same reservation flow as the Meetings & Events page: "Book Space"
       opens this modal pre-filled with whichever venue was clicked. -->
  <EventReservationModal
    v-model="isReservationOpen"
    :venue-name="selectedVenue.name"
    :venue-image="selectedVenue.image"
    phone-number="+88-01713377700"
    @submit="handleReservationSubmit"
  />

  <EventReservationSubmittedModal
    v-model="isSubmittedOpen"
    :details="submittedDetails"
  />
</template>

<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { MeetingVenue } from "~/types/venue";

/** Static showcase content (CMS-ready shape); venue detail pages come later */
const venues: MeetingVenue[] = [
  {
    id: "banquet-hall-01",
    name: "Banquet hall",
    description:
      "Located on the ground floor, this expansive and versatile venue is designed to host large gatherings with ease, accommodating up to 90 guests. Ideal for conferences, seminars, corporate events, and social celebrations alike, the space offers the flexibility to be configured according to your specific event requirements, including the setup of a stage and speaker podium for presentations, keynote addresses, or ceremonial functions. Guests can stay seamlessly connected throughout their event with complimentary high-speed Wi-Fi, ensuring smooth communication and connectivity.",
    image: {
      src: "/images/meetings/conference-and-banquet.jpg",
      alt: "Banquet hall arranged with round dining tables beneath a coffered ceiling",
    },
    capacities: [{ layout: "Round Table", guests: 90 }],
    areaLabel: "268 sqm.",
    dimensionsLabel: "",
  },
  {
    id: "banquet-hall-02",
    name: "Conference hall 1",
    description:
      "Located on the second floor, this elegantly appointed boardroom offers a private and professional setting for small, focused meetings. Comfortably accommodating up to 12 guests, the space is ideal for board meetings, executive discussions, interviews, and strategic planning sessions where privacy and productivity are essential. The refined ambiance and thoughtful layout make it well-suited for high-level business engagements requiring an intimate, distraction-free environment.",
    image: {
      src: "/images/meetings/conference-and-banquet.jpg",
      alt: "Conference hall arranged with round dining tables beneath a coffered ceiling",
    },
    capacities: [{ layout: "Round Table", guests: 12 }],
    areaLabel: "56 sqm.",
    dimensionsLabel: "",
  },
  {
    id: "banquet-hall-03",
    name: "Conference/Banquet hall 2",
    description:
      "Located on the fourth floor, this versatile conference and banqueting facility is designed to adapt seamlessly to a wide range of event requirements. The space can be arranged as an elegant round-table banquet setup, ideal for weddings, gala dinners, and social celebrations, or divided using movable partitions into three individual meeting facilities, perfect for hosting simultaneous conferences, workshops, or corporate discussions. This flexibility allows the venue to cater to the specific nature and scale of any event, whether it calls for one grand gathering or multiple private business sessions.",
    image: {
      src: "/images/meetings/conference-and-banquet.jpg",
      alt: "Conference and banquet hall arranged with round dining tables beneath a coffered ceiling",
    },
    capacities: [{ layout: "Round Table", guests: 72 }],
    areaLabel: "166 sqm.",
    dimensionsLabel: "",
  },
];

const blockRef = ref<HTMLElement | null>(null);
const headingRef = ref<HTMLElement | null>(null);
const stackRef = ref<HTMLElement | null>(null);

// ─── Venue details popup ────────────────────────────────────────────
const isDetailsOpen = ref(false);

// ─── Reservation modal ──────────────────────────────────────────────
const {
  isReservationOpen,
  isSubmittedOpen,
  submittedDetails,
  selectedVenue,
  openReservation,
  handleReservationSubmit,
} = useEventReservation({
  name: venues[0]!.name,
  image: venues[0]!.image.src,
});

const { gsap, createContext, prefersReducedMotion } = useGsap();
const { addCleanup } = useAnimationCleanup();
const nuxtApp = useNuxtApp();
const ScrollTrigger = nuxtApp.$ScrollTrigger as
  | typeof ScrollTriggerType
  | undefined;

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
  const blockElement = blockRef.value;
  const headingElement = headingRef.value;
  const stackElement = stackRef.value;
  const cards =
    stackElement?.querySelectorAll<HTMLElement>("[data-venue-card]");
  const lastCard = cards?.[cards.length - 1];

  if (!blockElement || !headingElement || !stackElement || !lastCard) {
    return;
  }

  const headingTop =
    Number.parseFloat(window.getComputedStyle(headingElement).top) || 0;
  const cardTop = Number.parseFloat(window.getComputedStyle(lastCard).top) || 0;
  const headingBottom = headingTop + headingElement.offsetHeight;
  const cardBottom = cardTop + lastCard.offsetHeight;

  blockElement.style.setProperty(
    "--venue-heading-hold",
    `${Math.max(0, cardBottom - headingBottom)}px`,
  );

  // The first card must never rest beneath the heading band, or its top
  // border hides behind the paper band while the deck holds on scroll-up.
  // The band's height is content-driven (title wrapping varies by width), so
  // the deck's resting offset is measured: the band's pinned bottom edge plus
  // a beat of breathing room, never less than the designed 10rem runway.
  // Anchored to the heading's own top (= header height), never to a card's
  // current top — that value already includes the deck offset itself.
  const designedRunway = headingTop + 10 * 16;
  const deckTop = Math.max(designedRunway, headingBottom + 8);
  stackElement.style.setProperty("--venue-deck-top", `${deckTop}px`);
}

onMounted(async () => {
  await nextTick();

  const stackElement = stackRef.value;

  if (!stackElement || !gsap || !ScrollTrigger || prefersReducedMotion.value) {
    return;
  }

  const mediaMatcher = gsap.matchMedia();

  // The deck only exists where the cards are sticky (lg and up); everywhere
  // else the plain vertical flow stays untouched.
  mediaMatcher.add("(min-width: 1024px)", () => {
    // Remeasure before ScrollTrigger takes its own measurements, so a resize
    // or a font swap cannot leave the heading holding the wrong distance
    measureHeadingHold();
    ScrollTrigger.addEventListener("refreshInit", measureHeadingHold);

    const context = createContext(() => {
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-venue-card]",
        stackElement,
      );

      if (cards.length < 2) {
        return;
      }

      // Each card recedes and dims while the next one travels up and covers
      // it, so the resting deck reads as depth rather than a flat pile.
      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        if (!nextCard) {
          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            // The next card stops at its own sticky offset, so the cover is
            // complete there — reading it back keeps CSS the single source.
            end: () =>
              `top ${Number.parseFloat(window.getComputedStyle(nextCard).top) || 0}px`,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        // Shrink from the top edge so the strip left peeking above the
        // covering card stays put while the card settles back into the deck
        timeline
          .to(card, { scale: 0.94, transformOrigin: "center top" }, 0)
          .to(card.querySelector("[data-venue-scrim]"), { opacity: 0.55 }, 0);
      });
    }, stackElement);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", measureHeadingHold);
      blockRef.value?.style.removeProperty("--venue-heading-hold");
      stackRef.value?.style.removeProperty("--venue-deck-top");
      context?.revert();
    };
  });

  addCleanup(() => mediaMatcher.revert());
});
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
    /* Deck rests below the held heading, not under the header. Measured at
       runtime (like the heading hold) so the first card clears the heading
       band; this 10rem value is the no-JS fallback */
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
