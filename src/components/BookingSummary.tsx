import { useTranslation } from 'react-i18next'
import type { Destination } from '../data/destinations'
import { useLocalizedContent } from '../i18n/content'

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
  const { t, i18n } = useTranslation()
  const { months, stayLengths } = useLocalizedContent()
  const travelMonthLabel =
    months.find((month) => month.value === travelMonth)?.label ?? travelMonth
  const stayLengthLabel =
    stayLengths.find((item) => item.value === stayLength)?.label ?? stayLength
  const travelersLabel = t('common.travelersLabel', { count: travelers })
  const budgetNumber = Number(budget)
  const formattedBudget =
    budget.trim().length > 0 && Number.isFinite(budgetNumber)
      ? new Intl.NumberFormat(i18n.resolvedLanguage, {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(budgetNumber)
      : budget

  return (
    <section className="panel summary-panel">
      <div className="section-heading">
        <p className="eyebrow">{t('summary.eyebrow')}</p>
        <h2>{t('summary.title')}</h2>
      </div>

      {!isReady || !destination ? (
        <div className="empty-state">
          <h3>{t('summary.emptyTitle')}</h3>
          <p>{t('summary.emptyText')}</p>
        </div>
      ) : (
        <div className="summary-stack">
          <p className="summary-lead">
            {t('summary.lead', {
              stayLength: stayLengthLabel,
              travelers: travelersLabel,
              destination: destination.name,
              departingFrom,
              travelMonth: travelMonthLabel,
            })}
          </p>

          <div className="summary-grid">
            <div>
              <h3>{t('summary.tripDirectionTitle')}</h3>
              <p>{t('summary.tripDirectionText')}</p>
            </div>
            <div>
              <h3>{t('summary.budgetTitle')}</h3>
              <p>
                {t('summary.budgetText', {
                  budget: formattedBudget,
                  perTraveler: t('common.perTraveler'),
                  country: destination.country,
                })}
              </p>
            </div>
            <div>
              <h3>{t('summary.flexibilityTitle')}</h3>
              <p>
                {flexibleDates
                  ? t('summary.flexibilityFlexible')
                  : t('summary.flexibilityFixed')}
              </p>
            </div>
            <div>
              <h3>{t('summary.noteTitle')}</h3>
              <p>
                {notes.trim() ? notes : t('summary.noteFallback')}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
