import { apiPost } from './client'

const CREATE_PATH = '/api/v1/enquiries'

const OPTIONAL_KEYS = [
  ['email', 'email'],
  ['project_type', 'projectType'],
  ['location', 'location'],
  ['construction_area', 'area'],
  ['message', 'message'],
]

/** Strip +91 / spaces / dashes; backend also strips +91. */
export function normalizeIndianMobile(value) {
  let digits = String(value ?? '').replace(/\D/g, '')
  if (digits.startsWith('91') && digits.length >= 12) {
    digits = digits.slice(-10)
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1)
  }
  return digits
}

export function isValidIndianMobile(digits) {
  return /^[6-9]\d{9}$/.test(digits)
}

export function buildEnquiryBody(form) {
  const name = String(form.name ?? '').trim()
  const mobile = normalizeIndianMobile(form.mobile)
  const body = { name, mobile }

  OPTIONAL_KEYS.forEach(([apiKey, formKey]) => {
    const value = String(form[formKey] ?? '').trim()
    if (!value) return
    body[apiKey] = value
  })

  return body
}

export function createEnquiry(form, { signal } = {}) {
  return apiPost(CREATE_PATH, buildEnquiryBody(form), { signal })
}
