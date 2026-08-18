<script setup lang="ts">
import ShuttleBus from "~/components/icons/ShuttleBus.vue";
import Parking from "~/components/icons/Parking.vue";
import Dining from "~/components/icons/Dining.vue";
import SwimmingPoolTwo from "~/components/icons/SwimmingPoolTwo.vue";
import Wellness from "~/components/icons/Wellness.vue";
import Breakfast from "~/components/icons/Breakfast.vue";
import Wifi from "~/components/icons/Wifi.vue";
import TeaCoffeMaker from "~/components/icons/TeaCoffeMaker.vue";
import Iptv from "~/components/icons/Iptv.vue";
import SecurityCamera from "~/components/icons/SecurityCamera.vue";
import BarCup from "~/components/icons/BarCup.vue";
import Laundry from "~/components/icons/Laundry.vue";

const sectionRef = ref<HTMLElement | null>(null);
const skylineRef = ref<HTMLImageElement | null>(null);
const { prefersReducedMotion } = useReducedMotion();
const { gsap } = useGsap();

// ─── Direction-aware hover reveal ─────────────────────────────────────
// Offsets keyed by the edge the pointer crossed: the media parks just
// outside that edge, then slides to rest — so sweeping the grid
// left-to-right reads as each photo arriving from the left.
const EDGE_OFFSETS = [
  { xPercent: 0, yPercent: -100 }, // 0 — top
  { xPercent: 100, yPercent: 0 }, // 1 — right
  { xPercent: 0, yPercent: 100 }, // 2 — bottom
  { xPercent: -100, yPercent: 0 }, // 3 — left
] as const;

/** Which edge the pointer crossed, normalised so corners split evenly */
function edgeIndexFor(event: MouseEvent, tile: HTMLElement): number {
  const { width, height, left, top } = tile.getBoundingClientRect();
  const x =
    (event.clientX - left - width / 2) * (width > height ? height / width : 1);
  const y =
    (event.clientY - top - height / 2) * (height > width ? width / height : 1);
  return Math.round((Math.atan2(y, x) * (180 / Math.PI) + 180) / 90 + 3) % 4;
}

function mediaOf(event: MouseEvent): HTMLElement | null {
  const tile = event.currentTarget as HTMLElement | null;
  return tile?.querySelector<HTMLElement>("[data-facility-media]") ?? null;
}

function handleTileEnter(event: MouseEvent) {
  const media = mediaOf(event);
  if (!media || !gsap) {
    return;
  }

  gsap.killTweensOf(media);

  // Reduced motion: the photo appears, but nothing travels
  if (prefersReducedMotion.value) {
    gsap.set(media, { autoAlpha: 1, xPercent: 0, yPercent: 0 });
    return;
  }

  const offset =
    EDGE_OFFSETS[edgeIndexFor(event, event.currentTarget as HTMLElement)];
  gsap.set(media, { ...offset, autoAlpha: 1 });
  gsap.to(media, {
    xPercent: 0,
    yPercent: 0,
    duration: 0.55,
    ease: "power3.out",
  });
}

function handleTileLeave(event: MouseEvent) {
  const media = mediaOf(event);
  if (!media || !gsap) {
    return;
  }

  gsap.killTweensOf(media);

  if (prefersReducedMotion.value) {
    gsap.set(media, { autoAlpha: 0 });
    return;
  }

  // Leaves through the edge the pointer actually exited by
  const offset =
    EDGE_OFFSETS[edgeIndexFor(event, event.currentTarget as HTMLElement)];
  gsap.to(media, {
    ...offset,
    duration: 0.45,
    ease: "power3.in",
    onComplete: () => gsap.set(media, { autoAlpha: 0 }),
  });
}

/** True once JS owns the reveal; keeps no-JS / reduced-motion renders static */
const isSkylineAnimated = ref(false);
/** Toggles the ground-up construction reveal each time the section enters */
const isSkylineBuilt = ref(false);

