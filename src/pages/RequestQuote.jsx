import PageHero from '../components/PageHero'
import QuoteForm from '../components/QuoteForm'
import { company } from '../data/company'

export default function RequestQuote() {
  return (
    <>
      <PageHero
        eyebrow="Enquiry"
        title="Request a Quote"
        subtitle={`Tell us about your project and the ${company.shortName} team will get back to you.`}
        crumbs={[{ label: 'Request a Quote' }]}
      />
      <section className="section-pad">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 md:px-8 lg:px-10 min-w-0">
          <p className="mb-6 text-sm text-navy-700/80">
            Call Us:{' '}
            <a
              href={`tel:${company.phone}`}
              className="text-gold-600 hover:text-gold-500 transition"
            >
              {company.displayPhone}
            </a>
            <br />
            Email:{' '}
            <a
              href={`mailto:${company.email}`}
              className="text-gold-600 hover:text-gold-500 transition"
            >
              {company.email}
            </a>
          </p>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}
