<template>
  <!--
    Dining showcase: a full-screen (viewport minus header) image stage that the
    scroll pins, stepping through one outlet at a time. The photographs simply
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
        class="dining-slide relative min-h-[34rem] motion-safe:lg:absolute motion-safe:lg:inset-0 motion-safe:lg:min-h-0"
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

          <!-- Legibility: the shade starts at the bottom-left corner (where
               the copy sits) and fades diagonally to fully transparent, so
               the photograph stays fully visible while the text reads
               clearly -->
          <div
            class="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-night/95 via-night/70 to-transparent"
            aria-hidden="true"
          />
        </div>

        <div class="absolute inset-0 flex items-end">
          <BaseContainer size="xl">
            <div
              :data-dining-copy="venueIndex"
              class="max-w-[1620px] pb-14 sm:pb-20 lg:pb-28"
            >
              <h3
                class="font-display text-4xl text-paper sm:text-5xl lg:text-[56px] font-semibold"
              >
                {{ venue.name }}
              </h3>
              <div class="text-sm font-medium text-[#EED4A3] mt-4 uppercase hidden">{{ venue?.tagLine }}</div>
              <p
                class="mt-3 text-sm leading-7 text-paper/80 sm:text-base lg:text-lg lg:font-medium"
              >
                {{ venue.description }}
              </p>
              <div class="mt-12">
                <!-- Each CTA lands on its own outlet's card on the dining page,
                     keyed to the same `id` used by DiningVenues -->
                <BaseArrowCta
                  :to="`/dining#${venue.id}`"
                  variant="gold"
                  background-class="!bg-[#E9C588]"
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
      <div
        class="pointer-events-none absolute inset-x-0 bottom-10 hidden motion-safe:lg:block"
      >
        <BaseContainer size="xl">
          <div class="flex items-center justify-end gap-5">
            <span
              class="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-paper/70"
            >
              {{ counterLabel }}
            </span>
            <span class="h-px w-40 bg-paper/25 xl:w-56" aria-hidden="true">
              <span
                ref="progressRef"
                class="block h-px w-full origin-left bg-champagne"
              />
            </span>
          </div>
        </BaseContainer>
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
    id: "restaurant-01",
    tagLine:"all-day dining",
    name: "BBQ / Pan Asian",
    description:
      "Perched on the 19th floor of Q Hotel Dhaka, this exquisite Pan Asian and BBQ fine dining restaurant offers a culinary journey through bold, authentic flavors paired with breathtaking panoramic views of the city. Guests seeking a more intimate experience can dine on the striking sky bridge, an idyllic setting for candlelight dinners and special celebrations beneath the open sky. The restaurant's seamless access to the 20th floor further elevates the experience, unveiling a mesmerizing vista of the city lights, making it an unforgettable destination for both refined dining and memorable moments ",
    poster: {
      src: "/images/dining/bbq-restaurant.jpg",
      alt: "Q Hotel BBQ Restaurant dining room with ring chandeliers, stone feature wall, and city-view windows",
    },
  },
  {
    id: "restaurant-02",
    tagLine:"All-Day Dining",
    name: "All-Day Dining",
    description:
      "Q Hotel Dhaka's all-day dining restaurant offers a vibrant and inviting culinary experience, serving an extensive selection of international and local delicacies throughout the day. Start your morning with a vast and lavish breakfast buffet featuring an impressive spread of continental, Asian, and local favorites, followed by satisfying lunch and dinner options complete with live cooking stations, curated buffet selections, and à la carte choices. Designed with a warm and contemporary ambiance, it provides the perfect setting for leisurely family meals, business lunches, or casual dining with friends.",
    poster: {
      src: "/images/dining/all-day-dining.jpg",
      alt: "Q Hotel Dhaka's all-day dining restaurant with warm and contemporary ambiance",
    },
  },
    {
    id: "cafe-deli",
    tagLine:"Cafe & Deli",
    name: "Cafe Deli",
    description:
      "Nestled within Q Hotel Dhaka, this charming café deli invites guests to savor expertly crafted coffees, fine teas, and freshly baked delicacies in a relaxed and inviting setting. From artisanal pastries and gourmet sandwiches to indulgent desserts, the menu is thoughtfully curated to satisfy every craving. With its stylish yet comfortable atmosphere, the café is perfect for casual catch-ups, light business discussions, or a leisurely break throughout the day.",
    poster: {
      src: "/images/dining/cafe-deli.jpg",
      alt: "Cafe Deli interior with brass accents and city views",
    },
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const stageRef = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);

const activeIndex = ref(0);
/** True once the slides are stacked on top of each other, so only one shows */
const isStageStacked = ref(false);

const { gsap, createContext, prefersReducedMotion } = useGsap();
const { addCleanup } = useAnimationCleanup();
const nuxtApp = useNuxtApp();
const ScrollTrigger = nuxtApp.$ScrollTrigger as
  | typeof ScrollTriggerType
  | undefined;

const counterLabel = computed(() => {
  const current = String(activeIndex.value + 1).padStart(2, "0");
  const total = String(venues.length).padStart(2, "0");
  return `${current} — ${total}`;
});

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
      const headerHeight = readHeaderHeight();

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
          // Rest the stage directly under the fixed header, so the photograph
          // fills the viewport below the navbar
          start: () => `top top+=${headerHeight}`,
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

      timeline.fromTo(
        progressRef.value,
        {
          scaleX: 1 / mediaLayers.length,
        },
        {
          scaleX: 1,
          duration: stepCount,
          ease: "none",
        },
        0,
      );
    }, sectionElement);

    isStageStacked.value = true;

    return () => {
      isStageStacked.value = false;
      context?.revert();
    };
  });

  addCleanup(() => mediaMatcher.revert());
});
</script>

<style scoped>
/* Pinned full-bleed stage: the viewport minus the fixed header, so the
   photograph sits directly below the navbar. Only where the pin actually
   runs — mobile and reduced motion keep the stacked panels in normal flow. */
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
