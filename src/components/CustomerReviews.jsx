import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import SectionTitle from './SectionTitle'
import Lightbox from './Lightbox'
import { Reveal } from './motion/Reveal'
import { reviews } from '../data/reviews'
import { fadeUp } from '../motion/variants'
import { EASE, DURATION } from '../motion/tokens'

const CARD_STAGGER = 0.08

export default function CustomerReviews({
  showCta = true,
  showTitle = true,
  className = 'section-pad bg-stone-50',
  title = 'What Our Customers Say',
  subtitle = 'Real feedback from customers who experienced MK Construction & Builders.',
  eyebrow = 'Customer Reviews',
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const reduceMotion = useReducedMotion()

  const lightboxItems = useMemo(
    () => reviews.map((review) => ({ id: review.id, src: review.image, caption: review.source })),
    [],
  )

  if (reviews.length === 0) return null

  return (
    <section className={className}>
      <div className="container-arch min-w-0">
        {showTitle && (
          <SectionTitle eyebrow={eyebrow} title={title} subtitle={subtitle} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review, index) => (
            <motion.button
              key={review.id}
              type="button"
              variants={fadeUp}
              custom={index * CARD_STAGGER}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ duration: DURATION.reveal, ease: EASE }}
              onClick={() => setLightboxIndex(index)}
              className="group w-full min-w-0 text-left bg-white border border-stone-200/80 rounded-xl p-4 sm:p-5 shadow-[var(--shadow-soft)] hover-lift transition-shadow duration-300 hover:shadow-[var(--shadow-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
              aria-label={`View ${review.source.toLowerCase()} screenshot ${index + 1}`}
            >
              <span className="inline-block mb-3 text-[10px] uppercase tracking-[0.16em] text-navy-700/55 bg-stone-100 border border-stone-200/80 px-2.5 py-1 rounded-md">
                {review.source}
              </span>
              <div className="w-full overflow-hidden rounded-lg bg-stone-50 border border-stone-100">
                <img
                  src={review.image}
                  alt={review.alt}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.button>
          ))}
        </div>

        {showCta && (
          <Reveal direction="up" className="mt-12 md:mt-14 text-center min-w-0">
            <p className="font-display text-[clamp(1.35rem,5vw,1.85rem)] text-navy-900 font-semibold text-balance break-words">
              Want to build your dream home?
            </p>
            <div className="mt-6">
              <Link to="/request-quote" className="btn-primary w-full sm:w-auto min-h-[50px]">
                Get Free Quote
              </Link>
            </div>
          </Reveal>
        )}
      </div>

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((i) => (i == null ? i : (i - 1 + reviews.length) % reviews.length))
        }
        onNext={() =>
          setLightboxIndex((i) => (i == null ? i : (i + 1) % reviews.length))
        }
      />
    </section>
  )
}
