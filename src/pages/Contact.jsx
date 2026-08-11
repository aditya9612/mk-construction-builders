import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import { company } from '../data/company'

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get in Touch"
        subtitle="Share your project details and we will respond with next steps."
        crumbs={[{ label: 'Contact' }]}
      />
      <section className="section-pad">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 min-w-0">
          <div className="bg-navy-950 text-stone-100 p-6 sm:p-7 md:p-8 min-w-0 rounded-[14px] sm:rounded-none">
            <h2 className="font-display text-[1.65rem] sm:text-3xl font-semibold break-words leading-snug">
              {company.name}
            </h2>
            <p className="mt-3 text-gold-400 italic font-display text-lg break-words">
              {company.tagline}
            </p>
            <dl className="mt-8 space-y-6 text-sm">
              <div>
                <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                  Phone
                </dt>
                <dd className="mt-2 text-stone-200 break-words">
                  <a
                    href={`tel:${company.phone}`}
                    className="inline-flex min-h-11 items-center hover:text-gold-400 transition text-[15px]"
                  >
                    {company.displayPhone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                  WhatsApp
                </dt>
                <dd className="mt-2 text-stone-200 break-words">
                  <a
                    href={`https://wa.me/${company.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center hover:text-gold-400 transition text-[15px]"
                  >
                    {company.displayPhone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                  Email
                </dt>
                <dd className="mt-2 text-stone-200 break-words">
                  <a
                    href={`mailto:${company.email}`}
                    className="inline-flex min-h-11 items-center hover:text-gold-400 transition text-[15px] break-all"
                  >
                    {company.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                  Location
                </dt>
                <dd className="mt-2 text-stone-200 break-words text-[15px] leading-relaxed">
                  Projects across {company.city}
                  <br />
                  {company.address}
                </dd>
              </div>
              <div>
                <dt className="uppercase tracking-[0.16em] text-stone-400 text-[11px]">
                  Instagram
                </dt>
                <dd className="mt-2">
                  <a
                    href={company.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-gold-400 hover:text-gold-300 break-words"
                  >
                    {company.instagram}
                  </a>
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-xs text-stone-500 leading-relaxed">
              Contact fields marked with brackets are placeholders until official
              details are provided.
            </p>
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-[1.65rem] sm:text-3xl text-navy-900 font-semibold mb-6 break-words">
              Enquiry Form
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
