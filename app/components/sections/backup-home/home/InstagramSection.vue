<template>
  <!--
    Experience / Instagram: a full-height stage (the viewport minus the fixed
    header) holding centered invitation copy over drifting cloud line-art, a
    right-to-left parade of guest-moment photographs, and the dark wellness
    marquee the photographs overlap. Composes <section> directly (not
    BaseSection) because the parade and marquee bleed to both viewport edges.
  -->
  <section
    id="experience"
    aria-labelledby="experience-title"
    class="relative flex h-[calc(100svh-var(--header-height))] flex-col overflow-hidden bg-paper pt-16 text-ink sm:pt-24"
  >
    <!--
      Cloud line-art: decorative texture that drifts slowly across the section,
      each cloud at its own size, height and pace so the sky never reads as a
      loop. Transform-only, and it holds still for reduced-motion visitors.
    -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[28rem]" aria-hidden="true">
      <img
        v-for="cloud in clouds"
        :key="cloud.id"
        src="/images/instagram-cloud.svg"
        alt=""
        width="699"
        height="280"
        loading="lazy"
        :class="['cloud', cloud.class]"
      >
    </div>

    <BaseContainer size="xl">
      <FadeReveal>
        <div class="relative flex flex-col items-center text-center">
          <BaseKicker>See What You Want</BaseKicker>
          <h2 id="experience-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
            Experience Q Hotel Dhaka
          </h2>
          <BaseArrowCta
            to="https://www.facebook.com"
            variant="gold"
            target="_blank"
            rel="noopener"
            class="mt-8"
          >
            Follow Us Facebook
            <template #icon>
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2C11.54 2 9.68 3.66 9.68 6.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.28-1.73 1.76-1.73z" />
              </svg>
            </template>
          </BaseArrowCta>
        </div>
      </FadeReveal>
    </BaseContainer>

    <!--
      Guest-moment photographs parading right to left, bottoms tucked behind the
      marquee. Two identical tracks: the pair shifts exactly one track width, so
      the loop is seamless. Hovering (or tabbing into) the parade holds it still
      — you cannot study a photograph that is walking away from you.

      Each frame is a real <button>, so the viewer opens by keyboard too. The
      duplicate track is a visual echo only: hidden from assistive tech and out
      of the tab order, so the photographs are announced once, not twice.
    -->
    <!--
      `mt-auto` belongs on the flex child itself — FadeReveal's root — or the
      parade and the marquee leave dead space beneath them. The parade takes the
      leftover height (`flex-1`, `min-h-0`) and the frames are sized from it, so
      the whole stage always fits one screen instead of pushing the marquee
      below the fold on a short window.
    -->
    <FadeReveal class="mt-auto min-h-0 flex-1">
      <div class="photo-parade flex h-full items-end pt-10">
        <div class="photo-marquee flex h-full items-end">
          <div
            v-for="trackIndex in 2"
            :key="trackIndex"
            class="photo-track flex h-full shrink-0 items-end"
            :aria-hidden="trackIndex === 2 ? 'true' : undefined"
          >
            <button
              v-for="(moment, momentIndex) in instagramMoments"
              :key="moment.image.src"
              :ref="(element: unknown) => registerTile(element, momentIndex, trackIndex)"
              type="button"
              :class="[
                'experience-tile relative -ml-[2vw] aspect-[3/4] h-full max-h-[18rem] shrink-0 cursor-zoom-in border-4 border-white shadow-xl transition-transform duration-normal ease-premium focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-copper sm:max-h-[22rem] sm:border-[6px] lg:max-h-[27rem] motion-safe:hover:z-10 motion-safe:hover:scale-[1.04]',
                momentIndex % 2 === 0 ? 'origin-bottom-left' : 'origin-bottom-right',
                moment.tiltClass,
              ]"
              :tabindex="trackIndex === 2 ? -1 : 0"
              :aria-label="`Open image: ${moment.image.alt}`"
              @click="openLightbox(momentIndex)"
            >
              <BaseImage
                :src="moment.image.src"
                :alt="moment.image.alt"
                :width="720"
                :height="960"
                sizes="xs:44vw sm:28vw lg:23vw"
              />
            </button>
          </div>
        </div>
      </div>
    </FadeReveal>

    <BaseLightbox
      v-model:index="lightboxIndex"
      :images="instagramMoments.map(moment => moment.image)"
      label="Q Hotel Dhaka guest moments"
    />

    <!--
      Wellness marquee: continuous drift, static row under reduced motion.
      Overlaps the photo fan so the strip clips the photo bottoms, as designed.

      The pair of tracks shifts by exactly one track width, so a track has to be
      at least as wide as the viewport — otherwise the shift outruns the content
      and the far side of the strip empties out. The themes are therefore listed
      twice per track, and `min-w-full` + `justify-around` guarantees full cover
      even on a display wide enough to outrun that.
    -->
    <div class="relative -mt-10 bg-night py-6 text-paper sm:-mt-12">
      <div class="marquee flex gap-12 whitespace-nowrap">
        <ul
          v-for="trackIndex in 2"
          :key="trackIndex"
          class="marquee-track flex min-w-full shrink-0 items-center justify-around gap-12"
          :aria-hidden="trackIndex === 2 ? 'true' : undefined"
        >
          <li
            v-for="(theme, themeIndex) in marqueeThemes"
            :key="`${trackIndex}-${themeIndex}`"
            class="flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.18em]"
          >
            <svg class="h-4 w-4 shrink-0 text-champagne" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 1.5c.9 5.5 5 9.6 10.5 10.5-5.5.9-9.6 5-10.5 10.5C11.1 17 7 12.9 1.5 12 7 11.1 11.1 7 12 1.5z" />
            </svg>
            {{ theme }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImageAsset } from '~/types/media'

