import { company } from '../data/company'

/** Official WhatsApp number from company data */
export const WHATSAPP_NUMBER = company.whatsapp

export function isWhatsAppConfigured() {
  return Boolean(WHATSAPP_NUMBER) && !WHATSAPP_NUMBER.includes('[')
}

export function buildWhatsAppUrl(message) {
  if (!isWhatsAppConfigured()) return null
  const cleaned = WHATSAPP_NUMBER.replace(/\D/g, '')
  const text = encodeURIComponent(message)
  return `https://wa.me/${cleaned}?text=${text}`
}

export function getEnquiryMessage(extra = {}) {
  const lines = [
    `Hello ${company.name},`,
    'I would like to enquire about a construction project.',
  ]
  if (extra.name) lines.push(`Name: ${extra.name}`)
  if (extra.projectType) lines.push(`Project Type: ${extra.projectType}`)
  if (extra.location) lines.push(`Location: ${extra.location}`)
  if (extra.area) lines.push(`Area: ${extra.area}`)
  lines.push('Please get back to me. Thank you.')
  return lines.join('\n')
}

export function openWhatsApp(message) {
  const url = buildWhatsAppUrl(message || getEnquiryMessage())
  if (!url) return false
  window.open(url, '_blank', 'noopener,noreferrer')
  return true
}
