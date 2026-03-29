import type { Destination } from '../data/destinations'

type BookingSummaryProps = {
  destination: Destination | null
  departingFrom: string
  travelMonth: string
  travelers: number
  budget: string
  stayLength: string
  flexibleDates: boolean
  notes: string
  isReady: boolean
}

function travelerLabel(count: number) {
  return `${count} traveler${count === 1 ? '' : 's'}`
}

export function BookingSummary({
  destination,
  departingFrom,
  travelMonth,
  travelers,
  budget,
  stayLength,
  flexibleDates,
  notes,
  isReady,
}: BookingSummaryProps) {
  return (
    <section className="panel summary-panel">
      <div className="section-heading">
        <p className="eyebrow">Booking summary</p>
        <h2>Preview the trip brief we would send back before final planning begins.</h2>
      </div>

      {!isReady || !destination ? (
        <div className="empty-state">
          <h3>No booking summary yet</h3>
          <p>
            Choose a trip, complete the form, and submit the request to build a short,
            traveler-friendly outline.
          </p>
        </div>
      ) : (
        <div className="summary-stack">
          <p className="summary-lead">
            We are preparing a {stayLength.toLowerCase()} plan for {travelerLabel(travelers)} to{' '}
            <strong>{destination.name}</strong> departing from <strong>{departingFrom}</strong> in{' '}
            <strong>{travelMonth}</strong>.
          </p>

          <div className="summary-grid">
            <div>
              <h3>Trip direction</h3>
              <p>
                This draft combines route context, pace, and practical preferences so the
                next planning step starts with a clear picture of what the traveler wants.
              </p>
            </div>
            <div>
              <h3>Budget snapshot</h3>
              <p>
                Estimated starting budget: <strong>${budget}</strong> per traveler, based on the
                baseline trip example for {destination.country}.
              </p>
            </div>
            <div>
              <h3>Date flexibility</h3>
              <p>
                {flexibleDates
                  ? 'The traveler is flexible, so the draft can prioritize better pricing or easier connections.'
                  : 'The traveler prefers fixed dates, so the plan should focus on the clearest route and the fewest moving parts.'}
              </p>
            </div>
            <div>
              <h3>Planning note</h3>
              <p>
                {notes.trim()
                  ? notes
                  : 'No special notes were added, so this request stays focused on the destination, budget, and overall pacing.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
