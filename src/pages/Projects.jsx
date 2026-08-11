import { useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import { filterProjects, projectFilters } from '../data/projects'

export default function Projects() {
  const [active, setActive] = useState('All')
  const list = useMemo(() => filterProjects(active), [active])

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Our Projects"
        subtitle="Project locations represented from company references across Pune. Exact project names and statistics will be updated when confirmed."
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
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {list.map((project, index) => (
                  <div key={project.id} className="min-w-0">
                    <ProjectCard project={project} index={index} />
                  </div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
