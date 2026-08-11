import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ServiceCard({ service, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col min-w-0 w-full overflow-hidden bg-stone-50 border border-stone-200/80 transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
        <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.22em] text-gold-300">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-7 min-w-0">
        <h3 className="font-display text-[1.45rem] sm:text-[1.65rem] text-navy-900 font-semibold leading-snug break-words">
          {service.title}
        </h3>
        <p className="mt-3 text-[14px] text-navy-700/70 leading-relaxed line-clamp-3 break-words">
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
          className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-navy-900 group-hover:text-gold-600 transition-colors"
        >
          View service
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.article>
  )
}
