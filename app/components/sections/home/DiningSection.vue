<template>
  <!--
    Dining preview: a full-bleed restaurant photograph with a bottom scrim and
    editorial copy anchored to the container's left edge. Composes <section>
    directly (not BaseSection) because the image must bleed to both viewport
    edges while the copy stays on the xl container grid.
  -->
  <section
    id="dining"
    aria-labelledby="dining-title"
    class="relative isolate overflow-hidden bg-night text-paper"
  >
    <!-- Reserved frame: tall enough for copy on small screens, cinematic on wide -->
    <div class="relative min-h-[34rem] lg:aspect-[192/100] lg:min-h-0 lg:max-h-[52rem] lg:w-full">
      <BaseImage
        :src="restaurant.image.src"
        :alt="restaurant.image.alt"
        :width="1920"
        :height="1000"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />

      <!-- Legibility scrim: fades the lower half toward night -->
      <div class="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-night/90 via-night/40 to-transparent" aria-hidden="true" />

      <div class="absolute inset-0 flex items-end">
        <BaseContainer size="xl">
          <FadeReveal>
            <div class="max-w-xl pb-14 sm:pb-20">
              <h2 id="dining-title" class="font-display text-4xl text-paper sm:text-5xl">
                {{ restaurant.name }}
              </h2>
              <p class="mt-5 text-sm leading-7 text-paper/80 sm:text-base">
                {{ restaurant.description }}
              </p>
              <div class="mt-8">
                <BaseButton href="#reserve" variant="gold">
                  Explore Now
                  <svg class="ml-2.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </BaseButton>
              </div>
            </div>
          </FadeReveal>
        </BaseContainer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ImageAsset } from '~/types/media'

/** Single featured venue today; becomes a list when more outlets launch */
interface DiningVenue {
  name: string
  description: string
  image: ImageAsset
}

const restaurant: DiningVenue = {
  name: 'BBQ Restaurant',
  description: 'Charcoal-grilled specialties in a double-height dining room of stone, timber, and low evening light — our signature restaurant pairs bold flavors with an unhurried, convivial setting.',
  image: { src: '/images/dining/bbq-restaurant.jpg', alt: 'Q Hotel BBQ Restaurant dining room with ring chandeliers, stone feature wall, and city-view windows' },
}
</script>
