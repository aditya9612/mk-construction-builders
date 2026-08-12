import { cn } from '../utils/formatters'
import { LineReveal, Reveal } from './motion/Reveal'

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className,
  noReveal = false,
}) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  const content = (
    <>
      {eyebrow && (
        <span
          className={cn(
            'text-[11px] tracking-[0.18em] sm:tracking-[0.28em] uppercase mb-3 sm:mb-4',
            light ? 'text-gold-400' : 'text-gold-600',
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'section-title-heading font-display text-[clamp(2rem,8vw,3.15rem)] sm:text-4xl md:text-[2.75rem] lg:text-[3.15rem] font-semibold leading-tight text-balance break-words max-w-full',
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
      <LineReveal
        className={cn('mt-5 sm:mt-6', align === 'center' && 'mx-auto')}
        light={light}
        delay={noReveal ? 0 : 0.12}
      />
    </>
  )

  if (noReveal) {
    return (
      <div
        className={cn(
          'flex flex-col w-full min-w-0 max-w-3xl mb-10 md:mb-14 lg:mb-16',
          alignClass,
          className,
        )}
      >
        {content}
      </div>
    )
  }

  return (
    <Reveal
      direction="up"
      className={cn(
        'flex flex-col w-full min-w-0 max-w-3xl mb-10 md:mb-14 lg:mb-16',
        alignClass,
        className,
      )}
    >
      {content}
    </Reveal>
  )
}