let skylineObserver: IntersectionObserver | undefined;

onMounted(() => {
  if (!sectionRef.value || !skylineRef.value || prefersReducedMotion.value) {
    return;
  }

  isSkylineAnimated.value = true;

  // Rebuилds on every re-entry; the reverse transition happens offscreen
  skylineObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        isSkylineBuilt.value = entry.isIntersecting;
      }
    },
    { rootMargin: "0px 0px -25% 0px" },
  );

  skylineObserver.observe(sectionRef.value);
});

onBeforeUnmount(() => {
  skylineObserver?.disconnect();
  skylineObserver = undefined;
});

/** Amenity tile: label, icon component, optional grid placement */
interface FacilityAmenity {
  id: string;
  label: string;
  icon: Component;
  /** Revealed behind the tile on hover; decorative, never the sole content */
  image: string;
  /** Explicit placement for the staggered large-screen grid */
  gridClass?: string;
}

// ASSET: `image` currently reuses the closest existing photography. Swap each
// for a dedicated facility shot (e.g. /images/facilities/<id>.jpg) when the
// real set lands — the hover reveal needs no other change.
const amenities: FacilityAmenity[] = [
  {
    id: "airport-shuttle",
    label: "Airport Shuttle",
    image: "/images/hero/aerial-terrain.jpg",
    icon: ShuttleBus,
  },
  {
    id: "vehicle-parking",
    label: "Parking",
    image: "/images/hero/lobby-interior.jpg",
    icon: Parking,
  },
  {
    id: "dining",
    label: "Dining",
    image: "/images/dining/bbq-restaurant.jpg",
    icon: Dining,
  },
  {
    id: "swimming-pool",
    label: "Swimming Pool",
    image: "/images/offers/swimming.jpg",
    icon: SwimmingPoolTwo,
  },
  {
    id: "fitness-spa",
    label: "Wellness",
    image: "/images/offers/stressless-spa.jpg",
    icon: Wellness,
  },
  {
    id: "breakfast",
    label: "Breakfast",
    image: "/images/offers/readymade-meal.jpg",
    gridClass: "lg:col-start-2",
    icon: Breakfast,
  },
  {
    id: "free-wifi",
    label: "WiFi",
    image: "/images/meetings/business-class-lounge.jpg",
    icon: Wifi,
  },
  {
    id: "ip-tv",
    label: "IP TV",
    image: "/images/instagram/moment-3.jpg",
    icon: Iptv,
  },
  {
    id: "cctv-security",
    label: "24 Hours Security",
    image: "/images/instagram/moment-5.jpg",
    icon: SecurityCamera,
  },
  {
    id: "bbq-bar",
    label: "Mini Bar",
    image: "/images/dining/bbq-restaurant.jpg",
    icon: BarCup,
  },
  {
    id: "laundry-service",
    label: "Valet Laundry ",
    image: "/images/rooms/deluxe-double.jpg",
    gridClass: "lg:col-start-5 lg:row-start-3",
    icon: Laundry,
  },
];
</script>

