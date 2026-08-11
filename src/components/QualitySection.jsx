import { motion } from 'framer-motion'
import { ShieldCheck, Clock3, Handshake, ClipboardCheck, MessageSquare } from 'lucide-react'
import SectionTitle from './SectionTitle'
import { company } from '../data/company'

const pillars = [
  {
    icon: ClipboardCheck,
    title: 'Quality-focused execution',
    text: 'Every stage prioritizes workmanship and material integrity.',
  },
  {
    icon: ShieldCheck,
    title: `${company.qualityChecks} Quality Checks`,
    text: 'Verified quality-check focus across projects.',
  },
  {
    icon: Handshake,
    title: 'Professional project handling',
    text: 'Structured communication and accountable site execution.',
  },
  {
    icon: MessageSquare,
    title: 'Transparent communication',
    text: 'Clear updates so clients stay informed throughout the build.',
  },
  {
    icon: Clock3,
    title: 'Timely completion focus',
    text: 'On-time delivery remains a core company commitment.',
  },
]

export default function QualitySection({
  compact = false,
  eyebrow = 'Quality',
  title = 'Quality Is Our Foundation',
  subtitle = `${company.marathiTaglineEnglish} With ${company.qualityChecks} quality checks as a verified benchmark of our focus.`,
}) {
  return (
    <section className={compact ? 'section-pad' : 'section-pad bg-stone-100'}>
      <div className="container-arch">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-start">
          <div className="min-w-0 w-full">
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              subtitle={subtitle}
            />
            <div className="arch-frame w-full">
              <div className="image-reveal aspect-[4/3] w-full">
                <img
                  src={company.images.quality}
                  alt="Quality-focused construction workmanship by MK Construction & Builders"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="space-y-3 md:pt-4 min-w-0 w-full">
            {pillars.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.45 }}
                  className="flex gap-3 sm:gap-4 bg-stone-50 border border-stone-200/80 p-4 sm:p-5 md:p-6 transition-shadow duration-300 hover:shadow-[var(--shadow-soft)] min-w-0"
                >
                  <div className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 flex items-center justify-center bg-navy-900 text-gold-400">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg sm:text-xl text-navy-900 font-semibold break-words">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-navy-700/70 leading-relaxed break-words">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
