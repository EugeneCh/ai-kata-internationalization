import type { BookingFormValues } from '../components/BookingForm'
import type { Destination } from '../data/destinations'
import { parseBudget } from './budgetUtils'

export type ValidationErrorKey =
  | 'form.errors.noTrip'
  | 'form.errors.noDeparture'
  | 'form.errors.noBudget'
  | 'form.errors.invalidBudget'

export type ValidationError = {
  field: keyof BookingFormValues | 'destination'
  messageKey: ValidationErrorKey
}

export type ValidationResult =
  | { valid: true }
  | { valid: false; errors: ValidationError[] }

/**
 * Validates the booking form values and the selected destination.
 * Returns a result object — never throws. The caller is responsible
 * for translating `messageKey` values into display strings.
 */
export function validateBookingForm(
  values: BookingFormValues,
  selectedDestination: Destination | null,
): ValidationResult {
  const errors: ValidationError[] = []

  if (!selectedDestination) {
    errors.push({ field: 'destination', messageKey: 'form.errors.noTrip' })
  }

  if (!values.departingFrom.trim()) {
    errors.push({ field: 'departingFrom', messageKey: 'form.errors.noDeparture' })
  }

  if (!values.budget.trim()) {
    errors.push({ field: 'budget', messageKey: 'form.errors.noBudget' })
  } else if (parseBudget(values.budget) === null) {
    errors.push({ field: 'budget', messageKey: 'form.errors.invalidBudget' })
  }

  if (errors.length > 0) {
    return { valid: false, errors }
  }

  return { valid: true }
}

/**
 * Returns the first validation error, or null if the form is valid.
 * Convenience wrapper for UIs that show one error at a time.
 */
export function firstValidationError(
  values: BookingFormValues,
  selectedDestination: Destination | null,
): ValidationError | null {
  const result = validateBookingForm(values, selectedDestination)
  if (result.valid) return null
  return result.errors[0]
}
