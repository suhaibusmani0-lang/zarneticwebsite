/**
 * Strict DD/MM/YYYY and DD/MM/YY date formatting utilities
 * Used across frontend, backend, CRM, invoices, renewals, and client tables.
 */

/**
 * Format any date input to DD/MM/YYYY (e.g. 01/10/2026)
 */
export function formatDateDMY(dateInput?: string | Date | number | null): string {
  if (!dateInput) return ''
  const d = new Date(dateInput)
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Format any date input to DD/MM/YY (e.g. 01/10/26)
 */
export function formatDateDMYShort(dateInput?: string | Date | number | null): string {
  if (!dateInput) return ''
  const d = new Date(dateInput)
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const shortYear = String(d.getFullYear()).slice(-2)
  return `${day}/${month}/${shortYear}`
}

/**
 * Format date and time to DD/MM/YYYY, HH:MM
 */
export function formatDateTimeDMY(dateInput?: string | Date | number | null): string {
  if (!dateInput) return ''
  const d = new Date(dateInput)
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${day}/${month}/${year}, ${hours}:${minutes}`
}

