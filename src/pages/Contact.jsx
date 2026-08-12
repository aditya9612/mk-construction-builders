import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import { Reveal, StaggerContainer, StaggerItem } from '../components/motion/Reveal'
import { company } from '../data/company'
import { pageSeo } from '../data/seo'
import { isPlaceholder } from '../utils/formatters'

export default function Contact() {
  const seo = pageSeo.contact

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        includeBusinessSchema
      />
      <PageHero
        eyebrow="Contact"
        title="Contact MK Construction & Builders"
        subtitle="Share your project details and our Pune team will respond with next steps."
        crumbs={[{ label: 'Contact' }]}
      />
      <section className="section-pad">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 min-w-0">
          <Reveal direction="left">
            <div className="bg-navy-950 text-stone-100 p-6 sm:p-7 md:p-8 min-w-0 rounded-[14px] sm:rounded-none hover-lift">
              <h2 className="font-display text-[1.65rem] sm:text-3xl font-semibold break-words leading-snug">
                {company.name}
              </h2>
              <p className="mt-3 text-gold-400 italic font-display text-lg break-words">
                {company.tagline}
              </p>
              <p className="mt-4 text-sm text-stone-300/90 leading-relaxed">
                Construction company serving homeowners and project partners across
                Pune, Maharashtra.
              </p>
              <StaggerContainer className="mt-8 space-y-6 text-sm" stagger={0.05}>
                <StaggerItem>
                  <dl>
                    <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                      Phone
                    </dt>
                    <dd className="mt-2 text-stone-200 break-words">
                      <a
                        href={`tel:${company.phone}`}
                        className="link-underline inline-flex min-h-11 items-center hover:text-gold-400 transition text-[15px]"
                      >
                        {company.displayPhone}
                      </a>
                    </dd>
                  </dl>
                </StaggerItem>
                <StaggerItem>
                  <dl>
                    <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                      WhatsApp
                    </dt>
                    <dd className="mt-2 text-stone-200 break-words">
                      <a
                        href={`https://wa.me/${company.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex min-h-11 items-center hover:text-gold-400 transition text-[15px]"
                      >
                        {company.displayPhone}
                      </a>
                    </dd>
                  </dl>
                </StaggerItem>
                <StaggerItem>
                  <dl>
                    <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                      Email
                    </dt>
                    <dd className="mt-2 text-stone-200 break-words">
                      <a
                        href={`mailto:${company.email}`}
                        className="link-underline inline-flex min-h-11 items-center hover:text-gold-400 transition text-[15px] break-all"
                      >
                        {company.email}
                      </a>
                    </dd>
                  </dl>
                </StaggerItem>
                <StaggerItem>
                  <dl>
                    <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                      Location
                    </dt>
                    <dd className="mt-2 text-stone-200 break-words text-[15px] leading-relaxed">
                      Projects across {company.city}, Maharashtra, India
                      {!isPlaceholder(company.address) && (
                        <>
                          <br />
                          {company.address}
                        </>
                      )}
                    </dd>
                  </dl>
                </StaggerItem>
                <StaggerItem>
                  <dl>
                    <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                      Instagram
                    </dt>
                    <dd className="mt-2">
                      <a
                        href={company.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex min-h-11 items-center text-gold-400 hover:text-gold-300 break-words"
                      >
                        {company.instagram}
                      </a>
                    </dd>
                  </dl>
                </StaggerItem>
              </StaggerContainer>
              <div className="mt-8 flex flex-col gap-3">
                <Link to="/services" className="link-underline text-gold-400 hover:text-gold-300 text-[13px] uppercase tracking-[0.14em] min-h-11 inline-flex items-center">
                  View our construction services
                </Link>
                <Link to="/projects" className="link-underline text-stone-300 hover:text-gold-400 text-[13px] uppercase tracking-[0.14em] min-h-11 inline-flex items-center">
                  Explore our projects
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.08} className="min-w-0">
            <h2 className="font-display text-[1.65rem] sm:text-3xl text-navy-900 font-semibold mb-6 break-words">
              Enquiry Form
            </h2>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}
