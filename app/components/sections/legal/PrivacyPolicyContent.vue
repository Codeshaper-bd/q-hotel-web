<template>
  <!--
    Editorial privacy document: last-updated line, intro, then numbered policy
    sections with refined bullet lists. Kept deliberately card-free so the
    page reads as one continuous, typeset document on the warm paper ground.
  -->
  <BaseSection
    tone="paper"
    spacing="sm"
    container-size="md"
    aria-labelledby="privacy-policy-document"
  >
    <div class="mx-auto max-w-[880px]">
      <p
        id="privacy-policy-document"
        class="text-xs font-medium uppercase tracking-[0.16em] text-ink sm:text-sm"
      >
        Last Updated: August 2026
      </p>

      <p class="mt-10 text-base font-normal leading-[1.7] text-[#373737] sm:mt-12">
        At Q Hotel Dhaka, operated by Quality Hospitality Limited, we respect
        your privacy and are committed to protecting the personal information
        you share with us. This Privacy Policy explains how we collect, use,
        store, disclose, and protect your information when you visit our
        website, make a reservation, stay at our hotel, use our facilities,
        contact us, or interact with our services.
      </p>

      <p class="mt-4 text-base font-normal leading-[1.7] text-[#373737]">
        By using our website or providing personal information to us, you
        acknowledge the practices described in this Privacy Policy.
      </p>

      <div>
        <section
          v-for="section in policySections"
          :key="section.number"
          :aria-labelledby="`policy-${section.number}`"
          class="pt-[60px]"
        >
          <h2
            :id="`policy-${section.number}`"
            class="font-display text-2xl font-medium text-ink sm:text-3xl"
          >
            {{ section.number }}. {{ section.title }}
          </h2>

          <div class="mt-6 space-y-4">
            <p
              v-for="paragraph in section.paragraphs"
              :key="paragraph"
              class="text-base font-normal leading-[1.7] text-[#373737]"
            >
              {{ paragraph }}
            </p>

            <p
              v-if="section.leadIn"
              class="text-base font-normal leading-[1.7] text-[#373737]"
            >
              {{ section.leadIn }}
            </p>

            <ul
              v-if="section.bullets?.length"
              class="list-disc space-y-2.5 pl-5 text-base font-normal leading-[1.7] text-[#373737] marker:text-[#373737]"
            >
              <li v-for="item in section.bullets" :key="item">
                {{ item }}
              </li>
            </ul>

            <div v-for="subsection in section.subsections" :key="subsection.title">
              <h3
                class="pt-4 font-display text-xl font-medium text-ink sm:text-[22px]"
              >
                {{ subsection.title }}
              </h3>

              <ul
                class="mt-4 list-disc space-y-2.5 pl-5 text-base font-normal leading-[1.7] text-[#373737] marker:text-[#373737]"
              >
                <li v-for="item in subsection.items" :key="item">
                  {{ item }}
                </li>
              </ul>

              <p
                v-if="subsection.note"
                class="mt-4 text-base font-normal leading-[1.7] text-[#373737]"
              >
                {{ subsection.note }}
              </p>
            </div>

            <p
              v-for="paragraph in section.closingParagraphs"
              :key="paragraph"
              class="text-base font-normal leading-[1.7] text-[#373737]"
            >
              {{ paragraph }}
            </p>

            <div
              v-if="section.contact"
              class="space-y-3 pt-2 text-base font-normal leading-[1.7] text-[#373737]"
            >
              <p class="font-medium text-[#373737]">{{ section.contact.name }}</p>
              <p>{{ section.contact.address }}</p>
              <p>{{ section.contact.addressNote }}</p>
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
interface PolicySubsection {
  title: string
  items: string[]
  note?: string
}

