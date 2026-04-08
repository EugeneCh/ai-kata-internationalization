import type { Destination, TravelPace } from '../data/destinations'
import { isAffordable } from '../lib/budgetUtils'

export type RecommendationOptions = {
  budget: number
  pace: TravelPace | 'any'
  maxResults?: number
}

export type ScoredDestination = {
  destination: Destination
  score: number
  affordable: boolean
  paceMatch: boolean
}

const PACE_ORDER: Record<TravelPace, number> = { slow: 0, balanced: 1, fast: 2 }

/**
 * Scores how closely a destination's pace matches the preferred pace.
 * Exact match → 2, one step away → 1, two steps away → 0.
 */
function paceScore(destinationPace: TravelPace, preferredPace: TravelPace | 'any'): number {
  if (preferredPace === 'any') return 1
  const distance = Math.abs(PACE_ORDER[destinationPace] - PACE_ORDER[preferredPace])
  return Math.max(0, 2 - distance)
}

/**
 * Scores a destination based on budget fit and pace preference.
 * Budget within range contributes up to 3 points; pace match up to 2 points.
 */
function scoreDestination(destination: Destination, options: RecommendationOptions): ScoredDestination {
  const affordable = isAffordable(destination.priceFrom, options.budget)
  const paceMatch = options.pace === 'any' || destination.pace === options.pace

  let score = 0
  score += paceScore(destination.pace, options.pace) // 0–2
  if (affordable) {
    const surplus = options.budget - destination.priceFrom
    // Up to 3 bonus points based on how comfortably affordable it is
    score += surplus >= 1000 ? 3 : surplus >= 500 ? 2 : 1
  }

  return { destination, score, affordable, paceMatch }
}

/**
 * Returns destinations ranked by how well they match the budget and pace preference.
 * Affordable destinations are always ranked above unaffordable ones.
 * Results are capped at `maxResults` (default: all).
 */
export function recommendDestinations(
  destinations: Destination[],
  options: RecommendationOptions,
): ScoredDestination[] {
  const scored = destinations.map((destination) => scoreDestination(destination, options))

  scored.sort((a, b) => {
    if (a.affordable !== b.affordable) return a.affordable ? -1 : 1
    return b.score - a.score
  })

  const limit = options.maxResults ?? scored.length
  return scored.slice(0, limit)
}

/**
 * Returns only the destination objects (without scores), in ranked order.
 */
export function getTopDestinations(
  destinations: Destination[],
  options: RecommendationOptions,
): Destination[] {
  return recommendDestinations(destinations, options).map((item) => item.destination)
}
