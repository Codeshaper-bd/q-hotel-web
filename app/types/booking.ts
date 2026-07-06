/** Rate preference offered on the hero reservation console */
export type BookingRateFilter = 'promo' | 'price-high' | 'price-low'

export interface BookingSearchQuery {
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  rateFilter: BookingRateFilter
}
