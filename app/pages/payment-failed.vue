<template>
  <div>
    <PaymentFailedBanner :try-again-href="tryAgainHref" />

    <BaseSection container-size="xl" tone="paper" spacing="md">
      <div class="lg:grid lg:grid-cols-[1fr_26rem] lg:items-start lg:gap-8">
        <PaymentFailedDetails
          :room="room"
          :guest="guest"
          :check-in="checkIn"
          :check-out="checkOut"
          :nights="nights"
          :guests-count="guestsCount"
          :total-price="totalPrice"
          :failure-reason="failureReason"
          :attempted-at-label="attemptedAtLabel"
        />

        <div class="mt-8 lg:mt-0">
          <BookingConfirmationCard
            :room="room"
            :reservation-number="attemptReference"
            :check-in="checkIn"
            :check-out="checkOut"
            :nights="nights"
            :rooms-count="roomsCount"
            :guests-count="guestsCount"
            :total-price="totalPrice"
            total-label="Total Amount"
          />
        </div>
      </div>
    </BaseSection>

    <BaseSection container-size="xl" tone="paper" spacing="md">
      <PaymentFailedActions :try-again-href="tryAgainHref" />
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
import type { GuestDetails, PaymentFailure } from '~/types/booking'

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
useSeoMetaData({
  title: 'Payment Unsuccessful',
  description: 'We could not complete your payment at Q Hotel Dhaka. No amount has been charged.',
  path: '/payment-failed',
})

const rooms = useRoomsCatalog()
const failure = useState<PaymentFailure | null>('payment-failure', () => null)

// Same fallback philosophy as /booking-confirmed: a direct visit (a shared
// link, a bookmark) still renders a coherent page
const FALLBACK_GUEST: GuestDetails = {
  firstName: 'Guest',
  lastName: '',
  email: 'guest@example.com',
  phoneCountryCode: '+880',
  phone: '',
  country: 'Bangladesh',
  note: '',
}

const fallbackCheckIn = todayIsoDate()
const fallbackReference = `QH-${fallbackCheckIn.replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`

const room = computed(() => rooms.find(candidate => candidate.id === failure.value?.roomId) ?? rooms[0]!)
const guest = computed(() => failure.value?.guest ?? FALLBACK_GUEST)
const attemptReference = computed(() => failure.value?.attemptReference ?? fallbackReference)
const checkIn = computed(() => failure.value?.checkIn ?? fallbackCheckIn)
const checkOut = computed(() => failure.value?.checkOut ?? addDaysIso(fallbackCheckIn, 1))
const nights = computed(() => Math.max(1, nightsBetween(checkIn.value, checkOut.value)))
const roomsCount = computed(() => failure.value?.roomsCount ?? 1)
const guestsCount = computed(() => failure.value?.guestsCount ?? 2)
const taxRatePercent = computed(() => failure.value?.taxRatePercent ?? 15)
const roomSubtotal = computed(() => failure.value?.roomSubtotal ?? room.value.nightlyRateUsd * nights.value)
const taxes = computed(() => failure.value?.taxes ?? Math.round(roomSubtotal.value * (taxRatePercent.value / 100)))
const totalPrice = computed(() => failure.value?.totalPrice ?? roomSubtotal.value + taxes.value)
const failureReason = computed(() => failure.value?.failureReason ?? 'Payment was declined by your bank.')

const tryAgainHref = computed(() => `/booking?room=${room.value.id}`)

const attemptedAtLabel = computed(() => {
  const attemptedAt = failure.value?.attemptedAt ? new Date(failure.value.attemptedAt) : new Date()
  const datePart = attemptedAt.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  const timePart = attemptedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${datePart} • ${timePart}`
})
</script>
