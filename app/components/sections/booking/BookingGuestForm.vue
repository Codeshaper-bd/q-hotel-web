<template>
  <!--
    Guest + address details. Plain, semantic form fields — no client
    framework beyond native `required`/`type` validation, since the whole
    left column submits through one <form> owned by the booking page.
  -->
  <div class="bg-white p-7 sm:p-10">
    <div class="flex flex-wrap items-baseline gap-3">
      <h2
        class="font-display font-semibold text-2xl text-ink sm:text-[1.75rem]"
      >
        Guest Information
      </h2>
      <p class="text-base font-normal text-[#505155]">
        (All fields are required unless otherwise stated.)
      </p>
    </div>

    <div class="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <div>
        <label :class="labelClass" for="guest-first-name">First Name <span class="text-[#FF0000]">*</span></label>
        <input
          id="guest-first-name"
          v-model.trim="form.firstName"
          name="firstName"
          :class="inputClass"
          type="text"
          autocomplete="given-name"
          required
        />
      </div>
      <div>
        <label :class="labelClass" for="guest-last-name">Last Name <span class="text-[#FF0000]">*</span></label>
        <input
          id="guest-last-name"
          v-model.trim="form.lastName"
          name="lastName"
          :class="inputClass"
          type="text"
          autocomplete="family-name"
          required
        />
      </div>
      <div>
        <label :class="labelClass" for="guest-email">Email Address <span class="text-[#FF0000]">*</span></label>
        <input
          id="guest-email"
          v-model.trim="form.email"
          name="email"
          :class="inputClass"
          type="email"
          autocomplete="email"
          placeholder="someone@gmail.com"
          required
        />
      </div>
      <div>
        <label :class="labelClass" for="guest-phone">Phone Number</label>
        <div class="flex">
          <select
            v-model="form.phoneCountryCode"
            name="phoneCountryCode"
            class="w-[7.5rem] shrink-0 border border-r-0 border-ink/40 bg-white px-2 text-sm text-ink focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean"
            aria-label="Phone country code"
          >
            <option
              v-for="code in phoneCountryCodes"
              :key="code.dial"
              :value="code.dial"
            >
              {{ code.dial }} {{ code.name }}
            </option>
          </select>
          <input
            id="guest-phone"
            v-model.trim="form.phone"
            name="phone"
            class="h-[52px] w-full min-w-0 border border-ink/40 bg-white px-4 text-base text-ink focus-visible:relative focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean"
            type="tel"
            autocomplete="tel"
            required
          />
        </div>
      </div>
      <div>
        <label :class="labelClass" for="guest-country">Country / Region <span class="text-[#FF0000]">*</span></label>
        <select
          id="guest-country"
          v-model="form.country"
          name="country"
          :class="inputClass"
          required
        >
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
      </div>
    </div>

    <div class="mt-12 flex flex-wrap items-start justify-between gap-x-8 gap-y-5">
      <div class="max-w-xl">
        <h2 class="font-display font-semibold text-2xl text-ink sm:text-[1.75rem]">
          Flight Details
          <span class="ml-2 align-middle text-sm font-medium uppercase tracking-[0.06em] text-flame">
            (Optional)
          </span>
        </h2>
        <p class="mt-3 text-sm leading-6 text-[#505155]">
          Share your flight information to help us prepare for your arrival coordinate any requested airport assistance
        </p>
      </div>

      <div class="flex items-center gap-3">
        <svg class="size-4 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2Z" />
        </svg>
        <span class="text-sm font-semibold uppercase tracking-[0.06em] text-ink">
          I'm Arriving Flight
        </span>
        <button
          type="button"
          role="switch"
          :aria-checked="arrivingByFlight"
          aria-label="Toggle flight details"
          class="relative h-6 w-[46px] shrink-0 rounded-full transition-colors duration-fast"
          :class="arrivingByFlight ? 'bg-flame' : 'bg-line'"
          @click="arrivingByFlight = !arrivingByFlight"
        >
          <span
            class="absolute left-[3px] top-[3px] size-[18px] rounded-full bg-white shadow-sm transition-transform duration-fast"
            :class="arrivingByFlight ? 'translate-x-[22px]' : ''"
          />
        </button>
      </div>
    </div>

    <div class="mt-8" :class="arrivingByFlight ? '' : 'pointer-events-none opacity-40'">
      <div class="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label :class="labelClass" for="flight-airline">Airline</label>
          <input
            id="flight-airline"
            v-model.trim="form.airline"
            name="airline"
            :class="flightInputClass"
            type="text"
            placeholder="Emirates"
            :disabled="!arrivingByFlight"
          />
        </div>
        <div>
          <label :class="labelClass" for="flight-number">Flight Number</label>
          <input
            id="flight-number"
            v-model.trim="form.flightNumber"
            name="flightNumber"
            :class="flightInputClass"
            type="text"
            placeholder="EK 584"
            :disabled="!arrivingByFlight"
          />
        </div>
        <div>
          <label :class="labelClass" for="flight-arrival-date">Arrival Date</label>
          <div class="relative">
            <input
              id="flight-arrival-date"
              v-model.trim="form.arrivalDate"
              name="arrivalDate"
              :class="[flightInputClass, 'pr-10']"
              type="text"
              placeholder="July 12, 2026"
              :disabled="!arrivingByFlight"
            />
            <svg
              class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
            </svg>
          </div>
        </div>
        <div>
          <label :class="labelClass" for="flight-arrival-time">Arrival Time</label>
          <input
            id="flight-arrival-time"
            v-model.trim="form.arrivalTime"
            name="arrivalTime"
            :class="flightInputClass"
            type="text"
            placeholder="10:30 AM"
            :disabled="!arrivingByFlight"
          />
        </div>
        <div>
          <label :class="labelClass" for="flight-arrival-airport">Arrival Airport</label>
          <div class="relative">
            <select
              id="flight-arrival-airport"
              v-model="form.arrivalAirport"
              name="arrivalAirport"
              :class="[flightInputClass, 'appearance-none pr-10']"
              :disabled="!arrivingByFlight"
            >
              <option value="" disabled>Select airport</option>
              <option v-for="airport in airports" :key="airport" :value="airport">
                {{ airport }}
              </option>
            </select>
            <svg
              class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
        <div>
          <label :class="labelClass" for="flight-origin">Flight Origin</label>
          <div class="relative">
            <select
              id="flight-origin"
              v-model="form.flightOrigin"
              name="flightOrigin"
              :class="[flightInputClass, 'appearance-none pr-10']"
              :disabled="!arrivingByFlight"
            >
              <option value="" disabled>Select airport</option>
              <option v-for="airport in airports" :key="airport" :value="airport">
                {{ airport }}
              </option>
            </select>
            <svg
              class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <label :class="labelClass" for="flight-note">Special Note (Optional)</label>
        <textarea
          id="flight-note"
          v-model.trim="form.note"
          name="note"
          placeholder="Write what you need..."
          :disabled="!arrivingByFlight"
          class="h-[110px] w-full resize-y border border-[#D9D9D9] bg-white px-4 py-3.5 text-base text-ink placeholder:text-[#A3A3A3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { countries, phoneCountryCodes } from "~/utils/contactOptions";

const labelClass =
  "mb-2.5 block text-sm font-normal uppercase tracking-[0.06em] text-[#373737]";
const inputClass =
  "h-[52px] w-full border border-ink/40 bg-white px-4 text-base text-ink placeholder:text-[#373737] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean";
const flightInputClass =
  "h-[50px] w-full border border-[#D9D9D9] bg-white px-4 text-base text-ink placeholder:text-[#A3A3A3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ocean";

const airports = [
  "Hazrat Shahjalal International Airport (HSIA)",
  "Dubai International Airport (DXB)",
  "Hamad International Airport (DOH)",
  "Singapore Changi Airport (SIN)",
  "Suvarnabhumi Airport (BKK)",
];

const arrivingByFlight = ref(true);

// No submission target exists yet (payment gateway integration lands with
// the PMS work); this state exists purely so the fields are controlled.
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phoneCountryCode: "+880",
  phone: "",
  country: "Bangladesh",
  airline: "",
  flightNumber: "",
  arrivalDate: "",
  arrivalTime: "",
  arrivalAirport: "",
  flightOrigin: "",
  note: "",
});
</script>
