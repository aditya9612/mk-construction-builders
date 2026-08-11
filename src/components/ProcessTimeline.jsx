import { motion } from 'framer-motion'
import { processSteps, processDisclaimer } from '../data/process'

export default function ProcessTimeline() {
  return (
    <div className="min-w-0 w-full">
      <p className="mb-10 md:mb-12 text-[14px] sm:text-[15px] text-navy-700/70 max-w-3xl leading-relaxed border-l-[2px] border-gold-500 pl-4 sm:pl-5 break-words">
        {processDisclaimer}
      </p>

      {/* Mobile: clean vertical timeline */}
      <div className="md:hidden relative pl-1">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-stone-200" aria-hidden />
        <ol className="space-y-8">
          {processSteps.map((step, index) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12"
            >
              <span
                className="pointer-events-none absolute left-[15px] top-5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold-500 ring-[5px] ring-stone-50"
                aria-hidden
              />
              <article className="w-full bg-stone-50 border border-stone-200/90 rounded-[14px] p-5 shadow-[var(--shadow-soft)] min-w-0">
                <span className="font-display text-[2rem] text-gold-500 font-semibold leading-none">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-[1.25rem] text-navy-900 font-semibold break-words uppercase tracking-wide">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[14px] text-navy-700/70 leading-relaxed break-words">
                  {step.description}
                </p>
                {index < processSteps.length - 1 && (
                  <span className="sr-only">Next step</span>
                )}
              </article>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Desktop / tablet: alternating timeline */}
      <div className="relative hidden md:block">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-stone-200 -translate-x-px" />
        <div className="space-y-14">
          {processSteps.map((step, index) => {
            const left = index % 2 === 0
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-2 gap-12"
              >
                <div
                  className={`min-w-0 ${left ? 'pr-10 text-right' : 'col-start-2 pl-10'}`}
                >
                  <div className="w-full bg-stone-50 border border-stone-200/90 p-7 text-left shadow-[var(--shadow-soft)] min-w-0">
                    <span className="font-display text-4xl text-gold-500 font-semibold leading-none">
                      {step.number}
                    </span>
                    <h3 className="mt-3 font-display text-2xl text-navy-900 font-semibold break-words">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] text-navy-700/70 leading-relaxed max-w-md break-words">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute left-1/2 top-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold-500 ring-[6px] ring-stone-50" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
