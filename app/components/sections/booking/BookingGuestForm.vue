<template>
  <!--
    Guest + address details. Plain, semantic form fields — no client
    framework beyond native `required`/`type` validation, since the whole
    left column submits through one <form> owned by the booking page.
  -->
  <div class="bg-white p-7 sm:p-10">
    <div class="flex flex-wrap items-baseline gap-3">
      <h2 class="font-display text-2xl text-ink sm:text-[1.75rem]">Guest Information</h2>
      <p class="text-sm text-ink/55">(All fields are required unless otherwise stated.)</p>
    </div>

    <div class="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label :class="labelClass" for="guest-first-name">First Name</label>
        <input id="guest-first-name" v-model.trim="form.firstName" name="firstName" :class="inputClass" type="text" autocomplete="given-name" required>
      </div>
      <div>
        <label :class="labelClass" for="guest-last-name">Last Name</label>
        <input id="guest-last-name" v-model.trim="form.lastName" name="lastName" :class="inputClass" type="text" autocomplete="family-name" required>
      </div>
      <div>
        <label :class="labelClass" for="guest-email">Email Address</label>
        <input id="guest-email" v-model.trim="form.email" name="email" :class="inputClass" type="email" autocomplete="email" placeholder="someone@gmail.com" required>
      </div>
      <div>
        <label :class="labelClass" for="guest-phone">Phone Number</label>
        <div class="flex">
          <select v-model="form.phoneCountryCode" name="phoneCountryCode" class="w-[7.5rem] shrink-0 border border-r-0 border-ink/40 bg-white px-2 text-sm text-ink focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean" aria-label="Phone country code">
            <option v-for="code in phoneCountryCodes" :key="code.dial" :value="code.dial">
              {{ code.dial }} {{ code.name }}
            </option>
          </select>
          <input id="guest-phone" v-model.trim="form.phone" name="phone" class="h-[52px] w-full min-w-0 border border-ink/40 bg-white px-4 text-base text-ink focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean" type="tel" autocomplete="tel" required>
        </div>
      </div>
      <div>
        <label :class="labelClass" for="guest-country">Country / Region</label>
        <select id="guest-country" v-model="form.country" name="country" :class="inputClass" required>
          <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
        </select>
      </div>
    </div>

    <h2 class="mt-12 font-display text-2xl text-ink sm:text-[1.75rem]">Additional Address Information</h2>
    <div class="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label :class="labelClass" for="guest-city">City / Town</label>
        <input id="guest-city" v-model.trim="form.city" name="city" :class="inputClass" type="text" autocomplete="address-level2">
      </div>
      <div>
        <label :class="labelClass" for="guest-address-1">Address Line 1</label>
        <input id="guest-address-1" v-model.trim="form.addressLine1" name="addressLine1" :class="inputClass" type="text" autocomplete="address-line1">
      </div>
      <div>
        <label :class="labelClass" for="guest-address-2">Address Line 2</label>
        <input id="guest-address-2" v-model.trim="form.addressLine2" name="addressLine2" :class="inputClass" type="text" autocomplete="address-line2">
      </div>
      <div>
        <label :class="labelClass" for="guest-postal-code">Postal Code</label>
        <input id="guest-postal-code" v-model.trim="form.postalCode" name="postalCode" :class="inputClass" type="text" autocomplete="postal-code">
      </div>
    </div>

    <div class="mt-6">
      <label :class="labelClass" for="guest-note">Special Note</label>
      <textarea
        id="guest-note"
        v-model.trim="form.note"
        name="note"
        rows="4"
        placeholder="Write what you need..."
        class="w-full resize-y border border-ink/40 bg-white px-4 py-3.5 text-base text-ink placeholder:text-ink/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { countries, phoneCountryCodes } from '~/utils/contactOptions'

const labelClass = 'mb-2.5 block text-xs font-medium uppercase tracking-[0.06em] text-ink/60'
const inputClass = 'h-[52px] w-full border border-ink/40 bg-white px-4 text-base text-ink placeholder:text-ink/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean'

// No submission target exists yet (payment gateway integration lands with
// the PMS work); this state exists purely so the fields are controlled.
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phoneCountryCode: '+880',
  phone: '',
  country: 'Bangladesh',
  city: '',
  addressLine1: '',
  addressLine2: '',
  postalCode: '',
  note: '',
})
</script>
