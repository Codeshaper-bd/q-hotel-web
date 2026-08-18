<template>
  <!--
    Editorial terms & conditions document: last-updated line, intro, then
    numbered sections with refined bullet lists. Mirrors the hotel policy and
    privacy policy's card-free, typeset format so all three legal documents
    read as one continuous piece on the warm paper ground.
  -->
  <BaseSection
    tone="paper"
    spacing="sm"
    container-size="md"
    aria-labelledby="terms-document"
  >
    <div class="mx-auto max-w-[880px]">
      <p
        id="terms-document"
        class="text-xs font-medium uppercase tracking-[0.16em] text-ink sm:text-sm"
      >
        Last Updated: August 2026
      </p>

      <p class="mt-10 text-base leading-[1.7] text-ink/70 sm:mt-12">
        Welcome to Q Hotel Dhaka. These Terms & Conditions govern your use of
        our website and the booking, accommodation, dining, event, and other
        hospitality services provided by Q Hotel Dhaka, operated by Quality
        Hospitality Limited.
      </p>

      <p class="mt-4 text-base leading-[1.7] text-ink/70">
        By accessing our website, making a reservation, submitting an enquiry,
        or using our services, you acknowledge that you have read, understood,
        and agreed to these Terms & Conditions.
      </p>

      <div class="mt-8 space-y-12 sm:mt-9 sm:space-y-14">
        <section
          v-for="section in policySections"
          :key="section.number"
          :aria-labelledby="`terms-${section.number}`"
        >
          <h2
            :id="`terms-${section.number}`"
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
              <p v-if="section.contact.addressNote" class="text-ink/60">
                {{ section.contact.addressNote }}
              </p>
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
    addressNote?: string
    phone: string
    email: string
  }
}

