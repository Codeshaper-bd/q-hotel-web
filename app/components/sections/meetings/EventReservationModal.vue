<template>
  <!--
    Event space reservation modal. Built on BaseModal (native <dialog>
    shell: focus trap, inert background, Esc-to-close, focus restore, Lenis
    frozen and page locked while open).

    Two-panel editorial layout: a warm ivory information panel (eyebrow, serif
    heading, phone callout, venue photograph) beside the white reservation
    form. On desktop the panel is capped in height and the form column scrolls
    internally; on mobile the whole panel scrolls as one column.
  -->
  <BaseModal
    v-model="open"
    labelled-by="event-reservation-dialog-title"
    close-label="Close reservation dialog"
    @close="emit('close')"
  >
    <div
      data-lenis-prevent-wheel
      class="grid max-h-[92dvh] w-full overflow-y-auto bg-white lg:h-[min(880px,92dvh)] lg:grid-cols-[460px_1fr] lg:overflow-hidden"
    >
      <!-- ========================= -->
      <!-- LEFT INFORMATION PANEL -->
      <!-- ========================= -->
      <aside class="relative flex flex-col overflow-hidden bg-[#F7F0E1]">
        <div
          class="relative z-10 px-6 pb-6 pt-8 sm:px-8 sm:pt-10 lg:px-9 lg:pb-7"
        >
          <div class="mb-6">
            <p
              class="text-[11px] font-medium uppercase text-[#C9752D] sm:text-sm"
            >
              Reserve Your Event
            </p>

            <span class="mt-2.5 block h-[2px] w-[94px] bg-[#C9752D]" />
          </div>

          <h2
            id="event-reservation-dialog-title"
            class="text-[24px] font-semibold text-[#0F0F10] sm:text-[36px]"
          >
            Plan Your Perfect Event
          </h2>

          <p class="mt-5 text-[13px] text-[#373737] font-medium sm:text-base">
            Let us create an exceptional experience for your meeting,
            celebration or special occasion.
          </p>

          <a
            :href="`tel:${phoneNumber}`"
            class="group mt-6 flex items-center gap-4 border border-[#C9752D] px-4 py-4 transition-colors duration-200 hover:bg-[#C87532]/5"
          >
            <span
              class="flex size-8 shrink-0 items-center justify-center rounded-full border border-[#C9752D] text-[#8F623A] sm:size-9"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_4701_4280_event)">
                  <path
                    d="M7.58398 1.16602C8.97637 1.16602 10.3117 1.71914 11.2963 2.7037C12.2809 3.68827 12.834 5.02363 12.834 6.41602"
                    stroke="#0F0F10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.58398 3.5C8.35753 3.5 9.0994 3.80729 9.64638 4.35427C10.1934 4.90125 10.5007 5.64312 10.5007 6.41667"
                    stroke="#0F0F10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.06802 9.66402C8.18849 9.71934 8.32422 9.73198 8.45284 9.69986C8.58146 9.66773 8.69529 9.59275 8.7756 9.48727L8.98268 9.21602C9.09135 9.07112 9.23227 8.95352 9.39427 8.87252C9.55627 8.79152 9.7349 8.74935 9.91602 8.74935H11.666C11.9754 8.74935 12.2722 8.87227 12.491 9.09106C12.7098 9.30985 12.8327 9.6066 12.8327 9.91602V11.666C12.8327 11.9754 12.7098 12.2722 12.491 12.491C12.2722 12.7098 11.9754 12.8327 11.666 12.8327C8.88124 12.8327 6.21053 11.7264 4.24139 9.7573C2.27226 7.78817 1.16602 5.11746 1.16602 2.33268C1.16602 2.02326 1.28893 1.72652 1.50772 1.50772C1.72652 1.28893 2.02326 1.16602 2.33268 1.16602H4.08268C4.3921 1.16602 4.68885 1.28893 4.90764 1.50772C5.12643 1.72652 5.24935 2.02326 5.24935 2.33268V4.08268C5.24935 4.2638 5.20718 4.44243 5.12618 4.60443C5.04518 4.76643 4.92758 4.90734 4.78268 5.01602L4.50968 5.22077C4.40259 5.30254 4.32711 5.41886 4.29606 5.54997C4.26501 5.68108 4.28031 5.8189 4.33935 5.94002C5.13658 7.55927 6.44776 8.86881 8.06802 9.66402Z"
                    stroke="#0F0F10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_4701_4280_event">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </span>

            <span>
              <span
                class="block text-[13px] font-medium text-[#0F0F10] sm:text-base"
              >
                Prefer To Reserve By Phone?
              </span>

              <span class="mt-1 block text-[13px] text-[#0F0F10] sm:text-base">
                Call us at
                <strong class="text-[#A75B27]">
                  {{ phoneNumber }}
                </strong>
              </span>
            </span>
          </a>
        </div>

        <div
          class="relative mt-auto hidden h-[320px] overflow-hidden lg:block lg:h-auto lg:flex-1"
        >
          <BaseImage
            :src="venueImage"
            :alt="`${venueName} at Q Hotel Dhaka`"
            :width="1200"
            :height="800"
            sizes="xs:100vw sm:100vw lg:500px"
            class="absolute inset-0"
          />

          <div
            class="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F7F0E1] to-transparent"
            aria-hidden="true"
          />
        </div>
      </aside>

      <!-- ========================= -->
      <!-- RIGHT RESERVATION FORM -->
      <!-- ========================= -->
      <section
        class="flex flex-col bg-white px-6 py-8 sm:px-9 sm:py-10 lg:overflow-y-auto lg:px-12 lg:pb-8 lg:pt-14"
      >
        <form
          ref="formRef"
          class="flex flex-1 flex-col"
          :aria-busy="submitting"
          @submit.prevent="submitForm"
        >
          <div class="space-y-5">
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="event-date" class="form-label">
                  Event Date
                </label>

                <BaseDatePicker
                  id="event-date"
                  v-model="form.date"
                  placeholder="Select date"
                />
              </div>

              <div>
                <label for="event-time" class="form-label">
                  Event Time
                </label>

                <BaseTimePicker
                  id="event-time"
                  v-model="form.time"
                  placeholder="Select time"
                />
              </div>
            </div>

            <p v-if="validationError" role="alert" class="form-error">
              {{ validationError }}
            </p>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="event-guests" class="form-label">
                  Number of Guests
                </label>

                <div class="relative">
                  <select
                    id="event-guests"
                    v-model="form.guests"
                    name="guests"
                    required
                    class="form-input appearance-none pr-12"
                  >
                    <option v-for="guest in guestOptions" :key="guest" :value="String(guest)">
                      {{ guest }} Guests
                    </option>
                  </select>

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#777]"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path d="m6 8 4 4 4-4" />
                  </svg>
                </div>
              </div>

              <div>
                <label for="event-type" class="form-label">
                  Event Type
                </label>

                <div class="relative">
                  <select
                    id="event-type"
                    v-model="form.eventType"
                    name="eventType"
                    required
                    class="form-input appearance-none pr-12"
                  >
                    <option v-for="type in eventTypeOptions" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#777]"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path d="m6 8 4 4 4-4" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="event-email" class="form-label">
                  Email Address
                </label>

                <input
                  id="event-email"
                  v-model.trim="form.email"
                  name="email"
                  type="email"
                  required
                  autocomplete="email"
                  placeholder="Someone@gmail.com"
                  class="form-input"
                />
              </div>

              <div>
                <label for="event-venue" class="form-label">
                  Venue/Space
                </label>

                <div class="relative">
                  <select
                    id="event-venue"
                    v-model="form.venue"
                    name="venue"
                    required
                    class="form-input appearance-none pr-12"
                  >
                    <option v-for="venue in venueOptions" :key="venue" :value="venue">
                      {{ venue }}
                    </option>
                  </select>

                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#777]"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path d="m6 8 4 4 4-4" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="event-name" class="form-label">
                  Name
                </label>

                <input
                  id="event-name"
                  v-model.trim="form.name"
                  name="name"
                  type="text"
                  required
                  autocomplete="name"
                  placeholder="Your name"
                  class="form-input"
                />
              </div>

              <div>
                <label for="event-phone" class="form-label">
                  Phone Number
                </label>

                <input
                  id="event-phone"
                  v-model.trim="form.phone"
                  name="phone"
                  type="tel"
                  required
                  autocomplete="tel"
                  placeholder="+880 1XXXXXXXXX"
                  class="form-input"
                />
              </div>
            </div>

            <div>
              <label for="event-request" class="form-label">
                Special Request (Optional)
              </label>

              <textarea
                id="event-request"
                v-model.trim="form.specialRequest"
                name="specialRequest"
                rows="4"
                placeholder="Add special request"
                class="form-input min-h-[120px] resize-none py-3"
              />
            </div>

            <div class="flex items-start gap-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="mt-0.5"
              >
                <path
                  d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 13.332H10.01V13.342H10V13.332Z"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 10.0013V6.66797"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <p class="text-base text-[#505155]">
                <span class="font-medium text-black">Please note:</span>
                Your information is secure and will be kept confidential.
              </p>
            </div>
          </div>

          <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-auto lg:pt-8">
            <BaseArrowCta
              variant="gold"
              label-class="flex-1 justify-center"
              class="w-full"
              :disabled="submitting"
              @click="handleBookClick"
            >
              {{ submitting ? "Booking…" : "Book Space" }}
            </BaseArrowCta>

            <BaseArrowCta
              variant="ghost"
              label-class="flex-1 justify-center"
              class="w-full"
              :disabled="submitting"
              @click="open = false"
            >
              Go Back
            </BaseArrowCta>
          </div>
        </form>
      </section>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import type { EventReservationData } from "~/types/meetings";

