import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import HousePlanCard from '../components/HousePlanCard'
import { housePlans } from '../data/housePlans'
import { pageSeo } from '../data/seo'

export default function HousePlans() {
  const seo = pageSeo.housePlans

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Plans"
        title="House Plans"
        subtitle="Plan categories for residential discussion in Pune. Area, layouts and pricing details available on request."
        crumbs={[{ label: 'House Plans' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {housePlans.map((plan, index) => (
              <div key={plan.id} className="min-w-0">
                <HousePlanCard plan={plan} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
