<template>
  <NuxtLink
    to="/"
    class="group flex shrink-0 items-center gap-2.5"
    aria-label="Q Hotel Dhaka — home"
  >
    <!-- Logo mark: thin golden ring -->
    <span
      class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-copper/60 text-copper transition-colors duration-normal group-hover:border-copper"
      aria-hidden="true"
    >
      <span class="font-display text-[1.35rem] font-semibold leading-none">Q</span>
    </span>

    <!-- Logo wordmark -->
    <span class="flex flex-col leading-none">
      <span class="font-display text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-paper transition-colors duration-normal group-hover:text-copper/90">
        Hotel
      </span>
      <span class="mt-0.5 font-sans text-[0.55rem] uppercase tracking-[0.4em] text-paper/40">
        Dhaka
      </span>
    </span>
  </NuxtLink>
</template>
