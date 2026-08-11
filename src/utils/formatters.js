export function formatNumber(value) {
  if (value == null || value === '') return '—'
  const n = Number(value)
  if (Number.isNaN(n)) return String(value)
  return new Intl.NumberFormat('en-IN').format(n)
}

export function formatCurrency(amount, currency = 'INR') {
  if (amount == null) return 'Price available on request'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function isPlaceholder(value) {
  return typeof value === 'string' && value.includes('[')
}

export function displayOrHide(value) {
  if (value == null || value === '' || isPlaceholder(value)) return null
  return value
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
