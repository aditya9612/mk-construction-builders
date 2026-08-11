import PageHero from '../components/PageHero'
import ServiceCard from '../components/ServiceCard'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Our Services"
        subtitle="Construction service categories on this website. Treat these as editable listings until confirmed as official offerings."
        crumbs={[{ label: 'Services' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <p className="mb-8 text-sm text-navy-700/70 border-l-2 border-gold-500 pl-4">
            Service details are configurable via{' '}
            <code className="text-xs bg-stone-100 px-1.5 py-0.5">src/data/services.js</code>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <div key={service.id} className="min-w-0">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
