import type { FaqItem } from "~/types/faq";

/**
 * FAQ collections keyed by page, so every page can expose its own set of
 * questions while sharing one typed source. Add new keys (e.g. `rooms`,
 * `dining`) as those pages grow their own FAQ sections.
 */
const faqs = {
  home: [
    {
      question: "What are the check-in and check-out times at Q Hotel Dhaka?",
      answer:
        "Check-in begins at 2:00 PM and check-out is until 12:00 noon. Early check-in and late check-out can be arranged on request, subject to availability.",
    },
    {
      question: "Does Q Hotel Dhaka have in-room Wi-Fi?",
      answer:
        "Yes. Complimentary high-speed Wi-Fi is available in every guest room and throughout the hotel’s public areas.",
    },
    {
      question: "What is the closest airport near Q Hotel Dhaka?",
      answer:
        "Hazrat Shahjalal International Airport (DAC) is the nearest airport, roughly 30 to 45 minutes away by car depending on traffic conditions.",
    },
    {
      question: "Is Q Hotel Dhaka a five-star hotel?",
      answer:
        "Q Hotel Dhaka delivers a premium, full-service hospitality experience with thoughtfully designed rooms, attentive service, dining, wellness, and business facilities.",
    },
    {
      question: "Does Q Hotel Dhaka offer a buffet?",
      answer:
        "Yes. Buffet selections are offered at designated dining times and for selected events. Availability may vary, so please contact the hotel for the current schedule.",
    },
    {
      question: "Is breakfast available at Q Hotel Dhaka?",
      answer:
        "Yes. Fresh local and continental breakfast options are available each morning, with service details provided during booking or at check-in.",
    },
  ],
  rooms: [
    {
      question: "What room and suite types are available at Q Hotel Dhaka?",
      answer:
        "Q Hotel Dhaka offers Standard Double, Deluxe Double, and Deluxe Twin rooms, along with Executive and Presidential suites. Each accommodation is designed for a comfortable stay with its own layout and features.",
    },
    {
      question: "How many guests can stay in each room or suite?",
      answer:
        "Room occupancy varies depending on the room or suite selected. Most accommodations are designed for up to 2 guests, while occupancy limits may vary based on room configuration. Please check the individual room details when booking for the exact guest capacity.",
    },
    {
      question: "What amenities are included with the rooms and suites?",
      answer:
        "Rooms and suites include complimentary Wi-Fi, air conditioning, comfortable bedding, a private bathroom, in-room refreshments, and other thoughtful essentials. Amenities may vary by accommodation type, so please review the individual room details before booking.",
    },
    {
      question: "What property amenities are available at Q Hotel Dhaka?",
      answer:
        "Guests can enjoy the hotel’s dining, wellness, business, and guest-service facilities during their stay. Availability and operating hours may vary, so please contact the hotel for the latest information.",
    },
    {
      question:
        "What is the difference between the Standard Double, Deluxe Double, and Deluxe Twin rooms?",
      answer:
        "The room types differ in bed configuration, space, and selected features. Standard Double and Deluxe Double rooms are arranged around a double bed, while Deluxe Twin rooms provide separate beds. Please compare the room details to choose the best fit for your stay.",
    },
    {
      question: "What is included with the Executive Suite and Presidential Suite?",
      answer:
        "The Executive and Presidential suites provide more spacious accommodation with elevated comfort and additional living space or premium features. The exact inclusions are listed in each suite’s details and can be confirmed during booking.",
    },
  ],
  booking: [
    {
      question: 'How can I book a room at Q Hotel Dhaka?',
      answer: 'You can reserve directly through the "Reserve Now" button or the search console on our website, by calling our reservations desk, or by emailing info@qhl.com.bd. Booking direct guarantees our best available rate.',
    },
    {
      question: 'Can I modify or cancel my reservation?',
      answer: 'Yes. Most rates allow free changes or cancellation up to 48 hours before arrival. Non-refundable promotional rates may carry different terms, which are always shown before you confirm your booking.',
    },
    {
      question: 'Do you require a deposit at the time of booking?',
      answer: 'A valid credit card is required to guarantee your reservation. Depending on the rate and length of stay, a partial or full prepayment may be requested at booking.',
    },
    {
      question: 'Is it cheaper to book directly with the hotel?',
      answer: 'Yes. Booking through our official website or reservations desk guarantees the lowest available rate, along with member perks not offered through third-party channels.',
    },
  ],
  dining: [
    {
      question: 'What dining options are available at Q Hotel Dhaka?',
      answer: 'Q Hotel Dhaka features multiple restaurants and lounges serving local and international cuisine, alongside 24-hour in-room dining for guests.',
    },
    {
      question: 'What are the restaurant opening hours?',
      answer: 'Restaurant opening hours vary by venue and service period. Please contact Q Hotel Dhaka for the latest breakfast, lunch, dinner, and lounge schedules.',
    },
    {
      question: 'Does Q Hotel Dhaka offer buffet dining?',
      answer: 'Yes. Buffet selections are offered at designated dining times and for selected events. Availability may vary, so please contact the hotel for the current schedule.',
    },
  ],
  policies: [
    {
      question: 'What is your pet policy?',
      answer: 'Q Hotel Dhaka does not currently accommodate pets, with the exception of registered service animals. Please contact us in advance if you have specific accessibility needs.',
    },
    {
      question: 'Is smoking permitted on the property?',
      answer: 'Q Hotel Dhaka is a smoke-free property. Designated outdoor smoking areas are available; a cleaning fee applies for smoking inside guest rooms.',
    },
    {
      question: 'What identification do I need to check in?',
      answer: 'A valid government-issued photo ID (passport or national ID) is required at check-in for every registered guest, in line with local hospitality regulations.',
    },
  ],
  location: [
    {
      question: 'What is the closest airport near Q Hotel Dhaka?',
      answer: 'Hazrat Shahjalal International Airport (DAC) is the nearest airport, roughly 30 to 45 minutes away by car depending on traffic conditions.',
    },
    {
      question: 'Does Q Hotel Dhaka have an airport shuttle?',
      answer: 'Yes. A private airport shuttle to and from Hazrat Shahjalal International Airport can be arranged. Please contact our concierge in advance to schedule your transfer.',
    },
    {
      question: 'What are the parking options at the hotel?',
      answer: 'Complimentary on-site parking is available for all guests, with 24-hour security and valet service offered on request.',
    },
  ],
} satisfies Record<string, FaqItem[]>;

export type FaqPage = keyof typeof faqs;

export function useFaqs(page: FaqPage = "home"): FaqItem[] {
  return faqs[page];
}
