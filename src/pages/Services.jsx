import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ServiceCard from '../components/ServiceCard'
import { pageSeo } from '../data/seo'
import useServices from '../hooks/useServices'

function ServiceGridSkeleton() {
  return (
    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-w-0 overflow-hidden bg-stone-50 border border-stone-200/80 rounded-[14px] sm:rounded-none"
        >
          <div className="aspect-[4/3] animate-pulse bg-stone-200" />
          <div className="p-6 space-y-3">
            <div className="h-6 w-2/3 animate-pulse bg-stone-200" />
            <div className="h-16 w-full animate-pulse bg-stone-200" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Services() {
  const seo = pageSeo.services
  const { items, loading, error, reload } = useServices()

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Services"
        title="Our Services"
        subtitle="Residential construction, house construction, renovation and building services for projects across Pune."
        crumbs={[{ label: 'Services' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <p className="mb-8 text-[15px] text-navy-700/75 max-w-3xl leading-relaxed">
            From planning and residential builds to renovation and commercial work,{' '}
            MK Construction &amp; Builders provides construction support with a focus on
            quality and clear communication.{' '}
            <Link to="/contact" className="text-gold-600 hover:text-gold-500 transition">
              Contact MK Construction &amp; Builders
            </Link>{' '}
            to discuss your project.
          </p>
          {error ? (
            <div className="mb-6 border border-stone-200 bg-white px-4 py-3 text-sm text-navy-700/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p>{error}</p>
              <button
                type="button"
                onClick={reload}
                className="min-h-11 px-4 text-[11px] uppercase tracking-[0.16em] border border-stone-200 hover:border-gold-500 hover:text-gold-600 transition"
              >
                Retry
              </button>
            </div>
          ) : loading && items.length === 0 ? (
            <ServiceGridSkeleton />
          ) : items.length === 0 ? (
            <div className="border border-dashed border-stone-300 bg-white p-12 text-center text-navy-700/70">
              No services have been published yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-5">
              {items.map((service, index) => (
                <div key={service.id} className="min-w-0">
                  <ServiceCard service={service} index={index} />
                </div>
              ))}
            </div>
          )}
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link to="/projects" className="btn-dark w-full sm:w-auto min-h-[50px]">
              Explore our projects
            </Link>
            <Link to="/request-quote" className="btn-ghost w-full sm:w-auto min-h-[50px]">
              Request a free quote
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
