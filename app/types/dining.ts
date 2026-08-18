import type { ImageAsset } from './media'

/** A dining outlet shown in the pinned, scroll-driven dining showcase */
export interface DiningVenue {
  id: string
  name: string
  description: string
  /** Full-bleed, static background photograph for the outlet's slide */
  poster: ImageAsset
}

/** Reservation payload emitted by RestaurantReservationModal on submit */
export interface RestaurantReservationData {
  date: string
  time: string
  guests: string
  name: string
  phone: string
  email: string
  specialRequest: string
}

/** Preformatted confirmation summary shown by ReservationSubmittedModal */
export interface ReservationDetails {
  date: string
  time: string
  guests: string | number
  restaurant: string
  referenceId: string
}
