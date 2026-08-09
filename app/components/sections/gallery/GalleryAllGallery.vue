<template>
  <!-- All Gallery: category filter tabs over a photo grid, wired to the
       existing BaseLightbox (same open-on-click pattern as InstagramSection),
       with a "Load More" reveal instead of pagination. -->
  <BaseSection id="gallery-all" labelled-by="gallery-all-title" tone="paper" spacing="lg" container-size="xl">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Gallery</BaseKicker>
        <h2 id="gallery-all-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
          All Gallery
        </h2>

        <div role="tablist" aria-label="Gallery categories" class="mt-10 flex flex-wrap justify-center gap-2">
          <button
            v-for="category in categories"
            :id="`gallery-tab-${category.id}`"
            :key="category.id"
            type="button"
            role="tab"
            :aria-selected="activeCategory === category.id"
            :class="[
              'border px-6 py-3.5 text-sm font-medium uppercase tracking-[0.04em] transition-colors duration-fast',
              activeCategory === category.id
                ? 'border-gold bg-sand text-ink'
                : 'border-gold/60 text-ink hover:bg-sand/50',
            ]"
            @click="selectCategory(category.id)"
          >
            {{ category.label }}
          </button>
        </div>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div class="mt-12 flex flex-col items-center gap-8 lg:mt-16">
        <div class="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <button
            v-for="(image, index) in visibleImages"
            :key="`${activeCategory}-${index}-${image.src}`"
            type="button"
            class="group relative isolate aspect-[418/320] cursor-zoom-in overflow-hidden bg-line/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-copper"
            :aria-label="`Open image: ${image.alt}`"
            @click="lightboxIndex = index"
          >
            <BaseImage
              :src="image.src"
              :alt="image.alt"
              :width="418"
              :height="320"
              sizes="xs:50vw sm:33vw lg:24vw"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-normal ease-premium group-hover:scale-105"
            />
          </button>
        </div>

        <BaseArrowCta v-if="hasMore" variant="gold" @click="showMore">
          Load More
        </BaseArrowCta>
      </div>
    </FadeReveal>

    <BaseLightbox
      v-model:index="lightboxIndex"
      :images="visibleImages"
      label="Q Hotel Dhaka gallery"
    />
  </BaseSection>
</template>

<script setup lang="ts">
import type { ImageAsset } from '~/types/media'

type GalleryCategoryId = 'all' | 'rooms' | 'dining' | 'facilities' | 'meetings' | 'architecture'

interface GalleryCategory {
  id: GalleryCategoryId
  label: string
}

const categories: GalleryCategory[] = [
  { id: 'rooms', label: 'Room & Suites' },
  { id: 'all', label: 'All' },
  { id: 'dining', label: 'Dining' },
  { id: 'facilities', label: 'Facilities' },
  { id: 'meetings', label: 'Meetings & Events' },
  { id: 'architecture', label: 'Architecture' },
]

interface GalleryImage extends ImageAsset {
  category: Exclude<GalleryCategoryId, 'all'>
}

// Same 12 photos and reuse pattern as the Figma "All Gallery" grid (rows 2
// and 3 reuse four of the Featured Highlights photos, exactly as designed).
const galleryImages: GalleryImage[] = [
  { src: '/images/gallery/grid-01.jpg', alt: 'Dark, contemporary suite bedroom at Q Hotel Dhaka', category: 'rooms' },
  { src: '/images/gallery/grid-02.jpg', alt: 'Bedroom with artwork and city-view window at Q Hotel Dhaka', category: 'rooms' },
  { src: '/images/gallery/grid-03.jpg', alt: 'Guest room corridor at Q Hotel Dhaka', category: 'architecture' },
  { src: '/images/gallery/grid-04.jpg', alt: 'Banquet hall set for an event at Q Hotel Dhaka', category: 'meetings' },
  { src: '/images/gallery/grid-05.jpg', alt: 'Rooftop bar with skyline view at Q Hotel Dhaka', category: 'facilities' },
  { src: '/images/gallery/feature-04.jpg', alt: 'Fine dining room at Q Hotel Dhaka', category: 'dining' },
  { src: '/images/gallery/feature-06.jpg', alt: 'Fitness center at Q Hotel Dhaka', category: 'facilities' },
  { src: '/images/gallery/feature-10.jpg', alt: 'Spa treatment room at Q Hotel Dhaka', category: 'facilities' },
  { src: '/images/gallery/feature-11.jpg', alt: 'Grand lobby with a water feature at Q Hotel Dhaka', category: 'architecture' },
  { src: '/images/gallery/grid-06.jpg', alt: 'Bathroom vanity with backlit mirror at Q Hotel Dhaka', category: 'rooms' },
  { src: '/images/gallery/grid-07.jpg', alt: 'Marble walk-in shower at Q Hotel Dhaka', category: 'rooms' },
  { src: '/images/gallery/grid-08.jpg', alt: 'Poolside lounge and bar at Q Hotel Dhaka', category: 'facilities' },
]

const PAGE_SIZE = 8

const activeCategory = ref<GalleryCategoryId>('all')
const visibleCount = ref(PAGE_SIZE)
const lightboxIndex = ref<number | null>(null)

const filteredImages = computed(() => (
  activeCategory.value === 'all'
    ? galleryImages
    : galleryImages.filter(image => image.category === activeCategory.value)
))

const visibleImages = computed(() => filteredImages.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filteredImages.value.length)

function selectCategory(id: GalleryCategoryId) {
  activeCategory.value = id
  visibleCount.value = PAGE_SIZE
}

function showMore() {
  visibleCount.value += PAGE_SIZE
}
</script>
