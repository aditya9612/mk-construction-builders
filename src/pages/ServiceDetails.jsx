import { Link, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { getServiceById, services } from '../data/services'

export default function ServiceDetails() {
  const { id } = useParams()
  const service = getServiceById(id)

  if (!service) {
    return (
      <>
        <PageHero title="Service not found" crumbs={[{ label: 'Services', to: '/services' }, { label: 'Not found' }]} />
        <div className="container-arch py-16 text-center">
          <p className="text-navy-700/80">This service category does not exist.</p>
          <Link to="/services" className="mt-4 inline-block text-gold-600">
            Back to services
          </Link>
        </div>
      </>
    )
  }

  const related = services.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        subtitle={service.description}
        crumbs={[
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
      />
      <section className="section-pad">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 min-w-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full aspect-[4/3] object-cover border border-stone-200"
          />
          <div>
            <h2 className="font-display text-3xl text-navy-900 font-semibold">
              Overview
            </h2>
            <p className="mt-4 text-navy-700/80 leading-relaxed">
              {service.description}
            </p>
            {service.features?.length > 0 && (
              <ul className="mt-6 space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex gap-2 text-navy-800">
                    <span className="text-gold-500">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            )}
            <Link
              to="/request-quote"
              className="mt-8 inline-flex bg-gold-500 hover:bg-gold-400 text-navy-950 px-6 py-3 font-medium transition"
            >
              Request Quote
            </Link>
          </div>
        </div>
        {related.length > 0 && (
          <div className="container-arch mt-16">
            <h3 className="font-display text-2xl text-navy-900 mb-6">
              Related services
            </h3>
            <div className="flex flex-wrap gap-3">
              {related.map((s) => (
                <Link
                  key={s.id}
                  to={`/services/${s.id}`}
                  className="border border-stone-200 px-4 py-2 text-sm hover:border-gold-500 transition"
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
