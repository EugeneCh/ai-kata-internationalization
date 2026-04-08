export type BudgetCategory = 'budget' | 'mid-range' | 'luxury'

/**
 * Parses a raw budget string entered by the user.
 * Returns the numeric value, or null if the string is empty or not a finite number.
 */
export function parseBudget(raw: string): number | null {
  const trimmed = raw.trim()
  if (trimmed.length === 0) return null
  const value = Number(trimmed)
  return Number.isFinite(value) && value >= 0 ? value : null
}

/**
 * Returns the total trip budget across all travelers.
 */
export function calculateGroupBudget(perTraveler: number, travelers: number): number {
  if (travelers <= 0) return 0
  return perTraveler * travelers
}

/**
 * Classifies a per-traveler budget amount into a named tier.
 *   budget    → < $1 000
 *   mid-range → $1 000 – $2 499
 *   luxury    → ≥ $2 500
 */
export function categorizeBudget(amount: number): BudgetCategory {
  if (amount < 1000) return 'budget'
  if (amount < 2500) return 'mid-range'
  return 'luxury'
}

/**
 * Returns true when a destination's starting price fits within the per-traveler budget.
 */
export function isAffordable(priceFrom: number, budgetPerTraveler: number): boolean {
  return priceFrom <= budgetPerTraveler
}

/**
 * Calculates how much budget remains after subtracting the starting price.
 * A negative result means the destination exceeds the budget.
 */
export function budgetSurplus(priceFrom: number, budgetPerTraveler: number): number {
  return budgetPerTraveler - priceFrom
}
