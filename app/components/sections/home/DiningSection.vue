<template>
  <!--
    Dining showcase: a full-viewport (100svh) image stage that the scroll pins,
    stepping through one outlet at a time. The photographs simply
    crossfade in place (no scale — the frame swaps at the same size) while the
    copy fades and slides out, gives the swap a beat to settle, then the next
    outlet's copy fades/slides in. Everything is scrub-synced to scroll, so
    nothing moves while the page is still.

    Composes <section> directly (not BaseSection) because the stage must bleed
    to both viewport edges while the copy stays on the xl container grid.

    Mobile, reduced motion and no-JS get every outlet as a plain stacked
    poster-and-copy panel: no pin, all copy still in the HTML.
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
        class="dining-slide relative min-h-[100svh] motion-safe:lg:absolute motion-safe:lg:inset-0 motion-safe:lg:min-h-0"
        :class="{ 'pointer-events-none': isSlideInert(venueIndex) }"
        :aria-hidden="isSlideInert(venueIndex) ? 'true' : undefined"
      >
        <div
          :data-dining-media="venueIndex"
          class="absolute inset-0 overflow-hidden bg-night"
        >
          <BaseImage
            :src="venue.poster.src"
            :alt="venue.poster.alt"
            :width="1920"
            :height="1080"
            sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
            class="absolute inset-0"
          />
          <!-- Figma "Rectangle 6857": 411px of 780px, #060C14 100% -> 0% -->
          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 h-[53%] bg-gradient-to-t from-[#060C14] to-[#060C14]/0"
            aria-hidden="true"
          />
        </div>

        <!-- Floating card: paper panel anchored to the container's right edge,
             as in the Figma. Fades with its slide via data-dining-copy. -->
        <div class="absolute inset-0 flex items-end">
          <BaseContainer size="xl">
            <div class="flex justify-end pb-16 sm:pb-20 lg:pb-[100px]">
              <div
                :data-dining-copy="venueIndex"
                class="flex w-full max-w-[540px] flex-col items-center bg-[#FDFBF7] p-6 text-center sm:p-8"
              >
                <h3
                  class="font-display text-2xl font-normal text-[#6C3E22] sm:text-[28px] sm:leading-[38px]"
                >
                  {{ venue.name }}
                </h3>
                <p class="mt-8 text-sm leading-5 text-[#373737]">
                  {{ venue.description }}
                </p>
                <!-- Each CTA lands on its own outlet's card on the dining page,
                     keyed to the same `id` used by DiningVenues -->
                <NuxtLink
                  :to="`/dining#${venue.id}`"
                  :tabindex="isSlideInert(venueIndex) ? -1 : 0"
                  class="group mt-8 inline-flex items-center gap-1 border-b border-[#6C3E22] pb-0.5 text-sm font-medium uppercase text-[#6C3E22] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C3E22]"
                >
                  Explore Now
                  <svg
                    class="size-3.5 transition-transform duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 17L17 7M9 7h8v8"
                    />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </BaseContainer>
        </div>
      </article>

      <!-- Position dots: only meaningful while the stage is pinned. The row is
           pointer-transparent; only the buttons take clicks, above the overlay
           and the slides. Each scrolls the pin to its outlet's step. -->
      <div
        class="pointer-events-none absolute inset-x-0 bottom-6 z-20 hidden justify-center motion-safe:lg:flex"
      >
        <button
          v-for="(venue, venueIndex) in venues"
          :key="venue.id"
          type="button"
          class="pointer-events-auto flex size-6 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DFA558]"
          :aria-label="`Show ${venue.name}`"
          :aria-current="venueIndex === activeIndex ? 'true' : undefined"
          @click="goToVenue(venueIndex)"
        >
          <span
            :class="[
              'size-2 rounded-full transition-colors duration-fast',
              venueIndex === activeIndex ? 'bg-[#DFA558]' : 'bg-paper/70',
            ]"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { DiningVenue } from "~/types/dining";

/**
 * Static showcase content (CMS-ready shape).
 *
 * PLACEHOLDER MEDIA: every slide currently reuses the same photograph because
 * no per-outlet dining photography exists yet. Drop the real files into
 * /public/images/dining/ and change each `poster` here — nothing else needs
 * to move.
 *
 * PLACEHOLDER COPY: only BBQ Restaurant is real. The other two outlets are
 * drafted so the interaction can be built and reviewed; replace with the
 * hotel's actual venue names and descriptions.
 */
