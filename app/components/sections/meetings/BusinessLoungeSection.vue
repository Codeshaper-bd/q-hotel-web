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
    <BaseContainer size="xl" class="py-16 lg:py-24">
      <div class="grid gap-2.5 md:grid-cols-2 lg:grid-cols-[5fr_2.4fr_2.6fr] lg:grid-rows-2">
        <!-- Large feature image — left, spans both rows on desktop -->
        <FadeReveal direction="up" :distance="24" start="top 92%" class="md:col-start-1 md:row-start-1 md:row-span-2 lg:col-start-1 lg:row-start-1 lg:row-span-2">
          <div class="group relative h-72 overflow-hidden sm:h-96 md:h-full md:min-h-[26rem] lg:min-h-[38rem]">
            <BaseImage
              src="/images/meetings/business-class-lounge.jpg"
              alt="Business Class Lounge at Q Hotel Dhaka"
              :width="1200"
              :height="900"
              sizes="xs:100vw sm:100vw md:50vw lg:50vw"
              class="transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.02]"
            />
          </div>
        </FadeReveal>

        <!-- Content panel — heading, divider, description (mobile order #2) -->
        <FadeReveal direction="up" :distance="24" start="top 92%" class="md:col-start-2 md:row-start-1 lg:col-start-3 lg:row-start-1">
          <div class="flex h-full flex-col justify-center bg-[#FAF8F3] p-8 lg:p-10">
            <h2
              id="business-lounge-title"
              class="font-display text-3xl text-[#171717] sm:text-4xl"
            >
              Business Class Lounge
            </h2>
            <div class="mt-4 h-px w-14 bg-[#A75B27]/50" aria-hidden="true" />
            <p class="mt-6 text-sm leading-7 text-[#505155]">
              Adjacent to the Business Class Lounge, this private space on the
              eighth floor accommodates up to 13 guests and is exclusively
              available to Radisson Club members. High-speed Wi-Fi and other
              essential facilities are available for an additional fee.
            </p>
          </div>
        </FadeReveal>

        <!-- Medium lounge image — middle column, top (mobile order #3) -->
        <FadeReveal direction="up" :distance="24" start="top 92%" class="md:col-start-2 md:row-start-2 lg:col-start-2 lg:row-start-1">
          <div class="group relative h-56 overflow-hidden sm:h-72 md:h-full md:min-h-[16rem]">
            <BaseImage
              src="/images/hero/lounge-suite.jpg"
              alt="Lounge seating area at Q Hotel Dhaka"
              :width="800"
              :height="600"
              sizes="xs:100vw sm:100vw md:50vw lg:24vw"
              class="transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.02]"
            />
          </div>
        </FadeReveal>

        <!-- Ideal For panel + Book Space button (mobile order #4) -->
        <FadeReveal direction="up" :distance="24" start="top 92%" class="md:col-start-1 md:row-start-3 lg:col-start-2 lg:row-start-2">
          <div class="flex h-full flex-col justify-between gap-8 bg-[#FAF8F3] p-8 lg:p-10">
            <div>
              <p class="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#A75B27]">
                Ideal For
              </p>
              <ul class="mt-6 space-y-3.5">
                <li v-for="item in idealForItems" :key="item" class="flex items-center gap-3">
                  <svg class="h-3.5 w-3.5 shrink-0 text-[#A75B27]" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" stroke-width="1" />
                    <path d="M4.3 7.2l1.8 1.8 3.6-3.9" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <span class="text-sm text-[#505155]">{{ item }}</span>
                </li>
              </ul>
            </div>

            <a
              href="#reserve"
              class="group/btn inline-flex items-center self-start bg-[#E9C588] transition-colors duration-fast hover:bg-[#E0B873]"
            >
              <span class="px-5 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#171717]">
                Book Space
              </span>
              <span class="flex h-10 w-10 items-center justify-center bg-[#171717]/10 transition-colors duration-fast group-hover/btn:bg-[#171717]/20" aria-hidden="true">
                <svg class="h-3.5 w-3.5 text-[#171717] transition-transform duration-fast group-hover/btn:translate-x-0.5" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h9.5M8 3.5L11.5 7 8 10.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </FadeReveal>

        <!-- Architectural image — right column, bottom (mobile order #5) -->
        <FadeReveal direction="up" :distance="24" start="top 92%" class="md:col-start-2 md:row-start-3 lg:col-start-3 lg:row-start-2">
          <div class="group relative h-56 overflow-hidden sm:h-72 md:h-full md:min-h-[16rem]">
            <BaseImage
              src="/images/hero/lobby-interior.jpg"
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
  'Corporate Meetings',
  'Business Conferences',
  'Executive Seminars',
  'Professional Workshops',
  'Receptions',
]
</script>