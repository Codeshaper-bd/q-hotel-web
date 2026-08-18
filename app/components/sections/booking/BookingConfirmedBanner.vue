<template>
  <section
    aria-labelledby="confirmed-title"
    class="relative isolate bg-ink text-paper"
  >
    <div
      class="relative flex h-[480px] items-center justify-center overflow-hidden mt-[--header-height] sm:h-[640px] lg:h-[800px]"
    >
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

      <div
        class="relative z-10 flex flex-col items-center gap-5 px-5 text-center mt-12"
      >
        <svg
          width="88"
          height="88"
          viewBox="0 0 88 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M43.75 0C35.0971 0 26.6385 2.56589 19.4438 7.3732C12.2492 12.1805 6.64162 19.0133 3.33029 27.0076C0.0189561 35.0019 -0.84744 43.7985 0.840664 52.2852C2.52877 60.7719 6.69555 68.5674 12.8141 74.6859C18.9326 80.8045 26.7282 84.9713 35.2148 86.6594C43.7015 88.3475 52.4982 87.4811 60.4924 84.1697C68.4867 80.8584 75.3195 75.2508 80.1268 68.0562C84.9341 60.8615 87.5 52.4029 87.5 43.75C87.5 32.1468 82.8907 21.0188 74.6859 12.8141C66.4812 4.60936 55.3532 0 43.75 0ZM37.5 61.2188L21.875 45.5938L26.8438 40.625L37.5 51.2812L60.6563 28.125L65.6438 33.0813L37.5 61.2188Z"
            fill="#008000"
          />
        </svg>

        <h1
          id="confirmed-title"
          class="font-display text-4xl text-paper sm:text-5xl lg:text-[56px] font-semibold"
        >
          Booking Confirmed
        </h1>

        <p class="max-w-xl text-lg font-medium text-white ">
          Thank you, {{ guestFirstName }}! Your reservation has been
          successfully confirmed. We've sent the confirmation details to
          <span class="text-[#E9C588]">{{ guestEmail }}</span
          >.
        </p>

        <p
          class="border border-paper/25 px-6 py-2.5 text-base font-normal uppercase  text-white "
        >
          Reservation # {{ reservationNumber }}
        </p>

        <div class="mt-7 flex flex-wrap items-center justify-center gap-4">
          <BaseArrowCta to="#reservation-summary" variant="gold">
            View Reservation
          </BaseArrowCta>
          <button
            type="button"
            class="group inline-flex items-stretch border border-[#EED4A3] text-[#EED4A3] transition-colors duration-fast hover:border-paper/60"
            @click="downloadInvoice"
          >
            <span
              class="flex items-center px-6 py-2.5 text-[15px] font-medium uppercase"
            >
              Download Invoice
            </span>
            <span
              class="flex items-center border border-[#EED4A3] px-3.5"
              aria-hidden="true"
            >
              <svg
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"
                />
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
  guestFirstName: string;
  guestEmail: string;
  reservationNumber: string;
}>();

// No PDF invoice service exists yet; the browser's print-to-PDF is a
// reasonable stand-in until real invoice generation lands with the PMS work
function downloadInvoice() {
  window.print();
}
</script>
