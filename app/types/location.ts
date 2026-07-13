/** A landmark near the hotel, shown beside the location map */
export interface NearbyAttraction {
  id: string
  name: string
  description: string
  /** Straight-line distance from the hotel, in miles */
  distanceMiles: number
  /** The same distance in kilometres — both are shown, as in the design */
  distanceKm: number
}
