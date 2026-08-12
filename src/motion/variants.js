import { DURATION, DISTANCE, EASE, STAGGER } from './tokens'

const hidden = { opacity: 0 }

export const fadeUp = {
  hidden: { ...hidden, y: DISTANCE.lg },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, delay, ease: EASE },
  }),
}

export const fadeIn = {
  hidden: { ...hidden },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: DURATION.reveal, delay, ease: EASE },
  }),
}

export const revealLeft = {
  hidden: { ...hidden, x: -DISTANCE.md },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.reveal, delay, ease: EASE },
  }),
}

export const revealRight = {
  hidden: { ...hidden, x: DISTANCE.md },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.reveal, delay, ease: EASE },
  }),
}

export const scaleIn = {
  hidden: { ...hidden, scale: 0.96 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.image, delay, ease: EASE },
  }),
}

export const imageReveal = {
  hidden: { scale: 1.06 },
  visible: (delay = 0) => ({
    scale: 1,
    transition: { duration: DURATION.hero, delay, ease: EASE },
  }),
}

export const lineReveal = {
  hidden: { scaleX: 0, opacity: 0.6 },
  visible: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: DURATION.line, delay, ease: EASE },
  }),
}

export const staggerContainer = (stagger = STAGGER.normal, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const staggerItem = {
  hidden: { ...hidden, y: DISTANCE.sm },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: EASE },
  },
}

export const heroBackground = {
  hidden: { scale: 1.08, opacity: 0.85 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: DURATION.hero + 0.2, ease: EASE },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.4, ease: EASE },
}

export const cardHover = {
  y: -4,
  transition: { duration: DURATION.card, ease: EASE },
}

export const DIRECTION_VARIANTS = {
  up: fadeUp,
  fade: fadeIn,
  left: revealLeft,
  right: revealRight,
  scale: scaleIn,
}