<template>
  <!--
    Facilities & Amenities: a dark, staggered grid of amenity tiles over a
    faint architectural skyline, mirroring the Figma layout (row one starts at
    the left edge, row two shifts one column right, the closing tile and the
    supporting copy share the final row on large screens). Composes <section>
    directly instead of BaseSection because the skyline line-art must hang off
    the viewport's left edge, outside the container — the same edge-bleed
    pattern as the About watermark and FAQ sketch.
  -->
  <section
    id="facilities"
    ref="sectionRef"
    aria-labelledby="facilities-title"
    class="relative isolate bg-ink py-24 text-paper sm:py-32"
  >
    <!-- Faint skyline anchored to the viewport's bottom-left corner — texture,
         not content. Rises from the ground on scroll-in (construction reveal);
         renders static without JS / under reduced motion. Driven by an
         IntersectionObserver + CSS transition rather than ScrollTrigger:
         the pinned rooms stack above shifts absolute scroll positions, which
         the observer's real viewport intersection is immune to. -->
    <img
      ref="skylineRef"
      src="/images/facilities-skyline.svg"
      alt=""
      width="916"
      height="508"
      loading="lazy"
      :class="[
        'skyline pointer-events-none absolute bottom-0 -left-[10%] -z-10 hidden w-[48rem] 2xl:w-[56rem] opacity-50 lg:block',
        isSkylineAnimated ? 'skyline-animated' : '',
        isSkylineBuilt ? 'skyline-built' : '',
      ]"
      aria-hidden="true"
    />

    <BaseContainer size="xl">
      <FadeReveal>
        <div class="flex flex-col items-center text-center">
          <BaseKicker tone="ink">What We Offer</BaseKicker>
          <h2
            id="facilities-title"
            class="mt-6 font-display font-semibold text-4xl text-paper sm:text-5xl lg:text-[56px]"
          >
            Facilities &amp; Amenities
          </h2>
        </div>
      </FadeReveal>

      <FadeReveal :stagger="0.06">
        <div
          class="relative mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mt-[60px] lg:grid-cols-6 lg:gap-5"
        >
          <div
            v-for="amenity in amenities"
            :key="amenity.id"
            data-reveal-item
            :class="[
              'surface-grain relative isolate flex aspect-square flex-col items-center justify-center gap-4 overflow-hidden bg-paper/10 px-4 text-center',
              amenity.gridClass,
            ]"
            @mouseenter="handleTileEnter"
            @mouseleave="handleTileLeave"
          >
            <span
              data-facility-media
              class="facility-media pointer-events-none absolute inset-0 -z-10"
              aria-hidden="true"
            >
              <BaseImage
                :src="amenity.image"
                alt=""
                :width="480"
                :height="480"
                sizes="xs:50vw sm:33vw lg:16vw"
              />
              <!-- Scrim keeps the icon and label legible over any photo -->
              <span class="absolute inset-0 bg-ink/30" />
            </span>

            <component :is="amenity.icon" class="h-8 w-8" aria-hidden="true" />
            <span
              class="font-display text-lg text-paper sm:text-xl lg:text-[28px] font-semibold"
              >{{ amenity.label }}</span
            >
          </div>

          <!-- Supporting copy + CTA share the final grid row on large screens -->
          <div
            data-reveal-item
            class="col-span-2 mt-4 flex flex-col items-start justify-center gap-6 sm:col-span-3 lg:col-span-2 lg:col-start-3 lg:row-start-3 lg:mt-0 lg:px-2"
          >
            <BaseArrowCta
              to="facilities-amenities"
              variant="gold"
              label-class="!text-sm !font-medium"
            >
              View All Facilities
            </BaseArrowCta>
          </div>
        </div>
      </FadeReveal>
    </BaseContainer>
  </section>
</template>

<style scoped>
/* Construction reveal: once JS takes over, the skyline starts clipped at the
   ground line and wipes upward into place — as if the towers are being
   built — every time the section enters the viewport. clip-path + transform
   only, so no layout shift; reduced motion never enters the animated state. */
.skyline-animated {
  clip-path: inset(100% 0% 0% 0%);
  transform: translateY(3rem);
  transition:
    clip-path 2400ms var(--ease-premium),
    transform 2400ms var(--ease-premium);
}

.skyline-animated.skyline-built {
  clip-path: inset(0% 0% 0% 0%);
  transform: translateY(0);
}

/* The amenity tile's grain wash now comes from the shared `.surface-grain`
   utility in main.css, so the location cards can wear the same surface */

/* Hover media rests hidden — GSAP owns visibility and position from the
   first pointer enter onward. Hidden by default so no-JS and touch users
   never see a stray photo over the label. */
.facility-media {
  visibility: hidden;
  opacity: 0;
}

.facility-media :deep(img) {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
</style>