interface PolicySection {
  number: string
  title: string
  paragraphs: string[]
  leadIn?: string
  bullets?: string[]
  closingParagraphs?: string[]
  subsections?: PolicySubsection[]
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
    title: 'Information We Collect',
    paragraphs: [
      'We may collect personal information directly from you when you make a reservation, submit a form, contact us, use hotel services, reserve a restaurant or event space, or communicate with our team.',
    ],
    leadIn: 'This information may include:',
    subsections: [
      {
        title: 'Personal and Contact Information',
        items: [
          'Full name',
          'Email address',
          'Phone number',
          'Country or region',
          'Residential or billing address, where required',
          'Government-issued identification or passport information when required for check-in or legal purposes',
        ],
      },
      {
        title: 'Reservation and Stay Information',
        items: [
          'Check-in and check-out dates',
          'Room or suite selection',
          'Number of guests',
          'Bed preferences',
          'Smoking preference',
          'Accessibility requirements',
          'Rollaway bed or baby crib requests',
          'Early check-in or late check-out requests',
          'Special requests and guest preferences',
        ],
      },
      {
        title: 'Flight and Arrival Information',
        items: [
          'Airline',
          'Flight number',
          'Arrival date',
          'Arrival time',
          'Arrival airport',
          'Flight origin',
          'Airport assistance or transportation-related requests',
        ],
      },
      {
        title: 'Payment and Transaction Information',
        items: [
          'Payment method',
          'Transaction status',
          'Billing information',
          'Payment confirmation or transaction reference',
        ],
        note: 'Where payments are processed through an external payment provider, payment-card details may be collected and processed directly by that provider rather than stored by Q Hotel Dhaka.',
      },
      {
        title: 'Dining and Event Information',
        items: [
          'Restaurant reservation details',
          'Number of guests',
          'Dining preferences',
          'Dietary requirements or allergies voluntarily provided by you',
          'Meeting or event dates',
          'Event type',
          'Venue requirements',
          'Expected guest count',
        ],
      },
    ],
  },
  {
    number: '2',
    title: 'Information Collected Automatically',
    paragraphs: [],
    leadIn:
      'When you use our website, certain technical information may be collected automatically, including:',
    bullets: [
      'IP address',
      'Browser type and version',
      'Device type',
      'Operating system',
      'Pages visited',
      'Date and time of access',
      'Referring pages',
      'Website interaction data',
      'Approximate location derived from IP address',
      'Cookie and similar technology identifiers',
    ],
    closingParagraphs: [
      'We use this information to operate, secure, analyze, and improve our website and digital services.',
    ],
  },
  {
    number: '3',
    title: 'How We Use Your Information',
    paragraphs: [],
    leadIn: 'We may use your personal information to:',
    bullets: [
      'Process, manage, modify, or confirm hotel reservations',
      'Provide accommodation and requested guest services',
      'Process payments and maintain transaction records',
      'Coordinate check-in, check-out, and arrival arrangements',
      'Arrange airport assistance where requested',
      'Manage room preferences and accessibility requests',
      'Process restaurant and dining reservations',
      'Manage meetings, conferences, banquets, and event enquiries',
      'Respond to questions, feedback, requests, and complaints',
      'Send reservation confirmations, invoices, and service communications',
      'Provide customer support',
      'Improve our rooms, facilities, services, and website experience',
      'Maintain safety and security at the hotel',
      'Detect or prevent fraud, misuse, or unauthorized activity',
      'Maintain accounting, tax, regulatory, and operational records',
      'Send promotional communications where you have consented or where permitted by applicable law',
    ],
  },
  {
    number: '4',
    title: 'Reservations Made Through Third-Party Platforms',
    paragraphs: [
      'You may reserve Q Hotel Dhaka through third-party booking platforms such as online travel agencies. Those platforms may independently collect and process your information according to their own privacy policies.',
      'When they provide reservation information to Q Hotel Dhaka, we use that information to manage your booking, provide your stay, communicate with you, and fulfill related hospitality services.',
      'Third-party booking providers operate independently from Q Hotel Dhaka, and we encourage you to review their privacy policies before providing personal information.',
    ],
  },
  {
    number: '5',
    title: 'Payment Processing',
    paragraphs: [
      'Online payments may be processed through approved third-party payment gateways or financial institutions.',
    ],
    leadIn:
      'Depending on the payment method selected, these providers may collect information such as:',
    bullets: [
      'Cardholder name',
      'Card or account details',
      'Billing information',
      'Transaction identifiers',
      'Authentication information',
    ],
    closingParagraphs: [
      'Q Hotel Dhaka does not necessarily receive or retain complete payment-card information processed directly by external payment providers.',
      'Payment providers are responsible for handling payment information according to their own security and privacy requirements.',
    ],
  },
  {
    number: '6',
    title: 'Cookies and Similar Technologies',
    paragraphs: [
      'Our website may use cookies and similar technologies to improve functionality and understand how visitors use our website.',
    ],
    leadIn: 'Cookies may be used for:',
    bullets: [
      'Remembering website preferences',
      'Maintaining booking sessions',
      'Improving website performance',
      'Measuring website traffic and usage',
      'Security and fraud prevention',
      'Analytics',
      'Marketing or advertising, where applicable',
    ],
    closingParagraphs: [
      'You may control certain cookies through your browser settings or through a cookie preference tool where available.',
      'Disabling certain cookies may affect some website functionality.',
    ],
  },
  {
    number: '7',
    title: 'How We Share Information',
    paragraphs: ['We do not sell your personal information.'],
    leadIn: 'We may share information only where reasonably necessary with:',
    bullets: [
      'Quality Hospitality Limited and authorized hotel personnel',
      'Payment processors and financial institutions',
      'Reservation and booking technology providers',
      'Online travel agencies through which you make a booking',
      'IT, hosting, website, cloud, and cybersecurity service providers',
      'Email, messaging, and customer-support providers',
      'Airport transportation or related service providers where requested',
      'Event, catering, or other service partners where necessary',
      'Professional advisers, auditors, insurers, or legal advisers',
      'Government, regulatory, law-enforcement, or judicial authorities where required by applicable law',
    ],
    closingParagraphs: [
      'Service providers are expected to use personal information only for legitimate service-related purposes and subject to applicable contractual and legal requirements.',
    ],
  },
  {
    number: '8',
    title: 'Marketing Communications',
    paragraphs: [
      'If you subscribe to Q Hotel Dhaka offers, promotions, newsletters, or other marketing communications, we may use your contact details to send relevant updates.',
    ],
    leadIn: 'You may unsubscribe at any time by:',
    bullets: ['Using the unsubscribe option included in marketing emails, or', 'Contacting us directly'],
    closingParagraphs: [
      'Service-related communications concerning an active reservation, payment, stay, or enquiry may still be sent even if you opt out of promotional communications.',
    ],
  },
  {
    number: '9',
    title: 'CCTV and Hotel Security',
    paragraphs: [
      'For guest, visitor, employee, and property security, CCTV surveillance may be used in appropriate public and operational areas of the hotel.',
    ],
    leadIn: 'CCTV footage may be used for:',
    bullets: [
      'Security monitoring',
      'Incident investigation',
      'Fraud prevention',
      'Protection of persons and property',
      'Compliance with lawful requests',
    ],
    closingParagraphs: [
      'CCTV is not intended for areas where individuals reasonably expect a high degree of privacy.',
    ],
  },
  {
    number: '10',
    title: 'Data Retention',
    paragraphs: [
      'We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, including:',
    ],
    bullets: [
      'Providing hotel and reservation services',
      'Maintaining transaction and accounting records',
      'Resolving disputes',
      'Managing customer-service matters',
      'Meeting legal, regulatory, tax, and audit requirements',
      'Protecting legitimate business and security interests',
    ],
    closingParagraphs: [
      'Retention periods may vary depending on the type of information and applicable requirements.',
    ],
  },
  {
    number: '11',
    title: 'Data Security',
    paragraphs: [
      'We use reasonable administrative, organizational, and technical measures designed to protect personal information against:',
    ],
    bullets: ['Unauthorized access', 'Misuse', 'Loss', 'Alteration', 'Disclosure', 'Destruction'],
    closingParagraphs: [
      'However, no website, electronic communication, or information-storage system can be guaranteed to be completely secure.',
      'Guests should avoid sending highly sensitive information through unsecured email or other unprotected communication channels.',
    ],
  },
  {
    number: '12',
    title: 'International Data Transfers',
    paragraphs: [
      'Some service providers used by Q Hotel Dhaka may operate or store information outside Bangladesh.',
      'Where personal information is transferred internationally, we seek to use appropriate safeguards and reputable service providers in accordance with applicable requirements.',
    ],
  },
  {
    number: '13',
    title: 'Your Privacy Choices and Rights',
    paragraphs: [],
    leadIn: 'Subject to applicable law, you may request to:',
    bullets: [
      'Access personal information we hold about you',
      'Correct inaccurate or incomplete information',
      'Update your contact details',
      'Withdraw certain consents',
      'Opt out of marketing communications',
      'Request deletion of information where legally permitted',
      'Raise questions or concerns about how your information is handled',
    ],
    closingParagraphs: [
      'Certain information may need to be retained where required for contractual, legal, security, accounting, or regulatory reasons.',
      'To submit a privacy request, please contact us using the details below.',
    ],
  },
  {
    number: '14',
    title: "Children's Privacy",
    paragraphs: [
      'Our website and services are intended primarily for adults arranging accommodation or hotel services.',
      'Information relating to children may be provided by a parent, guardian, or responsible adult where necessary for a reservation, such as guest numbers, age-related accommodation needs, or baby-crib requests.',
      "We do not knowingly use children's information for independent marketing purposes.",
    ],
  },
  {
    number: '15',
    title: 'Third-Party Websites',
    paragraphs: [
      'Our website may contain links to third-party websites, maps, booking platforms, payment providers, social-media services, or other external services.',
      'Q Hotel Dhaka is not responsible for the privacy practices, security, or content of third-party websites.',
      'Please review the privacy policy of any third-party service before providing personal information.',
    ],
  },
  {
    number: '16',
    title: 'Changes to This Privacy Policy',
    paragraphs: [
      'We may update this Privacy Policy periodically to reflect changes in:',
    ],
    bullets: [
      'Our services',
      'Website functionality',
      'Technology',
      'Business practices',
      'Legal or regulatory requirements',
    ],
    closingParagraphs: [
      'The updated version will be published on this page with a revised Last Updated date.',
      'We encourage visitors to review this page periodically.',
    ],
  },
  {
    number: '17',
    title: 'Contact Us',
    paragraphs: [
      'If you have questions, concerns, or requests relating to this Privacy Policy or your personal information, please contact:',
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