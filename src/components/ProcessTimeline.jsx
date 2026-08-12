import { useCallback, useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import {
  Calculator,
  ClipboardCheck,
  HardHat,
  KeyRound,
  MapPin,
  MessageSquare,
  PenTool,
  ShieldCheck,
} from 'lucide-react'
import { processSteps, processDisclaimer } from '../data/process'
import { fadeUp } from '../motion/variants'
import { EASE } from '../motion/tokens'

const STEP_ICONS = [
  MessageSquare,
  MapPin,
  PenTool,
  Calculator,
  HardHat,
  ShieldCheck,
  ClipboardCheck,
  KeyRound,
]

const cardRevealLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
}

const cardRevealRight = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
}

const mobileCardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: EASE },
  }),
}

function ProcessStepImage({ step, isActive, reduceMotion, enableParallax }) {
  const imageWrapRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: imageWrapRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [8, -8])

  return (
    <motion.div
      className="process-step-card__image-wrap"
      initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.75, ease: EASE }}
    >
      <div className="process-step-card__image-inner" ref={imageWrapRef}>
        <motion.img
          src={step.image}
          alt={step.imageAlt}
          loading="lazy"
          decoding="async"
          style={{
            objectPosition: step.objectPosition ?? 'center',
            y: reduceMotion || !enableParallax ? 0 : parallaxY,
          }}
          className={`process-step-card__image${isActive ? ' process-step-card__image--active' : ''}`}
          onError={(event) => {
            event.currentTarget.src = '/images/about.webp'
            event.currentTarget.alt = 'MK Construction project photograph'
          }}
        />
        <span className="process-step-card__image-overlay" aria-hidden />
      </div>
    </motion.div>
  )
}

function ProcessStepCard({
  step,
  index,
  isActive,
  align = 'left',
  mobile = false,
  reduceMotion,
}) {
  const Icon = STEP_ICONS[index] ?? MessageSquare
  const staggerBase = index * 0.06
  const cardVariants = mobile
    ? mobileCardReveal
    : align === 'left'
      ? cardRevealLeft
      : cardRevealRight

  return (
    <motion.article
      data-process-step={step.id}
      variants={cardVariants}
      custom={staggerBase}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: mobile ? '-32px' : '-60px' }}
      className={`process-step-card group${isActive ? ' process-step-card--active' : ''}${mobile ? ' process-step-card--mobile' : ''}`}
    >
      <ProcessStepImage
        step={step}
        isActive={isActive}
        reduceMotion={reduceMotion}
        enableParallax={!mobile}
      />

      <div className="process-step-card__body">
        <motion.span
          className={`process-step-card__icon${isActive ? ' process-step-card__icon--active' : ''}`}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: isActive ? -3 : 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: staggerBase + 0.18, ease: EASE }}
          aria-hidden
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </motion.span>

        <motion.span
          className={`process-step-card__number font-display font-semibold leading-none${isActive ? ' process-step-card__number--active' : ''}`}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: isActive ? -8 : 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: staggerBase + 0.22, ease: EASE }}
        >
          {step.number}
        </motion.span>

        <motion.h3
          className="process-step-card__title font-display font-semibold break-words uppercase tracking-wide"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: staggerBase + 0.3, ease: EASE }}
        >
          {step.title}
        </motion.h3>

        <motion.p
          className="process-step-card__description break-words"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: staggerBase + 0.38, ease: EASE }}
        >
          {step.description}
        </motion.p>
      </div>
    </motion.article>
  )
}

function ProcessTimelineDot({ index, isActive, reduceMotion, mobile = false }) {
  return (
    <motion.span
      initial={reduceMotion ? false : { scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 + 0.15, duration: 0.4, ease: EASE }}
      className={`process-timeline__dot${isActive ? ' process-timeline__dot--active' : ''}${mobile ? ' process-timeline__dot--mobile' : ''}`}
      aria-hidden
    />
  )
}

function ProcessStepObserver({ index, onActive, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.6, margin: '-18% 0px -18% 0px' })

  useEffect(() => {
    if (inView) {
      onActive(index)
    }
  }, [inView, index, onActive])

  return <div ref={ref}>{children}</div>
}

export default function ProcessTimeline() {
  const sectionRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  const handleStepActive = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.75', 'end 0.25'],
  })
  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const disclaimerInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <div ref={sectionRef} className="process-timeline min-w-0 w-full">
      <motion.p
        variants={fadeUp}
        custom={0}
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true }}
        className="process-timeline__disclaimer mb-10 md:mb-12 text-[14px] sm:text-[15px] text-navy-700/70 max-w-3xl leading-relaxed border-l-[2px] border-gold-500 pl-4 sm:pl-5 break-words"
      >
        {processDisclaimer}
      </motion.p>

      {/* Mobile: single-column timeline */}
      <div className="process-timeline__mobile md:hidden relative pl-1">
        <div className="process-timeline__track process-timeline__track--mobile" aria-hidden>
          <div className="process-timeline__track-bg" />
          {!reduceMotion ? (
            <motion.div className="process-timeline__track-progress" style={{ height: progressHeight }} />
          ) : (
            <div
              className={`process-timeline__track-progress${disclaimerInView ? ' process-timeline__track-progress--visible' : ''}`}
            />
          )}
        </div>

        <ol className="space-y-8">
          {processSteps.map((step, index) => (
            <ProcessStepObserver key={step.id} index={index} onActive={handleStepActive}>
              <li className="relative pl-12">
                <ProcessTimelineDot
                  index={index}
                  isActive={activeIndex === index}
                  reduceMotion={reduceMotion}
                  mobile
                />
                <ProcessStepCard
                  step={step}
                  index={index}
                  isActive={activeIndex === index}
                  mobile
                  reduceMotion={reduceMotion}
                />
              </li>
            </ProcessStepObserver>
          ))}
        </ol>
      </div>

      {/* Desktop: alternating timeline */}
      <div className="process-timeline__desktop relative hidden md:block">
        <div className="process-timeline__track process-timeline__track--desktop" aria-hidden>
          <div className="process-timeline__track-bg" />
          {!reduceMotion ? (
            <motion.div className="process-timeline__track-progress" style={{ height: progressHeight }} />
          ) : (
            <div
              className={`process-timeline__track-progress${disclaimerInView ? ' process-timeline__track-progress--visible' : ''}`}
            />
          )}
        </div>

        <div className="space-y-14">
          {processSteps.map((step, index) => {
            const left = index % 2 === 0
            return (
              <ProcessStepObserver key={step.id} index={index} onActive={handleStepActive}>
                <div className="relative grid grid-cols-2 gap-12">
                  <div className={`min-w-0 ${left ? 'pr-10' : 'col-start-2 pl-10'}`}>
                    <ProcessStepCard
                      step={step}
                      index={index}
                      isActive={activeIndex === index}
                      align={left ? 'left' : 'right'}
                      reduceMotion={reduceMotion}
                    />
                  </div>
                  <ProcessTimelineDot
                    index={index}
                    isActive={activeIndex === index}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </ProcessStepObserver>
            )
          })}
        </div>
      </div>
    </div>
  )
}
