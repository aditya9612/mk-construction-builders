import PageHero from '../components/PageHero'
import { testimonials } from '../data/testimonials'

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
            <div className="border border-dashed border-stone-300 bg-white p-12 md:p-16 text-center">
              <p className="font-display text-2xl md:text-3xl text-navy-900">
                Client testimonials will be added here.
              </p>
              <p className="mt-4 text-sm text-navy-700/70">
                Add entries to{' '}
                <code className="bg-stone-100 px-1.5 py-0.5 text-xs">
                  src/data/testimonials.js
                </code>{' '}
                when available.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
          )}
        </div>
      </section>
    </>
  )
}
