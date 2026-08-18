<template>
  <!--
    Reservation success modal: shown after the reservation form submits.
    Same native <dialog> shell pattern as RestaurantReservationModal — real
    focus trap, inert background, Esc-to-close and Lenis frozen while open.
  -->
  <dialog ref="dialogRef" class="submitted-modal" aria-labelledby="reservation-success-title"
    @click="handleBackdropClick" @close="handleClose">
    <div class="w-full max-w-[590px]">
      <div class="relative bg-white px-7 pb-5 pt-8
                 sm:px-12 sm:pb-7 sm:pt-9">
        <!-- Close Icon -->
        <button ref="closeButtonRef" type="button" aria-label="Close" class="absolute right-5 top-5 flex size-7 items-center
                 justify-center bg-[#FAF5E9] text-[#27231F] transition
                 hover:bg-[#F3E8CF]
                 focus-visible:outline focus-visible:outline-2
                 focus-visible:outline-offset-2 focus-visible:outline-[#C87532]" @click="closeModal">
          <svg viewBox="0 0 24 24" fill="none" class="size-3.5" stroke="currentColor" stroke-width="1.8"
            aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

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
          <h2 id="reservation-success-title" class="font-display text-[36px]  text-[#0F0F10]">
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
          <p class=" text-sm font-medium text-[#A75B27] uppercase">
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
                 focus-visible:outline-offset-2 focus-visible:outline-[#C87532]" @click="closeModal">
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
    </div>
  </dialog>
</template>

<script setup lang="ts">
import type Lenis from 'lenis'
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

const dialogRef = ref<HTMLDialogElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)

const lenis = useNuxtApp().$lenis as Lenis | undefined

/** Closing the native dialog is the single exit path (button, backdrop and
 *  Esc all funnel through here), so every close emits once */
function closeModal() {
  dialogRef.value?.close()
}

function handleClose() {
  emit('close')
  emit('update:modelValue', false)
}

/** A click that lands on the dialog itself is a click on the backdrop */
function handleBackdropClick(event: MouseEvent) {
  if (event.target === dialogRef.value) {
    closeModal()
  }
}

/** Freeze the page behind the modal while it is open */
function setPageFrozen(frozen: boolean) {
  if (frozen) {
    lenis?.stop()
    document.documentElement.classList.add('overflow-hidden')
    return
  }

  lenis?.start()
  document.documentElement.classList.remove('overflow-hidden')
}

watch(() => props.modelValue, async (open) => {
  const dialog = dialogRef.value
  if (!dialog) {
    return
  }

  if (open) {
    if (!dialog.open) {
      dialog.showModal()
      setPageFrozen(true)
    }

    await nextTick()
    closeButtonRef.value?.focus()
    return
  }

  if (dialog.open) {
    dialog.close()
  }
  setPageFrozen(false)
})

onBeforeUnmount(() => {
  setPageFrozen(false)
})
</script>

<style scoped>
.submitted-modal {
  background: transparent;
  border: 0;
  height: 100dvh;
  max-height: 100dvh;
  max-width: 100vw;
  padding: 0.75rem;
  width: 100vw;
}

@media (min-width: 640px) {
  .submitted-modal {
    padding: 1rem;
  }
}

.submitted-modal[open] {
  display: flex;
  align-items: center;
  justify-content: center;
}

.submitted-modal::backdrop {
  backdrop-filter: blur(2px);
  background: rgb(0 0 0 / 0.62);
}

@media (prefers-reduced-motion: no-preference) {
  .submitted-modal[open] {
    animation: submitted-modal-in 300ms var(--ease-premium);
  }

  .submitted-modal[open]::backdrop {
    animation: submitted-backdrop-in 300ms ease-out;
  }
}

@keyframes submitted-modal-in {
  from {
    opacity: 0;
    transform: translateY(0.75rem) scale(0.99);
  }
}

@keyframes submitted-backdrop-in {
  from {
    opacity: 0;
  }
}

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