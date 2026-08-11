import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/services'
import { pageSeo } from '../data/seo'

export default function Services() {
  const seo = pageSeo.services

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
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <div key={service.id} className="min-w-0">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
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
