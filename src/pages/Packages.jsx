import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import PackageCard from '../components/PackageCard'
import { packages } from '../data/pricing'
import { pageSeo } from '../data/seo'

export default function Packages() {
  const seo = pageSeo.packages

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Packages"
        title="Construction Packages"
        subtitle="Construction package options for residential and building projects in Pune. Final pricing is shared after project discussion."
        crumbs={[{ label: 'Packages' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <div className="grid grid-cols-1 min-[768px]:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className="min-w-0">
                <PackageCard pkg={pkg} index={index} />
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link to="/request-quote" className="btn-dark w-full sm:w-auto min-h-[50px]">
              Request a free quote
            </Link>
            <Link to="/services" className="btn-ghost w-full sm:w-auto min-h-[50px]">
              View our construction services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
