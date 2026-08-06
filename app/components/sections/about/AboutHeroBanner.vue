<template>
  <!--
    Plain full-bleed cover: no breadcrumb, no console — this page opens on a
    single welcoming statement, not a task (search, booking, checkout).
  -->
  <section aria-labelledby="about-hero-title" class="relative isolate bg-ink text-paper">
    <div class="relative flex min-h-[38rem] items-center justify-center overflow-hidden py-24 sm:min-h-[42rem]">
      <BaseImage
        src="/images/hero/lobby-interior.jpg"
        alt=""
        :width="1920"
        :height="1000"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />
      <div class="absolute inset-0 bg-ink/60" aria-hidden="true" />

      <h1 id="about-hero-title" class="relative z-10 px-5 text-center font-display text-5xl font-bold leading-tight text-paper sm:text-7xl">
        Welcome To<br>Q Hotel Dhaka
      </h1>

      <span class="absolute bottom-10 left-1/2 hidden h-14 w-8 -translate-x-1/2 items-start justify-center rounded-full border border-paper/70 pt-2.5 motion-safe:sm:flex" aria-hidden="true">
        <span class="scroll-cue-dot h-2 w-1 rounded-full bg-paper" />
      </span>
    </div>
  </section>
</template>

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
