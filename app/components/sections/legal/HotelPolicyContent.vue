<template>
  <!--
    Hotel policy information table: a wide, sharp-edged, card-free two-column
    table (policy name | description) on the warm paper ground. Thin beige
    dividers separate every row and the two columns; on mobile the columns
    stack so each policy reads title-first, description-below.
  -->
  <BaseSection tone="paper" spacing="sm" container-size="xl">
    <div class="mx-auto w-full max-w-[1400px] overflow-x-auto bg-cream">
      <table aria-label="Hotel Policy Information" class="w-full border-collapse text-left">
        <tbody>
          <tr
            v-for="row in policyRows"
            :key="row.name"
            class="border-t border-line first:border-t-0 max-sm:block"
          >
            <th
              scope="row"
              class="w-[22%] py-6 pr-6 text-center align-middle text-[18px] font-bold text-[#0F0F10] max-sm:block max-sm:w-full max-sm:pb-1 sm:py-7 sm:pr-8 lg:pr-10"
            >
              {{ row.name }}
            </th>
            <td
              class="border-l border-line p-8 align-middle text-[18px] leading-[1.7] text-[#373737] max-sm:block max-sm:w-full max-sm:border-l-0"
            >
              {{ row.description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
interface PolicyRow {
  name: string
  description: string
}

const policyRows: PolicyRow[] = [
  {
    name: 'Check-In',
    description:
      'Standard check-in time is 2:00 PM. Early check-in is subject to room availability and may incur additional charges.',
  },
  {
    name: 'Check-Out',
    description:
      'Standard check-out time is 12:00 PM. Please contact the hotel in advance if you require a late check-out.',
  },
  {
    name: 'Early Check-In',
    description:
      'Early check-in is available upon request and subject to room availability. Additional charges may apply depending on the requested arrival time. Please contact the hotel in advance to confirm availability and applicable fees.',
  },
  {
    name: 'Rates & Taxes',
    description:
      'A 12.5% Service Charge, 1.5% City Tax, and 15% VAT apply to bookings. Rates and applicable charges will be displayed during the booking process.',
  },
  {
    name: 'Security Deposit',
    description:
      'A security deposit is applicable for all bookings. Deposit requirements may vary depending on the reservation and will be communicated during booking or check-in.',
  },
  {
    name: 'Rollaway Bed',
    description:
      'Rollaway beds are available upon advance request, subject to room type and availability. Additional charges may apply.',
  },
  {
    name: 'Baby Crib',
    description:
      'Baby cribs are available upon advance request and subject to availability. Please request a crib when making your reservation.',
  },
  {
    name: 'Accessibility',
    description:
      'Accessible rooms and facilities are available for guests requiring additional assistance. Advance requests are recommended so the hotel can prepare accordingly.',
  },
  {
    name: 'Smoking Rooms',
    description:
      'Non-smoking rooms are the default. Smoking rooms are available upon advance request and subject to availability.',
  },
  {
    name: 'Pet Policy',
    description: 'Pets are not allowed in the hotel.',
  },
  {
    name: 'Airport Assistance',
    description:
      'Guests may provide their flight information during booking to help the hotel prepare for their arrival and coordinate requested airport assistance.',
  },
  {
    name: 'Special Requests',
    description:
      'Rollaway beds, baby cribs, accessible rooms, early check-in and other special requests are subject to availability and may incur additional charges.',
  },
  {
    name: 'Payment',
    description:
      'Guests can select from the payment options available during booking, including Pay Now or Pay at Property, where applicable to the selected rate.',
  },
  {
    name: 'Cancellation',
    description:
      "Standard reservations may be cancelled free of charge up to 24 hours before the scheduled check-in date. Cancellations within 24 hours or no-shows may incur a charge equivalent to one night's room rate plus applicable taxes. Promotional or special rates may have different terms.",
  },
  {
    name: 'Identification',
    description:
      'Guests may be required to present a valid government-issued photo ID or passport at check-in.',
  },
  {
    name: 'Children & Extra Guests',
    description:
      'Children and additional guests are welcome subject to the occupancy limit of the selected room. Extra beds or additional guest charges may apply.',
  },
]
</script>