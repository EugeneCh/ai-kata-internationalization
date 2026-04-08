import { describe, it, expect } from 'vitest'
import {
  parseBudget,
  calculateGroupBudget,
  categorizeBudget,
  isAffordable,
  budgetSurplus,
} from './budgetUtils'

describe('parseBudget', () => {
  it('returns the numeric value for a valid string', () => {
    expect(parseBudget('1800')).toBe(1800)
  })

  it('handles strings with surrounding whitespace', () => {
    expect(parseBudget('  1800  ')).toBe(1800)
  })

  it('returns null for an empty string', () => {
    expect(parseBudget('')).toBeNull()
  })

  it('returns null for a whitespace-only string', () => {
    expect(parseBudget('   ')).toBeNull()
  })

  it('returns null for non-numeric input', () => {
    expect(parseBudget('abc')).toBeNull()
  })

  it('returns null for NaN-producing input', () => {
    expect(parseBudget('1,800')).toBeNull()
  })

  it('accepts zero', () => {
    expect(parseBudget('0')).toBe(0)
  })

  it('returns null for negative values', () => {
    expect(parseBudget('-100')).toBeNull()
  })

  it('accepts decimal values', () => {
    expect(parseBudget('1800.50')).toBe(1800.5)
  })
})

describe('calculateGroupBudget', () => {
  it('multiplies per-traveler budget by traveler count', () => {
    expect(calculateGroupBudget(1800, 2)).toBe(3600)
  })

  it('returns zero for zero travelers', () => {
    expect(calculateGroupBudget(1800, 0)).toBe(0)
  })

  it('returns zero for negative traveler count', () => {
    expect(calculateGroupBudget(1800, -1)).toBe(0)
  })

  it('works for a single traveler', () => {
    expect(calculateGroupBudget(1800, 1)).toBe(1800)
  })
})

describe('categorizeBudget', () => {
  it('classifies amounts below 1000 as budget', () => {
    expect(categorizeBudget(0)).toBe('budget')
    expect(categorizeBudget(500)).toBe('budget')
    expect(categorizeBudget(999)).toBe('budget')
  })

  it('classifies 1000 as mid-range (lower boundary)', () => {
    expect(categorizeBudget(1000)).toBe('mid-range')
  })

  it('classifies amounts between 1000 and 2499 as mid-range', () => {
    expect(categorizeBudget(1500)).toBe('mid-range')
    expect(categorizeBudget(2499)).toBe('mid-range')
  })

  it('classifies 2500 as luxury (lower boundary)', () => {
    expect(categorizeBudget(2500)).toBe('luxury')
  })

  it('classifies large amounts as luxury', () => {
    expect(categorizeBudget(5000)).toBe('luxury')
  })
})

describe('isAffordable', () => {
  it('returns true when price equals budget exactly', () => {
    expect(isAffordable(1000, 1000)).toBe(true)
  })

  it('returns true when price is below budget', () => {
    expect(isAffordable(980, 1800)).toBe(true)
  })

  it('returns false when price exceeds budget', () => {
    expect(isAffordable(2500, 1800)).toBe(false)
  })
})

describe('budgetSurplus', () => {
  it('returns positive surplus when budget exceeds price', () => {
    expect(budgetSurplus(980, 1800)).toBe(820)
  })

  it('returns zero when budget exactly matches price', () => {
    expect(budgetSurplus(1800, 1800)).toBe(0)
  })

  it('returns negative value when price exceeds budget', () => {
    expect(budgetSurplus(2500, 1800)).toBe(-700)
  })
})
