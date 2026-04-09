import { describe, it, expect } from 'vitest'
import { validateBookingForm, firstValidationError } from './validateBookingForm'
import type { Destination } from '../data/destinations'

const validValues = {
  departingFrom: 'New York',
  travelMonth: 'June',
  travelers: 2,
  budget: '2000',
  stayLength: '1 week',
  notes: '',
  flexibleDates: false,
}

const destination: Destination = {
  id: 'kyoto',
  name: 'Kyoto',
  country: 'Japan',
  bestFor: 'culture',
  pace: 'slow',
  priceFrom: 1200,
  flightTime: '13h',
  blurb: 'Historic city',
  itineraryNote: 'Visit temples',
  highlights: ['Fushimi Inari'],
}

describe('validateBookingForm', () => {
  it('returns valid for a complete, correct form', () => {
    expect(validateBookingForm(validValues, destination)).toEqual({ valid: true })
  })

  it('returns error when no destination selected', () => {
    const result = validateBookingForm(validValues, null)
    expect(result.valid).toBe(false)
    if (!result.valid) {
      expect(result.errors.some((e) => e.messageKey === 'form.errors.noTrip')).toBe(true)
    }
  })

  it('returns error when departingFrom is empty', () => {
    const result = validateBookingForm({ ...validValues, departingFrom: '' }, destination)
    expect(result.valid).toBe(false)
    if (!result.valid) {
      expect(result.errors.some((e) => e.messageKey === 'form.errors.noDeparture')).toBe(true)
    }
  })

  it('returns error when departingFrom is whitespace only', () => {
    const result = validateBookingForm({ ...validValues, departingFrom: '   ' }, destination)
    expect(result.valid).toBe(false)
  })

  it('returns error when budget is empty', () => {
    const result = validateBookingForm({ ...validValues, budget: '' }, destination)
    expect(result.valid).toBe(false)
    if (!result.valid) {
      expect(result.errors.some((e) => e.messageKey === 'form.errors.noBudget')).toBe(true)
    }
  })

  it('returns invalidBudget error when budget is non-numeric', () => {
    const result = validateBookingForm({ ...validValues, budget: 'abc' }, destination)
    expect(result.valid).toBe(false)
    if (!result.valid) {
      expect(result.errors.some((e) => e.messageKey === 'form.errors.invalidBudget')).toBe(true)
    }
  })

  it('accumulates multiple errors', () => {
    const result = validateBookingForm({ ...validValues, departingFrom: '', budget: '' }, null)
    expect(result.valid).toBe(false)
    if (!result.valid) {
      expect(result.errors.length).toBeGreaterThanOrEqual(2)
    }
  })
})

describe('firstValidationError', () => {
  it('returns null when form is valid', () => {
    expect(firstValidationError(validValues, destination)).toBeNull()
  })

  it('returns the first error when invalid', () => {
    const error = firstValidationError({ ...validValues, departingFrom: '' }, null)
    expect(error).not.toBeNull()
    expect(error?.messageKey).toBe('form.errors.noTrip')
  })
})
