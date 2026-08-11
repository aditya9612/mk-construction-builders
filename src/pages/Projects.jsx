import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import { filterProjects, projectFilters } from '../data/projects'
import { pageSeo } from '../data/seo'

export default function Projects() {
  const [active, setActive] = useState('All')
  const list = useMemo(() => filterProjects(active), [active])
  const seo = pageSeo.projects

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Portfolio"
        title="Our Projects"
        subtitle="Construction projects represented across Pune — residential, house, bungalow and commercial work."
        crumbs={[{ label: 'Projects' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <ProjectFilter
            filters={projectFilters}
            active={active}
            onChange={setActive}
          />
          {list.length === 0 ? (
            <div className="border border-dashed border-stone-300 p-12 text-center text-navy-700/70">
              No projects match this filter yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {list.map((project, index) => (
                  <div key={project.id} className="min-w-0">
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link to="/gallery" className="btn-dark w-full sm:w-auto min-h-[50px]">
              Browse project gallery
            </Link>
            <Link to="/services" className="btn-ghost w-full sm:w-auto min-h-[50px]">
              View our construction services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
