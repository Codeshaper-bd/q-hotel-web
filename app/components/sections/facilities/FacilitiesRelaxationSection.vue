<template>
  <section aria-labelledby="facilities-relaxation-title" class="bg-paper pt-[140px] pb-20 text-ink sm:pb-24 lg:pb-32">
    <BaseContainer size="xl">
      <FadeReveal>
        <div class="text-center">
          <BaseKicker>Relaxation &amp; Comfort</BaseKicker>
          <h2 id="facilities-relaxation-title" class="mt-5 font-display text-4xl font-semibold sm:text-5xl">
            Designed for Rest &amp; Relaxation
          </h2>
        </div>
      </FadeReveal>

      <FadeReveal :stagger="0.08" :distance="28">
        <div class="mt-10 grid gap-2 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          <div v-for="image in relaxationImages" :key="image.src" data-reveal-item
            class="aspect-[4/3] overflow-hidden bg-line/40">
            <BaseImage :src="image.src" :alt="image.alt" :width="760" :height="570" sizes="xs:100vw sm:50vw lg:33vw"
              class="h-full w-full object-cover transition-transform duration-[1000ms] ease-[var(--ease-premium)] hover:scale-[1.025]" />
          </div>
        </div>
      </FadeReveal>

      <FadeReveal>
        <div class="mx-auto mt-20 flex max-w-xl flex-col items-center text-center sm:mt-24">
          <BaseKicker>Contact Now</BaseKicker>
          <h3
            class="mt-5 font-display text-3xl font-semibold  sm:text-4xl lg:text-[56px] lg:leading-[66px] text-[#0F0F10] max-w-[604px]">
            Dedicated Team Always At Your Service
          </h3>
          <BaseArrowCta to="/contact" variant="gold" class="mt-8">
            Contact Us Now
          </BaseArrowCta>
        </div>
      </FadeReveal>
    </BaseContainer>
  </section>
</template>

<script setup lang="ts">
interface RelaxationImage {
  src: string
  alt: string
}

const relaxationImages: RelaxationImage[] = [
  {
    src: '/images/facilities/pool-1.png',
    alt: 'Poolside loungers beside the swimming pool at Q Hotel Dhaka',
  },
  {
    src: '/images/facilities/pool-2.png',
    alt: 'Outdoor swimming pool at night at Q Hotel Dhaka',
  },
  {
    src: '/images/facilities/pool-3.png',
    alt: 'Poolside lounge and bar at Q Hotel Dhaka',
  },
]
</script>
