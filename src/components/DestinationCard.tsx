import { useTranslation } from 'react-i18next'
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
  const { t, i18n } = useTranslation()
  const currency = new Intl.NumberFormat(i18n.resolvedLanguage, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(destination.priceFrom)

  return (
    <article className={`destination-card${selected ? ' selected' : ''}`}>
      <div className="destination-card__header">
        <div>
          <p className="destination-card__country">{destination.country}</p>
          <h3>{destination.name}</h3>
        </div>
        <span className="pace-badge">{t(`common.paceBadge.${destination.pace}`)}</span>
      </div>

      <p className="destination-card__blurb">{destination.blurb}</p>

      <dl className="destination-card__facts">
        <div>
          <dt>{t('destinations.bestFor')}</dt>
          <dd>{destination.bestFor}</dd>
        </div>
        <div>
          <dt>{t('destinations.startingPrice')}</dt>
          <dd>
            {currency} {t('common.perTraveler')}
          </dd>
        </div>
        <div>
          <dt>{t('destinations.typicalFlight')}</dt>
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
        {selected ? t('destinations.selectedButton') : t('destinations.selectButton')}
      </button>
    </article>
  )
}
