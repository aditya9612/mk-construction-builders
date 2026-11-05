import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import { pageSeo, serviceSeo } from '../data/seo'
import useService from '../hooks/useService'
import useServices from '../hooks/useServices'

function ServiceDetailsSkeleton() {
  return (
    <>
      <PageHero
        title="Loading service"
        crumbs={[
          { label: 'Services', to: '/services' },
          { label: 'Loading' },
        ]}
      />
      <section className="section-pad">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 min-w-0">
          <div className="w-full aspect-[4/3] animate-pulse bg-stone-200 border border-stone-200" />
          <div className="space-y-4">
            <div className="h-8 w-2/3 animate-pulse bg-stone-200" />
            <div className="h-20 w-full animate-pulse bg-stone-200" />
          </div>
        </div>
      </section>
    </>
  )
}

function ServiceNotFound() {
  return (
    <>
      <Seo
        title={pageSeo.notFound.title}
        description={pageSeo.notFound.description}
        path="/services"
        noindex
      />
      <PageHero
        title="Service not found"
        crumbs={[
          { label: 'Services', to: '/services' },
          { label: 'Not found' },
        ]}
      />
      <div className="container-arch py-16 text-center">
        <p className="text-navy-700/80">This service category does not exist.</p>
        <Link to="/services" className="mt-4 inline-block text-gold-600">
          View our construction services
        </Link>
      </div>
    </>
  )
}

export default function ServiceDetails() {
  const { id } = useParams()
  const { service, loading, error, reload } = useService(id)
  const { items: allServices } = useServices()

  if (loading && !service) {
    return (
      <>
        <Seo
          title={pageSeo.services.title}
          description={pageSeo.services.description}
          path="/services"
        />
        <ServiceDetailsSkeleton />
      </>
    )
  }

  if (!service) {
    if (error) {
      return (
        <>
          <Seo
            title={pageSeo.services.title}
            description={pageSeo.services.description}
            path="/services"
          />
          <PageHero
            title="Unable to load service"
            crumbs={[
              { label: 'Services', to: '/services' },
              { label: 'Error' },
            ]}
          />
          <div className="container-arch py-16 text-center">
            <p className="text-navy-700/80">{error}</p>
            <button
              type="button"
              onClick={reload}
              className="mt-4 min-h-11 px-4 text-[11px] uppercase tracking-[0.16em] border border-stone-200 hover:border-gold-500 hover:text-gold-600 transition"
            >
              Retry
            </button>
          </div>
        </>
      )
    }
    return <ServiceNotFound />
  }

  const seo = serviceSeo(service)
  const related = allServices.filter((item) => item.id !== service.id).slice(0, 3)

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
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
          {service.image ? (
            <img
              src={service.image}
              alt={`${service.title} by MK Construction & Builders in Pune`}
              className="w-full aspect-[4/3] object-cover border border-stone-200"
            />
          ) : (
            <div className="w-full aspect-[4/3] border border-dashed border-stone-300 bg-stone-50" />
          )}
          <div>
            <h2 className="font-display text-3xl text-navy-900 font-semibold">
              Overview
            </h2>
            <p className="mt-4 text-navy-700/80 leading-relaxed">
              {service.description} MK Construction &amp; Builders delivers this
              service for projects across Pune with a focus on quality and clear
              communication.
            </p>
            {service.features?.length > 0 && (
              <ul className="mt-6 space-y-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-navy-800">
                    <span className="text-gold-500">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/request-quote"
                className="inline-flex justify-center bg-gold-500 hover:bg-gold-400 text-navy-950 px-6 py-3 font-medium transition min-h-[50px] items-center"
              >
                Request Quote
              </Link>
              <Link
                to="/projects"
                className="inline-flex justify-center border border-stone-200 px-6 py-3 text-navy-900 hover:border-gold-500 transition min-h-[50px] items-center"
              >
                Explore our projects
              </Link>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <div className="container-arch mt-16">
            <h3 className="font-display text-2xl text-navy-900 mb-6">
              Related services
            </h3>
            <div className="flex flex-wrap gap-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/services/${item.id}`}
                  className="border border-stone-200 px-4 py-2 text-sm hover:border-gold-500 transition min-h-11 inline-flex items-center"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
