# Unit Test Examples

## Test helper (create once at src/test/helpers.tsx)

```tsx
import { render } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import i18n from '../i18n'

export function renderWithI18n(ui: React.ReactElement) {
  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>)
}

export function renderWithRouter(
  ui: React.ReactElement,
  { initialEntries = ['/'] }: { initialEntries?: string[] } = {},
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <I18nextProvider i18n={i18n}>{ui}</I18nextProvider>
    </MemoryRouter>,
  )
}
```

---

## Hero component

```tsx
// src/components/Hero.test.tsx
import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithI18n } from '../test/helpers'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders heading', () => {
    renderWithI18n(<Hero />)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders three metric blocks', () => {
    renderWithI18n(<Hero />)

    const metrics = screen.getAllByRole('strong', { hidden: true })
    expect(metrics).toHaveLength(3)
  })
})
```

---

## DestinationCard component

```tsx
// src/components/DestinationCard.test.tsx
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { renderWithI18n } from '../test/helpers'
import { DestinationCard } from './DestinationCard'
import type { Destination } from '../data/destinations'

const destination: Destination = {
  id: 'lisbon',
  name: 'Lisbon Long Weekend',
  country: 'Portugal',
  bestFor: 'Food lovers',
  pace: 'balanced',
  priceFrom: 980,
  flightTime: '6h 45m from New York',
  blurb: 'Short blurb.',
  itineraryNote: 'Itinerary note.',
  highlights: ['Highlight one'],
}

describe('DestinationCard', () => {
  it('renders destination name and country', () => {
    renderWithI18n(<DestinationCard destination={destination} selected={false} onSelect={() => {}} />)

    expect(screen.getByText('Lisbon Long Weekend')).toBeInTheDocument()
    expect(screen.getByText('Portugal')).toBeInTheDocument()
  })

  it('calls onSelect with the destination id on button click', async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    renderWithI18n(<DestinationCard destination={destination} selected={false} onSelect={onSelect} />)

    await user.click(screen.getByRole('button'))

    expect(onSelect).toHaveBeenCalledWith('lisbon')
  })

  it('shows selected state when selected prop is true', () => {
    renderWithI18n(<DestinationCard destination={destination} selected={true} onSelect={() => {}} />)

    expect(screen.getByRole('article')).toHaveClass('selected')
  })
})
```

---

## SiteHeader (with routing)

```tsx
// src/components/SiteHeader.test.tsx
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { renderWithRouter } from '../test/helpers'
import { SiteHeader } from './SiteHeader'

describe('SiteHeader', () => {
  it('renders navigation links', () => {
    renderWithRouter(<SiteHeader />)

    expect(screen.getByRole('link', { name: /planner/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /travel guides/i })).toBeInTheDocument()
  })

  it('changes language when switcher is used', async () => {
    const user = userEvent.setup()
    renderWithRouter(<SiteHeader />)

    await user.selectOptions(screen.getByRole('combobox'), 'lt')

    expect(screen.getByRole('combobox')).toHaveValue('lt')
  })
})
```

---

## useLocalizedContent hook

```tsx
// src/i18n/content.test.tsx
import { renderHook } from '@testing-library/react'
import { I18nextProvider } from 'react-i18next'
import { describe, it, expect } from 'vitest'
import i18n from './index'
import { useLocalizedContent } from './content'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
)

describe('useLocalizedContent', () => {
  it('returns destinations array', () => {
    const { result } = renderHook(() => useLocalizedContent(), { wrapper })

    expect(result.current.destinations.length).toBeGreaterThan(0)
    expect(result.current.destinations[0]).toHaveProperty('id')
  })

  it('getPaceLabel returns translated label', () => {
    const { result } = renderHook(() => useLocalizedContent(), { wrapper })

    expect(result.current.getPaceLabel('slow')).toBeTruthy()
  })
})
```
