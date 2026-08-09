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
        <BaseBreadcrumb
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Gallery' },
          ]"
        />

        <h1
          id="gallery-banner-title"
          class="max-w-3xl font-display text-4xl text-paper sm:text-5xl lg:text-[56px] lg:font-semibold"
        >
          A Glimpse of Q Hotel Dhaka
        </h1>
        <p class="max-w-xl text-lg font-medium text-paper">
          Explore the beauty of Q Hotel Dhaka through our gallery. From elegant rooms and world-class dining to exceptional facilities and memorable moments.
        </p>
      </div>
    </div>
  </section>
</template>
