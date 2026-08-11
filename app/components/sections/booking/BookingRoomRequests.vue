<template>
  <!--
    Room Requests and Accessibility card: an accordion (same BookingPolicyItem
    technique as the policies list) containing the smoking preference radio
    group and an optional special request. Opens closed — the trigger is just
    above the policies accordion, so the guest can skip it if not needed.
  -->
  <div class="bg-white p-7 pb-2 sm:p-10 sm:pb-2">
    <BookingPolicyItem v-model="open" title="Room Requests and Accessibility">
      <div>
        <p
          class="text-xs font-medium uppercase tracking-[0.06em] text-ink/60"
        >
          Smoking Preference
        </p>

        <div class="mt-3 flex items-start gap-3 bg-[#F9F0DB] border-b-2 border-[#EED4A3] p-4 sm:p-5">
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
            Smoking rooms available upon advance request, subject to
            availability.
          </p>
        </div>

        <fieldset class="mt-4">
          <legend class="sr-only">Smoking preference</legend>
          <div class="flex flex-col gap-3">
            <label class="flex cursor-pointer items-start gap-3">
              <input
                v-model="form.smokingPreference"
                class="mt-1 h-4 w-4 shrink-0 accent-copper"
                type="radio"
                name="smokingPreference"
                value="non-smoking"
              >
              <span
                :class="
                  form.smokingPreference === 'non-smoking'
                    ? 'text-[#A75B27]'
                    : 'text-[#505155]'
                "
                class="text-base font-medium"
              >
                Non-smoking room
                <span>(Default)</span>
              </span>
            </label>
            <label class="flex cursor-pointer items-start gap-3">
              <input
                v-model="form.smokingPreference"
                class="mt-1 h-4 w-4 shrink-0 accent-copper"
                type="radio"
                name="smokingPreference"
                value="smoking"
              >
              <span
                :class="
                  form.smokingPreference === 'smoking'
                    ? 'text-[#A75B27]'
                    : 'text-[#505155]'
                "
                class="text-base font-medium"
              >
                Smoking room
                <span>(Upon advanced request)</span>
              </span>
            </label>
          </div>
        </fieldset>
      </div>

      <div>
        <label
          for="special-request"
          class="mb-2.5 block text-xs font-medium uppercase tracking-[0.06em] text-ink/60"
        >
          Special Request (Optional)
        </label>
        <textarea
          id="special-request"
          v-model.trim="form.specialRequest"
          name="specialRequest"
          rows="4"
          placeholder="Write what you need..."
          class="w-full resize-y border border-ink/40 bg-white px-4 py-3.5 text-base text-ink placeholder:text-ink/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean"
        />
      </div>
    </BookingPolicyItem>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)

// Controlled state (like BookingGuestForm): submitted with the parent form
// via the inputs' `name` attributes; no backend target exists yet.
const form = reactive({
  smokingPreference: 'non-smoking',
  specialRequest: '',
})
</script>