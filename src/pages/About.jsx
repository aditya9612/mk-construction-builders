import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import FounderSection from '../components/FounderSection'
import SectionTitle from '../components/SectionTitle'
import StatCard from '../components/StatCard'
import { Link } from 'react-router-dom'
import { company } from '../data/company'
import { pageSeo } from '../data/seo'

export default function About() {
  const seo = pageSeo.about

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="About"
        title={`About ${company.name}`}
        subtitle={`${company.marathiTagline} — construction and builders based in Pune, Maharashtra.`}
        crumbs={[{ label: 'About' }]}
      />

      <section className="section-pad">
        <div className="container-arch">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-start">
            <div className="min-w-0">
              <SectionTitle
                title="Company Philosophy"
                subtitle={company.marathiTaglineEnglish}
              />
              <div className="space-y-4 text-navy-700/80 leading-relaxed break-words">
                <p>
                  {company.name} is a construction and builders company focused on
                  trust, quality and on-time completion across Pune.
                </p>
                <p>
                  Guided by the positioning “{company.marathiTagline}”, we approach
                  every project with clarity, professionalism and a commitment to
                  building futures that last.
                </p>
                <p>
                  Our verified focus includes {company.projects} projects and{' '}
                  {company.qualityChecks} quality checks — markers of a quality-first
                  construction practice for homeowners and project partners in
                  Maharashtra.
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <Link to="/services" className="btn-dark w-full sm:w-auto min-h-[50px]">
                  View our construction services
                </Link>
                <Link to="/projects" className="btn-ghost w-full sm:w-auto min-h-[50px]">
                  Explore our projects
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-w-0">
              <StatCard value={company.projects} label="Projects" variant="light" />
              <StatCard
                value={company.qualityChecks}
                label="Quality Checks"
                variant="light"
                index={1}
              />
              <StatCard value="Quality First" label="Philosophy" variant="light" index={2} />
              <StatCard value="On-Time Focus" label="Delivery" variant="light" index={3} />
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            <div className="border border-stone-200 bg-white p-6 sm:p-7 rounded-[14px] sm:rounded-none">
              <h3 className="font-display text-[1.5rem] sm:text-2xl text-navy-900 font-semibold">
                Mission
              </h3>
              <p className="mt-3 text-[15px] text-navy-700/80 leading-relaxed">
                To deliver construction solutions built on trust, quality workmanship
                and timely completion — turning client dreams into built reality.
              </p>
            </div>
            <div className="border border-stone-200 bg-white p-6 sm:p-7 rounded-[14px] sm:rounded-none">
              <h3 className="font-display text-[1.5rem] sm:text-2xl text-navy-900 font-semibold">
                Vision
              </h3>
              <p className="mt-3 text-[15px] text-navy-700/80 leading-relaxed">
                To be recognized in Pune for reliable, quality-focused construction
                that creates lasting futures for homeowners and project partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FounderSection />
    </>
  )
}
