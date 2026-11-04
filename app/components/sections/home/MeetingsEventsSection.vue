<template>
  <!--
    Meetings & Events: three venue photographs. On hover or keyboard focus
    (large screens with a pointer) each card flips to reveal its name,
    description and actions; touch devices and reduced-motion users get the
    photo with the same details stacked beneath it instead of a flip.
  -->
  <BaseSection
    id="meetings-events"
    labelled-by="meetings-events-title"
    tone="paper"
    spacing="lg"
    container-size="xl"
  >
    <FadeReveal>
      <BaseTitle id="meetings-events-title">Meetings &amp; Events</BaseTitle>
    </FadeReveal>

    <FadeReveal :stagger="0.08">
      <ul class="mt-10 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-5">
        <li
          v-for="venue in venues"
          :key="venue.id"
          data-reveal-item
          class="venue-card"
        >
          <article class="venue-card-inner" :aria-label="venue.name">
            <div class="venue-face relative aspect-[4/3] overflow-hidden bg-line/40">
              <BaseImage
                :src="venue.image.src"
                :alt="venue.image.alt"
                :width="1054"
                :height="1200"
                sizes="xs:100vw sm:100vw lg:33vw xl:527px"
                class="absolute inset-0"
              />
            </div>

            <div
              class="venue-face venue-face-back flex flex-col gap-8 bg-white p-6"
            >
              <h3 class="font-display text-3xl text-ink sm:text-4xl">
                {{ venue.name }}
              </h3>

              <div class="flex flex-col gap-8">
                <p class="text-sm leading-6 text-muted xl:text-base">
                  {{ venue.description }}
                </p>

                <div class="flex flex-wrap gap-4">
                  <BaseArrowCta
                    variant="gold"
                    @click="
                      openReservation({
                        name: venue.name,
                        image: venue.image.src,
                      })
                    "
                  >
                    Book Space
                  </BaseArrowCta>
                  <BaseArrowCta
                    variant="gold-outline"
                    @click="isDetailsOpen = true"
                  >
                    View Details
                  </BaseArrowCta>
                </div>
              </div>
            </div>
          </article>
        </li>
      </ul>
    </FadeReveal>
  </BaseSection>

  <!-- Venue details reuse the same shared popup as the rooms section -->
  <RoomDetailsDialog v-model:open="isDetailsOpen" />

  <!-- "Book Space" opens this modal pre-filled with the clicked venue -->
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
    capacities: [{ layout: "Boardroom", guests: 12 }],
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
</script>

<style scoped>
/* Flip only where hover exists and motion is welcome; everywhere else the
   photo and details simply stack, so nothing is hover-only. */
@media (min-width: 1024px) and (hover: hover) and (prefers-reduced-motion: no-preference) {
  .venue-card {
    height: 600px;
    perspective: 1600px;
  }

  .venue-card-inner {
    position: relative;
    height: 100%;
    transform-style: preserve-3d;
    /* Slow, symmetric ease-in-out: the premium ease front-loads its motion
       and reads as a snap on a half-turn */
    transition: transform 1100ms cubic-bezier(0.65, 0, 0.35, 1);
  }

  .venue-card:hover .venue-card-inner,
  .venue-card:focus-within .venue-card-inner {
    transform: rotateY(180deg);
  }

  .venue-face {
    position: absolute;
    inset: 0;
    aspect-ratio: auto;
    backface-visibility: hidden;
  }

  .venue-face-back {
    justify-content: space-between;
    overflow: hidden;
    transform: rotateY(180deg);
  }
}
</style>
