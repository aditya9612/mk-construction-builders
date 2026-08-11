import PageHero from '../components/PageHero'
import ProcessTimeline from '../components/ProcessTimeline'

export default function Process() {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        title="Our Construction Approach"
        subtitle="A clear, step-by-step view of how we organize construction work from discussion to handover."
        crumbs={[{ label: 'Process' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <ProcessTimeline />
        </div>
      </section>
    </>
  )
}
