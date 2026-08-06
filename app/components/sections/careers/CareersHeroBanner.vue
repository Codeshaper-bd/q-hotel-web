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
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-sm text-paper/85">
            <li class="flex items-center gap-1.5">
              <svg class="h-3.5 w-3.5 text-paper/70" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2 7.5L8 2l6 5.5M3.5 6.5V13a.5.5 0 00.5.5h3v-4h2v4h3a.5.5 0 00.5-.5V6.5" />
              </svg>
              <NuxtLink to="/" class="transition-colors duration-fast hover:text-champagne">Home</NuxtLink>
            </li>
            <li class="flex items-center gap-2" aria-current="page">
              <svg class="h-3 w-3 text-paper/50" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 3l5 5-5 5" />
              </svg>
              <span>Career</span>
            </li>
          </ol>
        </nav>

        <h1 id="careers-banner-title" class="font-display text-4xl text-paper sm:text-5xl">
          Find New Opportunities
        </h1>
      </div>
    </div>
  </section>
</template>