/** A fanned photo tile: image plus its resting tilt in the fan */
interface InstagramMoment {
  image: ImageAsset
  tiltClass: string
}

/** Alternating tilt and lift: an even fan reads as a grid, an uneven one as a
 *  handful of photographs someone laid down */
const instagramMoments: InstagramMoment[] = [
  { image: { src: '/images/instagram/moment-1.jpg', alt: 'Guest listening to music in a sunlit hotel window' }, tiltClass: '-rotate-6 translate-y-3' },
  { image: { src: '/images/instagram/moment-2.jpg', alt: 'Guest relaxing with closed eyes in soft garden light' }, tiltClass: 'rotate-3 -translate-y-2' },
  { image: { src: '/images/instagram/moment-3.jpg', alt: 'Guest smiling in the morning sun beside tropical plants' }, tiltClass: '-rotate-2 translate-y-1' },
  { image: { src: '/images/instagram/moment-4.jpg', alt: 'Guest unwinding with headphones on a lounger' }, tiltClass: 'rotate-4 -translate-y-3' },
  { image: { src: '/images/instagram/moment-5.jpg', alt: 'Guest with a flower in her hair enjoying the spa garden' }, tiltClass: '-rotate-3 translate-y-2' },
  { image: { src: '/images/instagram/moment-6.jpg', alt: 'Guest meditating by a window with a hillside view' }, tiltClass: 'rotate-6 translate-y-1' },
]

const wellnessThemes = ['Wellness Care', 'Calm', 'Energy', 'Joy of Life', 'Yoga-Fit']

/** Listed twice, so one track always spans wider than the viewport it scrolls across */
const marqueeThemes = [...wellnessThemes, ...wellnessThemes]

/** Each cloud's size, height and pace live in the scoped stylesheet */
const clouds = [
  { id: 'cloud-a', class: 'cloud-a' },
  { id: 'cloud-b', class: 'cloud-b' },
  { id: 'cloud-c', class: 'cloud-c' },
  { id: 'cloud-d', class: 'cloud-d' },
]

const lightboxIndex = ref<number | null>(null)
const tileElements = ref<HTMLButtonElement[]>([])

/** Only the real track is tracked; the duplicate never receives focus */
function registerTile(element: unknown, index: number, trackIndex: number) {
  if (trackIndex === 1 && element instanceof HTMLButtonElement) {
    tileElements.value[index] = element
  }
}

function openLightbox(index: number) {
  lightboxIndex.value = index
}

/** Send focus back to the photograph the viewer was opened from */
watch(lightboxIndex, (index, previousIndex) => {
  if (index !== null || previousIndex === null) {
    return
  }

  nextTick(() => tileElements.value[previousIndex]?.focus())
})
</script>

<style scoped>
/* Clouds cross the section from left to right. Negative animation delays start
   each one mid-journey, so the sky is already populated on first paint rather
   than filling in from the left edge. */
.cloud {
  left: 0;
  position: absolute;
  will-change: transform;
}

.cloud-a {
  opacity: 0.55;
  top: 1.5rem;
  width: 22rem;
}

.cloud-b {
  opacity: 0.4;
  top: 8rem;
  width: 13rem;
}

.cloud-c {
  opacity: 0.3;
  top: 0.5rem;
  width: 30rem;
}

.cloud-d {
  opacity: 0.35;
  top: 13rem;
  width: 17rem;
}

@media (prefers-reduced-motion: no-preference) {
  .cloud {
    animation-iteration-count: infinite;
    animation-name: cloud-drift;
    animation-timing-function: linear;
  }

  .cloud-a {
    animation-delay: -32s;
    animation-duration: 115s;
  }

  .cloud-b {
    animation-delay: -70s;
    animation-duration: 90s;
  }

  .cloud-c {
    animation-delay: -110s;
    animation-duration: 150s;
  }

  .cloud-d {
    animation-delay: -14s;
    animation-duration: 105s;
  }
}

/* Held still, the clouds still need to be spread across the sky */
@media (prefers-reduced-motion: reduce) {
  .cloud-a {
    transform: translateX(-4vw);
  }

  .cloud-b {
    transform: translateX(58vw);
  }

  .cloud-c {
    transform: translateX(78vw);
  }

  .cloud-d {
    transform: translateX(26vw);
  }
}

@keyframes cloud-drift {
  from {
    transform: translateX(-35vw);
  }

  to {
    transform: translateX(135vw);
  }
}

/* Photograph parade: two identical tracks drift right to left, the pair shifting
   exactly one track width so the seam never shows. Hover or keyboard focus
   holds it still, so a photograph can actually be looked at (and clicked)
   without chasing it. Transform-only; static under reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  .photo-marquee {
    animation: photo-parade 70s linear infinite;
    will-change: transform;
  }

  .photo-parade:hover .photo-marquee,
  .photo-parade:focus-within .photo-marquee {
    animation-play-state: paused;
  }
}

@keyframes photo-parade {
  from {
    transform: translateX(0);
  }

  to {
    /* One full track: the second copy lands exactly where the first began */
    transform: translateX(-50%);
  }
}

/* Continuous marquee drift: two identical tracks, the pair shifts one track
   width for a seamless loop. Transform-only, paused for reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  .marquee {
    animation: marquee-drift 28s linear infinite;
    will-change: transform;
  }
}

@keyframes marquee-drift {
  from {
    transform: translateX(0);
  }

  to {
    /* One full track plus its trailing gap (3rem = gap-12) */
    transform: translateX(calc(-100% / 2 - 1.5rem));
  }
}
</style>
