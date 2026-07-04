<template>
  <!--
    Experience / Instagram: centered invitation copy over soft cloud line-art,
    a fanned row of guest-moment photographs, and a dark wellness marquee
    strip that the photos overlap — mirroring the Figma composition. Composes
    <section> directly (not BaseSection) because the photo fan and marquee
    bleed to both viewport edges.
  -->
  <section
    id="experience"
    aria-labelledby="experience-title"
    class="relative overflow-hidden bg-paper pt-24 text-ink sm:pt-32"
  >
    <!-- Cloud line-art — decorative texture behind the heading -->
    <img
      src="/images/instagram-cloud.svg"
      alt=""
      width="699"
      height="280"
      loading="lazy"
      class="pointer-events-none absolute -left-24 top-24 w-72 opacity-50 sm:w-96"
      aria-hidden="true"
    >
    <img
      src="/images/instagram-cloud.svg"
      alt=""
      width="699"
      height="280"
      loading="lazy"
      class="pointer-events-none absolute -right-20 top-40 w-64 -scale-x-100 opacity-40 sm:w-80"
      aria-hidden="true"
    >

    <BaseContainer size="xl">
      <FadeReveal>
        <div class="relative flex flex-col items-center text-center">
          <BaseKicker>See What You Want</BaseKicker>
          <h2 id="experience-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
            Experience Q Hotel Dhaka
          </h2>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener"
            class="mt-8 font-display text-xl text-ink underline decoration-copper/60 underline-offset-8 transition-colors duration-fast hover:text-copper"
          >
            Follow Us Instagram
          </a>
        </div>
      </FadeReveal>
    </BaseContainer>

    <!-- Fanned guest-moment photographs, bottoms tucked behind the marquee -->
    <FadeReveal>
      <div class="relative mt-16 flex items-end justify-center sm:mt-20">
        <div
          v-for="(moment, momentIndex) in instagramMoments"
          :key="moment.image.src"
          :class="[
            'w-28 shrink-0 shadow-xl sm:w-40 lg:w-56',
            momentIndex > 0 ? '-ml-4 sm:-ml-5' : '',
            momentIndex % 2 === 0 ? 'origin-bottom-left' : 'origin-bottom-right',
            moment.tiltClass,
          ]"
        >
          <BaseImage
            :src="moment.image.src"
            :alt="moment.image.alt"
            :width="720"
            :height="770"
            sizes="xs:30vw sm:20vw lg:224px"
            class="aspect-[14/15]"
          />
        </div>
      </div>
    </FadeReveal>

    <!-- Wellness marquee: continuous drift, static row under reduced motion.
         Overlaps the photo fan so the strip clips the photo bottoms, as designed. -->
    <div class="relative -mt-10 bg-night py-6 text-paper sm:-mt-12">
      <div class="marquee flex gap-12 whitespace-nowrap">
        <ul
          v-for="trackIndex in 2"
          :key="trackIndex"
          class="marquee-track flex shrink-0 items-center gap-12"
          :aria-hidden="trackIndex === 2 ? 'true' : undefined"
        >
          <li
            v-for="theme in wellnessThemes"
            :key="theme"
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

const instagramMoments: InstagramMoment[] = [
  { image: { src: '/images/instagram/moment-1.jpg', alt: 'Guest listening to music in a sunlit hotel window' }, tiltClass: '-rotate-6' },
  { image: { src: '/images/instagram/moment-2.jpg', alt: 'Guest relaxing with closed eyes in soft garden light' }, tiltClass: 'rotate-2' },
  { image: { src: '/images/instagram/moment-3.jpg', alt: 'Guest smiling in the morning sun beside tropical plants' }, tiltClass: '-rotate-3' },
  { image: { src: '/images/instagram/moment-4.jpg', alt: 'Guest unwinding with headphones on a lounger' }, tiltClass: 'rotate-3' },
  { image: { src: '/images/instagram/moment-5.jpg', alt: 'Guest with a flower in her hair enjoying the spa garden' }, tiltClass: '-rotate-2' },
  { image: { src: '/images/instagram/moment-6.jpg', alt: 'Guest meditating by a window with a hillside view' }, tiltClass: 'rotate-6' },
]

const wellnessThemes = ['Wellness Care', 'Calm', 'Energy', 'Joy of Life', 'Yoga-Fit']
</script>

<style scoped>
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
