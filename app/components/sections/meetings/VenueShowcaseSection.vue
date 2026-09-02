<script setup lang="ts">
import type { Component } from "vue";
import RoundTableIcon from "~/components/icons/RoundTableIcon.vue";

interface CapacityItem {
  label: string;
  guests: string;
  icon: Component;
}

interface VenueShowcase {
  id: string;
  name: string;
  description: string;
  area: string;
  capacities: CapacityItem[];
  images: {
    feature: { src: string; alt: string };
    lounge: { src: string; alt: string };
    architectural: { src: string; alt: string };
  };
}

const idealForItems = [
  "Corporate Meetings",
  "Business Conferences",
  "Executive Seminars",
  "Professional Workshops",
  "Receptions",
];

const phoneNumber = "+88-01713377700";

const venues: VenueShowcase[] = [
  {
    id: "banquet-hall",
    name: "Banquet hall ",
    description:
      "Located on the ground floor, this expansive and versatile venue is designed to host large gatherings with ease, accommodating up to 90 guests. Ideal for conferences, seminars, corporate events, and social celebrations alike, the space offers the flexibility to be configured according to your specific event requirements, including the setup of a stage and speaker podium for presentations, keynote addresses, or ceremonial functions. Guests can stay seamlessly connected throughout their event with complimentary high-speed Wi-Fi, ensuring smooth communication and connectivity ",
    area: "268 sqm.",
    capacities: [
      { label: "Roundtable", guests: "90 Guests", icon: RoundTableIcon },
    ],
    images: {
      feature: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Business Class Lounge at Q Hotel Dhaka",
      },
      lounge: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Lounge seating area at Q Hotel Dhaka",
      },
      architectural: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Elegant lobby interior at Q Hotel Dhaka",
      },
    },
  },
  {
    id: "Banquet Hall 02",
    name: "Conference hall 1",
    description:
      "Located on the second floor, this elegantly appointed boardroom offers a private and professional setting for small, focused meetings. Comfortably accommodating up to 12 guests, the space is ideal for board meetings, executive discussions, interviews, and strategic planning sessions where privacy and productivity are essential. The refined ambiance and thoughtful layout make it well-suited for high-level business engagements requiring an intimate, distraction-free environment  ",
    area: "56 sq. ft.",
    capacities: [
      { label: "Boardroom", guests: "12 Guests", icon: RoundTableIcon },
    ],
    images: {
      feature: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Business Class Lounge at Q Hotel Dhaka",
      },
      lounge: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Lounge seating area at Q Hotel Dhaka",
      },
      architectural: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Elegant lobby interior at Q Hotel Dhaka",
      },
    },
  },
  {
    id: "banquet-hall-03",
    name: "Conference/Banquet hall 2",
    description:
      "Located on the fourth floor, this versatile conference and banqueting facility is designed to adapt seamlessly to a wide range of event requirements. The space can be arranged as an elegant round-table banquet setup, ideal for weddings, gala dinners, and social celebrations, or divided using movable partitions into three individual meeting facilities, perfect for hosting simultaneous conferences, workshops, or corporate discussions. This flexibility allows the venue to cater to the specific nature and scale of any event, whether it calls for one grand gathering or multiple private business sessions",
    area: "166 sqm.",
    capacities: [
      { label: "Roundtable", guests: "72 Guests", icon: RoundTableIcon },
    ],
    images: {
      feature: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Business Class Lounge at Q Hotel Dhaka",
      },
      lounge: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Lounge seating area at Q Hotel Dhaka",
      },
      architectural: {
        src: "/images/meetings/banquet-hall-1.png",
        alt: "Elegant lobby interior at Q Hotel Dhaka",
      },
    },
  },
];

const {
  isReservationOpen,
  isSubmittedOpen,
  submittedDetails,
  selectedVenue,
  openReservation,
  handleReservationSubmit,
} = useEventReservation({
  name: venues[0]!.name,
  image: venues[0]!.images.feature.src,
});
</script>

<!--
  Event venue showcase: one shared heading, then every venue (Business Class
  Lounge, Utshab Banquet Hall, Royal Lounge) repeats the same asymmetric
  3-column editorial card — large feature image (50%), middle column with a
  lounge image over an "Ideal For" panel, right column with a content panel
  over a second image — followed by its own Capacity Overview + Equipment &
  Services block. Warm cream palette, small 10px gaps, subtle image hover
  zoom. Tablet collapses to 2 columns; mobile stacks in the editorial order:
  feature, content, image, panel, image.

  Every venue's "Book Space" opens the same reservation modal, pre-filled
  with that venue's name and photo.
