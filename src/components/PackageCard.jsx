import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '../utils/formatters'

export default function PackageCard({ pkg, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative flex flex-col p-6 sm:p-8 md:p-9 h-full min-w-0 w-full transition-shadow duration-500 rounded-[14px] sm:rounded-none',
        pkg.highlighted && 'pt-8 sm:pt-9',
        pkg.highlighted
          ? 'bg-navy-900 text-stone-50 shadow-[var(--shadow-lift)] ring-1 ring-gold-500'
          : 'bg-stone-50 text-navy-900 border border-stone-200/90 hover:shadow-[var(--shadow-soft)]',
      )}
    >
      {pkg.highlighted && (
        <span className="absolute top-0 left-6 -translate-y-1/2 bg-gold-500 text-navy-950 text-[10px] uppercase tracking-[0.18em] px-3 py-1 font-semibold">
          Popular
        </span>
      )}
      <h3 className="font-display text-[1.5rem] sm:text-[1.85rem] md:text-[2rem] font-semibold break-words">
        {pkg.name}
      </h3>
      <p
        className={cn(
          'mt-3 text-[14px] sm:text-[15px] leading-relaxed',
          pkg.highlighted ? 'text-stone-300/90' : 'text-navy-700/70',
        )}
      >
        {pkg.description}
      </p>
      <p className="mt-7 font-display text-2xl text-gold-500">
        {pkg.priceLabel || 'Price available on request'}
      </p>
      <ul className="mt-7 space-y-3.5 flex-1">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[14px]">
            <Check
              className={cn(
                'h-4 w-4 mt-0.5 shrink-0',
                pkg.highlighted ? 'text-gold-400' : 'text-gold-600',
              )}
            />
            <span className={pkg.highlighted ? 'text-stone-200' : 'text-navy-700'}>
              {f}
            </span>
          </li>
        ))}
      </ul>
      <Link
        to="/request-quote"
        className={cn(
          'package-cta mt-9 inline-flex justify-center items-center text-[12px] uppercase tracking-[0.14em] font-medium px-5 py-3.5 transition min-h-[50px]',
          pkg.highlighted
            ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
            : 'bg-navy-900 text-stone-50 hover:bg-navy-800',
        )}
      >
        Request Quote
      </Link>
    </motion.article>
  )
}
