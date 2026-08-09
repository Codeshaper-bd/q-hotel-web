<template>
  <!-- Gallery banner: static full-bleed photo with a breadcrumb and title —
       same composition as the Rooms/Long Stay hero banners. -->
  <section aria-labelledby="gallery-banner-title" class="relative isolate text-paper">
    <div class="relative flex min-h-[26rem] items-center justify-center overflow-hidden py-24 sm:min-h-[28rem]">
      <BaseImage
        src="/images/gallery/hero.jpg"
        alt=""
        :width="1919"
        :height="1199"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />
      <div class="absolute inset-0 bg-ink/70" aria-hidden="true" />

      <div class="relative z-10 flex flex-col items-center gap-4 text-center">
        <nav aria-label="Breadcrumb">
          <ol class="flex items-center gap-2 text-sm text-paper/85">
            <li class="flex items-center gap-1.5">
              <svg
                class="h-3.5 w-3.5 text-paper/70"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2 7.5L8 2l6 5.5M3.5 6.5V13a.5.5 0 00.5.5h3v-4h2v4h3a.5.5 0 00.5-.5V6.5"
                />
              </svg>
              <NuxtLink
                to="/"
                class="transition-colors duration-fast hover:text-champagne"
              >Home</NuxtLink>
            </li>
            <li class="flex items-center gap-2" aria-current="page">
              <svg
                class="h-3 w-3 text-paper/50"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 3l5 5-5 5"
                />
              </svg>
              <span>Gallery</span>
            </li>
          </ol>
        </nav>

        <h1
          id="gallery-banner-title"
          class="max-w-3xl font-display text-4xl text-paper sm:text-5xl"
        >
          A Glimpse of Q Hotel Dhaka
        </h1>
        <p class="max-w-xl text-base text-paper/85">
          Explore the beauty of Q Hotel Dhaka through our gallery. From elegant rooms and world-class dining to exceptional facilities and memorable moments.
        </p>
      </div>
    </div>
  </section>
</template>
