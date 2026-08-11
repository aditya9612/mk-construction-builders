import { MessageCircle } from 'lucide-react'
import { company } from '../data/company'
import { getEnquiryMessage, isWhatsAppConfigured, openWhatsApp } from '../utils/whatsapp'

export default function WhatsAppButton() {
  const configured = isWhatsAppConfigured()

  const handleClick = () => {
    if (!configured) {
      window.alert(
        `WhatsApp number not configured yet.\nPlaceholder: ${company.whatsapp}\n\nUpdate company.whatsapp in src/data/company.js`,
      )
      return
    }
    openWhatsApp(getEnquiryMessage())
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.7)] transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      title={configured ? 'WhatsApp Enquiry' : `WhatsApp: ${company.whatsapp}`}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}
