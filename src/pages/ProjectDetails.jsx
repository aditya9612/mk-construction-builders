import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Lightbox from '../components/Lightbox'
import { pageSeo, projectSeo } from '../data/seo'
import usePortfolioProject from '../hooks/usePortfolioProject'

function ProjectDetailsSkeleton() {
  return (
    <>
      <PageHero
        title="Loading project"
        crumbs={[
          { label: 'Projects', to: '/projects' },
          { label: 'Loading' },
        ]}
      />
      <section className="section-pad">
        <div className="container-arch space-y-10 md:space-y-14 min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
            <div className="w-full aspect-[4/3] animate-pulse bg-stone-200 border border-stone-200" />
            <div className="min-w-0 space-y-4">
              <div className="h-8 w-2/3 animate-pulse bg-stone-200" />
              <div className="h-4 w-1/3 animate-pulse bg-stone-200" />
              <div className="h-20 w-full animate-pulse bg-stone-200" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectNotFound() {
  return (
    <>
      <Seo
        title={pageSeo.notFound.title}
        description={pageSeo.notFound.description}
        path="/projects"
        noindex
      />
      <PageHero
        title="Project not found"
        crumbs={[
          { label: 'Projects', to: '/projects' },
          { label: 'Not found' },
        ]}
      />
      <div className="container-arch py-16 text-center">
        <p>This project does not exist.</p>
        <Link to="/projects" className="mt-4 inline-block text-gold-600">
          Explore our projects
        </Link>
      </div>
    </>
  )
}

export default function ProjectDetails() {
  const { id } = useParams()
  const { project, loading, error, reload } = usePortfolioProject(id)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  useEffect(() => {
    setLightboxIndex(null)
  }, [id])

  if (loading && !project) {
    return (
      <>
        <Seo
          title={pageSeo.projects.title}
          description={pageSeo.projects.description}
          path="/projects"
        />
        <ProjectDetailsSkeleton />
      </>
    )
  }

  if (!project) {
    if (error) {
      return (
        <>
          <Seo
            title={pageSeo.projects.title}
            description={pageSeo.projects.description}
            path="/projects"
          />
          <PageHero
            title="Unable to load project"
            crumbs={[
              { label: 'Projects', to: '/projects' },
              { label: 'Error' },
            ]}
          />
          <div className="container-arch py-16 text-center">
            <p className="text-navy-700/80">{error}</p>
            <button
              type="button"
              onClick={reload}
              className="mt-4 min-h-11 px-4 text-[11px] uppercase tracking-[0.16em] border border-stone-200 hover:border-gold-500 hover:text-gold-600 transition"
            >
              Retry
            </button>
          </div>
        </>
      )
    }
    return <ProjectNotFound />
  }

  const seo = projectSeo(project)
  const typeLabel = project.type || 'construction'
  const galleryItems = (project.gallery || []).map((src, i) => ({
    id: `${project.id}-${i}`,
    src,
    caption: `MK Construction ${typeLabel.toLowerCase()} project in ${project.location}, Pune`,
    category: project.type,
  }))

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow={project.status}
        title={project.name}
        subtitle={`${project.type} · ${project.location}, Pune`}
        crumbs={[
          { label: 'Projects', to: '/projects' },
          { label: project.name },
        ]}
      />

      <section className="section-pad">
        <div className="container-arch space-y-10 md:space-y-14 min-w-0">
          {error ? (
            <div className="border border-stone-200 bg-white px-4 py-3 text-sm text-navy-700/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p>{error} Showing saved project details.</p>
              <button
                type="button"
                onClick={reload}
                className="min-h-11 px-4 text-[11px] uppercase tracking-[0.16em] border border-stone-200 hover:border-gold-500 hover:text-gold-600 transition"
              >
                Retry
              </button>
            </div>
          ) : null}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
            <img
              src={project.mainImage}
              alt={`MK Construction ${typeLabel.toLowerCase()} project in ${project.location}, Pune`}
              className="w-full max-w-full aspect-[4/3] object-cover border border-stone-200"
            />
            <div className="min-w-0">
              <h2 className="font-display text-2xl sm:text-3xl text-navy-900 font-semibold break-words">
                Project Overview
              </h2>
              <p className="mt-3 flex items-center gap-2 text-navy-700 break-words">
                <MapPin className="h-4 w-4 text-gold-500 shrink-0" />
                {project.location}, Pune
              </p>
              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {project.type && (
                  <div>
                    <dt className="text-navy-700/50 uppercase tracking-wider text-xs">
                      Type
                    </dt>
                    <dd className="text-navy-900 mt-1">{project.type}</dd>
                  </div>
                )}
                {project.status && (
                  <div>
                    <dt className="text-navy-700/50 uppercase tracking-wider text-xs">
                      Status
                    </dt>
                    <dd className="text-navy-900 mt-1">{project.status}</dd>
                  </div>
                )}
              </dl>
              {project.description && (
                <p className="mt-6 text-navy-700/80 leading-relaxed">
                  {project.description}
                </p>
              )}
              {project.overview && (
                <p className="mt-4 text-navy-700/80 leading-relaxed">
                  {project.overview}
                </p>
              )}
            </div>
          </div>

          {galleryItems.length > 0 && (
            <div>
              <h2 className="font-display text-3xl text-navy-900 font-semibold mb-6">
                Construction Gallery
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryItems.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="aspect-[4/3] overflow-hidden border border-stone-200"
                  >
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading="lazy"
                      className="h-full w-full object-cover hover:scale-105 transition duration-500"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {project.workProgress && (
            <div>
              <h2 className="font-display text-3xl text-navy-900 font-semibold mb-4">
                Work Progress
              </h2>
              <p className="text-navy-700/80 leading-relaxed">{project.workProgress}</p>
            </div>
          )}

          {project.finalResult && (
            <div>
              <h2 className="font-display text-3xl text-navy-900 font-semibold mb-4">
                Final Result
              </h2>
              <p className="text-navy-700/80 leading-relaxed">{project.finalResult}</p>
            </div>
          )}

          <div className="border border-stone-200 bg-stone-50 p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <p className="text-navy-800">Interested in a similar project in Pune?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/request-quote"
                className="inline-flex justify-center bg-navy-900 text-stone-50 px-5 py-3 text-sm hover:bg-navy-800 transition min-h-11 items-center"
              >
                Request a Quote
              </Link>
              <Link
                to="/contact"
                className="inline-flex justify-center border border-stone-300 px-5 py-3 text-sm hover:border-gold-500 transition min-h-11 items-center"
              >
                Contact MK Construction &amp; Builders
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Lightbox
        items={galleryItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((i) =>
            i == null ? i : (i - 1 + galleryItems.length) % galleryItems.length,
          )
        }
        onNext={() =>
          setLightboxIndex((i) =>
            i == null ? i : (i + 1) % galleryItems.length,
          )
        }
      />
    </>
  )
}
