import { useTranslation } from 'react-i18next'
import { useLocalizedContent } from '../i18n/content'

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
  const { t } = useTranslation()
  const { months, stayLengths } = useLocalizedContent()

  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">{t('form.eyebrow')}</p>
        <h2>{t('form.title')}</h2>
      </div>

      <p className="muted-copy">
        {t('form.selectedTrip')}{' '}
        <strong>
          {selectedTripName ?? t('form.noTrip')}
        </strong>
      </p>

      <div className="form-grid">
        <label className="field">
          <span>{t('form.departingFrom')}</span>
          <input
            type="text"
            value={values.departingFrom}
            onChange={(event) => onChange('departingFrom', event.target.value)}
            placeholder={t('form.departingPlaceholder')}
          />
        </label>

        <label className="field">
          <span>{t('form.travelMonth')}</span>
          <select
            value={values.travelMonth}
            onChange={(event) => onChange('travelMonth', event.target.value)}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>{t('form.travelers')}</span>
          <input
            type="number"
            min="1"
            max="6"
            value={values.travelers}
            onChange={(event) => onChange('travelers', Number(event.target.value))}
          />
        </label>

        <label className="field">
          <span>{t('form.budget')}</span>
          <input
            type="text"
            value={values.budget}
            onChange={(event) => onChange('budget', event.target.value)}
            placeholder={t('form.budgetPlaceholder')}
          />
        </label>

        <label className="field">
          <span>{t('form.stayLength')}</span>
          <select
            value={values.stayLength}
            onChange={(event) => onChange('stayLength', event.target.value)}
          >
            {stayLengths.map((stayLength) => (
              <option key={stayLength.value} value={stayLength.value}>
                {stayLength.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field checkbox-field">
          <input
            type="checkbox"
            checked={values.flexibleDates}
            onChange={(event) => onChange('flexibleDates', event.target.checked)}
          />
          <span>{t('form.flexibleDates')}</span>
        </label>

        <label className="field field--full">
          <span>{t('form.notes')}</span>
          <textarea
            rows={4}
            value={values.notes}
            onChange={(event) => onChange('notes', event.target.value)}
            placeholder={t('form.notesPlaceholder')}
          />
          <small>{t('form.notesHelp')}</small>
        </label>
      </div>

      {errorMessage ? (
        <p className="form-message error-message" role="alert">
          {errorMessage}
        </p>
      ) : (
        <p className="form-message muted-copy">
          {t('form.submitHint')}
        </p>
      )}

      <button type="button" className="primary-button" onClick={onSubmit}>
        {t('form.submitButton')}
      </button>
    </section>
  )
}

export type { BookingFormValues }
