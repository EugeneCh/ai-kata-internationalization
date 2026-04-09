import { describe, it, expect } from 'vitest'
import { filterDestinations } from './filterDestinations'
import type { Destination } from '../data/destinations'

const dest = (overrides: Partial<Destination> = {}): Destination => ({
  id: 'test',
  name: 'Tokyo',
  country: 'Japan',
  bestFor: 'foodies',
  pace: 'fast',
  priceFrom: 1200,
  flightTime: '14h',
  blurb: 'A vibrant city',
  itineraryNote: 'Visit temples',
  highlights: ['Shibuya', 'Ramen'],
  ...overrides,
})

const slow = dest({ id: 'slow', name: 'Kyoto', pace: 'slow', highlights: ['Zen gardens'] })
const balanced = dest({ id: 'balanced', name: 'Osaka', pace: 'balanced', highlights: ['Dotonbori'] })
const fast = dest({ id: 'fast', name: 'Tokyo', pace: 'fast', highlights: ['Shibuya', 'Ramen'] })

describe('filterDestinations', () => {
  describe('pace filtering', () => {
    it('returns all when pace is any', () => {
      const result = filterDestinations([slow, balanced, fast], { query: '', pace: 'any' })
      expect(result).toHaveLength(3)
    })

    it('filters to only matching pace', () => {
      const result = filterDestinations([slow, balanced, fast], { query: '', pace: 'slow' })
      expect(result).toEqual([slow])
    })

    it('returns empty when no destinations match pace', () => {
      const result = filterDestinations([slow, balanced], { query: '', pace: 'fast' })
      expect(result).toHaveLength(0)
    })
  })

  describe('query filtering', () => {
    it('returns all when query is empty', () => {
      const result = filterDestinations([slow, fast], { query: '', pace: 'any' })
      expect(result).toHaveLength(2)
    })

    it('returns all when query is whitespace only', () => {
      const result = filterDestinations([slow, fast], { query: '   ', pace: 'any' })
      expect(result).toHaveLength(2)
    })

    it('matches on name (case-insensitive)', () => {
      const result = filterDestinations([slow, fast], { query: 'TOKYO', pace: 'any' })
      expect(result).toEqual([fast])
    })

    it('matches on country', () => {
      const result = filterDestinations([slow, fast], { query: 'japan', pace: 'any' })
      expect(result).toHaveLength(2)
    })

    it('matches on highlights', () => {
      const result = filterDestinations([slow, fast], { query: 'ramen', pace: 'any' })
      expect(result).toEqual([fast])
    })

    it('matches on blurb', () => {
      const d = dest({ blurb: 'Unique sunset views' })
      const result = filterDestinations([d, slow], { query: 'sunset', pace: 'any' })
      expect(result).toEqual([d])
    })

    it('matches on itineraryNote', () => {
      const d = dest({ itineraryNote: 'Book a ryokan' })
      const result = filterDestinations([d, fast], { query: 'ryokan', pace: 'any' })
      expect(result).toEqual([d])
    })

    it('returns empty when nothing matches query', () => {
      const result = filterDestinations([slow, fast], { query: 'zzznomatch', pace: 'any' })
      expect(result).toHaveLength(0)
    })
  })

  describe('getPaceLabel', () => {
    it('uses getPaceLabel result in search', () => {
      const getPaceLabel = (p: string) => (p === 'slow' ? 'leisurely' : p)
      const result = filterDestinations([slow, fast], { query: 'leisurely', pace: 'any', getPaceLabel })
      expect(result).toEqual([slow])
    })

    it('falls back to pace string when getPaceLabel not provided', () => {
      const result = filterDestinations([slow, fast], { query: 'slow', pace: 'any' })
      expect(result).toEqual([slow])
    })
  })

  describe('combined pace and query', () => {
    it('applies both pace and query filters', () => {
      const result = filterDestinations([slow, balanced, fast], { query: 'Kyoto', pace: 'fast' })
      expect(result).toHaveLength(0)
    })

    it('returns match when both pace and query match', () => {
      const result = filterDestinations([slow, fast], { query: 'Kyoto', pace: 'slow' })
      expect(result).toEqual([slow])
    })
  })
})
