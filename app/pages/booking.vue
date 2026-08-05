<template>
  <div>
    <BookingTopBar :check-in="checkIn" :check-out="checkOut" :total-price="totalPrice" />

    <BaseSection container-size="xl" tone="paper" spacing="md">
      <h1 class="font-display text-4xl text-ink sm:text-5xl">Complete Your Booking</h1>

      <form class="mt-10 lg:grid lg:grid-cols-[1fr_26rem] lg:items-start lg:gap-8" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-8">
          <BookingGuestForm />
          <BookingPolicies
            :room="room"
            :check-in="checkIn"
            :tax-rate-percent="TAX_RATE_PERCENT"
            :submitted="isSubmitted"
          />
        </div>

        <div class="mt-8 lg:sticky lg:top-28 lg:mt-0">
          <BookingSummaryCard
            :room="room"
            :check-in="checkIn"
            :check-out="checkOut"
            :nights="nights"
            :rooms-count="roomsCount"
            :guests-count="guestsCount"
            :room-subtotal="roomSubtotal"
            :taxes="taxes"
            :total-price="totalPrice"
            :tax-rate-percent="TAX_RATE_PERCENT"
          />
        </div>
      </form>
    </BaseSection>
  </div>
</template>

<script setup lang="ts">
import type { BookingSearchQuery } from '~/types/booking'

// Checkout: never worth indexing, and query-param room variants would
// otherwise read as thin duplicate content
useHead({
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
useSeoMetaData({
  title: 'Complete Your Booking',
  description: 'Review your stay details and complete your reservation at Q Hotel Dhaka.',
  path: '/booking',
})

const route = useRoute()
const rooms = useRoomsCatalog()
const room = computed(() => rooms.find(candidate => candidate.id === route.query.room) ?? rooms[0]!)

const bookingDraft = useState<BookingSearchQuery | null>('booking-search-draft', () => null)
const checkIn = computed(() => bookingDraft.value?.checkIn ?? todayIsoDate())
const checkOut = computed(() => bookingDraft.value?.checkOut ?? addDaysIso(todayIsoDate(), 1))
const roomsCount = computed(() => bookingDraft.value?.rooms ?? 1)
const guestsCount = computed(() => (bookingDraft.value?.adults ?? 2) + (bookingDraft.value?.children ?? 0))

const nights = computed(() => Math.max(1, nightsBetween(checkIn.value, checkOut.value)))
const TAX_RATE_PERCENT = 15
const roomSubtotal = computed(() => room.value.nightlyRateUsd * nights.value)
const taxes = computed(() => Math.round(roomSubtotal.value * (TAX_RATE_PERCENT / 100)))
const totalPrice = computed(() => roomSubtotal.value + taxes.value)

const isSubmitted = ref(false)

function handleSubmit() {
  // Payment gateway + PMS integration land here. Until then, a valid
  // submission just confirms the request was received.
  isSubmitted.value = true
}
</script>
