<template>
  <!--
    Featured Highlights: reproduces Figma's exact nested photo/caption
    collage — two asymmetric groups sharing row 1, then a six-item strip for
    row 2 — using flex `basis` percentages derived from the design's own
    pixel widths so proportions match precisely at the `lg` container width.
    Stacks to a single column below `lg`, where fixed ratios stop applying.
  -->
  <BaseSection id="gallery-highlights" labelled-by="gallery-highlights-title" tone="paper" spacing="lg" container-size="xl" class="!pb-[70px]">
    <FadeReveal>
      <div class="flex flex-col items-center text-center">
        <BaseKicker>Featured</BaseKicker>
        <h2 id="gallery-highlights-title" class="mt-6 font-display text-4xl text-ink sm:text-5xl lg:text-[56px] lg:text-[#0F0F10]">
          Featured Highlights
        </h2>
      </div>
    </FadeReveal>

    <FadeReveal>
      <div class="mt-12 flex flex-col gap-4 lg:mt-16">
        <!-- Row 1 -->
        <div class="flex flex-col gap-4 lg:flex-row">
          <!-- Left group -->
          <div class="flex flex-col gap-4 lg:basis-[43.08%]">
            <div class="flex flex-col items-center gap-4 sm:flex-row">
              <GalleryPhoto
                src="/images/gallery/feature-01.jpg"
                alt="Elegant hotel room with a city view at Q Hotel Dhaka"
                :width="476"
                :height="297"
                aspect-class="aspect-[476/297] w-full"
                basis-class="sm:basis-[68.5%]"
              />
              <GalleryCaption title="Elegant stays with stunning city views" subtitle="Design for comfort, crafted for you." basis-class="sm:basis-[31.5%]" />
            </div>
            <div class="flex flex-col-reverse items-center gap-4 sm:flex-row">
              <GalleryCaption title="Relax and unwind in luxury" subtitle="Recharge your body and mind" basis-class="sm:basis-[31.3%]" />
              <GalleryPhoto
                src="/images/gallery/feature-02.jpg"
                alt="Outdoor swimming pool at night at Q Hotel Dhaka"
                :width="481"
                :height="245"
                aspect-class="aspect-[481/245] w-full"
                basis-class="sm:basis-[68.7%]"
              />
            </div>
          </div>

          <!-- Right group -->
          <div class="flex flex-col gap-4 sm:flex-row lg:basis-[55.98%]">
            <GalleryPhoto
              src="/images/gallery/feature-03.jpg"
              alt="Q Hotel Dhaka building exterior"
              :width="421"
              :height="557"
              aspect-class="aspect-[421/557] w-full"
              basis-class="sm:basis-[44.5%]"
            />
            <div class="flex flex-col gap-4 sm:basis-[55.5%]">
              <div class="flex flex-col items-center gap-4 sm:flex-row">
                <GalleryPhoto
                  src="/images/gallery/feature-04.jpg"
                  alt="Fine dining room at Q Hotel Dhaka"
                  :width="300"
                  :height="296"
                  aspect-class="aspect-[300/296] w-full"
                  basis-class="sm:basis-[60.7%]"
                />
                <GalleryCaption title="World class dining and refined flavors" subtitle="An unforgettable culinary experience awaits." basis-class="sm:basis-[39.3%]" />
              </div>
              <div class="flex gap-4">
                <GalleryPhoto
                  src="/images/gallery/feature-05.jpg"
                  alt="Modern bathroom suite at Q Hotel Dhaka"
                  :width="257"
                  :height="248"
                  aspect-class="aspect-[257/248] w-1/2"
                />
                <GalleryPhoto
                  src="/images/gallery/feature-06.jpg"
                  alt="Fitness center at Q Hotel Dhaka"
                  :width="253"
                  :height="248"
                  aspect-class="aspect-[253/248] w-1/2"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Row 2 -->
        <div class="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:flex-nowrap">
          <GalleryPhoto
            src="/images/gallery/feature-07.jpg"
            alt="Lobby lounge seating at Q Hotel Dhaka"
            :width="210"
            :height="261"
            aspect-class="aspect-[210/261] w-full"
            basis-class="sm:w-[calc(50%-0.5rem)] lg:w-auto lg:basis-[12.98%]"
          />
          <GalleryPhoto
            src="/images/gallery/feature-08.jpg"
            alt="Private dining room at Q Hotel Dhaka"
            :width="217"
            :height="261"
            aspect-class="aspect-[217/261] w-full"
            basis-class="sm:w-[calc(50%-0.5rem)] lg:w-auto lg:basis-[13.41%]"
          />
          <GalleryPhoto
            src="/images/gallery/feature-09.jpg"
            alt="Coffee counter at Q Hotel Dhaka"
            :width="298"
            :height="261"
            aspect-class="aspect-[298/261] w-full"
            basis-class="sm:w-[calc(50%-0.5rem)] lg:w-auto lg:basis-[18.41%]"
          />
          <GalleryCaption
            title="Exceptional service at every step"
            subtitle="We’re here to make every moment special"
            basis-class="sm:w-[calc(50%-0.5rem)] lg:w-auto lg:basis-[15.88%]"
          />
          <GalleryPhoto
            src="/images/gallery/feature-10.jpg"
            alt="Spa treatment room at Q Hotel Dhaka"
            :width="306"
            :height="261"
            aspect-class="aspect-[306/261] w-full"
            basis-class="sm:w-[calc(50%-0.5rem)] lg:w-auto lg:basis-[18.9%]"
          />
          <GalleryPhoto
            src="/images/gallery/feature-11.jpg"
            alt="Grand lobby with a water feature at Q Hotel Dhaka"
            :width="331"
            :height="261"
            aspect-class="aspect-[331/261] w-full"
            basis-class="sm:w-[calc(50%-0.5rem)] lg:w-auto lg:basis-[20.44%]"
          />
        </div>
      </div>
    </FadeReveal>
  </BaseSection>
</template>
