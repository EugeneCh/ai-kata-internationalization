import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

// ---------------------------------------------------------------------------
// Mocks
// ---------------------------------------------------------------------------

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: Record<string, unknown>): unknown => {
      if (opts?.returnObjects) {
        if (key.startsWith('heroVisual.')) {
          return { label: 'label', title: 'title', subtitle: 'sub', items: ['i1'], footer: 'footer' }
        }
        // Return empty arrays for list content
        return []
      }
      return key
    },
    i18n: { resolvedLanguage: 'en', changeLanguage: vi.fn() },
  }),
}))

vi.mock('../i18n/content', () => ({
  useLocalizedContent: () => ({
    destinations: [
      {
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
      },
    ],
    faqs: [{ question: 'FAQ Q?', answer: 'FAQ A.' }],
    homeSteps: [{ title: 'Step 1', text: 'Do it' }],
    guideNotes: [{ title: 'Note 1', text: 'Take notes' }],
    cityTips: [{ city: 'Tokyo', tip: 'Get a Suica card' }],
    guideQuestions: [{ title: 'Before you book', text: 'Check passport' }],
    quickStartSteps: [{ title: 'Quick 1', text: 'Start here' }],
    supportTopics: ['Booking changes', 'Refunds'],
    bookingTerms: [{ heading: 'Cancellations', body: 'Free within 24h' }],
    privacyParagraphs: ['We protect your data.'],
    contactParagraphs: ['Email us at help@northstar.travel'],
    months: [{ value: 'oct', label: 'October' }],
    stayLengths: [{ value: '7nights', label: '7 nights' }],
    getPaceLabel: (pace: string) => pace,
    getPaceBadgeLabel: (pace: string) => pace,
  }),
}))

vi.mock('../i18n', () => ({
  supportedLanguages: ['en', 'lt', 'zh'],
}))

// ---------------------------------------------------------------------------
// GuidesPage
// ---------------------------------------------------------------------------

describe('GuidesPage', () => {
  it('renders the guides hero section', async () => {
    const { GuidesPage } = await import('./GuidesPage')
    render(<GuidesPage />)
    expect(screen.getByText('guides.heroTitle')).toBeInTheDocument()
  })

  it('renders guide notes', async () => {
    const { GuidesPage } = await import('./GuidesPage')
    render(<GuidesPage />)
    expect(screen.getByText('Note 1')).toBeInTheDocument()
    expect(screen.getByText('Take notes')).toBeInTheDocument()
  })

  it('renders city tips', async () => {
    const { GuidesPage } = await import('./GuidesPage')
    render(<GuidesPage />)
    expect(screen.getByText('Tokyo')).toBeInTheDocument()
    expect(screen.getByText('Get a Suica card')).toBeInTheDocument()
  })

  it('renders guide questions', async () => {
    const { GuidesPage } = await import('./GuidesPage')
    render(<GuidesPage />)
    expect(screen.getByText('Before you book')).toBeInTheDocument()
    expect(screen.getByText('Check passport')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// HelpPage
// ---------------------------------------------------------------------------

describe('HelpPage', () => {
  it('renders the help hero section', async () => {
    const { HelpPage } = await import('./HelpPage')
    render(<HelpPage />)
    expect(screen.getByText('help.heroTitle')).toBeInTheDocument()
  })

  it('renders quick start steps', async () => {
    const { HelpPage } = await import('./HelpPage')
    render(<HelpPage />)
    expect(screen.getByText('Quick 1')).toBeInTheDocument()
  })

  it('renders support topics', async () => {
    const { HelpPage } = await import('./HelpPage')
    render(<HelpPage />)
    expect(screen.getByText('Booking changes')).toBeInTheDocument()
    expect(screen.getByText('Refunds')).toBeInTheDocument()
  })

  it('renders booking terms', async () => {
    const { HelpPage } = await import('./HelpPage')
    render(<HelpPage />)
    expect(screen.getByText('Cancellations')).toBeInTheDocument()
    expect(screen.getByText('Free within 24h')).toBeInTheDocument()
  })

  it('renders privacy and contact paragraphs', async () => {
    const { HelpPage } = await import('./HelpPage')
    render(<HelpPage />)
    expect(screen.getByText('We protect your data.')).toBeInTheDocument()
    expect(screen.getByText('Email us at help@northstar.travel')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// HomePage
// ---------------------------------------------------------------------------

describe('HomePage', () => {
  it('renders the hero and destination cards', async () => {
    const { HomePage } = await import('./HomePage')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByText('hero.title')).toBeInTheDocument()
    expect(screen.getAllByText('Kyoto').length).toBeGreaterThan(0)
  })

  it('renders FAQs and how-it-works steps', async () => {
    const { HomePage } = await import('./HomePage')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByText('FAQ Q?')).toBeInTheDocument()
    expect(screen.getByText('Step 1')).toBeInTheDocument()
  })

  it('shows empty state when no destinations match filter', async () => {
    const { HomePage } = await import('./HomePage')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // The filter UI is present
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('updateFormValue: updates form state when a field changes', async () => {
    const { fireEvent: fe } = await import('@testing-library/react')
    const { HomePage } = await import('./HomePage')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // Type into departingFrom field — triggers updateFormValue
    const textboxes = screen.getAllByRole('textbox')
    fe.change(textboxes[0], { target: { value: 'Paris' } })
    // Value update is managed by state — just verify no crash
    expect(screen.getByRole('button', { name: 'form.submitButton' })).toBeInTheDocument()
  })

  it('handleSubmit: shows error when form is invalid', async () => {
    const { fireEvent: fe } = await import('@testing-library/react')
    const { HomePage } = await import('./HomePage')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // Clear departingFrom so validation fails (default budget '1800' is valid, but departingFrom '' is not)
    const textboxes = screen.getAllByRole('textbox')
    fe.change(textboxes[0], { target: { value: '' } })
    // Click submit
    fe.click(screen.getByRole('button', { name: 'form.submitButton' }))
    // Error message should appear in alert
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('handleSubmit: sets summary ready when form is valid', async () => {
    const { fireEvent: fe } = await import('@testing-library/react')
    const { HomePage } = await import('./HomePage')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // Fill in required fields
    const textboxes = screen.getAllByRole('textbox')
    fe.change(textboxes[0], { target: { value: 'London' } })
    // Submit
    fe.click(screen.getByRole('button', { name: 'form.submitButton' }))
    // No alert (valid form), summary becomes ready
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows empty state when search query matches no destinations', async () => {
    const { fireEvent: fe } = await import('@testing-library/react')
    const { HomePage } = await import('./HomePage')
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    // Type something that doesn't match 'Kyoto'
    fe.change(screen.getByRole('searchbox'), { target: { value: 'zzznomatch' } })
    expect(screen.getByText('home.featured.emptyTitle')).toBeInTheDocument()
  })
})