-->
<template>
  <section
    aria-labelledby="venue-showcase-title"
    class="bg-[#F5F1E9] text-[#171717]"
  >
    <BaseContainer size="xl" class="pt-16 lg:pt-24">
      <FadeReveal>
        <div class="mb-14 flex flex-col items-center text-center">
          <BaseKicker>Our event spaces</BaseKicker>
          <h2
            id="venue-showcase-title"
            class="mt-6 font-display text-4xl text-ink sm:text-5xl"
          >
            Find The Perfect Venue
          </h2>
        </div>
      </FadeReveal>
    </BaseContainer>

    <!-- Each venue's card is followed by its own Capacity Overview + Equipment
         & Services block, so the two stay a single repeating unit per venue -->
    <template v-for="(venue, venueIndex) in venues" :key="venue.id">
      <BaseContainer size="xl" :class="venueIndex > 0 ? 'pt-14' : ''">
        <div
          class="grid gap-2.5 md:grid-cols-2 lg:grid-cols-[5fr_2.4fr_2.6fr] lg:grid-rows-2"
        >
          <!-- Large feature image — left, spans both rows on desktop -->
          <FadeReveal
            direction="up"
            :distance="24"
            start="top 92%"
            class="md:col-start-1 md:row-start-1 md:row-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-2"
          >
            <div
              class="group relative h-72 overflow-hidden sm:h-96 md:h-full md:min-h-[26rem] lg:min-h-[38rem]"
            >
              <BaseImage
                :src="venue.images.feature.src"
                :alt="venue.images.feature.alt"
                :width="1200"
                :height="900"
                sizes="xs:100vw sm:100vw md:50vw lg:50vw"
                class="transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.02]"
              />
            </div>
          </FadeReveal>

          <!-- Content panel — heading, divider, description (mobile order #2) -->
          <FadeReveal
            direction="up"
            :distance="24"
            start="top 92%"
            class="md:col-start-2 md:row-start-1 lg:col-start-3 lg:row-start-1"
          >
            <div class="flex h-full flex-col justify-between bg-[#FAF8F3] p-5">
              <h3
                :id="`venue-${venue.id}-title`"
                class="font-display text-3xl text-[#171717] sm:text-4xl font-semibold border-b border-[#50515526] pb-2.5"
              >
                {{ venue.name }}
              </h3>
              <p class="text-sm text-[#505155]">
                {{ venue.description }}
              </p>
            </div>
          </FadeReveal>

          <!-- Medium lounge image — middle column, top (mobile order #3) -->
          <FadeReveal
            direction="up"
            :distance="24"
            start="top 92%"
            class="md:col-start-2 md:row-start-2 lg:col-start-2 lg:row-start-1"
          >
            <div
              class="group relative h-56 overflow-hidden sm:h-72 md:h-full md:min-h-[16rem]"
            >
              <BaseImage
                :src="venue.images.lounge.src"
                :alt="venue.images.lounge.alt"
                :width="800"
                :height="600"
                sizes="xs:100vw sm:100vw md:50vw lg:24vw"
                class="transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.02]"
              />
            </div>
          </FadeReveal>

          <!-- Ideal For panel + Book Space button (mobile order #4) -->
          <FadeReveal
            direction="up"
            :distance="24"
            start="top 92%"
            class="md:col-start-1 md:row-start-3 lg:col-start-2 lg:row-start-2"
          >
            <div
              class="flex h-full flex-col justify-between gap-8 bg-[#FAF8F3] p-5"
            >
              <p
                class="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#A75B27]"
              >
                Ideal For
              </p>
              <ul class="space-y-3.5">
                <li
                  v-for="item in idealForItems"
                  :key="item"
                  class="flex items-center gap-3"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 7.104V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H11.5627"
                      stroke="#D78C38"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 7.33073L8 9.33073L14.6667 2.66406"
                      stroke="#D78C38"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span class="text-base text-[#505155]">{{ item }}</span>
                </li>
              </ul>

              <BaseArrowCta
                variant="gold"
                class="self-start"
                @click="
                  openReservation({
                    name: venue.name,
                    image: venue.images.feature.src,
                  })
                "
              >
                Book Space
              </BaseArrowCta>
            </div>
          </FadeReveal>

          <!-- Architectural image — right column, bottom (mobile order #5) -->
          <FadeReveal
            direction="up"
            :distance="24"
            start="top 92%"
            class="md:col-start-2 md:row-start-3 lg:col-start-3 lg:row-start-2"
          >
            <div
              class="group relative h-56 overflow-hidden sm:h-72 md:h-full md:min-h-[16rem]"
            >
              <BaseImage
                :src="venue.images.architectural.src"
                :alt="venue.images.architectural.alt"
                :width="800"
                :height="600"
                sizes="xs:100vw sm:100vw md:50vw lg:26vw"
                class="transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.02]"
              />
            </div>
          </FadeReveal>
        </div>
      </BaseContainer>

      <CapacityOverviewSection :capacities="venue.capacities" :area="venue.area" />
    </template>

    <EventReservationModal
      v-model="isReservationOpen"
      :venue-name="selectedVenue.name"
      :venue-image="selectedVenue.image"
      :phone-number="phoneNumber"
      @submit="handleReservationSubmit"
    />

    <EventReservationSubmittedModal
      v-model="isSubmittedOpen"
      :details="submittedDetails"
    />
  </section>
</template>
