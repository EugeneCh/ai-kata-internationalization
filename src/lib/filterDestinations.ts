import type { Destination, TravelPace } from '../data/destinations'

export type FilterOptions = {
  query: string
  pace: 'any' | TravelPace
  /** Extra searchable text per destination (e.g. translated pace label). */
  getPaceLabel?: (pace: TravelPace) => string
}

/**
 * Returns destinations that match the given query string and pace filter.
 * Matching is case-insensitive and searches across name, country, bestFor,
 * blurb, itineraryNote, highlights, and optional pace label.
 */
export function filterDestinations(
  destinations: Destination[],
  options: FilterOptions,
): Destination[] {
  const { query, pace, getPaceLabel } = options
  const normalizedQuery = query.trim().toLowerCase()

  return destinations.filter((destination) => {
    if (pace !== 'any' && destination.pace !== pace) {
      return false
    }

    if (normalizedQuery.length === 0) {
      return true
    }

    const searchFields = [
      destination.name,
      destination.country,
      destination.bestFor,
      destination.blurb,
      destination.itineraryNote,
      getPaceLabel ? getPaceLabel(destination.pace) : destination.pace,
      ...destination.highlights,
    ]

    return searchFields.join(' ').toLowerCase().includes(normalizedQuery)
  })
}
