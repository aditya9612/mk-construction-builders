import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Calculator from '../components/Calculator'
import { pageSeo } from '../data/seo'

export default function CalculatorPage() {
  const seo = pageSeo.calculator

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Estimator"
        title="Cost Calculator"
        subtitle="Share project inputs for a guided quotation discussion for construction in Pune. Rates are shared after site evaluation."
        crumbs={[{ label: 'Cost Calculator' }]}
      />
      <section className="section-pad">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-10 min-w-0">
          <Calculator />
        </div>
      </section>
    </>
  )
}
