import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../utils/formatters'
import {
  DIRECTION_VARIANTS,
  lineReveal,
  staggerContainer as staggerContainerVariant,
  staggerItem,
} from '../../motion/variants'
import { VIEWPORT } from '../../motion/tokens'

export function Reveal({
  children,
  as: Component = motion.div,
  direction = 'up',
  delay = 0,
  duration,
  className,
  viewport = VIEWPORT,
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const variants = DIRECTION_VARIANTS[direction] ?? DIRECTION_VARIANTS.up

  if (reduceMotion) {
    return <div className={className} data-reveal {...props}>{children}</div>
  }

  const transition = duration
    ? { duration, delay, ease: [0.22, 1, 0.36, 1] }
    : undefined

  return (
    <Component
      data-reveal
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}

export function StaggerContainer({ children, className, stagger, delayChildren = 0, ...props }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className} data-reveal {...props}>{children}</div>
  }

  return (
    <motion.div
      data-reveal
      variants={staggerContainerVariant(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, ...props }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className} {...props}>{children}</div>
  }

  return (
    <motion.div variants={staggerItem} className={className} {...props}>
      {children}
    </motion.div>
  )
}

export function LineReveal({ className, delay = 0, light = false }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <span className={cn('arch-rule block', light && 'bg-gold-400/80', className)} aria-hidden />
  }

  return (
    <motion.span
      data-reveal
      custom={delay}
      variants={lineReveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn(
        'arch-rule block origin-left',
        light && 'bg-gold-400/80',
        className,
      )}
      aria-hidden
    />
  )
}

export function ImageReveal({ children, className, direction = 'scale', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={cn('image-reveal overflow-hidden', className)}>{children}</div>
  }

  return (
    <Reveal
      as={motion.div}
      direction={direction}
      delay={delay}
      className={cn('image-reveal overflow-hidden', className)}
    >
      {children}
    </Reveal>
  )
}
