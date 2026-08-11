import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { locations, mapsPlaceholder } from '../data/locations'
import SectionTitle from './SectionTitle'

export default function LocationsSection() {
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
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 border border-stone-200 bg-white px-4 py-2.5 text-[13px] text-navy-800 hover:border-gold-500 hover:text-gold-600 transition duration-300"
              >
                <MapPin className="h-3.5 w-3.5 text-gold-500" />
                {loc.name}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 border border-stone-200 bg-white p-8 md:p-10 text-center">
          <p className="font-display text-2xl md:text-3xl text-navy-900">
            {mapsPlaceholder.label}
          </p>
          <p className="mt-2 text-[14px] text-navy-700/65">{mapsPlaceholder.note}</p>
          <div className="mt-7 aspect-[21/9] bg-stone-100 border border-stone-200/80 flex items-center justify-center text-navy-700/45 text-[13px] tracking-wide">
            Google Maps placeholder — embed URL can be added later
          </div>
        </div>
      </div>
    </section>
  )
}
