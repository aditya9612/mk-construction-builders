import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MapPin } from 'lucide-react'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group relative min-w-0 w-full overflow-hidden bg-navy-950 rounded-[14px] sm:rounded-none"
    >
      <Link to={`/projects/${project.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.mainImage}
            alt={`${project.name} — ${project.type.toLowerCase()} construction by MK Construction in ${project.location}, Pune`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.15s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/10" />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-navy-950/25" />

          <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
            <span className="bg-gold-500 text-navy-950 text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 font-medium">
              {project.type}
            </span>
            <span className="glass text-stone-100 text-[10px] uppercase tracking-[0.16em] px-2.5 py-1 border border-white/10">
              {project.status}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
            <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] text-gold-400/90 mb-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="break-words">
                {project.location}, Pune
              </span>
            </p>
            <h3 className="font-display text-[1.35rem] sm:text-[1.65rem] md:text-[1.85rem] text-stone-50 font-semibold leading-tight break-words">
              {project.name}
            </h3>
            <span className="project-card-cta mt-2.5 inline-flex items-center gap-1.5 min-h-9 text-[11px] uppercase tracking-[0.18em] text-stone-200 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-400">
              View Project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