const venues: DiningVenue[] = [
  {
    id: "AllDayDining",
    tagLine: "All-Day Dining",
    name: "All-Day Dining",
    description:
      "Q Hotel Dhaka's all-day dining restaurant offers a delightful selection of international and local cuisines in a warm, contemporary setting. Enjoy a lavish breakfast buffet, delicious lunch and dinner options, live cooking stations, and à la carte selections. Perfect for family gatherings, business lunches, or casual dining with friends.",
    poster: {
      src: "/images/dining/all-day-dining.jpg",
      alt: "Q Hotel Dhaka's all-day dining restaurant with warm and contemporary ambiance",
    },
  },
  {
    id: "cafeDeli",
    tagLine: "Cafe & Deli",
    name: "Cafe Deli",
    description:
      "Nestled within Q Hotel Dhaka, this charming café deli offers expertly crafted coffees, fine teas, and freshly baked treats. From artisanal pastries and gourmet sandwiches to indulgent desserts, every selection is thoughtfully prepared. With its stylish yet cozy ambiance, it's the perfect spot for casual catch-ups, business discussions, or a relaxing break throughout the day.",
    poster: {
      src: "/images/dining/cafe-deli.jpg",
      alt: "Cafe Deli interior with brass accents and city views",
    },
  },
  {
    id: "panAsian",
    tagLine: "",
    name: "BBQ / Pan Asian",
    description:
      "Perched on the 19th floor of Q Hotel Dhaka, this elegant Pan Asian and BBQ restaurant offers authentic flavors and breathtaking panoramic city views. Guests can enjoy intimate candlelight dinners on the stunning sky bridge or explore the 20th floor for mesmerizing views of the city lights, creating an unforgettable fine dining experience.",
    poster: {
      src: "/images/dining/bbq-restaurant.jpg",
      alt: "Q Hotel BBQ Restaurant dining room with ring chandeliers, stone feature wall, and city-view windows",
    },
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);

const activeIndex = ref(0);
/** True once the slides are stacked on top of each other, so only one shows */
const isStageStacked = ref(false);

const { gsap, createContext, prefersReducedMotion } = useGsap();
const { addCleanup } = useAnimationCleanup();
const nuxtApp = useNuxtApp();
const ScrollTrigger = nuxtApp.$ScrollTrigger as
  | typeof ScrollTriggerType
  | undefined;

/** The pin's ScrollTrigger; null whenever the pinned stage isn't running */
let pinTrigger: ScrollTriggerType | null = null;

/** Scrolls the pinned stage to the outlet's step (snap then settles it) */
function goToVenue(index: number) {
  if (!pinTrigger || venues.length < 2) {
    return;
  }

  const progress = index / (venues.length - 1);
  const targetScroll =
    pinTrigger.start + (pinTrigger.end - pinTrigger.start) * progress;

  window.scrollTo({
    top: targetScroll,
    behavior: prefersReducedMotion.value ? "auto" : "smooth",
  });
}

/** Hidden from assistive tech and taken out of the tab order while covered */
function isSlideInert(index: number) {
  return isStageStacked.value && index !== activeIndex.value;
}

onMounted(async () => {
  await nextTick();

  const sectionElement = sectionRef.value;
  const stageElement = stageRef.value;

  if (
    !sectionElement ||
    !stageElement ||
    !gsap ||
    !ScrollTrigger ||
    prefersReducedMotion.value
  ) {
    return;
  }

  const mediaMatcher = gsap.matchMedia();

  // The pinned stage only exists on large screens; narrower viewports keep the
  // readable stacked panels
  mediaMatcher.add("(min-width: 1024px)", () => {
    const context = createContext(() => {
      const mediaLayers = gsap.utils.toArray<HTMLElement>(
        "[data-dining-media]",
        stageElement,
      );
      const copyLayers = gsap.utils.toArray<HTMLElement>(
        "[data-dining-copy]",
        stageElement,
      );

      if (mediaLayers.length < 2) {
        return;
      }

      const stepCount = mediaLayers.length - 1;

      // Only the first outlet's photograph is visible at rest; the rest fade
      // in at the same size (no scale, no zoom — the image never grows).
      gsap.set(mediaLayers, {
        autoAlpha: (index: number) => (index === 0 ? 1 : 0),
      });
      copyLayers.forEach((layer, index) => {
        gsap.set(layer, {
          autoAlpha: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 32,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionElement,
          // The stage fills the whole viewport; the fixed header overlays it
          // while visible and tucks away on scroll
          start: "top top",
          end: () => `+=${mediaLayers.length * window.innerHeight * 0.8}`,
          pin: true,
          scrub: 0.8,
          // Always settle on a whole outlet, never mid-crossfade
          snap: {
            snapTo: 1 / stepCount,
            duration: { min: 0.25, max: 0.6 },
            ease: "power2.out",
          },
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            activeIndex.value = Math.min(
              venues.length - 1,
              Math.max(0, Math.round(self.progress * stepCount)),
            );
          },
        },
      });

      for (let index = 1; index < mediaLayers.length; index += 1) {
        const step = index - 1;

        timeline
          // Copy leaves first, so the frame change reads as a shift in mood
          // rather than a jump
          .to(
            copyLayers[step] as HTMLElement,
            {
              autoAlpha: 0,
              y: -32,
              duration: 0.4,
              ease: "power2.in",
            },
            step,
          )
          // Photographs crossfade in place: outgoing fades out, incoming
          // fades in — same size throughout, no scale (still scrub-synced
          // to scroll, so nothing moves while the page is still).
          .to(
            mediaLayers[step] as HTMLElement,
            {
              autoAlpha: 0,
              duration: 0.9,
              ease: "power1.inOut",
            },
            step + 0.15,
          )
          .to(
            mediaLayers[index] as HTMLElement,
            {
              autoAlpha: 1,
              duration: 1,
              ease: "power1.inOut",
            },
            step + 0.15,
          )
          // ...and the new copy arrives as the frame settles into place
          .to(
            copyLayers[index] as HTMLElement,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            step + 0.45,
          );
      }
    }, sectionElement);

    isStageStacked.value = true;
    pinTrigger = ScrollTrigger.getAll().find(
      (trigger) => trigger.trigger === sectionElement && trigger.pin,
    ) ?? null;

    return () => {
      pinTrigger = null;
      isStageStacked.value = false;
      context?.revert();
    };
  });

  addCleanup(() => mediaMatcher.revert());
});
</script>

<style scoped>
/* Pinned full-viewport stage: the photograph fills the entire screen and the
   fixed header overlays it. Only where the pin actually runs — mobile and
   reduced motion keep the stacked panels in normal flow. */
@media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
  .dining-stage {
    position: relative;
    height: 100svh;
    overflow: hidden;
  }

  .dining-slide {
    height: 100%;
    width: 100%;
  }
}
</style>
