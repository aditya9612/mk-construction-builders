import PageHero from '../components/PageHero'
import Calculator from '../components/Calculator'

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        eyebrow="Estimator"
        title="Cost Calculator"
        subtitle="Share project inputs for a guided quotation discussion. Rates are shared after site evaluation."
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
