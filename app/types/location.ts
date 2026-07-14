/** A geographic point, as [latitude, longitude] */
export type LatLngTuple = [number, number]

/** A landmark near the hotel, shown beside the location map */
export interface NearbyAttraction {
  id: string
  name: string
  description: string
  /** Straight-line distance from the hotel, in miles */
  distanceMiles: number
  /** The same distance in kilometres — both are shown, as in the design */
  distanceKm: number
  /** Pin position on the location map */
  coordinates: LatLngTuple
}

/** The hotel itself: the map's anchor and its highlighted card */
export interface HotelLocation {
  name: string
  address: string
  coordinates: LatLngTuple
  /** Deep link to the hotel's Google Maps place page */
  directionsUrl: string
}
