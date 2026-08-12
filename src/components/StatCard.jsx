import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../utils/formatters'
import { useCountUp, useInViewOnce } from '../hooks/useCountUp'
import { fadeUp } from '../motion/variants'
import { EASE, DURATION, STAGGER } from '../motion/tokens'

function parseStat(value) {
  if (typeof value !== 'string') return { num: null, suffix: '', label: value }
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { num: null, suffix: '', label: value }
  return { num: Number(match[1]), suffix: match[2], label: value }
}

export default function StatCard({ value, label, index = 0, variant = 'dark' }) {
  const ref = useRef(null)
  const inView = useInViewOnce(ref)
  const reduceMotion = useReducedMotion()
  const { num, suffix, label: display } = parseStat(value)
  const isNumeric = num != null
  const count = useCountUp(num, { enabled: inView && isNumeric })

  const isDark = variant === 'dark'

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index * STAGGER.normal}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ duration: DURATION.reveal, ease: EASE }}
      className={cn(
        'relative h-full min-w-0 w-full px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-9 hover-lift',
        isDark
          ? 'border border-white/10 bg-navy-900/80 backdrop-blur-md'
          : 'border border-stone-200/80 bg-white shadow-[var(--shadow-soft)]',
      )}
    >
      <div className="pointer-events-none absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-gold-400 via-gold-500 to-transparent" />
      <p
        className={cn(
          'font-display font-semibold tracking-tight break-words max-w-full pl-2',
          isNumeric
            ? 'text-[1.75rem] sm:text-[2rem] md:text-[2.65rem] leading-none'
            : 'text-xl sm:text-[1.45rem] md:text-[1.7rem] leading-snug',
          isDark ? 'text-stone-50' : 'text-navy-900',
        )}
      >
        {isNumeric ? (
          <>
            {count}
            <span className="text-gold-400">{suffix}</span>
          </>
        ) : (
          display
        )}
      </p>
      <p
        className={cn(
          'mt-3 text-[10px] tracking-[0.18em] sm:tracking-[0.22em] uppercase break-words pl-2',
          isDark ? 'text-stone-400' : 'text-navy-700/55',
        )}
      >
        {label}
      </p>
    </motion.div>
  )
}
