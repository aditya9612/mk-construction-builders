import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp } from '../motion/variants'
import { EASE, DURATION, STAGGER } from '../motion/tokens'

export default function ServiceCard({ service, index = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      variants={fadeUp}
      custom={index * STAGGER.normal}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: DURATION.reveal, ease: EASE }}
      className="group relative flex flex-col min-w-0 w-full overflow-hidden bg-stone-50 border border-stone-200/80 rounded-[14px] sm:rounded-none hover-lift transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={`${service.title} — MK Construction & Builders Pune`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.22em] text-gold-300">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-6 md:p-7 min-w-0">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gold-600 mb-2">
          Service
        </p>
        <h3 className="font-display text-[1.35rem] sm:text-[1.65rem] text-navy-900 font-semibold leading-snug break-words">
          {service.title}
        </h3>
        <p className="mt-3 text-[14px] sm:text-[15px] text-navy-700/70 leading-relaxed line-clamp-3 break-words">
          {service.description}
        </p>
        {service.features?.length > 0 && (
          <ul className="mt-5 space-y-2">
            {service.features.slice(0, 3).map((f) => (
              <li key={f} className="text-[12px] text-navy-700/55 flex gap-2.5 tracking-wide">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-500" />
                {f}
              </li>
            ))}
          </ul>
        )}
        <Link
          to={`/services/${service.id}`}
          className="mt-auto pt-6 inline-flex items-center gap-1.5 min-h-11 text-[11px] uppercase tracking-[0.18em] font-medium text-navy-900 group-hover:text-gold-600 transition-colors"
        >
          View service
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  )
}