const policySections: PolicySection[] = [
  {
    number: '1',
    title: 'Reservations & Bookings',
    paragraphs: [
      'All reservations are subject to room availability and confirmation by Q Hotel Dhaka.',
      'When making a reservation, guests must provide accurate and complete information, including their name, contact information, stay dates, number of guests, and any other information requested during the booking process.',
      'A reservation is considered confirmed only after a valid booking confirmation or reservation reference has been issued.',
      'Rates, room availability, packages, promotions, and booking conditions may change depending on the selected dates and rate plan.',
    ],
  },
  {
    number: '2',
    title: 'Room Rates',
    paragraphs: [
      'Room rates displayed on our website are based on the selected:',
    ],
    bullets: [
      'Room or suite',
      'Stay dates',
      'Number of guests',
      'Rate plan',
      'Package or promotional offer',
      'Additional services or room requests',
    ],
    closingParagraphs: [
      'Unless specifically stated otherwise, additional taxes, service charges, government charges, and optional services may be added to the displayed room rate.',
      'The complete applicable price will be presented during the booking process before the reservation is finalized.',
    ],
  },
  {
    number: '3',
    title: 'Taxes & Service Charges',
    paragraphs: [
      'Applicable taxes and service charges may be added to the room rate and additional services.',
    ],
    leadIn: 'Current charges may include:',
    bullets: [
      'Service Charge: 12.5%',
      'City Tax: 1.5%',
      'VAT: 15%',
      'A security deposit may also apply to bookings.',
    ],
    closingParagraphs: [
      'Applicable charges will be displayed as part of the booking price breakdown where appropriate. Tax rates and government-imposed charges may change in accordance with applicable regulations.',
    ],
  },
  {
    number: '4',
    title: 'Payment Terms',
    paragraphs: [],
    leadIn: 'Depending on the selected rate or booking option, guests may be offered:',
    bullets: [
      'Pay Now: Payment is collected during the online reservation process using an available payment method.',
      'Pay at Property: Where available, payment may be made directly at Q Hotel Dhaka according to the conditions associated with the selected reservation.',
    ],
    closingParagraphs: [
      'Some promotional, advance-purchase, or special rates may require full or partial prepayment.',
      'Q Hotel Dhaka reserves the right to request payment authorization, advance payment, or a security deposit where applicable.',
    ],
  },
  {
    number: '5',
    title: 'Payment Processing',
    paragraphs: [
      'Online payments may be processed through authorized third-party payment gateways, banks, or financial service providers.',
      'Guests are responsible for providing valid and accurate payment information.',
    ],
    leadIn: 'A reservation requiring online payment may not be confirmed if:',
    bullets: [
      'Payment authorization fails',
      'The transaction is declined',
      'Incorrect payment details are provided',
      'The payment process is interrupted',
      'The payment provider cannot complete the transaction',
    ],
    closingParagraphs: [
      'If a payment fails, guests may attempt the payment again using an available payment method or contact Q Hotel Dhaka for assistance.',
    ],
  },
  {
    number: '6',
    title: 'Check-In & Check-Out',
    paragraphs: ["The hotel's standard times are:"],
    bullets: ['Check-In: 2:00 PM', 'Check-Out: 12:00 PM'],
    closingParagraphs: [
      'Guests may be required to present a valid government-issued identification document or passport at check-in.',
      'The person making the reservation may also be required to present the payment method used for the booking or other booking verification information.',
    ],
  },
  {
    number: '7',
    title: 'Early Check-In',
    paragraphs: [
      'Early check-in may be requested during the booking process or by contacting the hotel.',
      'Early check-in is subject to room availability and is not guaranteed.',
      'Additional charges may apply depending on the requested arrival time. Where an early check-in charge applies during online booking, the applicable amount will be included in the booking price breakdown.',
      'Guests are encouraged to contact Q Hotel Dhaka in advance to confirm availability and applicable charges.',
    ],
  },
  {
    number: '8',
    title: 'Late Check-Out',
    paragraphs: [
      'Late check-out requests are subject to availability and hotel approval.',
      'Additional charges may apply depending on the requested departure time and room availability.',
      'Guests should contact the hotel reception or make the request in advance whenever possible.',
    ],
  },
  {
    number: '9',
    title: 'Cancellation & Modification',
    paragraphs: [
      'Standard reservations may be cancelled or modified according to the cancellation conditions associated with the selected rate.',
      'Unless otherwise stated in the selected booking conditions, standard reservations may generally be cancelled without charge up to 24 hours before the scheduled check-in date/time.',
      'Cancellations made within the applicable cancellation period may result in a charge.',
      'Promotional, advance-purchase, discounted, or special rates may have different cancellation conditions and may be partially or fully non-refundable.',
      'The specific cancellation policy displayed during booking takes precedence.',
    ],
  },
  {
    number: '10',
    title: 'No-Show Policy',
    paragraphs: [
      'A reservation may be considered a no-show when the guest does not arrive on the confirmed arrival date and has not cancelled the reservation according to the applicable cancellation policy.',
    ],
    closingParagraphs: [
      "No-shows may result in a charge equivalent to one night's accommodation or another amount specified by the selected rate conditions.",
      'For prepaid or non-refundable reservations, amounts already paid may not be refundable.',
    ],
  },
  {
    number: '11',
    title: 'Room Requests & Accessibility',
    paragraphs: [
      'Guests may submit additional room requests during booking, including:',
    ],
    bullets: [
      'Rollaway bed',
      'Baby crib',
      'Accessible room',
      'Early check-in',
      'Smoking preference',
      'Other special requests',
    ],
    closingParagraphs: [
      'All additional requests are subject to availability and confirmation.',
      'Submitting a request does not guarantee that the requested service or facility will be available.',
      'Additional charges may apply to certain requests and, where applicable, will be communicated or included in the booking price.',
    ],
  },
  {
    number: '12',
    title: 'Rollaway Beds & Baby Cribs',
    paragraphs: [
      'Rollaway beds and baby cribs may be available upon advance request and subject to availability.',
      'Additional fees may apply depending on the room type, occupancy, and requested service.',
      'Certain rooms may not accommodate additional beds due to occupancy, space, or safety requirements.',
    ],
  },
  {
    number: '13',
    title: 'Accessibility Requests',
    paragraphs: [
      'Q Hotel Dhaka aims to accommodate guests requiring accessible rooms or additional assistance.',
      'Accessible rooms and facilities are subject to availability.',
      'Guests with specific accessibility requirements are encouraged to provide details during booking or contact the hotel in advance so appropriate arrangements can be discussed.',
    ],
  },
  {
    number: '14',
    title: 'Smoking Policy',
    paragraphs: [
      'Non-smoking rooms are the standard/default room preference.',
      'Smoking rooms may be available upon advance request and subject to availability.',
      'Smoking in designated non-smoking rooms or prohibited areas may result in additional cleaning or restoration charges.',
      'Guests should confirm smoking-room availability with the hotel before arrival.',
    ],
  },
  {
    number: '15',
    title: 'Flight & Arrival Information',
    paragraphs: [
      'Guests may provide flight information during the booking process to assist the hotel in preparing for their arrival.',
    ],
    leadIn: 'Information may include:',
    bullets: [
      'Airline',
      'Flight number',
      'Flight origin',
      'Arrival airport',
      'Arrival date',
      'Arrival time',
    ],
    closingParagraphs: [
      'Providing flight information does not automatically include airport transportation or guarantee any airport service unless such a service has been separately requested and confirmed.',
      'Guests should notify the hotel if their flight details change significantly.',
    ],
  },
  {
    number: '16',
    title: 'Airport Transportation',
    paragraphs: [
      'Airport pickup, drop-off, or other transportation assistance may be available upon request.',
    ],
    leadIn: 'Transportation arrangements are subject to:',
    bullets: [
      'Availability',
      'Advance confirmation',
      'Vehicle availability',
      'Applicable charges',
      'Arrival or departure schedules',
    ],
    closingParagraphs: [
      'Any applicable transportation fee should be confirmed with the hotel before the service is provided.',
    ],
  },
  {
    number: '17',
    title: 'Special Requests',
    paragraphs: [
      'Guests may submit special requests during the reservation process.',
      'We will make reasonable efforts to accommodate such requests; however, special requests are not guaranteed unless specifically confirmed by Q Hotel Dhaka.',
      'Some requests may involve additional fees.',
    ],
  },
  {
    number: '18',
    title: 'Children & Occupancy',
    paragraphs: [
      'Room occupancy must comply with the maximum occupancy permitted for the selected room type.',
      'Children may share accommodation with parents or guardians according to the hotel\'s applicable child and occupancy policies.',
      'Additional beds, cribs, meals, or other services may involve additional charges.',
      'Guests should provide the correct number of adults and children when making a reservation.',
    ],
  },
  {
    number: '19',
    title: 'Security Deposit',
    paragraphs: [
      'A security deposit may be required for hotel stays.',
      'The amount and payment method may depend on the reservation, room type, length of stay, and applicable hotel policy.',
      'The deposit may be used toward unpaid incidental expenses, damage, missing hotel property, or other applicable charges.',
      'Any refundable balance will be processed according to the hotel\'s payment and refund procedures.',
    ],
  },
  {
    number: '20',
    title: 'Damage to Hotel Property',
    paragraphs: [
      'Guests are responsible for reasonable costs resulting from damage to hotel property caused intentionally or negligently by themselves, members of their party, or visitors for whom they are responsible.',
    ],
    leadIn: 'This may include damage to:',
    bullets: [
      'Rooms and suites',
      'Furniture and fixtures',
      'Electronics',
      'Linens',
      'Hotel equipment',
      'Public areas or facilities',
    ],
    closingParagraphs: [
      'Q Hotel Dhaka reserves the right to charge the guest for verified repair, replacement, or additional cleaning costs.',
    ],
  },
  {
    number: '21',
    title: 'Guest Conduct',
    paragraphs: [
      'Guests are expected to behave respectfully and comply with hotel rules, safety requirements, and applicable laws.',
      'Behavior that threatens the safety, comfort, privacy, or enjoyment of other guests, visitors, or hotel employees may result in appropriate action by hotel management, including termination of the stay where reasonably necessary.',
      'Illegal activities are prohibited on hotel premises.',
    ],
  },
  {
    number: '22',
    title: 'Pets',
    paragraphs: [
      'Pets are not permitted at Q Hotel Dhaka, unless otherwise specifically authorized by hotel management or required under applicable accessibility laws.',
      'Guests requiring assistance relating to a service animal should contact the hotel before arrival.',
    ],
  },
  {
    number: '23',
    title: 'Dining & Restaurant Reservations',
    paragraphs: [
      'Restaurant reservations are subject to availability.',
      'Submitting an online restaurant reservation request does not necessarily guarantee a table until confirmation has been provided by the restaurant or hotel team.',
      'Opening hours, menus, pricing, dress requirements, and dining availability may change depending on operational requirements, private events, or special occasions.',
      'Guests should inform the restaurant of relevant dietary requirements when making a reservation.',
    ],
  },
  {
    number: '24',
    title: 'Meetings & Events',
    paragraphs: [
      'Meeting rooms, conference facilities, banquet spaces, and event venues are subject to availability and separate booking confirmation.',
    ],
    leadIn: 'Event bookings may require:',
    bullets: [
      'Advance deposit',
      'Signed agreement',
      'Minimum guest commitment',
      'Catering selection',
      'Equipment charges',
      'Cancellation terms',
      'Final guest count',
      'Additional service charges',
    ],
    closingParagraphs: [
      'Specific terms provided in an event quotation or agreement will take precedence over general website terms for that event.',
    ],
  },
  {
    number: '25',
    title: 'Website Information',
    paragraphs: [
      'Q Hotel Dhaka aims to ensure that information presented on its website is accurate and current.',
      'However, hotel information—including room availability, photographs, amenities, menus, pricing, operating hours, and other content—may occasionally change.',
      'Images are provided for general representation. Individual rooms, views, furnishings, layouts, and facilities may vary.',
    ],
  },
  {
    number: '26',
    title: 'Promotions & Special Offers',
    paragraphs: [],
    leadIn: 'Offers may:',
    bullets: [
      'Have limited availability',
      'Apply only to selected dates or rooms',
      'Require advance payment',
      'Be non-refundable',
      'Have minimum-stay requirements',
      'Be unavailable with other promotions',
    ],
    closingParagraphs: [
      'Terms displayed with a particular promotion form part of the booking conditions for that offer.',
    ],
  },
  {
    number: '27',
    title: 'Third-Party Services',
    paragraphs: [
      'Our website may provide access or links to third-party services such as:',
    ],
    bullets: [
      'Payment providers',
      'Maps',
      'Transportation providers',
      'Online travel agencies',
      'Social media platforms',
      'Other external services',
    ],
    closingParagraphs: [
      'These services may be governed by their own terms and policies.',
      'Q Hotel Dhaka is not responsible for the independent terms, privacy practices, availability, or performance of third-party services.',
    ],
  },
  {
    number: '28',
    title: 'Privacy & Personal Information',
    paragraphs: [
      'Personal information collected through reservations, enquiries, website usage, and hotel services will be handled according to our Privacy Policy.',
      'By providing personal information, guests acknowledge that certain information may need to be processed to manage reservations, payments, communications, hotel operations, and requested services.',
      'Please review our Privacy Policy for further information.',
    ],
  },
  {
    number: '29',
    title: 'Limitation of Liability',
    paragraphs: [
      'To the extent permitted by applicable law, Q Hotel Dhaka will not be responsible for losses resulting from circumstances beyond its reasonable control.',
      'Such circumstances may include severe weather, natural disasters, government restrictions, transportation disruption, utility outages, civil emergencies, telecommunications failures, or other force majeure events.',
      'Nothing in these Terms & Conditions is intended to exclude rights or liabilities that cannot legally be excluded.',
    ],
  },
  {
    number: '30',
    title: 'Changes to These Terms',
    paragraphs: [
      'Q Hotel Dhaka may update these Terms & Conditions periodically to reflect changes to hotel services, booking procedures, policies, technology, or applicable requirements.',
      'The latest version will be published on this page with an updated revision date.',
      'Terms applicable to an existing confirmed reservation will generally be those communicated or accepted in connection with that reservation, subject to applicable law.',
    ],
  },
  {
    number: '31',
    title: 'Questions About These Terms?',
    paragraphs: [
      'If you have questions about a reservation, payment, hotel policy, or these Terms & Conditions, our team will be happy to assist you.',
    ],
    contact: {
      name: 'Q Hotel Dhaka',
      address: 'Plot C-11, Block A, Sector 1, Purbachal Road, Dhaka 1229, Bangladesh',
      phone: '+88-01713377700',
      email: 'info@qhl.com.bd',
    },
  },
]
</script>