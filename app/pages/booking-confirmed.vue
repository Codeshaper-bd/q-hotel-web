<template>
  <div>
    <BookingConfirmedBanner
      :guest-first-name="guestFirstName"
      :guest-email="guest.email"
      :reservation-number="reservationNumber"
    />

    <BaseSection container-size="xl" tone="paper" spacing="md">
      <div class="lg:grid lg:grid-cols-[1fr_26rem] lg:items-start lg:gap-8">
        <BookingConfirmationDetails
          :room="room"
          :guest="guest"
          :check-in="checkIn"
          :check-out="checkOut"
          :nights="nights"
          :guests-count="guestsCount"
          :room-subtotal="roomSubtotal"
          :taxes="taxes"
          :total-price="totalPrice"
          :tax-rate-percent="taxRatePercent"
        />

        <div class="mt-8 lg:mt-0">
          <BookingConfirmationCard
            :room="room"
            :reservation-number="reservationNumber"
            :check-in="checkIn"
            :check-out="checkOut"
            :nights="nights"
            :rooms-count="roomsCount"
            :guests-count="guestsCount"
            :total-price="totalPrice"
          />
        </div>
      </div>
    </BaseSection>

    <BaseSection container-size="xl" tone="paper" spacing="md">
      <BookingWhatsNext />
    </BaseSection>

    <BaseSection container-size="xl" tone="paper" spacing="md">
      <div class="grid gap-6 lg:grid-cols-2 lg:items-start">
        <BookingTimeline
          :confirmed-at-label="confirmedAtLabel"
          :check-in="checkIn"
          :check-out="checkOut"
          check-in-time="2:00 PM"
          check-out-time="12:00 PM"
        />
        <BookingHelpfulActions
          :reservation-number="reservationNumber"
          :room-name="room.name"
          :check-in="checkIn"
          :check-out="checkOut"
        />
      </div>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
import type { BookingConfirmation, GuestDetails } from '~/types/booking'

useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
useSeoMetaData({
  title: 'Booking Confirmed',
  description: 'Your reservation at Q Hotel Dhaka is confirmed.',
  path: '/booking-confirmed',
})

const rooms = useRoomsCatalog()
const confirmation = useState<BookingConfirmation | null>('booking-confirmation', () => null)

// A guest who lands here without completing checkout (a shared link, a
// direct visit) still sees a coherent page — same fallback philosophy as
// the /booking page's own room-query fallback
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
const fallbackReservationNumber = `QH-${fallbackCheckIn.replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`

const room = computed(() => rooms.find(candidate => candidate.id === confirmation.value?.roomId) ?? rooms[0]!)
const guest = computed(() => confirmation.value?.guest ?? FALLBACK_GUEST)
const guestFirstName = computed(() => guest.value.firstName || 'Guest')
const reservationNumber = computed(() => confirmation.value?.reservationNumber ?? fallbackReservationNumber)
const checkIn = computed(() => confirmation.value?.checkIn ?? fallbackCheckIn)
const checkOut = computed(() => confirmation.value?.checkOut ?? addDaysIso(fallbackCheckIn, 1))
const nights = computed(() => Math.max(1, nightsBetween(checkIn.value, checkOut.value)))
const roomsCount = computed(() => confirmation.value?.roomsCount ?? 1)
const guestsCount = computed(() => confirmation.value?.guestsCount ?? 2)
const taxRatePercent = computed(() => confirmation.value?.taxRatePercent ?? 15)
const roomSubtotal = computed(() => confirmation.value?.roomSubtotal ?? room.value.nightlyRateUsd * nights.value)
const taxes = computed(() => confirmation.value?.taxes ?? Math.round(roomSubtotal.value * (taxRatePercent.value / 100)))
const totalPrice = computed(() => confirmation.value?.totalPrice ?? roomSubtotal.value + taxes.value)

const confirmedAtLabel = computed(() => {
  const confirmedAt = confirmation.value?.confirmedAt ? new Date(confirmation.value.confirmedAt) : new Date()
  const datePart = confirmedAt.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  const timePart = confirmedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  return `${datePart} • ${timePart}`
})
</script>
