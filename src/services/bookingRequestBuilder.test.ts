import { describe, it, expect } from 'vitest'
import { buildBookingRequest, estimateCost, formatRequestSummary } from './bookingRequestBuilder'
import type { Destination } from '../data/destinations'

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

const baseValues = {
  departingFrom: '  New York  ',
  travelMonth: 'June',
  travelers: 2,
  budget: '2000',
  stayLength: '1 week',
  notes: '  vegetarian meals  ',
  flexibleDates: true,
}

describe('buildBookingRequest', () => {
  it('assembles a booking request from valid inputs', () => {
    const req = buildBookingRequest(destination, baseValues)
    expect(req.destination).toBe(destination)
    expect(req.departingFrom).toBe('New York')
    expect(req.travelMonth).toBe('June')
    expect(req.travelers).toBe(2)
    expect(req.budgetPerTraveler).toBe(2000)
    expect(req.totalBudget).toBe(4000)
    expect(req.budgetCategory).toBe('mid-range')
    expect(req.stayLength).toBe('1 week')
    expect(req.flexibleDates).toBe(true)
    expect(req.notes).toBe('vegetarian meals')
    expect(req.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}/)
  })

  it('throws for invalid budget', () => {
    expect(() => buildBookingRequest(destination, { ...baseValues, budget: 'bad' })).toThrow()
  })

  it('trims departingFrom and notes', () => {
    const req = buildBookingRequest(destination, baseValues)
    expect(req.departingFrom).toBe('New York')
    expect(req.notes).toBe('vegetarian meals')
  })

  it('assigns correct budget category for budget tier', () => {
    const req = buildBookingRequest(destination, { ...baseValues, budget: '500' })
    expect(req.budgetCategory).toBe('budget')
  })

  it('assigns correct budget category for luxury tier', () => {
    const req = buildBookingRequest(destination, { ...baseValues, budget: '3000' })
    expect(req.budgetCategory).toBe('luxury')
  })
})

describe('estimateCost', () => {
  it('calculates totals and surplus correctly', () => {
    const req = buildBookingRequest(destination, baseValues)
    const cost = estimateCost(req)
    expect(cost.basePrice).toBe(1200)
    expect(cost.totalBasePrice).toBe(2400)
    expect(cost.budgetPerTraveler).toBe(2000)
    expect(cost.totalBudget).toBe(4000)
    expect(cost.surplus).toBe(800)
    expect(cost.isAffordable).toBe(true)
  })

  it('marks destination as unaffordable when budget is below priceFrom', () => {
    const req = buildBookingRequest(destination, { ...baseValues, budget: '900' })
    const cost = estimateCost(req)
    expect(cost.isAffordable).toBe(false)
    expect(cost.surplus).toBe(-300)
  })
})

describe('formatRequestSummary', () => {
  it('includes destination, origin, and travelers', () => {
    const req = buildBookingRequest(destination, baseValues)
    const summary = formatRequestSummary(req)
    expect(summary).toContain('Kyoto')
    expect(summary).toContain('Japan')
    expect(summary).toContain('New York')
    expect(summary).toContain('2')
  })

  it('includes notes when present', () => {
    const req = buildBookingRequest(destination, baseValues)
    const summary = formatRequestSummary(req)
    expect(summary).toContain('vegetarian meals')
  })

  it('omits notes line when notes is empty', () => {
    const req = buildBookingRequest(destination, { ...baseValues, notes: '' })
    const summary = formatRequestSummary(req)
    expect(summary).not.toContain('Notes:')
  })

  it('shows flexible dates as yes/no', () => {
    const req = buildBookingRequest(destination, baseValues)
    expect(formatRequestSummary(req)).toContain('yes')

    const req2 = buildBookingRequest(destination, { ...baseValues, flexibleDates: false })
    expect(formatRequestSummary(req2)).toContain('no')
  })
})
