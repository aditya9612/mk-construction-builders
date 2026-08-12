import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp } from '../motion/variants'
import { DURATION, EASE, STAGGER } from '../motion/tokens'

export default function HousePlanCard({ plan, index = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      variants={fadeUp}
      custom={index * STAGGER.fast}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: DURATION.reveal, ease: EASE }}
      className="bg-stone-50 border border-stone-200/90 overflow-hidden hover-lift transition-shadow duration-500 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="aspect-[4/3] overflow-hidden image-reveal">
        <img
          src={plan.image}
          alt={`${plan.title} house plan`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-[1.75rem] text-navy-900 font-semibold">
          {plan.title}
        </h3>
        <p className="mt-2 text-[14px] text-navy-700/70 leading-relaxed">
          {plan.description}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-3 text-[13px]">
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-navy-700/45">
              Area
            </dt>
            <dd className="text-navy-900 mt-1">{plan.area || plan.detailsLabel}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-navy-700/45">
              Rooms
            </dt>
            <dd className="text-navy-900 mt-1">{plan.rooms || plan.detailsLabel}</dd>
          </div>
          <div>
            <dt className="text-[10px] uppercase tracking-[0.18em] text-navy-700/45">
              Floors
            </dt>
            <dd className="text-navy-900 mt-1">{plan.floors || plan.detailsLabel}</dd>
          </div>
        </dl>
        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() =>
              window.alert('Plan drawings will be available when provided.')
            }
            className="flex-1 border border-stone-200 px-3 py-3 text-[11px] uppercase tracking-[0.14em] hover:border-gold-500 hover:-translate-y-0.5 transition-all duration-300"
          >
            View Plan
          </button>
          <Link
            to="/request-quote"
            state={{ plan: plan.title }}
            className="flex-1 bg-navy-900 text-stone-50 text-center px-3 py-3 text-[11px] uppercase tracking-[0.14em] hover:bg-navy-800 hover:-translate-y-0.5 transition-all duration-300"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
