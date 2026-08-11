import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import PageHero from '../components/PageHero'
import { testimonials } from '../data/testimonials'

function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0)
  const current = items[index]

  useEffect(() => {
    if (items.length <= 1) return undefined
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, 7000)
    return () => window.clearInterval(id)
  }, [items.length])

  const go = (dir) => {
    setIndex((i) => (i + dir + items.length) % items.length)
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={current.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="border border-stone-200 bg-white rounded-[16px] p-6 sm:p-8 md:p-10 shadow-[var(--shadow-soft)] min-h-[220px]"
        >
          {current.rating != null && (
            <div className="flex gap-1 mb-4" aria-label={`Rated ${current.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < current.rating ? 'text-gold-500 fill-gold-500' : 'text-stone-300'}`}
                />
              ))}
            </div>
          )}
          <p className="font-display text-xl sm:text-2xl text-navy-900 leading-snug break-words">
            “{current.quote}”
          </p>
          <footer className="mt-6">
            <p className="text-[14px] font-medium text-navy-900">{current.name}</p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.14em] text-navy-700/55">
              {[current.role, current.location].filter(Boolean).join(' · ')}
            </p>
          </footer>
        </motion.blockquote>
      </AnimatePresence>

      {items.length > 1 && (
        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="h-11 w-11 inline-flex items-center justify-center border border-stone-200 text-navy-800 hover:border-gold-500 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Testimonials">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  i === index ? 'bg-gold-500' : 'bg-stone-300'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="h-11 w-11 inline-flex items-center justify-center border border-stone-200 text-navy-800 hover:border-gold-500 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function Testimonials() {
  return (
    <>
      <PageHero
        eyebrow="Voice of Clients"
        title="Testimonials"
        subtitle="Client feedback will appear here once provided."
        crumbs={[{ label: 'Testimonials' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          {testimonials.length === 0 ? (
            <div className="border border-dashed border-stone-300 bg-white p-8 sm:p-12 md:p-16 text-center rounded-[14px] sm:rounded-none">
              <p className="font-display text-[clamp(1.5rem,6vw,2.5rem)] text-navy-900 leading-snug">
                Client testimonials will be added here.
              </p>
              <p className="mt-4 text-sm text-navy-700/70 leading-relaxed">
                Add entries to{' '}
                <code className="bg-stone-100 px-1.5 py-0.5 text-xs break-all">
                  src/data/testimonials.js
                </code>{' '}
                when available.
              </p>
            </div>
          ) : (
            <>
              <div className="md:hidden">
                <TestimonialCarousel items={testimonials} />
              </div>
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {testimonials.map((t) => (
                  <blockquote
                    key={t.id}
                    className="border border-stone-200 bg-white p-6"
                  >
                    <p className="text-navy-800 leading-relaxed">“{t.quote}”</p>
                    <footer className="mt-4 text-sm text-navy-700/70">
                      — {t.name}
                      {t.location ? `, ${t.location}` : ''}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
