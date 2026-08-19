import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { locations, businessLocation } from '../data/locations'
import SectionTitle from './SectionTitle'
import { Reveal } from './motion/Reveal'
import { fadeUp } from '../motion/variants'
import { STAGGER } from '../motion/tokens'

export default function LocationsSection() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="section-pad bg-stone-50">
      <div className="container-arch">
        <SectionTitle
          eyebrow="Pune Presence"
          title="Projects Across Pune"
          subtitle="Locations represented in our project references across Pune."
          align="center"
        />

        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.id}
              variants={fadeUp}
              custom={index * STAGGER.fast}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border border-stone-200 bg-white px-4 py-2.5 text-[13px] text-navy-800 hover:border-gold-500 hover:text-gold-600 hover:-translate-y-0.5 transition-all duration-300"
              >
                <MapPin className="h-3.5 w-3.5 text-gold-500" />
                {loc.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <Reveal direction="up" delay={0.1} className="mt-12 md:mt-14 border border-stone-200 bg-white p-6 sm:p-8 md:p-10 text-center rounded-[14px] sm:rounded-none hover-lift min-w-0">
          <p className="font-display text-[clamp(1.35rem,5vw,1.875rem)] md:text-3xl text-navy-900 leading-snug break-words">
            <span aria-hidden="true">📍 </span>
            {businessLocation.name}
          </p>
          <p className="mt-2 text-[14px] text-navy-700/65 leading-relaxed break-words">
            {businessLocation.addressLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < businessLocation.addressLines.length - 1 && <br />}
              </span>
            ))}
          </p>
          <a
            href={businessLocation.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-5 inline-flex min-h-[50px] items-center justify-center mx-auto w-full sm:w-auto max-w-full px-6"
          >
            Get Directions
          </a>
          <div className="mt-7 aspect-[16/10] sm:aspect-[21/9] bg-stone-100 border border-stone-200/80 overflow-hidden image-reveal w-full max-w-full min-w-0">
            <iframe
              src={businessLocation.embedUrl}
              title={`${businessLocation.name} location`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
