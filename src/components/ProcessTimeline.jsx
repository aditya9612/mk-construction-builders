import { motion } from 'framer-motion'
import { processSteps, processDisclaimer } from '../data/process'

export default function ProcessTimeline() {
  return (
    <div className="min-w-0 w-full">
      <p className="mb-10 md:mb-12 text-[14px] text-navy-700/70 max-w-3xl leading-relaxed border-l-[2px] border-gold-500 pl-4 sm:pl-5 break-words">
        {processDisclaimer}
      </p>
      <div className="relative">
        <div className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-px bg-stone-200 md:-translate-x-px" />
        <div className="space-y-8 md:space-y-14">
          {processSteps.map((step, index) => {
            const left = index % 2 === 0
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12"
              >
                <div
                  className={`pl-10 sm:pl-12 md:pl-0 min-w-0 ${left ? 'md:pr-10 md:text-right' : 'md:col-start-2 md:pl-10'}`}
                >
                  <div className="w-full bg-stone-50 border border-stone-200/90 p-5 sm:p-6 md:p-7 text-left shadow-[var(--shadow-soft)] min-w-0">
                    <span className="font-display text-3xl sm:text-4xl text-gold-500 font-semibold leading-none">
                      {step.number}
                    </span>
                    <h3 className="mt-3 font-display text-xl sm:text-2xl text-navy-900 font-semibold break-words">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] text-navy-700/70 leading-relaxed max-w-md break-words">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute left-3 sm:left-4 md:left-1/2 top-7 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-gold-500 ring-[6px] ring-stone-50" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
