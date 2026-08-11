import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { company } from '../data/company'
import { isPlaceholder } from '../utils/formatters'

function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" />
    </svg>
  )
}

function YoutubeIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 12.2s0-3.2-.4-4.7c-.2-.8-.9-1.5-1.7-1.7C19.4 5.4 12 5.4 12 5.4s-7.4 0-8.9.4c-.8.2-1.5.9-1.7 1.7C1 9 1 12.2 1 12.2s0 3.2.4 4.7c.2.8.9 1.5 1.7 1.7 1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4c.8-.2 1.5-.9 1.7-1.7.4-1.5.4-4.7.4-4.7zM9.8 15.5v-6.6l6.3 3.3-6.3 3.3z" />
    </svg>
  )
}

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

const moreLinks = [
  { to: '/process', label: 'Process' },
  { to: '/packages', label: 'Packages' },
  { to: '/calculator', label: 'Cost Calculator' },
  { to: '/house-plans', label: 'House Plans' },
  { to: '/quality', label: 'Quality' },
  { to: '/request-quote', label: 'Request Quote' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-navy-950 text-stone-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute top-0 right-4 font-display text-[5.5rem] sm:text-[8rem] md:text-[12rem] leading-none text-white/[0.03] select-none pointer-events-none">
          MK
        </span>
      </div>

      <div className="relative container-arch pt-14 sm:pt-16 md:pt-20 pb-10">
        <div className="grid gap-10 sm:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-w-0">
          <div className="min-w-0 lg:col-span-1">
            <div className="flex items-center gap-3.5 mb-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold-500/70 text-gold-400 font-display text-lg font-semibold">
                MK
              </span>
              <div className="min-w-0">
                <p className="font-display text-[1.3rem] sm:text-[1.45rem] text-stone-50 font-semibold leading-none break-words">
                  {company.shortName}
                </p>
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.26em] text-gold-400">
                  & Builders
                </p>
              </div>
            </div>
            <p className="font-display text-xl md:text-2xl text-gold-400/95 italic leading-snug max-w-sm break-words">
              {company.tagline}.
            </p>
            <p className="mt-4 text-sm text-stone-400 leading-relaxed max-w-sm break-words">
              {company.marathiTagline}
            </p>
            <p className="mt-6 flex items-start gap-2.5 text-sm text-stone-400">
              <MapPin className="h-4 w-4 mt-0.5 text-gold-500 shrink-0" />
              <span>
                Projects across {company.city}
                <br />
                <span className={isPlaceholder(company.address) ? 'text-stone-500' : ''}>
                  {company.address}
                </span>
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-gold-400 mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-stone-300/90 hover:text-gold-400 transition text-[14px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-gold-400 mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {moreLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-stone-300/90 hover:text-gold-400 transition text-[14px]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] uppercase tracking-[0.24em] text-gold-400 mb-5">
              Connect
            </h3>
            <div className="flex gap-3 mb-6">
              {[
                {
                  href: company.instagramUrl,
                  label: 'Instagram',
                  Icon: InstagramIcon,
                  placeholder: false,
                },
                {
                  href: company.facebookUrl,
                  label: 'Facebook',
                  Icon: FacebookIcon,
                  placeholder: isPlaceholder(company.facebookUrl),
                },
                {
                  href: company.youtubeUrl,
                  label: 'YouTube',
                  Icon: YoutubeIcon,
                  placeholder: isPlaceholder(company.youtubeUrl),
                },
              ].map(({ href, label, Icon, placeholder }) => (
                <a
                  key={label}
                  href={placeholder ? '#' : href}
                  target={placeholder ? undefined : '_blank'}
                  rel={placeholder ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  title={placeholder ? `${label} link placeholder` : label}
                  onClick={(e) => {
                    if (placeholder) e.preventDefault()
                  }}
                  className="h-11 w-11 inline-flex items-center justify-center border border-white/12 text-stone-300 hover:border-gold-500 hover:text-gold-400 transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <p className="text-sm text-stone-400">
              Instagram:{' '}
              <a
                href={company.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 transition"
              >
                {company.instagram}
              </a>
            </p>
            <p className="mt-3 text-sm text-stone-400">Email Us</p>
            <a
              href={`mailto:${company.email}`}
              className="text-sm text-stone-200 hover:text-gold-400 transition"
            >
              {company.email}
            </a>
            <p className="mt-3 text-sm text-stone-400">Call Us</p>
            <a
              href={`tel:${company.phone}`}
              className="text-sm text-stone-200 hover:text-gold-400 transition max-sm:block"
            >
              {company.displayPhone}
            </a>
            <Link
              to="/request-quote"
              className="mt-6 btn-primary !px-5 !py-2.5 !text-[11px] max-sm:mt-4 max-sm:flex max-sm:mx-auto max-sm:w-[88%] max-sm:max-w-[90%]"
            >
              Get Free Quote
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-white/[0.08] flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-[12px] text-stone-500">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p className="font-display italic text-[13px] text-stone-400">
            {company.marathiTaglineEnglish}
          </p>
        </div>
      </div>
    </footer>
  )
}
