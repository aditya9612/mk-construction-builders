import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import PageHero from '../components/PageHero'
import Lightbox from '../components/Lightbox'
import { getProjectById } from '../data/projects'

export default function ProjectDetails() {
  const { id } = useParams()
  const project = getProjectById(id)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  if (!project) {
    return (
      <>
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
            Back to projects
          </Link>
        </div>
      </>
    )
  }

  const galleryItems = (project.gallery || []).map((src, i) => ({
    id: `${project.id}-${i}`,
    src,
    caption: `${project.name} — image ${i + 1}`,
    category: project.type,
  }))

  return (
    <>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-w-0">
            <img
              src={project.mainImage}
              alt={project.name}
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
            <p className="text-navy-800">Interested in a similar project?</p>
            <Link
              to="/request-quote"
              className="inline-flex justify-center bg-navy-900 text-stone-50 px-5 py-3 text-sm hover:bg-navy-800 transition"
            >
              Request a Quote
            </Link>
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
