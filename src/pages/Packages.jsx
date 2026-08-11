import PageHero from '../components/PageHero'
import PackageCard from '../components/PackageCard'
import { packages } from '../data/pricing'

export default function Packages() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Construction Packages"
        subtitle="Editable package cards. Prices remain available on request until official rates are provided."
        crumbs={[{ label: 'Packages' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className="min-w-0">
                <PackageCard pkg={pkg} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
