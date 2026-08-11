import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
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
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

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
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const solid = scrolled || !isHome || open

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        solid
          ? 'bg-navy-950/90 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.65)]'
          : 'bg-gradient-to-b from-navy-950/50 to-transparent',
      )}
    >
      <div className="container-arch min-w-0">
        <div
          className={cn(
            'flex items-center justify-between gap-2 sm:gap-3 md:gap-4 transition-all duration-500 min-w-0',
            scrolled ? 'h-[4.5rem] md:h-[5rem]' : 'h-[4.75rem] md:h-[5.5rem]',
          )}
        >
          <Link
            to="/"
            className="shrink-0 bg-white p-1 sm:p-1.5 shadow-sm max-w-[46%] sm:max-w-none"
            aria-label="MK Construction & Builders — Home"
          >
            <img
              src={logo}
              alt="MK Construction & Builders"
              loading="eager"
              decoding="async"
              className="block h-11 w-auto max-w-full object-contain sm:h-14 sm:max-w-[180px] md:h-16 md:max-w-[200px] lg:h-[4.25rem] lg:max-w-[210px]"
            />
          </Link>

          <nav className="hidden xl:flex items-center min-w-0 flex-1 justify-center px-2">
            {links.map((link) => (
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
              className="xl:hidden inline-flex h-11 w-11 items-center justify-center text-stone-50 border border-white/15 transition hover:border-gold-500 hover:text-gold-400"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="xl:hidden fixed inset-0 top-0 z-40 bg-navy-950"
          >
            <div className="container-arch flex h-16 items-center justify-between border-b border-white/10">
              <span className="font-display text-xl text-stone-50">Menu</span>
              <button
                type="button"
                aria-label="Close menu"
                className="h-11 w-11 inline-flex items-center justify-center text-stone-50 border border-white/15"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="container-arch flex flex-col pt-8 pb-10 gap-1 overflow-y-auto max-h-[calc(100svh-4rem)]">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block font-display text-3xl sm:text-4xl py-3 border-b border-white/[0.06]',
                        isActive ? 'text-gold-400' : 'text-stone-100',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <Link
                to="/request-quote"
                className="mt-8 btn-primary w-full sm:w-auto self-start"
              >
                Get Free Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
