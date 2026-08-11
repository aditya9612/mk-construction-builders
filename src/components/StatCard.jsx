import { useEffect, useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion'
import { cn } from '../utils/formatters'

function parseStat(value) {
  if (typeof value !== 'string') return { num: null, suffix: '', label: value }
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { num: null, suffix: '', label: value }
  return { num: Number(match[1]), suffix: match[2], label: value }
}

export default function StatCard({ value, label, index = 0, variant = 'dark' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const { num, suffix, label: display } = parseStat(value)
  const [count, setCount] = useState(0)
  const isNumeric = num != null

  useEffect(() => {
    if (!inView || !isNumeric) return
    let frame
    const duration = 1500
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(num * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, isNumeric, num])

  const isDark = variant === 'dark'

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative h-full min-w-0 w-full px-4 py-6 sm:px-5 sm:py-7 md:px-6 md:py-9',
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
