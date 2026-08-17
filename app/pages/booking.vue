<template>
  <div>
    <BookingTopBar
      :check-in="checkIn"
      :check-out="checkOut"
      :total-price="totalPrice"
    />

    <BaseSection container-size="xl" tone="paper" spacing="md">
      <h1 class="font-display font-semibold text-4xl text-[#0F0F10] sm:text-5xl lg:text-[56px]">
        Complete Your Booking
      </h1>

      <form
        class="mt-10 lg:grid lg:grid-cols-[1fr_36rem] lg:items-start lg:gap-8"
        @submit.prevent="handleSubmit"
      >
        <div class="flex flex-col gap-8">
          <BookingGuestForm />
          <BookingPaymentMethod />
          <BookingRoomRequests />
          <BookingPolicies
            :room="room"
            :check-in="checkIn"
            :tax-rate-percent="TAX_RATE_PERCENT"
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
import type { BookingConfirmation, BookingRoomRequests, BookingSearchQuery } from "~/types/booking";
import { useRoomsCatalog } from "#imports";

// Checkout: never worth indexing, and query-param room variants would
// otherwise read as thin duplicate content
useHead({
  meta: [{ name: "robots", content: "noindex, nofollow" }],
});
useSeoMetaData({
  title: "Complete Your Booking",
  description:
    "Review your stay details and complete your reservation at Q Hotel Dhaka.",
  path: "/booking",
});

const route = useRoute();
const rooms = useRoomsCatalog();
const room = computed(
  () =>
    rooms.find((candidate) => candidate.id === route.query.room) ?? rooms[0]!,
);

const bookingDraft = useState<BookingSearchQuery | null>(
  "booking-search-draft",
  () => null,
);
const checkIn = computed(() => bookingDraft.value?.checkIn ?? todayIsoDate());
const checkOut = computed(
  () => bookingDraft.value?.checkOut ?? addDaysIso(todayIsoDate(), 1),
);
const roomsCount = computed(() => bookingDraft.value?.rooms ?? 1);
const guestsCount = computed(
  () => (bookingDraft.value?.adults ?? 2) + (bookingDraft.value?.children ?? 0),
);

const nights = computed(() =>
  Math.max(1, nightsBetween(checkIn.value, checkOut.value)),
);
const TAX_RATE_PERCENT = 15;
const roomSubtotal = computed(() => room.value.nightlyRateUsd * nights.value);
const taxes = computed(() =>
  Math.round(roomSubtotal.value * (TAX_RATE_PERCENT / 100)),
);
const totalPrice = computed(() => roomSubtotal.value + taxes.value);

const confirmation = useState<BookingConfirmation | null>(
  "booking-confirmation",
  () => null,
);

function handleSubmit(event: Event) {
  // Payment gateway + PMS integration land here. Until then, a valid native
  // submit (the browser only fires this once every `required` field passes)
  // hands the details straight to the confirmation page.
  const formData = new FormData(event.target as HTMLFormElement);
  const readField = (name: string) => String(formData.get(name) ?? "").trim();

  confirmation.value = {
    reservationNumber: `QH-${todayIsoDate().replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`,
    roomId: room.value.id,
    guest: {
      firstName: readField("firstName"),
      lastName: readField("lastName"),
      email: readField("email"),
      phoneCountryCode: readField("phoneCountryCode"),
      phone: readField("phone"),
      country: readField("country"),
      note: readField("note"),
    },
    paymentMethod: readField("paymentMethod") as BookingConfirmation["paymentMethod"],
    roomRequests: {
      smokingPreference: readField("smokingPreference") as BookingRoomRequests["smokingPreference"],
      additionalRequests: formData
        .getAll("additionalRequests")
        .map((value) => String(value)),
      earlyCheckInTime: readField("earlyCheckInTime"),
      specialRequest: readField("specialRequest"),
    },
    checkIn: checkIn.value,
    checkOut: checkOut.value,
    roomsCount: roomsCount.value,
    guestsCount: guestsCount.value,
    roomSubtotal: roomSubtotal.value,
    taxes: taxes.value,
    totalPrice: totalPrice.value,
    taxRatePercent: TAX_RATE_PERCENT,
    confirmedAt: new Date().toISOString(),
  };

  navigateTo("/booking-confirmed");
}
</script>