const props = withDefaults(
  defineProps<{
    /** v-model: `true` opens the modal */
    modelValue: boolean;
    venueName?: string;
    venueImage?: string;
    phoneNumber?: string;
    /** Parent-driven busy state: disables both actions while a booking is sent */
    submitting?: boolean;
  }>(),
  {
    venueName: "Business Class Lounge",
    venueImage: "/images/meetings/venue-1.png",
    phoneNumber: "+88-01713377700",
    submitting: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  submit: [data: EventReservationData];
  close: [];
}>();

/** Pass-through v-model so closing (Go Back / BaseModal close paths) syncs
 *  with the parent's bound state */
const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});

const guestOptions = [10, 20, 30, 40, 50, 75, 100, 150, 200, 250, 300, 400, 500];

const eventTypeOptions = [
  "Meeting",
  "Conference",
  "Seminar",
  "Workshop",
  "Reception",
  "Wedding",
  "Birthday Celebration",
  "Corporate Event",
  "Other",
];

const venueOptions = [
  "Business Class Lounge",
  "Utshab Banquet Hall",
  "Royal Lounge",
];

const form = reactive<EventReservationData>({
  date: "",
  time: "",
  guests: "50",
  eventType: "Meeting",
  email: "",
  venue: props.venueName,
  name: "",
  phone: "",
  specialRequest: "",
});

const formRef = ref<HTMLFormElement | null>(null);

/** Custom pickers are buttons, so native required validation no longer
 *  applies; the missing-field message is surfaced inline instead */
const validationError = ref("");

/** BaseArrowCta renders a plain button, so native validation is triggered
 *  through requestSubmit instead of a type="submit" click */
function handleBookClick() {
  if (!form.date || !form.time) {
    validationError.value = !form.date
      ? "Please choose a date for your event."
      : "Please choose a time for your event.";
    return;
  }
  validationError.value = "";
  formRef.value?.requestSubmit();
}

function submitForm() {
  emit("submit", { ...form });
}
</script>

<style scoped>
.form-label {
  @apply mb-2 block text-sm font-normal uppercase tracking-[0.025em] text-[#373737];
}

.form-error {
  @apply mt-2 text-sm font-medium text-[#B3261E];
}

.form-input {
  @apply h-[52px] w-full border border-[#C9C9C9] bg-white px-3.5 text-base text-[#272727] transition duration-200 placeholder:text-base placeholder:text-[#373737] hover:border-[#A9A9A9] focus:border-[#C87532] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#C87532];
}
</style>
