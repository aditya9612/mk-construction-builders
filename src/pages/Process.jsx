import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ProcessTimeline from '../components/ProcessTimeline'
import { Link } from 'react-router-dom'
import { pageSeo } from '../data/seo'

export default function Process() {
  const seo = pageSeo.process

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Approach"
        title="Our Process"
        subtitle="A clear, step-by-step view of how MK Construction & Builders organizes construction work in Pune — from discussion to handover."
        crumbs={[{ label: 'Process' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <ProcessTimeline />
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
