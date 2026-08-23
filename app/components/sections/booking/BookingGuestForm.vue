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
        <label :class="labelClass" for="guest-first-name"
          >First Name <span class="text-[#FF0000]">*</span></label
        >
        <input
          id="guest-first-name"
          v-model.trim="form.firstName"
          name="firstName"
          :aria-invalid="Boolean(guestErrors.firstName)"
          aria-describedby="guest-first-name-error"
          @blur="validateGuestField('firstName')"
          @input="clearGuestError('firstName')"
          @invalid.prevent="validateGuestField('firstName')"
          :class="inputClass"
          type="text"
          autocomplete="given-name"
          required
        />
        <p v-if="guestErrors.firstName" id="guest-first-name-error" class="mt-2 text-sm text-red-600">{{ guestErrors.firstName }}</p>
      </div>
      <div>
        <label :class="labelClass" for="guest-last-name"
          >Last Name <span class="text-[#FF0000]">*</span></label
        >
        <input
          id="guest-last-name"
          v-model.trim="form.lastName"
          name="lastName"
          :aria-invalid="Boolean(guestErrors.lastName)"
          aria-describedby="guest-last-name-error"
          @blur="validateGuestField('lastName')"
          @input="clearGuestError('lastName')"
          @invalid.prevent="validateGuestField('lastName')"
          :class="inputClass"
          type="text"
          autocomplete="family-name"
          required
        />
        <p v-if="guestErrors.lastName" id="guest-last-name-error" class="mt-2 text-sm text-red-600">{{ guestErrors.lastName }}</p>
      </div>
      <div>
        <label :class="labelClass" for="guest-email"
          >Email Address <span class="text-[#FF0000]">*</span></label
        >
        <input
          id="guest-email"
          v-model.trim="form.email"
          name="email"
          :aria-invalid="Boolean(guestErrors.email)"
          aria-describedby="guest-email-error"
          @blur="validateGuestField('email')"
          @input="clearGuestError('email')"
          @invalid.prevent="validateGuestField('email')"
          :class="inputClass"
          type="email"
          autocomplete="email"
          placeholder="someone@gmail.com"
          required
        />
        <p v-if="guestErrors.email" id="guest-email-error" class="mt-2 text-sm text-red-600">{{ guestErrors.email }}</p>
      </div>
      <div>
        <label :class="labelClass" for="guest-phone">Phone Number <span class="text-[#FF0000]">*</span></label>
        <div
          class="flex h-[52px] w-full border border-ink/40 bg-white focus-within:outline focus-within:outline-2 focus-within:outline-offset-[-2px] focus-within:outline-ocean"
        >
          <!-- Country code selector -->
          <div class="relative flex shrink-0 items-center">
            <select
              v-model="form.phoneCountryCode"
              name="phoneCountryCode"
              aria-label="Phone country code"
              class="h-full appearance-none bg-transparent py-0 pl-4 pr-7 text-base text-ink focus-visible:outline-none"
            >
              <option
                v-for="code in phoneCountryCodes"
                :key="code.dial"
                :value="code.dial"
              >
                ({{ code.dial }}) {{ code.name }}
              </option>
            </select>
            <svg
              class="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-ink"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m6 9 6 6 6-6"
              />
            </svg>
          </div>
          <!-- Phone number input -->
          <input
            id="guest-phone"
            v-model.trim="form.phone"
            name="phone"
            :aria-invalid="Boolean(guestErrors.phone)"
            aria-describedby="guest-phone-error"
            @blur="validateGuestField('phone')"
            @input="clearGuestError('phone')"
            @invalid.prevent="validateGuestField('phone')"
            type="tel"
            autocomplete="tel"
            required
            placeholder="Phone number"
            class="h-full min-w-0 flex-1 bg-transparent px-4 text-base text-ink placeholder:text-[#A3A3A3] focus-visible:outline-none"
          />
        </div>
        <p v-if="guestErrors.phone" id="guest-phone-error" class="mt-2 text-sm text-red-600">{{ guestErrors.phone }}</p>
      </div>
      <div>
        <label :class="labelClass" for="guest-country"
          >Country / Region <span class="text-[#FF0000]">*</span></label
        >
        <select
          id="guest-country"
          v-model="form.country"
          name="country"
          :aria-invalid="Boolean(guestErrors.country)"
          aria-describedby="guest-country-error"
          @blur="validateGuestField('country')"
          @input="clearGuestError('country')"
          @invalid.prevent="validateGuestField('country')"
          :class="inputClass"
          required
        >
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
        <p v-if="guestErrors.country" id="guest-country-error" class="mt-2 text-sm text-red-600">{{ guestErrors.country }}</p>
      </div>
    </div>

    <div class="mt-8 border border-[#EED4A3] bg-[#FCF8F0] p-4 sm:p-5">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <span
            class="flex size-[42px] shrink-0 items-center justify-center border border-[#EED4A3] text-[#864926]"
            aria-hidden="true"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2H14"
                stroke="#864926"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21 8.00053L19 10.0005L17.5 6.30053C17.3585 5.92186 17.1057 5.59495 16.7747 5.36288C16.4437 5.13081 16.0502 5.00448 15.646 5.00053H8.4C7.9925 4.99117 7.59188 5.10654 7.25177 5.33119C6.91166 5.55585 6.64832 5.87905 6.497 6.25753L5 10.0005L3 8.00053"
                stroke="#864926"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 14H7.01"
                stroke="#864926"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17 14H17.01"
                stroke="#864926"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 10H5C3.89543 10 3 10.8954 3 12V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V12C21 10.8954 20.1046 10 19 10Z"
                stroke="#864926"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 18V20"
                stroke="#864926"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 18V20"
                stroke="#864926"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          <div>
            <h2
              id="airport-pickup-label"
              class="font-display text-xl font-semibold text-[#0F0F10]"
            >
              Airport Pickup Required
            </h2>
            <p class="mt-1 text-sm text-[#505155]">
              Let us know if you need airport pickup upon arrival.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <span id="airport-pickup-status" class="text-sm text-[#505155]">
            {{
              airportPickupRequired ? "Pickup required" : "No pickup required"
            }}
          </span>
          <button
            type="button"
            role="switch"
            :aria-checked="airportPickupRequired"
            aria-labelledby="airport-pickup-label airport-pickup-status"
            class="relative h-6 w-[46px] shrink-0 rounded-full transition-colors duration-fast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
            :class="airportPickupRequired ? 'bg-flame' : 'bg-line'"
            @click="toggleAirportPickup"
          >
            <span
              class="absolute left-[3px] top-[3px] size-[18px] rounded-full bg-white shadow-sm transition-transform duration-fast"
              :class="airportPickupRequired ? 'translate-x-[22px]' : ''"
            />
          </button>
        </div>
      </div>

      <p
        class="mt-4 border-t flex items-center gap-2 border-dashed border-champagne/60 pt-4 text-sm leading-6 text-[#505155]"
      >
        <span class="text-copper" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
              stroke="#C9752D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8 10.668H8.00833V10.6763H8V10.668Z"
              stroke="#C9752D"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <path
              d="M8 7.9987V5.33203"
              stroke="#C9752D"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        Once enabled, all flight details must be completed to help us prepare
        for your arrival and coordinate airport assistance.
      </p>
    </div>

    <div class="mt-10">
      <div class="max-w-xl">
        <h2
          class="font-display font-semibold text-2xl text-ink sm:text-[1.75rem]"
        >
          Flight Details
          <span
            class="ml-2 align-middle text-sm font-medium uppercase tracking-[0.06em] text-flame"
          >
            {{ airportPickupRequired ? "(Required)" : "(Optional)" }}
          </span>
        </h2>
        <p class="mt-3 text-sm leading-6 text-[#505155]">
          Share your flight information to help us prepare for your arrival and
          coordinate any requested airport assistance.
        </p>
      </div>
    </div>

    <input
      type="hidden"
      name="airportPickupRequired"
      :value="airportPickupRequired ? 'yes' : 'no'"
    />

    <div class="mt-8">
      <div class="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label :class="labelClass" for="flight-airline"
            >Airline
            <span v-if="airportPickupRequired" class="text-[#FF0000]"
              >*</span
            ></label
          >
          <input
            id="flight-airline"
            v-model.trim="form.airline"
            name="airline"
            :required="airportPickupRequired"
            :aria-invalid="Boolean(flightErrors.airline)"
            aria-describedby="flight-airline-error"
            @blur="validateFlightField('airline')"
            @input="clearFlightError('airline')"
            @invalid.prevent="validateFlightField('airline')"
            :class="flightInputClass"
            type="text"
            placeholder="Emirates"
          />
          <p
            v-if="flightErrors.airline"
            id="flight-airline-error"
            class="mt-2 text-sm text-red-600"
          >
            {{ flightErrors.airline }}
          </p>
        </div>
        <div>
          <label :class="labelClass" for="flight-number"
            >Flight Number
            <span v-if="airportPickupRequired" class="text-[#FF0000]"
              >*</span
            ></label
          >
          <input
            id="flight-number"
            v-model.trim="form.flightNumber"
            name="flightNumber"
            :required="airportPickupRequired"
            :aria-invalid="Boolean(flightErrors.flightNumber)"
            aria-describedby="flight-flightNumber-error"
            @blur="validateFlightField('flightNumber')"
            @input="clearFlightError('flightNumber')"
            @invalid.prevent="validateFlightField('flightNumber')"
            :class="flightInputClass"
            type="text"
            placeholder="EK 584"
          />
          <p
            v-if="flightErrors.flightNumber"
            id="flight-flightNumber-error"
            class="mt-2 text-sm text-red-600"
          >
            {{ flightErrors.flightNumber }}
          </p>
        </div>
        <div>
          <label :class="labelClass" for="flight-arrival-date"
            >Arrival Date
            <span v-if="airportPickupRequired" class="text-[#FF0000]"
              >*</span
            ></label
          >
          <div class="relative">
            <input
              id="flight-arrival-date"
              v-model.trim="form.arrivalDate"
              name="arrivalDate"
              :required="airportPickupRequired"
              :aria-invalid="Boolean(flightErrors.arrivalDate)"
              aria-describedby="flight-arrivalDate-error"
              @blur="validateFlightField('arrivalDate')"
              @input="clearFlightError('arrivalDate')"
              @invalid.prevent="validateFlightField('arrivalDate')"
              :class="[flightInputClass, 'pr-10']"
              type="text"
              placeholder="July 12, 2026"
            />
            <svg
              class="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              aria-hidden="true"
            >
              <path
                d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
              />
            </svg>
          </div>
          <p
            v-if="flightErrors.arrivalDate"
            id="flight-arrivalDate-error"
            class="mt-2 text-sm text-red-600"
          >
            {{ flightErrors.arrivalDate }}
          </p>
        </div>
        <div>
          <label :class="labelClass" for="flight-arrival-time"
            >Arrival Time
            <span v-if="airportPickupRequired" class="text-[#FF0000]"
              >*</span
            ></label
          >
          <input
            id="flight-arrival-time"
            v-model.trim="form.arrivalTime"
            name="arrivalTime"
            :required="airportPickupRequired"
            :aria-invalid="Boolean(flightErrors.arrivalTime)"
            aria-describedby="flight-arrivalTime-error"
            @blur="validateFlightField('arrivalTime')"
            @input="clearFlightError('arrivalTime')"
            @invalid.prevent="validateFlightField('arrivalTime')"
            :class="flightInputClass"
            type="text"
            placeholder="10:30 AM"
          />
          <p
            v-if="flightErrors.arrivalTime"
            id="flight-arrivalTime-error"
            class="mt-2 text-sm text-red-600"
          >
            {{ flightErrors.arrivalTime }}
          </p>
        </div>
        <div>
          <label :class="labelClass" for="flight-arrival-airport"
            >Arrival Airport
            <span v-if="airportPickupRequired" class="text-[#FF0000]"
              >*</span
            ></label
          >
          <div class="relative">
            <select
              id="flight-arrival-airport"
              v-model="form.arrivalAirport"
              name="arrivalAirport"
              :required="airportPickupRequired"
              :aria-invalid="Boolean(flightErrors.arrivalAirport)"
              aria-describedby="flight-arrivalAirport-error"
              @blur="validateFlightField('arrivalAirport')"
              @input="clearFlightError('arrivalAirport')"
              @invalid.prevent="validateFlightField('arrivalAirport')"
              :class="[flightInputClass, 'appearance-none pr-10']"
            >
              <option value="" disabled>Select airport</option>
              <option
                v-for="airport in airports"
                :key="airport"
                :value="airport"
              >
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
          <p
            v-if="flightErrors.arrivalAirport"
            id="flight-arrivalAirport-error"
            class="mt-2 text-sm text-red-600"
          >
            {{ flightErrors.arrivalAirport }}
          </p>
        </div>
        <div>
          <label :class="labelClass" for="flight-origin"
            >Flight Origin
            <span v-if="airportPickupRequired" class="text-[#FF0000]"
              >*</span
            ></label
          >
          <div class="relative">
            <select
              id="flight-origin"
              v-model="form.flightOrigin"
              name="flightOrigin"
              :required="airportPickupRequired"
              :aria-invalid="Boolean(flightErrors.flightOrigin)"
              aria-describedby="flight-flightOrigin-error"
              @blur="validateFlightField('flightOrigin')"
              @input="clearFlightError('flightOrigin')"
              @invalid.prevent="validateFlightField('flightOrigin')"
              :class="[flightInputClass, 'appearance-none pr-10']"
            >
              <option value="" disabled>Select airport</option>
              <option
                v-for="airport in airports"
                :key="airport"
                :value="airport"
              >
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
          <p
            v-if="flightErrors.flightOrigin"
            id="flight-flightOrigin-error"
            class="mt-2 text-sm text-red-600"
          >
            {{ flightErrors.flightOrigin }}
          </p>
        </div>
      </div>

      <div class="mt-6">
        <label :class="labelClass" for="flight-note"
          >Special Note (Optional)</label
        >
        <textarea
          id="flight-note"
          v-model.trim="form.note"
          name="note"
          placeholder="Write what you need..."
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

