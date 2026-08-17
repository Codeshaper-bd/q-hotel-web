<!--
  Business Class Lounge editorial section: an asymmetric 3-column grid —
  large feature image (50%), middle column with a lounge image over an
  "Ideal For" panel, right column with a content panel over a second
  image. Warm cream palette, small 10px gaps, subtle image hover zoom.
  Tablet collapses to 2 columns; mobile stacks in the editorial order:
  feature, content, image, panel, image.
-->
<template>
  <section
    aria-labelledby="business-lounge-title"
    class="bg-[#F5F1E9] text-[#171717]"
  >
    <BaseContainer size="xl" class="pt-16 lg:pt-24">
      <FadeReveal>
        <div class="mb-14 flex flex-col items-center text-center">
          <BaseKicker>Our event spaces</BaseKicker>
          <h2
            id="dining-section-title"
            class="mt-6 font-display text-4xl text-ink sm:text-5xl"
          >
            Find The Perfect Vanue
          </h2>
        </div>
      </FadeReveal>
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
              src="/images/meetings/venue-1.png"
              alt="Business Class Lounge at Q Hotel Dhaka"
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
            <h2
              id="business-lounge-title"
              class="font-display text-3xl text-[#171717] sm:text-4xl font-semibold border-b border-[#50515526] pb-2.5"
            >
              Business Class Lounge
            </h2>
            <p class="text-base text-[#505155]">
              Adjacent to the Business Class lounge, this private space on the
              eighth floor accommodates up to 13 guests and is exclusively
              available to Radisson Club members. High-speed Wi-Fi and other
              secretarial facilities are available for an additional fee.
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
              src="/images/meetings/venue-2.png"
              alt="Lounge seating area at Q Hotel Dhaka"
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

            <BaseArrowCta to="#reserve" variant="gold" class="self-start">
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
              src="/images/meetings/venue-3.png"
              alt="Elegant lobby interior at Q Hotel Dhaka"
              :width="800"
              :height="600"
              sizes="xs:100vw sm:100vw md:50vw lg:26vw"
              class="transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.02]"
            />
          </div>
        </FadeReveal>
      </div>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
const idealForItems = [
  "Corporate Meetings",
  "Business Conferences",
  "Executive Seminars",
  "Professional Workshops",
  "Receptions",
];
</script>
