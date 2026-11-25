import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import ProjectCard from '../components/ProjectCard'
import ProjectFilter from '../components/ProjectFilter'
import { projectFilters } from '../data/projects'
import {
  locationKey,
  projectMatchesLocation,
  resolveProjectLocality,
} from '../data/locations'
import { pageSeo } from '../data/seo'
import usePortfolioProjects from '../hooks/usePortfolioProjects'

function ProjectGridSkeleton() {
  return (
    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-w-0 overflow-hidden bg-navy-950 rounded-[14px] sm:rounded-none"
        >
          <div className="aspect-[4/3] animate-pulse bg-navy-800" />
        </div>
      ))}
    </div>
  )
}

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams()
  const locationFilter = searchParams.get('location') || ''
  const [active, setActive] = useState('All')
  const { items, loading, error, reload } = usePortfolioProjects(active)
  const seo = pageSeo.projects

  const visibleItems = useMemo(() => {
    if (!locationFilter) return items
    return items.filter((project) => projectMatchesLocation(project, locationFilter))
  }, [items, locationFilter])

  const locationName = useMemo(() => {
    if (!locationFilter) return ''
    const match = items.find((project) =>
      projectMatchesLocation(project, locationFilter),
    )
    return (
      resolveProjectLocality(match?.location)?.name ||
      locationKey(locationFilter).replace(/-/g, ' ')
    )
  }, [items, locationFilter])

  const clearLocationFilter = () => {
    const next = new URLSearchParams(searchParams)
    next.delete('location')
    setSearchParams(next, { replace: true })
  }

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Portfolio"
        title="Our Projects"
        subtitle="Construction projects represented across Pune — residential, commercial, industrial and renovation work."
        crumbs={[{ label: 'Projects' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <ProjectFilter
            filters={projectFilters}
            active={active}
            onChange={setActive}
          />
          {locationFilter ? (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border border-stone-200 bg-white px-4 py-3 text-sm text-navy-700/80">
              <p>
                Showing projects in{' '}
                <span className="font-medium text-navy-900">{locationName || locationFilter}</span>
                , Pune
              </p>
              <button
                type="button"
                onClick={clearLocationFilter}
                className="min-h-11 px-4 text-[11px] uppercase tracking-[0.16em] border border-stone-200 hover:border-gold-500 hover:text-gold-600 transition"
              >
                All locations
              </button>
            </div>
          ) : null}
          {error ? (
            <div className="mb-6 border border-stone-200 bg-white px-4 py-3 text-sm text-navy-700/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p>{error}</p>
              <button
                type="button"
                onClick={reload}
                className="min-h-11 px-4 text-[11px] uppercase tracking-[0.16em] border border-stone-200 hover:border-gold-500 hover:text-gold-600 transition"
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            <ProjectGridSkeleton />
          ) : visibleItems.length === 0 ? (
            <div className="border border-dashed border-stone-300 p-12 text-center text-navy-700/70">
              No published projects match this filter yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-5">
              <AnimatePresence mode="popLayout">
                {visibleItems.map((project, index) => (
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
