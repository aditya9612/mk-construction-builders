import PageHero from '../components/PageHero'
import Gallery from '../components/Gallery'
import { galleryItems } from '../data/gallery'

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Visuals"
        title="Gallery"
        subtitle="Construction, site work and project imagery. Replace placeholder visuals with company photos when available."
        crumbs={[{ label: 'Gallery' }]}
      />
      <section className="section-pad">
        <div className="container-arch">
          <Gallery items={galleryItems} />
        </div>
      </section>
    </>
  )
}
