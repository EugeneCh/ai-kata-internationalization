import type { TravelPace } from '../data/destinations'

type TripFiltersProps = {
  query: string
  selectedPace: 'any' | TravelPace
  onQueryChange: (value: string) => void
  onPaceChange: (value: 'any' | TravelPace) => void
  resultCount: number
}

export function TripFilters({
  query,
  selectedPace,
  onQueryChange,
  onPaceChange,
  resultCount,
}: TripFiltersProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Explore trips</p>
        <h2>Browse destination ideas by mood, pace, and the kind of trip you want.</h2>
      </div>

      <div className="filter-grid">
        <label className="field">
          <span>Search destinations or travel style</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Try 'food', 'slow', or 'city break'"
          />
          <small>
            Search by destination name, country, or trip style to narrow the shortlist.
          </small>
        </label>

        <label className="field">
          <span>Preferred pace</span>
          <select
            value={selectedPace}
            onChange={(event) =>
              onPaceChange(event.target.value as 'any' | TravelPace)
            }
          >
            <option value="any">Any pace works for me</option>
            <option value="slow">Slow and restorative</option>
            <option value="balanced">Balanced with planned highlights</option>
            <option value="fast">Fast with lots of activity</option>
          </select>
          <small>Pick the tempo that feels realistic for this trip.</small>
        </label>
      </div>

      <p className="results-copy">
        Showing {resultCount} itinerary option{resultCount === 1 ? '' : 's'} that match
        the current filters.
      </p>
    </section>
  )
}
