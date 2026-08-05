<template>
  <div>
    <div class="bg-white p-7 sm:p-10">
      <BookingPolicyItem v-model="openSections.roomRequests" title="Room Requests and Accessibility">
        <p>
          Have a preference for room location, or need specific accessibility features? Add it to the special note above and our team will do their best to accommodate it, subject to availability.
        </p>
        <ul class="list-disc space-y-2 pl-5">
          <li>This room type does not offer mobility accessible rooms with tubs.</li>
          <li>This room type does not offer accessible rooms with roll-in showers.</li>
          <li>This room type does not offer hearing accessible rooms.</li>
        </ul>
      </BookingPolicyItem>

      <BookingPolicyItem v-model="openSections.deposit" title="Deposit and Cancellation Policy">
        <p class="text-base text-ink">{{ room.name }}</p>
        <p class="text-xs font-semibold uppercase tracking-[0.1em] text-copper">Book Now Pay Later — Member Exclusive</p>
        <p>
          Canceling your reservation before 6:00 PM (local hotel time) on {{ cancelByLabel }} will result in no charge. Canceling after that time, or failing to show, will result in a charge of one night per room to your credit card or other guaranteed payment method. Taxes may apply. Failing to call or show before check-out time after the first night of a reservation will result in cancellation of the remainder of your reservation.
        </p>
      </BookingPolicyItem>

      <BookingPolicyItem v-model="openSections.taxes" title="Description of Taxes and Additional Charges">
        <p class="text-base text-ink">{{ room.name }}</p>
        <p>Best Flexible Member Exclusive Rate</p>
        <ul class="list-disc space-y-2 pl-5">
          <li>12.5% Service Charge</li>
          <li>Tax ({{ taxRatePercent }}%) on rate, per night</li>
          <li>Security deposit: applicable for all bookings.</li>
        </ul>
      </BookingPolicyItem>

      <BookingPolicyItem v-model="openSections.otherCharges" title="Other Charges That May Apply">
        <p>Some services may be charged separately during your stay. Check if it applies to you:</p>
        <ul class="list-disc space-y-2 pl-5">
          <li>12.5% Service Charge</li>
          <li>Early Departure Fee — $90</li>
        </ul>
      </BookingPolicyItem>

      <BookingPolicyItem v-model="openSections.payment" title="Payment Policies">
        <div>
          <p class="text-base text-ink">Why do we require a payment card for internet reservations?</p>
          <p class="mt-2">
            By securing your online reservation with a payment method, you are eligible for our Reservations Guarantee. If your reservation cannot be honored, the host hotel will provide a room at, and transportation to, another convenient and comparable hotel, and pay for telephone calls to notify family of the lodging change. The host hotel will also pay the full cost of the first night's lodging rate, plus tax. Any advance deposit will be refunded.
          </p>
        </div>
        <div>
          <p class="text-base text-ink">A credit or debit card must be presented upon check-in at the hotel. Booking with a debit card?</p>
          <p class="mt-2">
            Most Q Hotel properties place a hold on a debit card when it is presented at check-in. The hold amount varies depending on the rate type booked and can include the entire price of the stay, plus taxes, fees, and a deposit for incidental purchases. These holds are separate from, and in addition to, your billable charges. Q Hotel typically releases the hold within 5 days of check-out once final payment has been received. Depending on your financial institution, funds may take up to 14 days or longer to be back in your account. Q Hotel, its subsidiaries, affiliates, franchisees, and agents are not responsible or liable for the loss of use of these funds or any overdraft charges.
          </p>
        </div>
      </BookingPolicyItem>

      <BookingPolicyItem v-model="openSections.pet" title="Pet Policy">
        <p>Pets are not allowed in the hotel.</p>
      </BookingPolicyItem>

      <BookingPolicyItem v-model="openSections.disclaimers" title="Disclaimers">
        <p class="text-base text-ink">Taxes and charges may fluctuate:</p>
        <p>
          As taxes and additional charges may fluctuate from the time a reservation is made until the actual stay and during the actual stay, the Total Price is an estimate. Estimated price includes room rate, extra person charges, additional charges, total tax, and total hotel charges. Additional charges are hotel-specific. Other hotel-specific charges may also apply. Check with the hotel for details.
        </p>
      </BookingPolicyItem>
    </div>

    <div class="mt-8 bg-white p-7 sm:p-10">
      <h2 class="font-display text-2xl text-ink sm:text-3xl">Terms and Conditions</h2>

      <p class="mt-6 text-base leading-8 text-ink/70">
        By booking I certify that I have read and accept the
        <NuxtLink to="/terms" class="text-copper underline underline-offset-2">Terms of Use</NuxtLink>
        and
        <NuxtLink to="/privacy-policy" class="text-copper underline underline-offset-2">Privacy Statement</NuxtLink>
        and I have read and understand the Rate Description and Rate Rules for my reservation.
      </p>
      <p class="mt-4 text-base leading-8 text-ink/70">
        By joining Q Hotel Rewards, I confirm that I have read, understood, and agree to the Q Hotel Rewards
        <NuxtLink to="/terms" class="text-copper underline underline-offset-2">Membership Terms &amp; Conditions</NuxtLink>
        and
        <NuxtLink to="/privacy-policy" class="text-copper underline underline-offset-2">Privacy Policy</NuxtLink>
        applicable in Bangladesh.
      </p>

      <p class="mt-8 flex items-center justify-center gap-2 text-center text-base font-medium text-moss">
        <svg class="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M8 1.333A6.667 6.667 0 1014.667 8 6.674 6.674 0 008 1.333zm3.53 5.137l-4 4a.667.667 0 01-.943 0l-2-2a.667.667 0 11.943-.943L7 9.057l3.53-3.53a.667.667 0 01.943.943z" />
        </svg>
        Book now and lock in this great deal. Prices may increase if you wait.
      </p>

      <!-- Payment gateway integration lands with the PMS work; until then a
           valid submit takes the guest straight to a confirmation page
           rather than pretending a charge went through -->
      <div class="mt-6 flex justify-center">
        <button
          type="submit"
          class="group inline-flex min-h-[60px] items-stretch bg-champagne text-ink transition-colors duration-fast hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean"
        >
          <span class="flex items-center px-8 text-sm font-semibold uppercase tracking-[0.1em]">
            Payment Now
          </span>
          <span class="flex items-center border-l border-ink/15 px-5" aria-hidden="true">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Room } from '~/types/room'

const props = defineProps<{
  room: Room
  checkIn: string
  taxRatePercent: number
}>()

const openSections = reactive({
  roomRequests: false,
  deposit: true,
  taxes: true,
  otherCharges: true,
  payment: true,
  pet: true,
  disclaimers: true,
})

const cancelByLabel = computed(() => formatBookingDay(addDaysIso(props.checkIn, -1)))
</script>
