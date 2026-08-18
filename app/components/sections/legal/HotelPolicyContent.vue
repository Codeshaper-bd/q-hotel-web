<template>
  <!--
    Editorial hotel policy document: last-updated line, intro, then numbered
    policy sections with refined bullet lists. Mirrors the privacy policy's
    card-free, typeset format so both documents read as one continuous piece
    on the warm paper ground.
  -->
  <BaseSection
    tone="paper"
    spacing="sm"
    container-size="md"
    aria-labelledby="hotel-policy-document"
  >
    <div class="mx-auto max-w-[880px]">
      <p
        id="hotel-policy-document"
        class="text-xs font-medium uppercase tracking-[0.16em] text-ink sm:text-sm"
      >
        Last Updated: August 2026
      </p>

      <p class="mt-10 text-base leading-[1.7] text-ink/70 sm:mt-12">
        At Q Hotel Dhaka, operated by Quality Hospitality Limited, we aim to
        make every stay straightforward and enjoyable. This Hotel Policy sets
        out the check-in and check-out times, reservation and cancellation
        terms, payment and additional charges, and the house rules that apply
        when you stay with us or use our facilities.
      </p>

      <p class="mt-4 text-base leading-[1.7] text-ink/70">
        By making a reservation or staying at the hotel, you agree to the
        practices described in this Hotel Policy. Policies may be updated
        periodically, and the version published on this page applies at the
        time of your stay.
      </p>

      <div class="mt-8 space-y-12 sm:mt-9 sm:space-y-14">
        <section
          v-for="section in policySections"
          :key="section.number"
          :aria-labelledby="`hotel-policy-${section.number}`"
        >
          <h2
            :id="`hotel-policy-${section.number}`"
            class="font-display text-2xl font-medium text-ink sm:text-3xl"
          >
            {{ section.number }}. {{ section.title }}
          </h2>

          <div class="mt-6 space-y-4">
            <p
              v-for="paragraph in section.paragraphs"
              :key="paragraph"
              class="text-base leading-[1.7] text-ink/70"
            >
              {{ paragraph }}
            </p>

            <p v-if="section.leadIn" class="text-base leading-[1.7] text-ink/80">
              {{ section.leadIn }}
            </p>

            <ul
              v-if="section.bullets?.length"
              class="list-disc space-y-2.5 pl-5 text-base leading-[1.7] text-ink/70 marker:text-copper/60"
            >
              <li v-for="item in section.bullets" :key="item">
                {{ item }}
              </li>
            </ul>

            <p
              v-for="paragraph in section.closingParagraphs"
              :key="paragraph"
              class="text-base leading-[1.7] text-ink/70"
            >
              {{ paragraph }}
            </p>

            <div
              v-if="section.contact"
              class="space-y-3 pt-2 text-base leading-[1.7] text-ink/70"
            >
              <p class="font-medium text-ink">{{ section.contact.name }}</p>
              <p>{{ section.contact.address }}</p>
              <p class="text-ink/60">{{ section.contact.addressNote }}</p>
              <p>
                <a
                  :href="`tel:${section.contact.phone}`"
                  class="transition-colors duration-fast hover:text-copper"
                >
                  {{ section.contact.phone }}
                </a>
              </p>
              <p>
                <a
                  :href="`mailto:${section.contact.email}`"
                  class="text-copper transition-colors duration-fast hover:text-ink"
                >
                  {{ section.contact.email }}
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
interface PolicySection {
  number: string
  title: string
  paragraphs: string[]
  leadIn?: string
  bullets?: string[]
  closingParagraphs?: string[]
  contact?: {
    name: string
    address: string
    addressNote: string
    phone: string
    email: string
  }
}

