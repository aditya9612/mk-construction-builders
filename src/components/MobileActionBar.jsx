import { Phone, MessageCircle } from 'lucide-react'
import { company } from '../data/company'
import { getEnquiryMessage, isWhatsAppConfigured, openWhatsApp } from '../utils/whatsapp'

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function MobileActionBar() {
  const handleWhatsApp = () => {
    if (!isWhatsAppConfigured()) {
      window.alert(`WhatsApp number placeholder: ${company.whatsapp}`)
      return
    }
    openWhatsApp(getEnquiryMessage())
  }

  return (
    <div
      className="mobile-action-bar fixed inset-x-0 bottom-0 z-[900] md:hidden"
      role="navigation"
      aria-label="Quick contact"
    >
      <div className="flex border-t border-white/10 bg-navy-950/95 backdrop-blur-xl shadow-[0_-10px_28px_-14px_rgba(5,10,16,0.6)] pb-[env(safe-area-inset-bottom,0px)]">
        <a
          href={`tel:${company.phone}`}
          className="flex flex-1 items-center justify-center gap-1 min-h-[42px] px-1.5 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-50 whitespace-nowrap transition active:bg-white/5"
        >
          <Phone className="h-3.5 w-3.5 text-gold-400 shrink-0" aria-hidden />
          Call Now
        </a>
        <span className="w-px self-stretch my-2 bg-white/10" aria-hidden />
        <a
          href={company.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-1 min-h-[42px] px-1.5 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-50 whitespace-nowrap transition active:bg-white/5"
        >
          <InstagramIcon className="h-3.5 w-3.5 text-[#E4405F] shrink-0" />
          Instagram
        </a>
        <span className="w-px self-stretch my-2 bg-white/10" aria-hidden />
        <button
          type="button"
          onClick={handleWhatsApp}
          className="flex flex-1 items-center justify-center gap-1 min-h-[42px] px-1.5 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-stone-50 whitespace-nowrap transition active:bg-white/5"
        >
          <MessageCircle className="h-3.5 w-3.5 text-[#25D366] shrink-0" aria-hidden />
          WhatsApp
        </button>
      </div>
    </div>
  )
}
