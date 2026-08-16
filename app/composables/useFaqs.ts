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
} satisfies Record<string, FaqItem[]>;

export type FaqPage = keyof typeof faqs;

export function useFaqs(page: FaqPage = "home"): FaqItem[] {
  return faqs[page];
}
