<template>
  <!--
    Dining page showcase: a bento photo collage — one large main photograph in
    the left column, two photographs stacked in the right column. On desktop
    the main image is fixed at 740px tall and the top/bottom pair splits the
    right column so their combined height matches it exactly. Grid gap 16px.
  -->
  <BaseSection tone="paper" spacing="lg" container-size="xl" aria-labelledby="dining-section-title">
    <div class="flex flex-col items-center text-center">
      <BaseKicker>Dine With Us</BaseKicker>
      <h2 id="dining-section-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl">
        Restaurants &amp; Lounges
      </h2>
    </div>

    <div class="mt-14 grid gap-4 md:grid-cols-2">
      <!-- Left column: main image, fixed 740px on desktop -->
      <div class="col-span-2 md:col-span-1">
        <div class="aspect-[4/3] md:aspect-auto md:h-[560px] lg:h-[740px]">
          <BaseImage
            src="/images/dining/dining-01-main.png"
            alt="Q Hotel dining room with elegant tables and warm lighting"
            :width="1200"
            :height="900"
            sizes="xs:100vw sm:100vw lg:50vw"
          />
        </div>
      </div>

      <!-- Right column: top + bottom, combined height equals the main image -->
      <div class="col-span-2 flex flex-col gap-4 md:col-span-1">
        <div class="h-64 sm:h-80 md:h-[272px] lg:h-[362px]">
          <BaseImage
            src="/images/dining/dining-02-top.png"
            alt="Q Hotel rooftop lounge and bar at dusk"
            :width="800"
            :height="600"
            sizes="xs:100vw sm:100vw lg:50vw"
          />
        </div>

        <div class="h-64 sm:h-80 md:h-[272px] lg:h-[362px]">
          <BaseImage
            src="/images/dining/dining-03-bottom.png"
            alt="Q Hotel café with marble tables and patisserie counter"
            :width="800"
            :height="600"
            sizes="xs:100vw sm:100vw lg:50vw"
          />
        </div>
      </div>
    </div>

    <div class="mt-12 flex justify-center">
      <BaseArrowCta to="#reserve" variant="gold" background-class="!bg-[#E9C588]">
        Reserve a Table
      </BaseArrowCta>
    </div>
  </BaseSection>
</template>