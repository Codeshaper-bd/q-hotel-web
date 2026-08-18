<template>
  <!--
    Reservation success modal: shown after the reservation form submits.
    Built on BaseModal (native <dialog> shell: focus trap, inert background,
    Esc-to-close, focus restore, Lenis frozen and page locked while open).
  -->
  <BaseModal
    v-model="open"
    labelled-by="reservation-success-title"
    close-label="Close"
    max-width-class="max-w-[590px]"
    close-button-class="absolute right-5 top-5 flex size-7 items-center justify-center bg-[#FAF5E9] text-[#27231F] transition hover:bg-[#F3E8CF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C87532]"
    close-icon-class="size-3.5"
    @close="emit('close')"
  >
    <div class="relative bg-white px-7 pb-5 pt-8 sm:px-12 sm:pb-7 sm:pt-9">
      <!-- Success Icon -->
      <div class="flex justify-center">
        <div class="flex size-[54px] items-center justify-center rounded-full bg-[#008A18]">
          <svg viewBox="0 0 24 24" fill="none" class="size-7 text-white" stroke="currentColor" stroke-width="2.4"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>
      </div>

      <!-- Heading -->
      <div class="mt-4 text-center">
        <h2 id="reservation-success-title" class="font-display text-[36px] text-[#0F0F10]">
          Reservation Submitted
        </h2>

        <p class="mt-1 font-display font-semibold text-[28px] text-[#008000]">
          Thank you
        </p>

        <span class="mx-auto mt-2 block h-px w-[98px] bg-[#DFA558]" />

        <p class="mx-auto mt-3.5 max-w-[545px] text-base text-[#000000]">
          Your reservation request has been received successfully.
          Our team will contact you shortly to confirm your booking.
        </p>
      </div>

      <!-- Reservation Details -->
      <div class="mt-5 bg-[#FCF8F0] px-5 py-4">
        <p class="text-sm font-medium text-[#A75B27] uppercase">
          Reservation Details
        </p>

        <div>
          <div class="detail-row">
            <span>Date</span>
            <span>{{ details.date }}</span>
          </div>

          <div class="detail-row">
            <span>Time</span>
            <span>{{ details.time }}</span>
          </div>

          <div class="detail-row">
            <span>Guests</span>

            <span>
              {{
                typeof details.guests === 'number'
                  ? `${details.guests} Guests`
                  : details.guests
              }}
            </span>
          </div>

          <div class="detail-row">
            <span>Restaurant</span>
            <span>{{ details.restaurant }}</span>
          </div>

          <div class="detail-row border-b-0">
            <span>Reference ID</span>
            <span>{{ details.referenceId }}</span>
          </div>
        </div>
      </div>

      <!-- Confirmation Notice -->
      <div class="mt-2.5 flex items-start gap-3 bg-[#EFF1E6] px-4 py-3 text-[10px] leading-[1.6] text-[#55594B]">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
            stroke="#008000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 15.998H12.01V16.008H12V15.998Z" stroke="#008000" stroke-width="2" stroke-linejoin="round" />
          <path d="M12 12.002V8.00195" stroke="#008000" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>

        <p class="text-lg text-[#373737] font-medium">
          You will receive a
          <span class="font-medium text-[#008000]">
            confirmation email or phone call
          </span>
          from our team within a few minutes.
        </p>
      </div>

      <!-- Close Button -->
      <button type="button" class="group mt-4 flex h-[42px] w-full items-stretch bg-[#121212] text-white transition hover:bg-black
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-2 focus-visible:outline-[#C87532]" @click="open = false">
        <span class="flex flex-1 items-center justify-center text-sm font-medium uppercase">
          Close
        </span>

        <span class="flex w-[42px] items-center justify-center border-l border-white/70" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" class="size-4 transition-transform duration-200
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5" stroke="currentColor" stroke-width="1.4">
            <path d="M6 14 14 6M8 6h6v6" />
          </svg>
        </span>
      </button>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import type { ReservationDetails } from '~/types/dining'

const props = withDefaults(defineProps<{
  /** v-model: `true` opens the modal */
  modelValue: boolean
  details?: ReservationDetails
}>(), {
  details: () => ({
    date: 'May 24, 2025',
    time: '7:00 PM',
    guests: '2 Guests',
    restaurant: 'Restaurant 02',
    referenceId: 'QHD-240525-0027',
  }),
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

/** Pass-through v-model so closing (Close button / BaseModal close paths)
 *  syncs with the parent's bound state */
const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})
</script>

<style scoped>
.detail-row {
  @apply flex items-center justify-between gap-6 border-b border-[#50515526]/15 last:border-none py-2.5 text-lg font-medium text-[#373737];
}

.detail-row span:first-child {
  @apply shrink-0;
}

.detail-row span:last-child {
  @apply text-right font-medium text-[#27231F];
}
</style>