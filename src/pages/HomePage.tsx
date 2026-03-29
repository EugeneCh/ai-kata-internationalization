import { useMemo, useState } from 'react'
import { BookingForm, type BookingFormValues } from '../components/BookingForm'
import { BookingSummary } from '../components/BookingSummary'
import { DestinationCard } from '../components/DestinationCard'
import { FaqList } from '../components/FaqList'
import { Hero } from '../components/Hero'
import { TripFilters } from '../components/TripFilters'
import { destinations, type TravelPace } from '../data/destinations'
import { faqs } from '../data/faqs'

export function HomePage() {
  const [query, setQuery] = useState('')
  const [selectedPace, setSelectedPace] = useState<'any' | TravelPace>('any')
  const [selectedDestinationId, setSelectedDestinationId] = useState(destinations[0].id)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSummaryReady, setIsSummaryReady] = useState(false)
  const [formValues, setFormValues] = useState<BookingFormValues>({
    departingFrom: '',
    travelMonth: 'October 2026',
    travelers: 2,
    budget: '1800',
    stayLength: '7 nights',
    notes: '',
    flexibleDates: true,
  })

  const filteredDestinations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return destinations.filter((destination) => {
      const matchesPace =
        selectedPace === 'any' || destination.pace === selectedPace

      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          destination.name,
          destination.country,
          destination.bestFor,
          destination.blurb,
          destination.itineraryNote,
          destination.pace,
          ...destination.highlights,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesPace && matchesQuery
    })
  }, [query, selectedPace])

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
    if (!selectedDestination) {
      setErrorMessage('Please choose a trip before generating your booking summary.')
      setIsSummaryReady(false)
      return
    }

    if (!formValues.departingFrom.trim()) {
      setErrorMessage('Please add a departure city or airport so we can build your draft plan.')
      setIsSummaryReady(false)
      return
    }

    if (!formValues.budget.trim()) {
      setErrorMessage('Please enter a budget so the summary can reflect your target price range.')
      setIsSummaryReady(false)
      return
    }

    setErrorMessage('')
    setIsSummaryReady(true)
  }

  return (
    <div className="page-shell">
      <Hero destinationCount={destinations.length} />

      <TripFilters
        query={query}
        selectedPace={selectedPace}
        onQueryChange={setQuery}
        onPaceChange={setSelectedPace}
        resultCount={filteredDestinations.length}
      />

      <section className="panel">
        <div className="section-heading">
          <p className="eyebrow">Featured escapes</p>
          <h2>Choose a destination and start shaping a trip that fits your pace and budget.</h2>
        </div>

        {filteredDestinations.length === 0 ? (
          <div className="empty-state">
            <h3>No trips match the current filters</h3>
            <p>
              Try a broader search term or switch the pace back to "Any pace works for me"
              to see more destination options.
            </p>
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
            <p className="eyebrow">How it works</p>
            <h2>Book with confidence, then refine the details with a travel specialist.</h2>
          </div>

          <div className="checklist">
            <article>
              <h3>Pick a travel style</h3>
              <p>
                Start with the kind of trip you actually want: slow and restorative,
                balanced with a few highlights, or packed with activity from the first day.
              </p>
            </article>
            <article>
              <h3>Share the practical details</h3>
              <p>
                Departure city, date window, budget, and trip length help us narrow the
                right route before we get into hotel or dining preferences.
              </p>
            </article>
            <article>
              <h3>Use the summary as a first draft</h3>
              <p>
                Once you submit the form, the summary becomes a simple planning brief that
                can be reviewed, adjusted, and turned into a more detailed itinerary.
              </p>
            </article>
          </div>
        </section>
      </section>
    </div>
  )
}
