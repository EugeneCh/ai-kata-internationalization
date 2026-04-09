import { describe, it, expect } from 'vitest'
import { recommendDestinations, getTopDestinations } from './tripRecommender'
import type { Destination } from '../data/destinations'

const makeD = (id: string, pace: Destination['pace'], priceFrom: number): Destination => ({
  id,
  name: id,
  country: 'Country',
  bestFor: 'testing',
  pace,
  priceFrom,
  flightTime: '10h',
  blurb: '',
  itineraryNote: '',
  highlights: [],
})

const slowCheap = makeD('slow-cheap', 'slow', 500)
const balancedMid = makeD('balanced-mid', 'balanced', 1000)
const fastExpensive = makeD('fast-expensive', 'fast', 2000)

describe('recommendDestinations', () => {
  it('returns scored destinations for all inputs', () => {
    const results = recommendDestinations([slowCheap, balancedMid, fastExpensive], {
      budget: 1500,
      pace: 'any',
    })
    expect(results).toHaveLength(3)
    results.forEach((r) => {
      expect(r).toHaveProperty('score')
      expect(r).toHaveProperty('affordable')
      expect(r).toHaveProperty('paceMatch')
    })
  })

  it('ranks affordable destinations before unaffordable ones', () => {
    const results = recommendDestinations([fastExpensive, slowCheap], { budget: 1000, pace: 'any' })
    expect(results[0].affordable).toBe(true)
    expect(results[1].affordable).toBe(false)
  })

  it('respects maxResults cap', () => {
    const results = recommendDestinations([slowCheap, balancedMid, fastExpensive], {
      budget: 2000,
      pace: 'any',
      maxResults: 2,
    })
    expect(results).toHaveLength(2)
  })

  it('exact pace match scores higher than adjacent pace', () => {
    const results = recommendDestinations([slowCheap, balancedMid], { budget: 2000, pace: 'slow' })
    const slowResult = results.find((r) => r.destination.id === 'slow-cheap')!
    const balancedResult = results.find((r) => r.destination.id === 'balanced-mid')!
    expect(slowResult.score).toBeGreaterThan(balancedResult.score)
  })

  it('pace any gives paceMatch=true for all destinations', () => {
    const results = recommendDestinations([slowCheap], { budget: 2000, pace: 'any' })
    expect(results[0].paceMatch).toBe(true)
  })

  it('surplus >= 1000 adds 3 bonus points', () => {
    // budget 2000, priceFrom 500 → surplus 1500
    const results = recommendDestinations([slowCheap], { budget: 2000, pace: 'any' })
    // paceScore('slow','any') = 1, bonus = 3 → total 4
    expect(results[0].score).toBe(4)
  })

  it('surplus >= 500 adds 2 bonus points', () => {
    // budget 1000, priceFrom 400 → surplus 600
    const d = makeD('mid-surplus', 'slow', 400)
    const results = recommendDestinations([d], { budget: 1000, pace: 'any' })
    // paceScore = 1, bonus = 2 → total 3
    expect(results[0].score).toBe(3)
  })

  it('affordable with surplus < 500 adds 1 bonus point', () => {
    // budget 600, priceFrom 400 → surplus 200
    const d = makeD('small-surplus', 'slow', 400)
    const results = recommendDestinations([d], { budget: 600, pace: 'any' })
    // paceScore = 1, bonus = 1 → total 2
    expect(results[0].score).toBe(2)
  })

  it('handles empty destination list', () => {
    expect(recommendDestinations([], { budget: 1000, pace: 'any' })).toEqual([])
  })
})

describe('getTopDestinations', () => {
  it('returns destination objects in ranked order', () => {
    const dests = getTopDestinations([fastExpensive, slowCheap, balancedMid], {
      budget: 1500,
      pace: 'slow',
    })
    expect(dests[0]).toBe(slowCheap)
  })

  it('respects maxResults', () => {
    const dests = getTopDestinations([slowCheap, balancedMid, fastExpensive], {
      budget: 3000,
      pace: 'any',
      maxResults: 1,
    })
    expect(dests).toHaveLength(1)
  })
})
