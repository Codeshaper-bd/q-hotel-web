<template>
  <!--
    Brand statement: a single centered editorial paragraph introducing the
    hotel — the calm beat between the cinematic hero and the rooms.
    Composes <section> directly instead of BaseSection because the brand
    watermark must hang off the viewport's left edge, outside the container.
  -->
  <section
    id="about"
    aria-labelledby="about-title"
    class="relative overflow-hidden bg-paper py-20 pb-0 text-ink sm:py-24 sm:pb-0"
  >
    <!-- Brand mark half-cropped at the viewport edge — texture, not content -->
    <svg
      class="pointer-events-none absolute -left-16 top-10 h-64 w-64 text-line/70 sm:-left-12 sm:h-72 sm:w-72"
      viewBox="0 0 51 50"
      aria-hidden="true"
      focusable="false"
    >
      <path
        v-for="(markPath, index) in qHotelLogoPaths"
        :key="index"
        :d="markPath"
        fill="currentColor"
      />
    </svg>

    <BaseContainer size="lg">
      <FadeReveal>
        <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 id="about-title" class="sr-only">Who we are</h2>
          <BaseKicker>Who We Are</BaseKicker>
          <p class="mt-8 font-display text-xl leading-9 text-ink sm:text-2xl sm:leading-[2.75rem]">
            Q Hotel is a premier hospitality destination in Dhaka, offering
            refined comfort, exceptional service, and effortless access to the
            city's key business, shopping, and cultural attractions — crafted
            for discerning travelers and memorable stays.
          </p>
        </div>
      </FadeReveal>

      <!-- Thematic break into the rooms showcase -->
      <hr class="mt-20 border-line sm:mt-24">
    </BaseContainer>
  </section>
</template>
