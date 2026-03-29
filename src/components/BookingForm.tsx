type BookingFormValues = {
  departingFrom: string
  travelMonth: string
  travelers: number
  budget: string
  stayLength: string
  notes: string
  flexibleDates: boolean
}

type BookingFormProps = {
  values: BookingFormValues
  selectedTripName: string | null
  errorMessage: string
  onChange: <K extends keyof BookingFormValues>(
    field: K,
    value: BookingFormValues[K],
  ) => void
  onSubmit: () => void
}

export function BookingForm({
  values,
  selectedTripName,
  errorMessage,
  onChange,
  onSubmit,
}: BookingFormProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Planning request</p>
        <h2>Share the essentials so we can shape a trip outline that feels realistic.</h2>
      </div>

      <p className="muted-copy">
        Selected trip:{' '}
        <strong>
          {selectedTripName ??
            'No trip selected yet. Pick one of the cards above before submitting.'}
        </strong>
      </p>

      <div className="form-grid">
        <label className="field">
          <span>Departing from</span>
          <input
            type="text"
            value={values.departingFrom}
            onChange={(event) => onChange('departingFrom', event.target.value)}
            placeholder="New York, Toronto, or another major airport"
          />
        </label>

        <label className="field">
          <span>Travel month</span>
          <select
            value={values.travelMonth}
            onChange={(event) => onChange('travelMonth', event.target.value)}
          >
            <option>September 2026</option>
            <option>October 2026</option>
            <option>November 2026</option>
            <option>December 2026</option>
          </select>
        </label>

        <label className="field">
          <span>How many travelers are joining?</span>
          <input
            type="number"
            min="1"
            max="6"
            value={values.travelers}
            onChange={(event) => onChange('travelers', Number(event.target.value))}
          />
        </label>

        <label className="field">
          <span>Approximate budget per traveler in USD</span>
          <input
            type="text"
            value={values.budget}
            onChange={(event) => onChange('budget', event.target.value)}
            placeholder="For example, 1800"
          />
        </label>

        <label className="field">
          <span>Expected stay length</span>
          <input
            type="text"
            value={values.stayLength}
            onChange={(event) => onChange('stayLength', event.target.value)}
            placeholder="5 nights, 1 week, or 10 days"
          />
        </label>

        <label className="field checkbox-field">
          <input
            type="checkbox"
            checked={values.flexibleDates}
            onChange={(event) => onChange('flexibleDates', event.target.checked)}
          />
          <span>I can shift my dates by a few days to find a better route or rate.</span>
        </label>

        <label className="field field--full">
          <span>Trip notes or special requests</span>
          <textarea
            rows={4}
            value={values.notes}
            onChange={(event) => onChange('notes', event.target.value)}
            placeholder="Examples: I prefer walkable neighborhoods, I need quiet mornings, or I want one memorable dinner reservation."
          />
          <small>
            Mention any priorities that would make the trip feel easier, calmer, or more
            memorable.
          </small>
        </label>
      </div>

      {errorMessage ? (
        <p className="form-message error-message" role="alert">
          {errorMessage}
        </p>
      ) : (
        <p className="form-message muted-copy">
          Submit the form to generate a first-draft summary for your trip request.
        </p>
      )}

      <button type="button" className="primary-button" onClick={onSubmit}>
        Generate booking summary
      </button>
    </section>
  )
}

export type { BookingFormValues }
