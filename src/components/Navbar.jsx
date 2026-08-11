import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '../utils/formatters'
import logo from '../assets/images/logo/mk-construction-logo.png'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/process', label: 'Process' },
  { to: '/packages', label: 'Packages' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined

    const prevBody = document.body.style.overflow
    const prevHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.classList.add('menu-open')

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevBody
      document.documentElement.style.overflow = prevHtml
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const solid = scrolled || !isHome || open
  const closeMenu = () => setOpen(false)

  const mobileMenu =
    mounted &&
    open &&
    createPortal(
      <div className="mobile-menu-root xl:hidden" role="presentation">
        <button
          type="button"
          className="mobile-menu-overlay"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={closeMenu}
        />

        <div
          id="mobile-nav-drawer"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          <div className="mobile-menu__header">
            <Link
              to="/"
              id={titleId}
              className="mobile-menu__brand"
              aria-label="MK Construction & Builders — Home"
              onClick={closeMenu}
            >
              <img
                src={logo}
                alt="MK Construction & Builders"
                loading="eager"
                decoding="async"
                className="mobile-menu__logo"
              />
              <span className="mobile-menu__brand-text">
                MK Construction
                <span className="mobile-menu__brand-sub">&amp; Builders</span>
              </span>
            </Link>

            <button
              type="button"
              aria-label="Close menu"
              className="mobile-menu__close"
              onClick={closeMenu}
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>

          <nav className="mobile-menu__nav" aria-label="Primary">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn('mobile-menu__link', isActive && 'mobile-menu__link--active')
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-menu__cta">
            <Link to="/request-quote" className="btn-primary w-full min-h-[50px]" onClick={closeMenu}>
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>,
      document.body,
    )

  return (
    <>
      <header
        className={cn(
          'site-header fixed top-0 inset-x-0 z-[100] transition-all duration-500',
          solid
            ? 'bg-navy-950/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.65)]'
            : 'bg-gradient-to-b from-navy-950/50 to-transparent',
        )}
      >
        <div className="container-arch min-w-0">
          <div
            className={cn(
              'flex items-center justify-between gap-2 sm:gap-3 md:gap-4 transition-all duration-500 min-w-0 site-header__inner',
              scrolled ? 'h-16 md:h-[5rem]' : 'h-[4.25rem] md:h-[5.5rem]',
            )}
          >
            <Link
              to="/"
              className="shrink-0 bg-white p-1 sm:p-1.5 shadow-sm max-w-[48%] sm:max-w-none"
              aria-label="MK Construction & Builders — Home"
            >
              <img
                src={logo}
                alt="MK Construction & Builders"
                loading="eager"
                decoding="async"
                className="block h-10 w-auto max-w-full object-contain sm:h-14 sm:max-w-[180px] md:h-16 md:max-w-[200px] lg:h-[4.25rem] lg:max-w-[210px]"
              />
            </Link>

            <nav className="hidden xl:flex items-center min-w-0 flex-1 justify-center px-2">
              {links
                .filter((l) => l.to !== '/testimonials')
                .map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn('nav-link', isActive && 'nav-link-active')
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <Link
                to="/request-quote"
                className="hidden sm:inline-flex btn-primary !px-4 !py-2.5 !text-[11px] whitespace-nowrap"
              >
                Get Free Quote
              </Link>
              <button
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-nav-drawer"
                className="xl:hidden inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center text-stone-50 border border-white/15 transition hover:border-gold-500 hover:text-gold-400"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenu}
    </>
  )
}