const policySections: PolicySection[] = [
  {
    number: '1',
    title: 'Check-In & Check-Out',
    paragraphs: [
      'Check-in begins at 2:00 PM and check-out is until 12:00 PM (noon) on the day of departure. Early check-in and late check-out can be arranged on request, subject to availability, and may carry an additional charge.',
      'A valid government-issued photo ID (passport or national ID) is required at check-in for every registered guest, in line with local hospitality regulations.',
    ],
  },
  {
    number: '2',
    title: 'Reservations & Guarantee',
    paragraphs: [
      'A valid payment card is required to guarantee your reservation. Depending on the rate and length of stay, a partial or full prepayment may be requested at the time of booking.',
    ],
    leadIn: 'By securing your online reservation with a payment method, you are eligible for our Reservations Guarantee:',
    bullets: [
      'If your reservation cannot be honored, the host hotel will provide a room at, and transportation to, another convenient and comparable hotel, and pay for telephone calls to notify family of the lodging change.',
      'The host hotel will also pay the full cost of the first night\'s lodging rate, plus tax, and any advance deposit will be refunded.',
    ],
  },
  {
    number: '3',
    title: 'Payment & Additional Charges',
    paragraphs: [
      'A credit or debit card must be presented upon check-in at the hotel. When a debit card is presented, most Q Hotel properties place a hold on the card that can include the entire price of the stay, plus taxes, fees, and a deposit for incidental purchases.',
      'Q Hotel typically releases the hold within 5 days of check-out once final payment has been received. Depending on your financial institution, funds may take up to 14 days or longer to be returned to your account. Q Hotel, its subsidiaries, affiliates, franchisees, and agents are not responsible or liable for the loss of use of these funds or any overdraft charges.',
    ],
    leadIn: 'In addition to the room rate, the following charges may apply:',
    bullets: [
      'Service charge: 12.5%',
      'City tax: 1.5%',
      'VAT: 15%',
      'Security deposit: applicable for all bookings',
      'Early departure fee: 10,000 BDT',
    ],
    closingParagraphs: [
      'Taxes and additional charges may fluctuate from the time a reservation is made until the actual stay and during the actual stay, so the total price shown at booking is an estimate. Estimated price includes room rate, extra person charges, additional charges, total tax, and total hotel charges. Other hotel-specific charges may also apply; check with the hotel for details.',
    ],
  },
  {
    number: '4',
    title: 'Cancellation Policy',
    paragraphs: [
      'Standard reservations may be cancelled free of charge up to 24 hours prior to the scheduled check-in date. Cancellations made within 24 hours of arrival, as well as no-shows, will incur a charge equivalent to one night\'s room rate plus applicable taxes.',
      'Please note that certain promotional or special rates may be non-refundable and subject to different cancellation terms, which are always shown before you confirm your booking.',
    ],
  },
  {
    number: '5',
    title: 'Smoking Policy',
    paragraphs: [
      'Q Hotel Dhaka is a smoke-free property. Smoking rooms are available, subject to advance booking, and a cleaning fee applies for smoking inside non-smoking guest rooms.',
      'Designated outdoor smoking areas are available for guests who wish to smoke.',
    ],
  },
  {
    number: '6',
    title: 'Pet Policy',
    paragraphs: [
      'Pets are not allowed in the hotel, with the exception of registered service animals. Please contact us in advance if you have specific accessibility needs.',
    ],
  },
  {
    number: '7',
    title: 'Guests & Visitors',
    paragraphs: [
      'Visitors are welcome in the hotel\'s public areas during the day and may be asked to register at the front desk for security reasons.',
      'Only registered guests are permitted to stay overnight in guest rooms. Please speak to the front desk before inviting visitors to your room.',
    ],
  },
  {
    number: '8',
    title: 'Security & Valuables',
    paragraphs: [
      'For guest, visitor, employee, and property security, CCTV surveillance is used in appropriate public and operational areas of the hotel. CCTV is not intended for areas where individuals reasonably expect a high degree of privacy.',
      'Room safes are available for storing valuables. The hotel is not responsible for valuables left unattended in public areas.',
    ],
  },
  {
    number: '9',
    title: 'Parking & Transportation',
    paragraphs: [
      'Complimentary on-site parking is available for all guests, with 24-hour security and valet service offered on request.',
      'A private airport shuttle to and from Hazrat Shahjalal International Airport can be arranged. Please contact our concierge in advance to schedule your transfer.',
    ],
  },
  {
    number: '10',
    title: 'House Rules & Conduct',
    paragraphs: [
      'Guests are expected to respect the comfort, safety, and privacy of other guests and of hotel staff at all times.',
      'Please keep noise at a considerate level, especially in corridors and adjacent rooms during evening hours. Damage to hotel property caused during your stay will be charged to your account.',
    ],
  },
  {
    number: '11',
    title: 'Contact Us',
    paragraphs: [
      'If you have questions about this Hotel Policy or any aspect of your stay, please contact:',
    ],
    contact: {
      name: 'Q Hotel Dhaka',
      address:
        'Plot C-11, Road – Swadesh Avenue, Block A, Shornali Abashon, Swadesh, Purbachal Expressway, Barua, Khilkhet, Dhaka 1229, Bangladesh.',
      addressNote:
        "Q Hotel's current corporate material lists the hotel complex at this Purbachal location and identifies Quality Hospitality Limited as the associated hospitality company.",
      phone: '+88-01713377700',
      email: 'info@qhl.com.bd',
    },
  },
]
</script>