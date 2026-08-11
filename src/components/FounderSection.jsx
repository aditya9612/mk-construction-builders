import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { company } from '../data/company'

export default function FounderSection() {
  return (
    <section className="founder-section bg-navy-950 text-stone-100 relative">
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="relative founder-section__container">
        <div className="founder-section__grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="founder-section__media relative min-w-0 w-full"
          >
            <div className="arch-frame founder-section__frame">
              <div className="founder-section__image overflow-hidden bg-navy-900 w-full">
                <img
                  src={company.images.founder}
                  alt={`${company.founder}, ${company.designation} of ${company.name}`}
                  className="h-full w-full object-cover object-[center_20%]"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="founder-section__badge mt-4 inline-block bg-gold-500 text-navy-950 px-5 py-3 max-w-full">
              <p className="text-[10px] uppercase tracking-[0.22em]">Leadership</p>
              <p className="font-display text-lg leading-none mt-1 break-words">
                Founder & CEO
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="founder-section__content min-w-0 max-w-full"
          >
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] sm:tracking-[0.28em] text-gold-400 mb-3 sm:mb-5">
              Leadership
            </p>
            <h2 className="font-display text-[clamp(2rem,8vw,3.85rem)] sm:text-5xl md:text-[3.25rem] lg:text-[3.65rem] xl:text-[3.85rem] font-semibold text-stone-50 leading-[1.08] break-words">
              {company.founder}
            </h2>
            <p className="mt-3.5 sm:mt-4 text-[11px] sm:text-[13px] md:text-sm uppercase tracking-[0.12em] sm:tracking-[0.15em] text-gold-400/90 break-words leading-relaxed">
              {company.designation} · {company.name}
            </p>
            <p className="mt-6 md:mt-8 text-stone-300/90 leading-[1.7] max-w-xl lg:max-w-[36rem] text-[15px] sm:text-base break-words">
              Under the leadership of {company.founder}, {company.name} stands for
              trust, quality and on-time completion across construction projects in
              Pune.
            </p>

            <div className="mt-8 md:mt-11 space-y-6 md:space-y-7 min-w-0">
              <blockquote className="border-l-[2px] border-gold-500 pl-4 sm:pl-5 md:pl-6 min-w-0">
                <Quote className="h-5 w-5 text-gold-400 mb-3 opacity-80" />
                <p className="font-display text-[1.25rem] sm:text-2xl md:text-[1.85rem] text-stone-50 italic leading-snug break-words">
                  “{company.founderQuote}”
                </p>
              </blockquote>
              <p className="font-display text-base sm:text-lg md:text-[1.35rem] text-stone-400 italic leading-snug break-words">
                “{company.brandMessage}”
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
