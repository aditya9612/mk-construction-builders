import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import PageHero from '../components/PageHero'
import Gallery from '../components/Gallery'
import { galleryItems } from '../data/gallery'
import { pageSeo } from '../data/seo'

export default function GalleryPage() {
  const seo = pageSeo.gallery

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
          <Gallery items={galleryItems} />
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
