import { motion } from 'framer-motion'
import { cn } from '../utils/formatters'

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className,
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex flex-col w-full min-w-0 max-w-3xl mb-10 md:mb-14 lg:mb-16',
        alignClass,
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            'text-[11px] tracking-[0.28em] uppercase mb-4',
            light ? 'text-gold-400' : 'text-gold-600',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-display text-[1.85rem] sm:text-4xl md:text-[2.75rem] lg:text-[3.15rem] font-semibold leading-tight text-balance break-words max-w-full',
          light ? 'text-stone-50' : 'text-navy-900',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 sm:mt-5 text-[15px] md:text-base leading-relaxed max-w-2xl break-words',
            light ? 'text-stone-300/90' : 'text-navy-700/70',
            align === 'center' && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          'mt-5 sm:mt-6 arch-rule',
          light && 'bg-gold-400/80',
          align === 'center' && 'mx-auto',
        )}
      />
    </motion.div>
  )
}
