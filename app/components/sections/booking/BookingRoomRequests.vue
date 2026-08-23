<template>
  <!--
    Room Requests and Accessibility card: a chevron-toggle heading over the
    smoking preference radios, additional request checklist (with conditional
    early check-in time), and optional special request. Opens open — the
    guest can collapse it if not needed.
  -->
  <div class="bg-white p-7 pb-2 sm:p-10 sm:pb-2">
    <BookingPolicyItem v-model="open" title="Room Requests and Accessibility">
      <div>
        <h3 class="font-display text-xl font-semibold text-ink">
          Smoking Preference
          <svg
            class="ml-2 inline-block h-5 w-5 text-[#A75B27]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01" />
            <path d="M12 12v4" />
          </svg>
        </h3>

        <div
          class="mt-4 flex items-start gap-3 border-b-2 border-[#EED4A3] bg-[#F9F0DB] p-4 sm:p-5"
        >
          <svg
            class="h-6 w-6 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <rect width="24" height="24" rx="12" fill="#23272E" />
            <path
              d="M14.9167 12H6.75008C6.59537 12 6.447 12.0615 6.3376 12.1709C6.22821 12.2803 6.16675 12.4286 6.16675 12.5833V13.75C6.16675 13.9047 6.22821 14.0531 6.3376 14.1625C6.447 14.2719 6.59537 14.3333 6.75008 14.3333H14.9167"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.4999 9.66667C15.4999 8.20833 14.3333 8.20833 14.3333 6.75"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.25 14.3333C17.4047 14.3333 17.5531 14.2719 17.6625 14.1625C17.7719 14.0531 17.8333 13.9047 17.8333 13.75V12.5833C17.8333 12.4286 17.7719 12.2803 17.6625 12.1709C17.5531 12.0615 17.4047 12 17.25 12"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M17.8334 9.66667C17.8334 8.20833 16.6667 8.20833 16.6667 6.75"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.08325 12V14.3333"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="text-sm leading-5 text-[#505155]">
            Smoking Rooms Available Upon Advance Request, Subject To
            Availability.
          </p>
        </div>

        <fieldset class="mt-5">
          <legend class="sr-only">Smoking preference</legend>
          <div class="flex flex-col gap-3">
            <label class="flex cursor-pointer items-start gap-3">
              <input
                v-model="form.smokingPreference"
                class="sr-only"
                type="radio"
                name="smokingPreference"
                value="non_smoking"
              />
              <span
                class="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-fast"
                :class="
                  form.smokingPreference === 'non_smoking'
                    ? 'border-[#A75B27]'
                    : 'border-ink/30'
                "
              >
                <span
                  class="size-2 rounded-full transition-colors duration-fast"
                  :class="
                    form.smokingPreference === 'non_smoking'
                      ? 'bg-[#A75B27]'
                      : 'bg-transparent'
                  "
                />
              </span>
              <span
                :class="
                  form.smokingPreference === 'non_smoking'
                    ? 'text-[#A75B27]'
                    : 'text-[#505155]'
                "
                class="text-base font-medium"
              >
                Non-Smoking Room
                <span>(Default)</span>
              </span>
            </label>
            <label class="flex cursor-pointer items-start gap-3">
              <input
                v-model="form.smokingPreference"
                class="sr-only"
                type="radio"
                name="smokingPreference"
                value="smoking"
              />
              <span
                class="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-fast"
                :class="
                  form.smokingPreference === 'smoking'
                    ? 'border-[#A75B27]'
                    : 'border-ink/30'
                "
              >
                <span
                  class="size-2 rounded-full transition-colors duration-fast"
                  :class="
                    form.smokingPreference === 'smoking'
                      ? 'bg-[#A75B27]'
                      : 'bg-transparent'
                  "
                />
              </span>
              <span
                :class="
                  form.smokingPreference === 'smoking'
                    ? 'text-[#A75B27]'
                    : 'text-[#505155]'
                "
                class="text-base font-medium"
              >
                Smoking Room
                <span>(Upon Advanced Request)</span>
              </span>
            </label>
          </div>
        </fieldset>
      </div>

      <div class="border-t border-line pt-8">
        <h3 class="font-display text-2xl font-semibold text-[#0F0F10]">
          Additional Room Request
        </h3>
        <p class="mt-2 text-sm text-[#505155]">
          Select any additional items you would like us to arrange
        </p>

        <div class="mt-4 grid gap-x-8 sm:grid-cols-2">
          <label
            class="flex cursor-pointer items-center gap-3 border-b border-line py-5 sm:pr-4"
          >
            <input
              v-model="form.additionalRequests"
              class="sr-only"
              type="checkbox"
              name="additionalRequests"
              value="rollaway_bed"
            />
            <span
              class="flex size-5 shrink-0 items-center justify-center border transition-colors duration-fast"
              :class="
                isRequested('rollaway_bed')
                  ? 'border-[#A75B27]'
                  : 'border-ink/30'
              "
            >
              <svg
                v-if="isRequested('rollaway_bed')"
                class="size-3 text-[#A75B27]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span class="min-w-0">
              <span
                class="block text-base font-medium transition-colors duration-fast"
                :class="
                  isRequested('rollaway_bed') ? 'text-[#A75B27]' : 'text-ink'
                "
                >Rollaway Bed</span
              >
              <span class="mt-0.5 block text-sm text-[#505155]">
                Extra bedding for an additional guest
              </span>
            </span>
          </label>

          <label
            class="flex cursor-pointer items-center gap-3 border-b border-line py-5 sm:pr-4"
          >
            <input
              v-model="form.additionalRequests"
              class="sr-only"
              type="checkbox"
              name="additionalRequests"
              value="baby_crib"
            />
            <span
              class="flex size-5 shrink-0 items-center justify-center border transition-colors duration-fast"
              :class="
                isRequested('baby_crib') ? 'border-[#A75B27]' : 'border-ink/30'
              "
            >
              <svg
                v-if="isRequested('baby_crib')"
                class="size-3 text-[#A75B27]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span class="min-w-0">
              <span
                class="block text-base font-medium transition-colors duration-fast"
                :class="
                  isRequested('baby_crib') ? 'text-[#A75B27]' : 'text-ink'
                "
                >Baby Crib</span
              >
              <span class="mt-0.5 block text-sm text-[#505155]">
                Crib for infants and toddlers
              </span>
            </span>
          </label>

          <label
            class="flex cursor-pointer items-center gap-3 border-b border-line py-5 sm:pr-4"
          >
            <input
              v-model="form.additionalRequests"
              class="sr-only"
              type="checkbox"
              name="additionalRequests"
              value="early_check_in"
            />
            <span
              class="flex size-5 shrink-0 items-center justify-center border transition-colors duration-fast"
              :class="
                isRequested('early_check_in')
                  ? 'border-[#A75B27]'
                  : 'border-ink/30'
              "
            >
              <svg
                v-if="isRequested('early_check_in')"
                class="size-3 text-[#A75B27]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span class="min-w-0">
              <span
                class="block text-base font-medium transition-colors duration-fast"
                :class="
                  isRequested('early_check_in') ? 'text-[#A75B27]' : 'text-ink'
                "
                >Early Check In</span
              >
              <span class="mt-0.5 block text-sm text-[#505155]">
                Request an early check in for your stay
              </span>
            </span>
          </label>

          <label
            class="flex cursor-pointer items-center gap-3 border-b border-line py-5 sm:pr-4"
          >
            <input
              v-model="form.additionalRequests"
              class="sr-only"
              type="checkbox"
              name="additionalRequests"
              value="accessible_room"
            />
            <span
              class="flex size-5 shrink-0 items-center justify-center border transition-colors duration-fast"
              :class="
                isRequested('accessible_room')
                  ? 'border-[#A75B27]'
                  : 'border-ink/30'
              "
            >
              <svg
                v-if="isRequested('accessible_room')"
                class="size-3 text-[#A75B27]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <span class="min-w-0">
              <span
                class="block text-base font-medium transition-colors duration-fast"
                :class="
                  isRequested('accessible_room') ? 'text-[#A75B27]' : 'text-ink'
                "
                >Accessible Room Features</span
              >
              <span class="mt-0.5 block text-sm text-[#505155]">
                Room with accessible feature
              </span>
            </span>
          </label>
        </div>

        <div v-if="isRequested('early_check_in')" class="mt-6">
          <label :class="labelClass" for="early-check-in-time">
            Please enter your preferred check in time
            <span class="text-[#FF0000]">*</span>
          </label>
          <div class="relative w-full sm:w-[240px]">
            <input
              id="early-check-in-time"
              v-model.trim="form.earlyCheckInTime"
              name="earlyCheckInTime"
              type="text"
              placeholder="10:AM"
              required
              :class="[timeInputClass, 'pr-10']"
            />
            <svg
              class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <h3 class=" font-display text-2xl font-semibold text-[#0F0F10]">
          Special Request (Optional)
        </h3>
        <textarea
          id="special-request"
          v-model.trim="form.specialRequest"
          name="specialRequest"
          placeholder="Please let us know if you have any special request"
          class="mt-4 h-[110px] w-full resize-y border border-[#D9D9D9] bg-white px-4 py-3.5 text-base text-ink placeholder:text-[#A3A3A3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean"
        />
      </div>
    </BookingPolicyItem>
  </div>
</template>

<script setup lang="ts">
const open = ref(true);

const labelClass =
  "mb-2.5 block text-sm font-normal uppercase tracking-[0.06em] text-[#373737]";
const timeInputClass =
  "h-[50px] w-full border border-[#D9D9D9] bg-white px-4 text-base text-ink placeholder:text-[#A3A3A3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean";

// Controlled state (like BookingGuestForm): submitted with the parent form
// via the inputs' `name` attributes; no backend target exists yet.
const form = reactive({
  smokingPreference: "non_smoking",
  additionalRequests: [] as string[],
  earlyCheckInTime: "",
  specialRequest: "",
});

function isRequested(value: string) {
  return form.additionalRequests.includes(value);
}
</script>
