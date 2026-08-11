import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { company } from '../data/company'

export default function PageHero({ eyebrow, title, subtitle, crumbs = [] }) {
  return (
    <section className="relative bg-navy-950 text-stone-50 pt-[6.5rem] sm:pt-32 md:pt-40 pb-14 sm:pb-16 md:pb-20">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={company.images.about}
          alt=""
          className="h-full w-full object-cover opacity-30 object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,16,0.92)_0%,rgba(5,10,16,0.88)_100%)] md:bg-[linear-gradient(100deg,rgba(5,10,16,0.96)_0%,rgba(5,10,16,0.82)_55%,rgba(5,10,16,0.7)_100%)]" />
        <div className="absolute inset-0 grain" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent"
      />

      <div className="relative container-arch min-w-0">
        {crumbs.length > 0 && (
          <nav className="mb-5 sm:mb-6 text-[11px] uppercase tracking-[0.18em] text-stone-400 flex flex-wrap gap-2 break-words">
            <Link to="/" className="hover:text-gold-400 transition-colors min-h-11 inline-flex items-center">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex gap-2 min-w-0 items-center">
                <span className="text-stone-600 shrink-0">/</span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-gold-400 transition-colors break-words min-h-11 inline-flex items-center">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-stone-200 break-words">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.28em] text-gold-400 mb-3 sm:mb-4"
          >
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2rem,8vw,3.75rem)] sm:text-4xl md:text-5xl lg:text-[3.75rem] font-semibold max-w-4xl text-balance leading-[1.1] break-words"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="mt-4 sm:mt-5 max-w-2xl text-[15px] md:text-base text-stone-300/90 leading-relaxed break-words"
          >
            {subtitle}
          </motion.p>
        )}

        <div className="mt-7 sm:mt-8 arch-rule" />
      </div>
    </section>
  )
}
