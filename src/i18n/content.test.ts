import { describe, it, expect, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>): unknown => {
      if (opts?.returnObjects) {
        if (key === 'destinations.items') return [{ id: 'x', name: 'X', pace: 'slow', priceFrom: 0 }]
        if (key === 'faq.items') return [{ question: 'Q', answer: 'A' }]
        if (key === 'common.months') return [{ value: 'jan', label: 'January' }]
        if (key === 'common.stayLengths') return [{ value: '3nights', label: '3 nights' }]
        return []
      }
      return key
    },
  }),
}))

describe('useLocalizedContent', () => {
  it('returns expected shape from hook', async () => {
    const { useLocalizedContent } = await import('./content')
    const { result } = renderHook(() => useLocalizedContent())
    expect(result.current.destinations).toEqual([{ id: 'x', name: 'X', pace: 'slow', priceFrom: 0 }])
    expect(result.current.faqs).toEqual([{ question: 'Q', answer: 'A' }])
    expect(result.current.months).toEqual([{ value: 'jan', label: 'January' }])
    expect(result.current.stayLengths).toEqual([{ value: '3nights', label: '3 nights' }])
  })

  it('getPaceLabel calls t with the pace key', async () => {
    const { useLocalizedContent } = await import('./content')
    const { result } = renderHook(() => useLocalizedContent())
    expect(result.current.getPaceLabel('slow')).toBe('common.pace.slow')
  })

  it('getPaceBadgeLabel calls t with the badge key', async () => {
    const { useLocalizedContent } = await import('./content')
    const { result } = renderHook(() => useLocalizedContent())
    expect(result.current.getPaceBadgeLabel('fast')).toBe('common.paceBadge.fast')
  })

  it('returns array types for list content', async () => {
    const { useLocalizedContent } = await import('./content')
    const { result } = renderHook(() => useLocalizedContent())
    expect(Array.isArray(result.current.homeSteps)).toBe(true)
    expect(Array.isArray(result.current.guideNotes)).toBe(true)
    expect(Array.isArray(result.current.cityTips)).toBe(true)
    expect(Array.isArray(result.current.guideQuestions)).toBe(true)
    expect(Array.isArray(result.current.quickStartSteps)).toBe(true)
    expect(Array.isArray(result.current.supportTopics)).toBe(true)
    expect(Array.isArray(result.current.bookingTerms)).toBe(true)
    expect(Array.isArray(result.current.privacyParagraphs)).toBe(true)
    expect(Array.isArray(result.current.contactParagraphs)).toBe(true)
  })
})
