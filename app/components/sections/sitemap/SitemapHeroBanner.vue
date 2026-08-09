<template>
  <!--
    Static full-bleed cover with a breadcrumb, matching the other secondary
    page banners (Rooms, Careers, Contact): a photo, the trail back to Home,
    and the page title.
  -->
  <section aria-labelledby="sitemap-banner-title" class="relative isolate bg-ink text-paper">
    <div class="relative flex min-h-[26rem] items-center justify-center overflow-hidden py-24 sm:min-h-[28rem]">
      <BaseImage
        src="/images/sitemap/hero-cover.jpg"
        alt=""
        :width="1920"
        :height="662"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />
      <div class="absolute inset-0 bg-ink/60" aria-hidden="true" />

      <div class="relative z-10 flex flex-col items-center gap-4 text-center">
        <BaseBreadcrumb
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Sitemap' },
          ]"
        />

        <h1 id="sitemap-banner-title" class="font-display text-4xl text-paper sm:text-5xl lg:text-[56px] lg:font-semibold">
          Site Map
        </h1>
      </div>
    </div>
  </section>
</template>
