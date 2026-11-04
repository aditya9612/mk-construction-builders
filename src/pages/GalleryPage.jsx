import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Gallery from '../components/Gallery'
import { pageSeo } from '../data/seo'
import useGallery from '../hooks/useGallery'

function GallerySkeleton() {
  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-11 w-24 animate-pulse bg-stone-200 border border-stone-200"
          />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[4/3] animate-pulse bg-stone-200 rounded-[12px] sm:rounded-none"
          />
        ))}
      </div>
    </div>
  )
}

export default function GalleryPage() {
  const seo = pageSeo.gallery
  const { items, loading, error, reload } = useGallery()

  return (
    <>
      <Seo title={seo.title} description={seo.description} path={seo.path} />
      <PageHero
        eyebrow="Visuals"
        title="Gallery"
        subtitle="Construction, site work and project handover imagery from MK Construction & Builders across Pune."
        crumbs={[{ label: 'Gallery' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
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
          ) : loading && items.length === 0 ? (
            <GallerySkeleton />
          ) : items.length === 0 ? (
            <div className="border border-dashed border-stone-300 bg-white p-12 text-center text-navy-700/70">
              No gallery images have been published yet.
            </div>
          ) : (
            <Gallery items={items} />
          )}
          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <Link to="/projects" className="btn-dark w-full sm:w-auto min-h-[50px]">
              Explore our projects
            </Link>
            <Link to="/contact" className="btn-ghost w-full sm:w-auto min-h-[50px]">
              Contact MK Construction &amp; Builders
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
