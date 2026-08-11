import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import StatCard from '../components/StatCard'
import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import FounderSection from '../components/FounderSection'
import QualitySection from '../components/QualitySection'
import LocationsSection from '../components/LocationsSection'
import { company } from '../data/company'
import { services } from '../data/services'
import { projects } from '../data/projects'

export default function Home() {
  const featuredProjects = projects.slice(0, 6)
  const featuredServices = services.slice(0, 6)

  return (
    <>
      <Hero />

      <section className="relative z-10 -mt-8 sm:-mt-10 md:-mt-12 pb-6 md:pb-8">
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
                {company.name} delivers construction solutions in Pune with a clear
                focus on quality, trust and timely completion. With {company.projects}{' '}
                projects and {company.qualityChecks} quality checks reflecting our
                commitment, we turn building dreams into lasting realities.
              </p>
              <Link to="/about" className="mt-8 btn-dark">
                Learn more about us
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
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
                  alt={`${company.name} construction quality`}
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
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 max-w-md bg-gradient-to-l from-stone-200/40 to-transparent"
        />
        <div className="container-arch relative">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-2 min-w-0">
            <SectionTitle
              eyebrow="Services"
              title="Construction Capabilities"
              subtitle="Residential, commercial and specialty construction categories — shaped around quality execution and clear communication."
              className="mb-0 min-w-0"
            />
            <Link to="/services" className="btn-ghost shrink-0 self-start md:self-auto md:mb-2">
              View all services
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 mt-10">
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
              title="Work Across Pune"
              subtitle="Portfolio locations represented from company references. Project names will be updated when confirmed."
              className="mb-0 min-w-0"
            />
            <Link to="/projects" className="btn-ghost !text-gold-400 shrink-0 self-start md:self-auto md:mb-2">
              Explore projects
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 mt-10 md:mt-12">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="min-w-0">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderSection />
      <QualitySection />
      <LocationsSection />

      <section className="relative section-pad bg-navy-900">
        <div className="absolute inset-0 grain pointer-events-none" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,rgba(196,151,47,0.18),transparent_60%)]"
        />
        <div className="container-arch relative text-center min-w-0">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold-400 mb-5">
            Begin your project
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] text-stone-50 font-semibold text-balance max-w-3xl mx-auto leading-tight break-words px-1">
            Ready to build with trust and quality?
          </h2>
          <p className="mt-5 text-stone-300/90 max-w-xl mx-auto text-[15px] leading-relaxed break-words">
            Share your project requirements and our team will get back to you.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Link to="/request-quote" className="btn-primary">
              Get Free Quote
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
