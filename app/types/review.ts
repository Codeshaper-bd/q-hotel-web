/** A guest testimonial shown in the travelers review carousel */
export interface GuestReview {
  id: string
  quote: string
  guestName: string
  /** Star rating out of 5 */
  rating: number
}
