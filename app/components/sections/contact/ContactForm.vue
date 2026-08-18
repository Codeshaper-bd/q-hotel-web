<template>
  <!--
    Request Information form. Plain, semantic fields with native validation —
    same "no submission target yet" state as BookingGuestForm, since no
    email/CRM backend exists for this project yet.
  -->
  <form ref="formRef" class="bg-[#fdfbf7] p-7 sm:p-10" aria-labelledby="contact-form-title" @submit.prevent="handleSubmit">
    <h2 id="contact-form-title" class="font-display text-3xl font-semibold text-ink sm:text-[2.75rem]">
      Request Information
    </h2>

    <div class="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label :class="labelClass" for="contact-name">Name</label>
        <input id="contact-name" v-model.trim="form.name" name="name" :class="inputClass" type="text" autocomplete="name" placeholder="Your name" required>
      </div>
      <div>
        <label :class="labelClass" for="contact-email">Email Address</label>
        <input id="contact-email" v-model.trim="form.email" name="email" :class="inputClass" type="email" autocomplete="email" placeholder="Your email address" required>
      </div>
      <div>
        <label :class="labelClass" for="contact-country">Country / Region</label>
        <select id="contact-country" v-model="form.country" name="country" :class="inputClass" required>
          <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
        </select>
      </div>
      <div>
        <label :class="labelClass" for="contact-phone">Phone Number</label>
        <div class="flex">
          <select v-model="form.phoneCountryCode" name="phoneCountryCode" class="w-[7.5rem] shrink-0 border border-r-0 border-ink/40 bg-transparent px-2 text-sm text-ink focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean" aria-label="Phone country code">
            <option v-for="code in phoneCountryCodes" :key="code.dial" :value="code.dial">
              {{ code.dial }} {{ code.name }}
            </option>
          </select>
          <input id="contact-phone" v-model.trim="form.phone" name="phone" class="h-[52px] w-full min-w-0 border border-ink/40 bg-transparent px-4 text-base text-ink focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean" type="tel" autocomplete="tel" required>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <label :class="labelClass" for="contact-message">Message</label>
      <textarea
        id="contact-message"
        v-model.trim="form.message"
        name="message"
        rows="5"
        placeholder="Write your message..."
        :class="[inputClass, 'h-auto resize-y py-3.5']"
        required
      />
    </div>

    <div class="mt-6 flex items-start gap-3">
      <input id="contact-terms" v-model="form.acceptedTerms" type="checkbox" required class="mt-1 h-5 w-5 shrink-0 border-ink/40 text-champagne focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean">
      <label for="contact-terms" class="text-sm text-ink">
        I have read and accept the
        <NuxtLink to="/terms" class="underline underline-offset-2 hover:text-copper">Terms and Conditions</NuxtLink>
        and
        <NuxtLink to="/hotel-policy" class="underline underline-offset-2 hover:text-copper">Hotel Policy</NuxtLink>.
      </label>
    </div>

    <p class="mt-6 text-xs leading-5 text-ink/55">
      Your details are used only to respond to this enquiry and are never shared with third parties.
    </p>

    <BaseArrowCta variant="gold" class="mt-4" :disabled="status === 'submitted'" @click="handleSubmitClick">
      {{ status === 'submitted' ? 'Message Received' : 'Submit Message' }}
    </BaseArrowCta>
  </form>
</template>

<script setup lang="ts">
import { countries, phoneCountryCodes } from '~/utils/contactOptions'

const labelClass = 'mb-2.5 block text-xs font-medium uppercase tracking-[0.06em] text-ink/60'
const inputClass = 'h-[52px] w-full border border-ink/40 bg-transparent px-4 text-base text-ink placeholder:text-ink/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean'

// No submission target exists yet (no email/CRM backend has been wired up
// anywhere in this project); this state exists purely so the fields are
// controlled, matching BookingGuestForm's same placeholder state.
const form = reactive({
  name: '',
  email: '',
  country: 'Bangladesh',
  phoneCountryCode: '+880',
  phone: '',
  message: '',
  acceptedTerms: false,
})

const status = ref<'idle' | 'submitted'>('idle')

const formRef = ref<HTMLFormElement | null>(null)

/** BaseArrowCta renders a plain button, so native validation is triggered
 *  through requestSubmit instead of a type="submit" click */
function handleSubmitClick() {
  formRef.value?.requestSubmit()
}

function handleSubmit() {
  status.value = 'submitted'
}
</script>
