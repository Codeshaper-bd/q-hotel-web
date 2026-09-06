<script setup lang="ts">
import ShuttleBus from "~/components/icons/ShuttleBus.vue";
import Parking from "~/components/icons/Parking.vue";
import Dining from "~/components/icons/Dining.vue";
import SwimmingPoolTwo from "~/components/icons/SwimmingPoolTwo.vue";
import Wellness from "~/components/icons/Wellness.vue";
import Breakfast from "~/components/icons/Breakfast.vue";
import Wifi from "~/components/icons/Wifi.vue";
import TeaCoffeMaker from "~/components/icons/TeaCoffeMaker.vue";
import ButlerService from "~/components/icons/ButlerService.vue";
import Iptv from "~/components/icons/Iptv.vue";
import SecurityCamera from "~/components/icons/SecurityCamera.vue";
import BarCup from "~/components/icons/BarCup.vue";
import Laundry from "~/components/icons/Laundry.vue";
import RoomServiceIcon from "~/components/icons/RoomServiceIcon.vue";

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

const amenities: FacilityAmenity[] = [
  {
    id: "airport-shuttle",
    label: "Airport Shuttle",
    image: "/images/facilities/airport-shuttle.png",
    gridClass: "lg:col-start-1 lg:row-start-1",
    icon: ShuttleBus,
  },
  {
    id: "vehicle-parking",
    label: "Parking",
    image: "/images/facilities/parking.png",
    gridClass: "lg:col-start-2 lg:row-start-1",
    icon: Parking,
  },
  {
    id: "dining",
    label: "Dining",
    image: "/images/facilities/dining.png",
    gridClass: "lg:col-start-3 lg:row-start-1",
    icon: Dining,
  },
  {
    id: "swimming-pool",
    label: "Swimming Pool",
    image: "/images/facilities/swimming-pool.png",
    gridClass: "lg:col-start-4 lg:row-start-1",
    icon: SwimmingPoolTwo,
  },
  {
    id: "fitness-spa",
    label: "Wellness",
    image: "/images/facilities/wellness.png",
    gridClass: "lg:col-start-5 lg:row-start-1",
    icon: Wellness,
  },
  {
    id: "breakfast",
    label: "Breakfast",
    image: "/images/facilities/breakfast.png",
    gridClass: "lg:col-start-2 lg:row-start-2",
    icon: Breakfast,
  },
  // {
  //   id: "cafe-deli",
  //   label: "Cafe Deli- Coffee Shop",
  //   image: "/images/dining/cafe-deli.jpg",
  //   gridClass: "lg:col-start-3 lg:row-start-2",
  //   icon: TeaCoffeMaker,
  // },
  // {
  //   id: "all-day-dining",
  //   label: "All day dining, Buffet & Ala Carte",
  //   image: "/images/facilities/all-day-dining.png",
  //   gridClass: "lg:col-start-4 lg:row-start-2",
  //   icon: Dining,
  // },
  {
    id: "room-service",
    label: "24hrs Room Service",
    image: "/images/facilities/24hrs-room-service.png",
    gridClass: "lg:col-start-3 lg:row-start-2",
    icon: RoomServiceIcon,
  },
  {
    id: "free-wifi",
    label: "WiFi",
    image: "/images/facilities/wifi.png",
    gridClass: "lg:col-start-4 lg:row-start-2",
    icon: Wifi,
  },
  {
    id: "ip-tv",
    label: "IP TV",
    image: "/images/facilities/iptv.png",
    gridClass: "lg:col-start-5 lg:row-start-2",
    icon: Iptv,
  },
  {
    id: "cctv-security",
    label: "24 Hours Security",
    image: "/images/facilities/security.png",
    gridClass: "lg:col-start-6 lg:row-start-2",
    icon: SecurityCamera,
  },
  {
    id: "bbq-bar",
    label: "Mini Bar",
    image: "/images/facilities/minibar.png",
    gridClass: "lg:col-start-3 lg:row-start-3",
    icon: BarCup,
  },
  {
    id: "laundry-service",
    label: "Valet Laundry",
    image: "/images/facilities/valet-laundry.png",
    gridClass: "lg:col-start-4 lg:row-start-3",
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
              'relative isolate flex h-[200px] lg:h-[180px] 2xl:h-[230px] flex-col items-center justify-center gap-3 overflow-hidden bg-paper/10 px-3 text-center',
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

            <!-- Live film-grain flicker behind the icon/label: two
                 differently-seeded noise layers cross-fade so the texture
                 reads as moving grain rather than a flat static tint. -->
            <span
              aria-hidden="true"
              class="amenity-noise pointer-events-none absolute -inset-px -z-10"
            />

            <component
              :is="amenity.icon"
              class="size-8 lg:size-5 xl:size-6 2xl:size-8"
              aria-hidden="true"
            />
            <span
              class="font-display text-lg text-paper sm:text-xl  xl:text-2xl 2xl:text-[28px] font-semibold"
              >{{ amenity.label }}</span
            >
          </div>

          <!-- Closing tile: links out to the full facilities & amenities page
               instead of a decorative amenity, so the last grid cell doubles
               as the section's call to action. -->
          <NuxtLink
            to="facilities-amenities"
            data-reveal-item
            class="group relative isolate flex h-[200px] lg:h-[180px] 2xl:h-[230px] flex-col items-center justify-center gap-3 overflow-hidden bg-paper/10 px-3 text-center transition-colors duration-normal ease-premium hover:bg-paper/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne lg:col-start-5 lg:row-start-3"
          >
            <span
              aria-hidden="true"
              class="amenity-noise pointer-events-none absolute -inset-px -z-10"
            />
            <span
              class="font-display text-lg text-champagne sm:text-xl xl:text-2xl font-semibold transition-colors duration-normal ease-premium group-hover:text-paper group-focus-visible:text-paper"
              >View All Facilities &amp; Amenities</span
            >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              class="shrink-0 text-champagne transition-all duration-normal ease-premium group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-paper group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:text-paper motion-reduce:transform-none motion-reduce:transition-none"
            >
              <path
                d="M12.9995 5.00195H18.9995V11.002"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.0006 5.00195L5.00055 19.002"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </NuxtLink>
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

/* Live film grain: two differently-seeded noise tiles cross-fade in and out
   180° out of phase (steps() gives each swap a hard cut, not a smooth blend),
   so the texture reads as flickering static rather than the flat tint a
   single motionless SVG gives. Opacity-only, so it stays on the compositor;
   the global reduced-motion rule freezes both layers at their opening frame. */
.amenity-noise::before,
.amenity-noise::after {
  content: "";
  position: absolute;
  inset: 0;
  background-size: 160px 160px;
  animation: amenity-grain-flicker 0.5s steps(1) infinite;
}

/* Reduced-motion fallback (animation collapses to a single 1ms run): resting
   opacity left visible on the first layer only, so the tile still reads as
   grain instead of flattening to a plain tint or double-stacked noise. */
.amenity-noise::before {
  opacity: 0.4;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
}

.amenity-noise::after {
  opacity: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='9' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
  animation-delay: 0.25s;
}

@keyframes amenity-grain-flicker {
  0%,
  49% {
    opacity: 0.4;
  }

  50%,
  100% {
    opacity: 0;
  }
}

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
