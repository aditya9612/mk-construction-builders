import { motion, useReducedMotion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { company } from '../data/company'
import { Reveal } from './motion/Reveal'
import { EASE, DURATION } from '../motion/tokens'

export default function FounderSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="founder-section bg-stone-50 text-navy-900 relative">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative founder-section__container">
        <div className="founder-section__grid">
          <Reveal
            direction="left"
            className="founder-section__media relative min-w-0 w-full"
          >
            <div className="arch-frame founder-section__frame">
              <div className="founder-section__image overflow-hidden bg-stone-100 w-full image-reveal">
                <motion.img
                  src={company.images.founder}
                  alt={`${company.founder}, ${company.designation} of ${company.name}`}
                  className="h-full w-full object-cover object-[center_20%]"
                  loading="lazy"
                  initial={reduceMotion ? false : { scale: 1.04 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: DURATION.image, ease: EASE }}
                />
              </div>
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={0.08}
            className="founder-section__content min-w-0 max-w-full bg-white border border-stone-200/80 rounded-[14px] sm:rounded-none p-6 sm:p-8 md:p-9 lg:p-10 shadow-[var(--shadow-soft)] hover-lift"
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.28em] text-gold-500 mb-3 sm:mb-5">
              Leadership
            </p>
            <h2 className="font-display text-[clamp(2rem,8vw,3.85rem)] sm:text-5xl md:text-[3.25rem] lg:text-[3.65rem] xl:text-[3.85rem] font-semibold text-navy-900 leading-[1.08] break-words">
              {company.founder}
            </h2>
            <p className="mt-3.5 sm:mt-4 text-[11px] sm:text-[13px] md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] text-gold-600 break-words leading-relaxed">
              {company.designation} · {company.name}
            </p>
            <p className="mt-6 md:mt-8 text-navy-700/75 leading-[1.7] max-w-xl lg:max-w-[36rem] text-[15px] sm:text-base break-words">
              Under the leadership of {company.founder}, {company.name} stands for
              trust, quality and on-time completion across construction projects in
              Pune.
            </p>

            <div className="mt-8 md:mt-11 space-y-6 md:space-y-7 min-w-0">
              <blockquote className="border-l-[2px] border-gold-500 pl-4 sm:pl-5 md:pl-6 min-w-0">
                <Quote className="h-5 w-5 text-gold-500 mb-3 opacity-80" />
                <p className="font-display text-[1.25rem] sm:text-2xl md:text-[1.85rem] text-navy-900 italic leading-snug break-words">
                  “{company.founderQuote}”
                </p>
              </blockquote>
              <p className="font-display text-base sm:text-lg md:text-[1.35rem] text-navy-700/65 italic leading-snug break-words">
                “{company.brandMessage}”
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