type GuestFieldName = "firstName" | "lastName" | "email" | "phone" | "country";

type FlightFieldName =
  | "airline"
  | "flightNumber"
  | "arrivalDate"
  | "arrivalTime"
  | "arrivalAirport"
  | "flightOrigin";

const airportPickupRequired = ref(false);

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

const guestErrors = reactive<Record<GuestFieldName, string>>({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
});

const guestFieldLabels: Record<GuestFieldName, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email address",
  phone: "Phone number",
  country: "Country or region",
};

function validateGuestField(fieldName: GuestFieldName) {
  const value = form[fieldName].trim();

  if (!value) {
    guestErrors[fieldName] = `${guestFieldLabels[fieldName]} is required.`;
    return;
  }

  guestErrors[fieldName] =
    fieldName === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? "Enter a valid email address."
      : "";
}

function clearGuestError(fieldName: GuestFieldName) {
  if (guestErrors[fieldName]) validateGuestField(fieldName);
}

const flightErrors = reactive<Record<FlightFieldName, string>>({
  airline: "",
  flightNumber: "",
  arrivalDate: "",
  arrivalTime: "",
  arrivalAirport: "",
  flightOrigin: "",
});

const flightFieldLabels: Record<FlightFieldName, string> = {
  airline: "Airline",
  flightNumber: "Flight number",
  arrivalDate: "Arrival date",
  arrivalTime: "Arrival time",
  arrivalAirport: "Arrival airport",
  flightOrigin: "Flight origin",
};

function validateFlightField(fieldName: FlightFieldName) {
  flightErrors[fieldName] =
    airportPickupRequired.value && !form[fieldName].trim()
      ? `${flightFieldLabels[fieldName]} is required for airport pickup.`
      : "";
}

function clearFlightError(fieldName: FlightFieldName) {
  if (form[fieldName].trim()) flightErrors[fieldName] = "";
}

function toggleAirportPickup() {
  airportPickupRequired.value = !airportPickupRequired.value;

  if (!airportPickupRequired.value) {
    for (const fieldName of Object.keys(flightErrors) as FlightFieldName[]) {
      flightErrors[fieldName] = "";
    }
  }
}
</script>
