import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Building2,
  ClipboardCheck,
  ShieldCheck,
  Clock3,
  Handshake,
} from 'lucide-react'
import { company } from '../data/company'
import './HomeStatsBand.css'

const STATS = [
  { value: company.projects, label: 'Projects', icon: Building2 },
  { value: company.qualityChecks, label: 'Quality Checks', icon: ClipboardCheck },
  { value: 'Quality First', label: 'Our Priority', icon: ShieldCheck },
  { value: 'On-Time Focus', label: 'Delivery Promise', icon: Clock3 },
  { value: 'Customer Trust', label: 'Core Value', icon: Handshake },
]

import { EASE } from '../motion/tokens'

function parseStat(value) {
  if (typeof value !== 'string') return { num: null, suffix: '', label: value }
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { num: null, suffix: '', label: value }
  return { num: Number(match[1]), suffix: match[2], label: value }
}

function PremiumStatCard({ value, label, icon: Icon, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px 0px -8% 0px' })
  const reduceMotion = useReducedMotion()
  const { num, suffix, label: display } = parseStat(value)
  const [count, setCount] = useState(0)
  const isNumeric = num != null
  const revealDelay = index * 0.1

  useEffect(() => {
    if (!inView || !isNumeric || reduceMotion) {
      if (inView && isNumeric && reduceMotion) setCount(num)
      return
    }

    let frame
    const duration = 1800
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(num * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, isNumeric, num, reduceMotion])

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
      animate={
        reduceMotion
          ? undefined
          : inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 18, scale: 0.98 }
      }
      whileHover={
        reduceMotion
          ? undefined
          : { y: -3, transition: { duration: 0.65, ease: EASE } }
      }
      transition={{
        opacity: { duration: 0.85, delay: revealDelay, ease: EASE },
        y: { duration: 0.85, delay: revealDelay, ease: EASE },
        scale: { duration: 0.85, delay: revealDelay, ease: EASE },
      }}
      className={`stats-card-premium group relative flex h-full min-w-0 w-full flex-col justify-center overflow-hidden rounded-sm border border-gold-400/20 bg-gradient-to-br from-navy-900/95 via-navy-900/90 to-navy-800/85 px-4 py-5 shadow-[0_8px_22px_-10px_rgba(0,0,0,0.4)] backdrop-blur-md min-[420px]:min-h-[8.75rem] min-h-[9.5rem] sm:block sm:min-h-0 sm:rounded-none sm:border-white/10 sm:bg-navy-900/80 sm:px-4 sm:py-5 sm:shadow-none md:px-5 md:py-6${
        inView ? ' stats-card-premium--in-view' : ''
      }`}
    >
      <span aria-hidden className="stats-card-premium__shimmer" />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-[2] hidden h-full w-[2px] bg-gradient-to-b from-gold-400 via-gold-500/90 to-transparent sm:block"
      />
      <div className="stats-card-premium__content flex flex-col items-center text-center sm:block sm:text-left">
        <motion.div
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={
            reduceMotion
              ? undefined
              : inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
          }
          transition={{
            opacity: { duration: 0.7, delay: revealDelay + 0.18, ease: EASE },
            y: { duration: 0.7, delay: revealDelay + 0.18, ease: EASE },
          }}
          className="stats-card-premium__accent mb-3 flex w-full max-w-[10.5rem] items-center justify-center gap-2 min-[420px]:mb-2.5 min-[420px]:max-w-[9rem] sm:hidden"
        >
          <span className="stats-card-premium__accent-line h-px min-w-0 flex-1 bg-gradient-to-r from-transparent via-gold-400/25 to-gold-400/40" />
          <span className="stats-card-premium__icon-wrap stats-card-premium__diamond relative flex h-7 w-7 shrink-0 items-center justify-center min-[420px]:h-6 min-[420px]:w-6">
            <span className="absolute inset-0 rotate-45 border border-gold-400/40 opacity-70 transition-all duration-700 ease-out group-hover:rotate-[52deg] group-hover:border-gold-400/60 group-hover:opacity-100" />
            <Icon className="stats-card-premium__icon relative h-3.5 w-3.5 text-gold-400 min-[420px]:h-3 min-[420px]:w-3" strokeWidth={1.5} />
          </span>
          <span className="stats-card-premium__accent-line h-px min-w-0 flex-1 bg-gradient-to-l from-transparent via-gold-400/25 to-gold-400/40" />
        </motion.div>
        <motion.div
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={
            reduceMotion
              ? undefined
              : inView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 8 }
          }
          transition={{
            opacity: { duration: 0.7, delay: revealDelay + 0.14, ease: EASE },
            y: { duration: 0.7, delay: revealDelay + 0.14, ease: EASE },
          }}
          className="stats-card-premium__icon-wrap mb-2.5 hidden sm:mb-2 sm:block sm:pl-2 md:mb-3"
        >
          <span className="relative inline-flex h-7 w-7 items-center justify-center border border-gold-400/30 bg-gold-400/[0.07]">
            <Icon className="stats-card-premium__icon h-3.5 w-3.5 text-gold-400" strokeWidth={1.5} />
          </span>
        </motion.div>
        <p
          className={`font-display font-semibold tracking-tight break-words max-w-full sm:pl-2 ${
            isNumeric
              ? 'text-[1.5rem] sm:text-[1.65rem] md:text-[2.15rem] leading-none'
              : 'text-lg sm:text-[1.2rem] md:text-[1.45rem] leading-snug'
          } text-stone-50`}
        >
          {isNumeric ? (
            <>
              {reduceMotion && !inView ? 0 : count}
              <span className="text-gold-400">{suffix}</span>
            </>
          ) : (
            display
          )}
        </p>
        <p className="mt-2 text-[9px] tracking-[0.16em] sm:tracking-[0.2em] uppercase break-words text-stone-400 sm:pl-2">
          {label}
        </p>
      </div>
    </motion.div>
  )
}

export default function HomeStatsBand() {
  return (
    <section className="stats-band relative z-10 pb-6 md:pb-8">
      <div className="container-arch">
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-3">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`min-w-0 ${
                index === 4 ? 'min-[420px]:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <PremiumStatCard
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
