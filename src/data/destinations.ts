export type TravelPace = 'slow' | 'balanced' | 'fast'

export type Destination = {
  id: string
  name: string
  country: string
  bestFor: string
  pace: TravelPace
  priceFrom: number
  flightTime: string
  blurb: string
  itineraryNote: string
  highlights: string[]
}
