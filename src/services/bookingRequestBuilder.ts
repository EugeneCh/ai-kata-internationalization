import type { BookingFormValues } from '../components/BookingForm'
import type { Destination } from '../data/destinations'
import { parseBudget, calculateGroupBudget, categorizeBudget } from '../lib/budgetUtils'

export type BookingRequest = {
  destination: Destination
  departingFrom: string
  travelMonth: string
  travelers: number
  budgetPerTraveler: number
  totalBudget: number
  budgetCategory: 'budget' | 'mid-range' | 'luxury'
  stayLength: string
  flexibleDates: boolean
  notes: string
  createdAt: string
}

export type CostEstimate = {
  basePrice: number
  totalBasePrice: number
  budgetPerTraveler: number
  totalBudget: number
  surplus: number
  isAffordable: boolean
}

/**
 * Assembles a structured booking request from the selected destination and form values.
 * Throws if budget cannot be parsed — callers should validate with validateBookingForm first.
 */
export function buildBookingRequest(
  destination: Destination,
  values: BookingFormValues,
): BookingRequest {
  const budgetPerTraveler = parseBudget(values.budget)

  if (budgetPerTraveler === null) {
    throw new Error(`Invalid budget value: "${values.budget}"`)
  }

  return {
    destination,
    departingFrom: values.departingFrom.trim(),
    travelMonth: values.travelMonth,
    travelers: values.travelers,
    budgetPerTraveler,
    totalBudget: calculateGroupBudget(budgetPerTraveler, values.travelers),
    budgetCategory: categorizeBudget(budgetPerTraveler),
    stayLength: values.stayLength,
    flexibleDates: values.flexibleDates,
    notes: values.notes.trim(),
    createdAt: new Date().toISOString(),
  }
}

/**
 * Estimates costs for a booking request, showing whether the chosen destination
 * fits within the traveler's budget.
 */
export function estimateCost(request: BookingRequest): CostEstimate {
  const basePrice = request.destination.priceFrom
  const totalBasePrice = basePrice * request.travelers
  const surplus = request.budgetPerTraveler - basePrice

  return {
    basePrice,
    totalBasePrice,
    budgetPerTraveler: request.budgetPerTraveler,
    totalBudget: request.totalBudget,
    surplus,
    isAffordable: surplus >= 0,
  }
}

/**
 * Formats a booking request as a plain-text summary string.
 * Useful for generating copy-pasteable briefs or debug output.
 */
export function formatRequestSummary(request: BookingRequest): string {
  const lines = [
    `Destination: ${request.destination.name} (${request.destination.country})`,
    `Departing from: ${request.departingFrom}`,
    `Travel month: ${request.travelMonth}`,
    `Travelers: ${request.travelers}`,
    `Budget: $${request.budgetPerTraveler.toLocaleString()} per traveler — $${request.totalBudget.toLocaleString()} total (${request.budgetCategory})`,
    `Stay: ${request.stayLength}`,
    `Flexible dates: ${request.flexibleDates ? 'yes' : 'no'}`,
  ]

  if (request.notes) {
    lines.push(`Notes: ${request.notes}`)
  }

  return lines.join('\n')
}
