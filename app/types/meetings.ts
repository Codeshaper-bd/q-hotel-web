/** Reservation payload emitted by EventReservationModal on submit */
export interface EventReservationData {
  date: string
  time: string
  guests: string
  eventType: string
  email: string
  venue: string
  name: string
  phone: string
  specialRequest: string
}

/** Preformatted confirmation summary shown by EventReservationSubmittedModal */
export interface EventReservationDetails {
  date: string
  time: string
  guests: string | number
  venue: string
  eventType: string
  referenceId: string
}
