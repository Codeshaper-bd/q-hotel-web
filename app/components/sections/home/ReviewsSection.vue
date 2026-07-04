<template>
  <!--
    Travelers Review: a dark testimonial band — a rating summary card leads a
    scroll-snap carousel of guest stories, with a progress rule and round
    paging arrows as in the Figma design.
  -->
  <BaseSection id="reviews" labelled-by="reviews-title" tone="ink" spacing="lg" container-size="xl">
    <FadeReveal>
      <div class="flex flex-col items-start">
        <BaseKicker tone="ink">Travelers Review</BaseKicker>
        <h2 id="reviews-title" class="mt-6 max-w-xl font-display text-4xl text-paper sm:text-5xl">
          Stories Behind Every Memorable Stay
        </h2>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div
        ref="carouselViewportRef"
        class="scrollbar-quiet -mx-5 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 motion-reduce:scroll-auto"
        aria-label="Guest reviews"
      >
        <!-- Rating summary leads the carousel -->
        <div
          data-carousel-card
          class="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col bg-paper/10 p-7 sm:w-[46%] sm:p-8 lg:w-[calc((100%-4.5rem)/4)] lg:max-w-none"
        >
          <p class="text-5xl font-semibold text-paper">5.0</p>
          <p class="mt-4 text-sm leading-6 text-paper/70">
            Discover how we've helped travelers create memories that last a lifetime.
          </p>

          <div class="mt-6 flex items-center">
            <img
              v-for="(avatar, avatarIndex) in guestAvatars"
              :key="avatar.src"
              :src="avatar.src"
              :alt="avatar.alt"
              width="72"
              height="72"
              loading="lazy"
              :class="['h-9 w-9 rounded-full border-2 border-ink object-cover', avatarIndex > 0 ? '-ml-2.5' : '']"
            >
            <span class="-ml-2.5 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-paper text-[0.65rem] font-semibold text-ink">
              55+
            </span>
          </div>

          <div class="mt-6 space-y-2">
            <p class="flex items-center gap-2 text-sm font-semibold text-paper">
              <svg class="h-5 w-5 shrink-0 text-paper" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-4.4 12.9a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8zm8.8 0a2.4 2.4 0 110-4.8 2.4 2.4 0 010 4.8zm-8.8-3.6a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zm8.8 0a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
              </svg>
              Tripadvisor
            </p>
            <p class="flex items-center gap-3 text-sm text-paper/80">
              <span class="font-semibold text-paper">5.0</span>
              <span class="flex gap-1" aria-hidden="true">
                <svg v-for="starIndex in 5" :key="starIndex" class="h-3.5 w-3.5 text-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
                </svg>
              </span>
            </p>
            <p class="text-xs text-paper/60">Based on 165 reviews</p>
          </div>

          <div class="mt-8 lg:mt-auto lg:pt-8">
            <BaseButton
              href="https://www.tripadvisor.com"
              variant="gold"
              target="_blank"
              rel="noopener"
            >
              Write a Review
              <svg class="ml-2.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
            </BaseButton>
          </div>
        </div>

        <!-- Guest stories -->
        <blockquote
          v-for="review in reviews"
          :key="review.id"
          data-carousel-card
          class="flex w-[82vw] max-w-sm shrink-0 snap-start flex-col bg-paper/10 p-7 sm:w-[46%] sm:p-8 lg:w-[calc((100%-4.5rem)/4)] lg:max-w-none"
        >
          <p class="flex gap-1.5" :aria-label="`Rated ${review.rating} out of 5 stars`">
            <svg v-for="starIndex in review.rating" :key="starIndex" class="h-4 w-4 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" />
            </svg>
          </p>
          <p class="mt-6 font-display text-xl leading-8 text-paper">
            {{ review.quote }}
          </p>
          <footer class="mt-auto pt-8 text-sm text-paper/70">
            {{ review.guestName }}
          </footer>
        </blockquote>
      </div>
    </FadeReveal>

    <!-- Progress rule left, round paging arrows right -->
    <div class="mt-10 flex items-center justify-between gap-6">
      <div class="carousel-progress h-px w-40 bg-paper/20 sm:w-56" aria-hidden="true" />

      <div class="flex gap-3">
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-champagne bg-champagne text-night transition-opacity duration-fast disabled:opacity-40"
          :disabled="!canScrollBack"
          aria-label="Previous reviews"
          @click="scrollByCard(-1)"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors duration-fast enabled:hover:border-champagne enabled:hover:text-champagne disabled:opacity-40"
          :disabled="!canScrollForward"
          aria-label="Next reviews"
          @click="scrollByCard(1)"
        >
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { ImageAsset } from '~/types/media'
import type { GuestReview } from '~/types/review'

/** Static testimonial content (CMS/review-API-ready shape) */
const reviews: GuestReview[] = [
  {
    id: 'ravi-nisha',
    quote: 'We booked our anniversary stay here, and it was the best decision ever. From the serene rooms to sunset dinners, every detail was handled perfectly.',
    guestName: 'Ravi & Nisha Shankar',
    rating: 5,
  },
  {
    id: 'david-emma',
    quote: 'Business trip turned mini-holiday. The lounge, the pool, the breakfast — the accommodations were luxurious and the staff are top-notch.',
    guestName: 'David & Emma Gomes',
    rating: 5,
  },
  {
    id: 'farhan-ayesha',
    quote: 'The quietest sleep we have had in Dhaka. Thoughtful service without ever hovering, and the spa is worth the stay on its own.',
    guestName: 'Farhan & Ayesha Rahman',
    rating: 5,
  },
  {
    id: 'sophie-lin',
    quote: 'Effortless from check-in to checkout. The airport shuttle was waiting, the room was ready early, and dinner recommendations were spot on.',
    guestName: 'Sophie Lin',
    rating: 5,
  },
]

const guestAvatars: ImageAsset[] = [
  { src: '/images/reviews/guest-avatar-1.jpg', alt: 'Q Hotel guest portrait' },
  { src: '/images/reviews/guest-avatar-2.jpg', alt: 'Q Hotel guest portrait' },
  { src: '/images/reviews/guest-avatar-3.jpg', alt: 'Q Hotel guest portrait' },
  { src: '/images/reviews/guest-avatar-4.jpg', alt: 'Q Hotel guest portrait' },
]

const carouselViewportRef = ref<HTMLElement | null>(null)
const { scrollProgress, canScrollBack, canScrollForward, scrollByCard } = useScrollCarousel(carouselViewportRef)

/** Progress consumed by the scoped rule via CSS variable (no inline styles) */
const progressStyle = computed(() => `${Math.round(scrollProgress.value * 100)}%`)
</script>

<style scoped>
/* Hide the horizontal scrollbar without disabling scrolling */
.scrollbar-quiet {
  scrollbar-width: none;
}

.scrollbar-quiet::-webkit-scrollbar {
  display: none;
}

/* Scroll-linked progress rule: width comes from the carousel composable */
.carousel-progress {
  position: relative;
}

.carousel-progress::after {
  background: rgb(var(--color-champagne));
  content: '';
  inset: 0 auto 0 0;
  position: absolute;
  transition: width var(--duration-fast) linear;
  width: v-bind(progressStyle);
}
</style>
