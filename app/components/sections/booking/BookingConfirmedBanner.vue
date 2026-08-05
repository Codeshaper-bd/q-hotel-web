<template>
  <section aria-labelledby="confirmed-title" class="relative isolate bg-ink text-paper">
    <div class="relative flex min-h-[32rem] items-center justify-center overflow-hidden py-24">
      <BaseImage
        src="/images/rooms/executive-suite.jpg"
        alt=""
        :width="1920"
        :height="900"
        priority
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:1920px"
        class="absolute inset-0"
      />
      <div class="absolute inset-0 bg-ink/70" aria-hidden="true" />

      <div class="relative z-10 flex flex-col items-center gap-5 px-5 text-center">
        <span class="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-moss text-paper" aria-hidden="true">
          <svg class="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>

        <h1 id="confirmed-title" class="font-display text-4xl text-paper sm:text-5xl">
          Booking Confirmed
        </h1>

        <p class="max-w-xl text-base leading-7 text-paper/80">
          Thank you, {{ guestFirstName }}! Your reservation has been successfully confirmed. We've sent the confirmation details to
          <span class="text-champagne">{{ guestEmail }}</span>.
        </p>

        <p class="border border-paper/25 bg-paper/10 px-6 py-3 text-sm font-medium uppercase tracking-[0.06em] text-paper backdrop-blur-sm">
          Reservation # {{ reservationNumber }}
        </p>

        <div class="mt-2 flex flex-wrap items-center justify-center gap-4">
          <BaseArrowCta to="#reservation-summary" variant="gold">
            View Reservation
          </BaseArrowCta>
          <button
            type="button"
            class="group inline-flex items-stretch border border-paper/30 text-paper transition-colors duration-fast hover:border-paper/60"
            @click="downloadInvoice"
          >
            <span class="flex items-center px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.08em]">
              Download Invoice
            </span>
            <span class="flex items-center border-l border-paper/30 px-3.5" aria-hidden="true">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  guestFirstName: string
  guestEmail: string
  reservationNumber: string
}>()

// No PDF invoice service exists yet; the browser's print-to-PDF is a
// reasonable stand-in until real invoice generation lands with the PMS work
function downloadInvoice() {
  window.print()
}
</script>
