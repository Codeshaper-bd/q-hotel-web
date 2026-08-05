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

export interface GuestDetails {
  firstName: string
  lastName: string
  email: string
  phoneCountryCode: string
  phone: string
  country: string
  note: string
}

/**
 * A completed checkout, handed from /booking to /booking-confirmed.
 * Static/local only — no PMS or payment gateway sits behind it yet.
 */
export interface BookingConfirmation {
  reservationNumber: string
  roomId: string
  guest: GuestDetails
  checkIn: string
  checkOut: string
  roomsCount: number
  guestsCount: number
  roomSubtotal: number
  taxes: number
  totalPrice: number
  taxRatePercent: number
  confirmedAt: string
}
