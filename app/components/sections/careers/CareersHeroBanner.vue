<template>
  <!--
    Static full-bleed cover with a breadcrumb, matching the Room List banner
    pattern: this is a secondary page, so no scroll motion — just the photo,
    the trail back to Home, and the page title.
  -->
  <section aria-labelledby="careers-banner-title" class="relative isolate bg-ink text-paper">
    <div class="relative flex min-h-[26rem] items-center justify-center overflow-hidden py-24 sm:min-h-[28rem]">
      <BaseImage
        src="/images/careers/hero-dining.jpg"
        alt=""
        :width="1920"
        :height="800"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />
      <div class="absolute inset-0 bg-ink/70" aria-hidden="true" />

      <div class="relative z-10 flex flex-col items-center gap-4 text-center">
        <BaseBreadcrumb
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Career' },
          ]"
        />

        <h1 id="careers-banner-title" class="font-display text-4xl text-paper sm:text-5xl lg:text-[56px] lg:font-semibold">
          Find New Opportunities
        </h1>
      </div>
    </div>
  </section>
</template>
