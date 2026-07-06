export interface BookingSearchQuery {
  /** ISO date (YYYY-MM-DD) */
  checkIn: string
  /** ISO date (YYYY-MM-DD) */
  checkOut: string
  rooms: number
  adults: number
  children: number
  /** Corporate/promotional code, empty when not used */
  promoCode: string
}
