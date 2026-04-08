import type { TravelPace } from '../data/destinations'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">{t('filters.eyebrow')}</p>
        <h2>{t('filters.title')}</h2>
      </div>

      <div className="filter-grid">
        <label className="field">
          <span>{t('filters.searchLabel')}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t('filters.searchPlaceholder')}
          />
          <small>{t('filters.searchHelp')}</small>
        </label>

        <label className="field">
          <span>{t('filters.paceLabel')}</span>
          <select
            value={selectedPace}
            onChange={(event) =>
              onPaceChange(event.target.value as 'any' | TravelPace)
            }
          >
            <option value="any">{t('common.pace.any')}</option>
            <option value="slow">{t('common.pace.slow')}</option>
            <option value="balanced">{t('common.pace.balanced')}</option>
            <option value="fast">{t('common.pace.fast')}</option>
          </select>
          <small>{t('filters.paceHelp')}</small>
        </label>
      </div>

      <p className="results-copy">{t('filters.results', { count: resultCount })}</p>
    </section>
  )
}
