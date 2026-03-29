import type { Destination } from '../data/destinations'

type DestinationCardProps = {
  destination: Destination
  selected: boolean
  onSelect: (id: string) => void
}

export function DestinationCard({
  destination,
  selected,
  onSelect,
}: DestinationCardProps) {
  return (
    <article className={`destination-card${selected ? ' selected' : ''}`}>
      <div className="destination-card__header">
        <div>
          <p className="destination-card__country">{destination.country}</p>
          <h3>{destination.name}</h3>
        </div>
        <span className="pace-badge">{destination.pace}</span>
      </div>

      <p className="destination-card__blurb">{destination.blurb}</p>

      <dl className="destination-card__facts">
        <div>
          <dt>Best for</dt>
          <dd>{destination.bestFor}</dd>
        </div>
        <div>
          <dt>Starting price</dt>
          <dd>${destination.priceFrom} per traveler</dd>
        </div>
        <div>
          <dt>Typical flight</dt>
          <dd>{destination.flightTime}</dd>
        </div>
      </dl>

      <p className="destination-card__note">{destination.itineraryNote}</p>

      <ul className="destination-card__highlights">
        {destination.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <button type="button" className="secondary-button" onClick={() => onSelect(destination.id)}>
        {selected ? 'Selected for the sample booking form' : 'Use this trip in the booking form'}
      </button>
    </article>
  )
}
