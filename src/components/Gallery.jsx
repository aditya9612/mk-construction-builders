import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import ProjectFilter from './ProjectFilter'
import Lightbox from './Lightbox'
import { galleryCategories } from '../data/gallery'
import { cn } from '../utils/formatters'
import { fadeUp } from '../motion/variants'
import { EASE, DURATION, STAGGER } from '../motion/tokens'

function galleryImageProps(item, index) {
  return {
    src: item.src,
    alt: item.caption || 'Gallery image',
    decoding: 'async',
    loading: index < 4 ? 'eager' : 'lazy',
    fetchPriority: index < 3 ? 'high' : 'auto',
    sizes: '(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw',
    style: item.objectPosition ? { objectPosition: item.objectPosition } : undefined,
  }
}

export default function Gallery({ items }) {
  const [active, setActive] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const reduceMotion = useReducedMotion()

  const filtered = useMemo(() => {
    if (active === 'All') return items
    return items.filter((i) => i.category === active)
  }, [items, active])

  const lightboxItems = useMemo(
    () => filtered.map((item) => ({ ...item, src: item.srcFull || item.src })),
    [filtered],
  )

  const openAt = (id) => {
    const idx = filtered.findIndex((i) => i.id === id)
    setLightboxIndex(idx >= 0 ? idx : 0)
  }

  return (
    <div>
      <ProjectFilter
        filters={galleryCategories}
        active={active}
        onChange={setActive}
      />

      {filtered.length === 0 ? (
        <div className="border border-dashed border-stone-300 bg-white p-12 text-center text-navy-700/70">
          No images in this category yet.
        </div>
      ) : (
        <>
          {/* Mobile / tablet: controlled CSS grid */}
          <div className="gallery-grid-mobile md:hidden">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  layout
                  variants={fadeUp}
                  custom={index * STAGGER.fast}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  exit={{ opacity: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: DURATION.reveal, ease: EASE }}
                  onClick={() => openAt(item.id)}
                  className={cn(
                    'relative w-full overflow-hidden group text-left rounded-[12px]',
                    index % 5 === 0 ? 'aspect-[4/5] gallery-item-featured' : 'aspect-[4/3]',
                  )}
                >
                  <img
                    {...galleryImageProps(item, index)}
                    className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-active:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-stone-50 text-[13px] tracking-wide break-words">
                      {item.caption}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          {/* Desktop: masonry columns */}
          <div className="hidden md:block columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  layout
                  variants={fadeUp}
                  custom={index * STAGGER.fast}
                  initial={reduceMotion ? false : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  transition={{ duration: DURATION.reveal, ease: EASE }}
                  onClick={() => openAt(item.id)}
                  className={cn(
                    'relative break-inside-avoid w-full overflow-hidden group text-left',
                    index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]',
                  )}
                >
                  <img
                    {...galleryImageProps(item, index)}
                    className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-navy-950/0 group-hover:bg-navy-950/45 transition duration-500 flex items-end p-5">
                    <span className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-400 text-stone-50 text-[13px] tracking-wide">
                      {item.caption}
                    </span>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}

      <Lightbox
        items={lightboxItems}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={() =>
          setLightboxIndex((i) =>
            i == null ? i : (i - 1 + filtered.length) % filtered.length,
          )
        }
        onNext={() =>
          setLightboxIndex((i) => (i == null ? i : (i + 1) % filtered.length))
        }
      />
    </div>
  )
}
