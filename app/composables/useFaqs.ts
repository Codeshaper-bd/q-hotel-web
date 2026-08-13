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
} satisfies Record<string, FaqItem[]>;

export function useFaqs(page: keyof typeof faqs = "home"): FaqItem[] {
  return faqs[page];
}
