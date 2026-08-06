/** A question/answer pair shown in the FAQ accordion (and its JSON-LD) */
export interface FaqItem {
  question: string
  answer: string
}

/** A named group of FaqItems, shown as its own accordion on the /faqs page */
export interface FaqCategory {
  title: string
  items: FaqItem[]
}
