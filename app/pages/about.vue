<template>
  <div>
    <PageBanner
      title="Welcome To Q Hotel Dhaka"
      image="/images/about/about-us.png"
      overlay-class="bg-transparent"
      title-class="max-w-[600px] text-[72px] leading-[80px] font-bold"
    >
      <template #scroll-cue>
        <span
          class="absolute bottom-10 left-1/2 hidden h-14 w-8 -translate-x-1/2 items-start justify-center rounded-full border border-paper/70 pt-2.5 motion-safe:sm:flex"
          aria-hidden="true"
        >
          <span class="scroll-cue-dot h-2 w-1 rounded-full bg-paper" />
        </span>
      </template>
    </PageBanner>
    <AboutIntro />
    <AboutSignatureExperiences />
    <AboutReservationCta />
  </div>
</template>

<script setup lang="ts">
useSeoMetaData({
  title: 'About Us',
  description: 'Discover the story behind Q Hotel Dhaka — refined comfort, warm hospitality, and personalized service in the heart of the city.',
  path: '/about'
})
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .scroll-cue-dot {
    animation: scroll-cue 1.8s ease-in-out infinite;
  }
}

@keyframes scroll-cue {
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  60% {
    transform: translateY(0.85rem);
    opacity: 0.3;
  }
}
</style>