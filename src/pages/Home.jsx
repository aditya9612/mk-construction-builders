import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import Seo from '../components/Seo'
import SectionTitle from '../components/SectionTitle'
import StatCard from '../components/StatCard'
import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import FounderSection from '../components/FounderSection'
import QualitySection from '../components/QualitySection'
import LocationsSection from '../components/LocationsSection'
import ProcessTimeline from '../components/ProcessTimeline'
import { company } from '../data/company'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { pageSeo } from '../data/seo'

const puneServices = [
  {
    title: 'Residential construction',
    text: 'End-to-end home building with clear planning, quality materials focus and structured site supervision.',
  },
  {
    title: 'House construction',
    text: 'Complete house construction support — from layout discussion and estimation through execution and handover.',
  },
  {
    title: 'Building construction',
    text: 'Building projects managed with professional handling, transparent communication and quality checks.',
  },
  {
    title: 'Renovation',
    text: 'Renovation and upgrade work for existing homes and spaces, planned around site conditions and timelines.',
  },
  {
    title: 'Project planning & site execution',
    text: 'Requirement discussion, planning coordination and disciplined on-site execution for predictable progress.',
  },
  {
    title: 'Quality & timely completion',
    text: 'Quality-focused construction with an emphasis on trust and on-time delivery across Pune projects.',
  },
]

export default function Home() {
  const featuredProjects = projects.slice(0, 6)
  const featuredServices = services.slice(0, 6)
  const seo = pageSeo.home

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        includeBusinessSchema
      />

      <Hero />

      <section className="stats-band relative z-10 pb-6 md:pb-8">
        <div className="container-arch">
          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <div className="min-w-0">
              <StatCard value={company.projects} label="Projects" index={0} />
            </div>
            <div className="min-w-0">
              <StatCard
                value={company.qualityChecks}
                label="Quality Checks"
                index={1}
              />
            </div>
            <div className="min-w-0">
              <StatCard value="Quality First" label="Our Priority" index={2} />
            </div>
            <div className="min-w-0">
              <StatCard value="On-Time Focus" label="Delivery Promise" index={3} />
            </div>
            <div className="min-w-0 min-[420px]:col-span-2 lg:col-span-1">
              <StatCard value="Customer Trust" label="Core Value" index={4} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-arch">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="min-w-0 max-w-full">
              <SectionTitle
                eyebrow="About Us"
                title={`About ${company.name}`}
                subtitle={company.marathiTagline}
              />
              <p className="text-navy-700/75 leading-relaxed text-[15px] break-words">
                {company.marathiTaglineEnglish}
              </p>
              <p className="mt-4 text-navy-700/75 leading-relaxed text-[15px] break-words">
                {company.name} delivers construction solutions in Pune, Maharashtra
                with a clear focus on quality, trust and timely completion. With{' '}
                {company.projects} projects and {company.qualityChecks} quality checks
                reflecting our commitment, we turn building dreams into lasting realities.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/about" className="btn-dark w-full sm:w-auto min-h-[50px]">
                  Learn more about us
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </Link>
                <Link to="/services" className="btn-ghost w-full sm:w-auto min-h-[50px]">
                  View our construction services
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="arch-frame min-w-0 w-full"
            >
              <div className="image-reveal aspect-[4/3] w-full">
                <img
                  src={company.images.about}
                  alt={`${company.name} residential building project in Pune`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-stone-100 relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 max-w-md bg-gradient-to-l from-stone-200/40 to-transparent hidden md:block"
        />
        <div className="container-arch relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2 min-w-0">
            <SectionTitle
              eyebrow="Services"
              title="Our Services"
              subtitle="Residential, commercial and specialty construction categories — shaped around quality execution and clear communication."
              className="mb-0 min-w-0"
            />
            <Link to="/services" className="btn-ghost shrink-0 self-start md:self-auto md:mb-2 min-h-11">
              View our construction services
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mt-10">
            {featuredServices.map((service, index) => (
              <div key={service.id} className="min-w-0">
                <ServiceCard service={service} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-navy-950 relative">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="container-arch relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 min-w-0">
            <SectionTitle
              light
              eyebrow="Projects"
              title="Our Projects"
              subtitle="A selection of construction projects represented across Pune. Explore the portfolio for residential, house and bungalow work."
              className="mb-0 min-w-0"
            />
            <Link to="/projects" className="btn-ghost !text-gold-400 shrink-0 self-start md:self-auto md:mb-2 min-h-11">
              Explore our projects
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 mt-10 md:mt-12">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="min-w-0">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/gallery" className="text-gold-400 hover:text-gold-300 text-[13px] uppercase tracking-[0.16em] min-h-11 inline-flex items-center">
              Browse project gallery
            </Link>
            <Link to="/packages" className="text-stone-300 hover:text-gold-400 text-[13px] uppercase tracking-[0.16em] min-h-11 inline-flex items-center">
              View construction packages
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-arch">
          <SectionTitle
            eyebrow="Local expertise"
            title="Construction Services in Pune"
            subtitle={`${company.name} supports homeowners and project partners across Pune with practical construction solutions — from planning to site execution.`}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {puneServices.map((item) => (
              <article
                key={item.title}
                className="border border-stone-200 bg-white p-6 sm:p-7 rounded-[14px] sm:rounded-none min-w-0"
              >
                <h3 className="font-display text-[1.35rem] sm:text-xl text-navy-900 font-semibold break-words">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] sm:text-[15px] text-navy-700/75 leading-relaxed break-words">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-navy-700/75 leading-relaxed max-w-3xl">
            Whether you need a new home, renovation support or a building contractor
            in Pune, our team focuses on clear communication, quality workmanship and
            timely completion. Looking ahead?{' '}
            <Link to="/contact" className="text-gold-600 hover:text-gold-500 transition">
              Contact MK Construction &amp; Builders
            </Link>{' '}
            to discuss your site and requirements.
          </p>
        </div>
      </section>

      <section className="section-pad bg-stone-50">
        <div className="container-arch">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2 min-w-0">
            <SectionTitle
              eyebrow="Approach"
              title="Our Process"
              subtitle="A clear path from the first discussion to project handover — planned for homeowners building in Pune."
              className="mb-0 min-w-0"
            />
            <Link to="/process" className="btn-ghost shrink-0 self-start md:self-auto md:mb-2 min-h-11">
              See full construction process
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-10">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <FounderSection />

      <QualitySection
        eyebrow="Why choose us"
        title="Why Choose MK Construction"
        subtitle={`${company.marathiTaglineEnglish} With ${company.qualityChecks} quality checks as a verified benchmark of our focus across Pune projects.`}
      />

      <LocationsSection />

      <section className="relative section-pad bg-navy-900">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(196,151,47,0.18),transparent_60%)]"
        />
        <div className="container-arch relative text-center min-w-0">
          <p className="text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.28em] text-gold-400 mb-5">
            Begin your project
          </p>
          <h2 className="font-display text-[clamp(1.85rem,7vw,3.4rem)] text-stone-50 font-semibold text-balance max-w-3xl mx-auto leading-tight break-words px-1">
            Contact MK Construction &amp; Builders
          </h2>
          <p className="mt-5 text-stone-300/90 max-w-xl mx-auto text-[15px] leading-relaxed break-words">
            Share your project requirements and our Pune team will get back to you
            with the next steps.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link to="/request-quote" className="btn-primary w-full sm:w-auto min-h-[50px]">
              Get Free Quote
            </Link>
            <Link to="/contact" className="btn-secondary w-full sm:w-auto min-h-[50px]">
              Contact MK Construction &amp; Builders
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
