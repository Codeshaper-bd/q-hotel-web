<template>
  <!-- Section eyebrow chip: the brand mark beside a tracked uppercase label,
       used to introduce sections ("Who We Are", "Select Your Room") -->
  <span class="inline-flex items-center gap-2.5 border border-line bg-paper px-4 py-2">
    <svg class="h-3.5 w-3.5 shrink-0 text-copper" viewBox="0 0 51 50" aria-hidden="true" focusable="false">
      <path
        v-for="(markPath, index) in qHotelLogoPaths"
        :key="index"
        :d="markPath"
        fill="currentColor"
      />
    </svg>
    <span class="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-ink/70">
      <slot />
    </span>
  </span>
</template>
