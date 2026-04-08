import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookingForm, type BookingFormValues } from '../components/BookingForm'
import { BookingSummary } from '../components/BookingSummary'
import { DestinationCard } from '../components/DestinationCard'
import { FaqList } from '../components/FaqList'
import { Hero } from '../components/Hero'
import { TripFilters } from '../components/TripFilters'
import type { TravelPace } from '../data/destinations'
import { useLocalizedContent } from '../i18n/content'
import { filterDestinations } from '../lib/filterDestinations'
import { firstValidationError } from '../lib/validateBookingForm'

export function HomePage() {
  const { t } = useTranslation()
  const { destinations, faqs, homeSteps, getPaceLabel } = useLocalizedContent()
  const [query, setQuery] = useState('')
  const [selectedPace, setSelectedPace] = useState<'any' | TravelPace>('any')
  const [selectedDestinationId, setSelectedDestinationId] = useState(
    destinations[0]?.id ?? '',
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [isSummaryReady, setIsSummaryReady] = useState(false)
  const [formValues, setFormValues] = useState<BookingFormValues>({
    departingFrom: '',
    travelMonth: 'october2026',
    travelers: 2,
    budget: '1800',
    stayLength: '7nights',
    notes: '',
    flexibleDates: true,
  })

  const filteredDestinations = useMemo(
    () => filterDestinations(destinations, { query, pace: selectedPace, getPaceLabel }),
    [destinations, getPaceLabel, query, selectedPace],
  )

  const selectedDestination =
    destinations.find((destination) => destination.id === selectedDestinationId) ?? null

  function updateFormValue<K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K],
  ) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }))
  }

  function handleSubmit() {
    const error = firstValidationError(formValues, selectedDestination)
    if (error) {
      setErrorMessage(t(error.messageKey))
      setIsSummaryReady(false)
      return
    }
    setErrorMessage('')
    setIsSummaryReady(true)
  }

  return (
    <div className="page-shell">
      <Hero />

      <TripFilters
        query={query}
        selectedPace={selectedPace}
        onQueryChange={setQuery}
        onPaceChange={setSelectedPace}
        resultCount={filteredDestinations.length}
      />

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">{t('home.featured.eyebrow')}</p>
          <h2>{t('home.featured.title')}</h2>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="empty-state">
            <h3>{t('home.featured.emptyTitle')}</h3>
            <p>{t('home.featured.emptyText')}</p>
          </div>
        ) : (
          <div className="destination-grid">
            {filteredDestinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                selected={destination.id === selectedDestinationId}
                onSelect={setSelectedDestinationId}
              />
            ))}
          </div>
        )}
      </section>

      <section className="two-column-layout">
        <BookingForm
          values={formValues}
          selectedTripName={selectedDestination?.name ?? null}
          errorMessage={errorMessage}
          onChange={updateFormValue}
          onSubmit={handleSubmit}
        />

        <BookingSummary
          destination={selectedDestination}
          departingFrom={formValues.departingFrom}
          travelMonth={formValues.travelMonth}
          travelers={formValues.travelers}
          budget={formValues.budget}
          stayLength={formValues.stayLength}
          flexibleDates={formValues.flexibleDates}
          notes={formValues.notes}
          isReady={isSummaryReady}
        />
      </section>

      <section className="two-column-layout align-start">
        <FaqList items={faqs} />

        <section className="panel">
          <div className="section-heading">
            <p className="eyebrow">{t('home.howItWorks.eyebrow')}</p>
            <h2>{t('home.howItWorks.title')}</h2>
          </div>

          <div className="checklist">
            {homeSteps.map((step) => (
              <article key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}
