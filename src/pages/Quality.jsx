import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import QualitySection from '../components/QualitySection'
import { company } from '../data/company'
import { pageSeo } from '../data/seo'

export default function Quality() {
  const seo = pageSeo.quality

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Standards"
        title="Quality & Materials"
        subtitle={`Quality-focused execution with ${company.qualityChecks} quality checks reflecting our commitment across Pune projects.`}
        crumbs={[{ label: 'Quality' }]}
      />
      <QualitySection
        compact
        title="Why Choose MK Construction"
        subtitle={`${company.marathiTaglineEnglish} With ${company.qualityChecks} quality checks as a verified benchmark of our focus.`}
      />
      <section className="pb-16 md:pb-24">
        <div className="container-arch">
          <div className="border border-stone-200 bg-white p-6 sm:p-8 md:p-10 min-w-0">
            <h2 className="font-display text-2xl sm:text-3xl text-navy-900 font-semibold break-words">
              Materials Discussion
            </h2>
            <p className="mt-4 text-navy-700/80 leading-relaxed max-w-3xl break-words">
              Material selections are discussed transparently based on project
              requirements, quality level and site conditions. Specific brand lists
              and certifications will be published here when confirmed by the company.
            </p>
            <Link
              to="/contact"
              className="mt-6 inline-flex text-gold-600 hover:text-gold-500 transition min-h-11 items-center"
            >
              Contact MK Construction &amp; Builders
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
