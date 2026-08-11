import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ProjectFilter from './ProjectFilter'
import Lightbox from './Lightbox'
import { galleryCategories } from '../data/gallery'
import { cn } from '../utils/formatters'

export default function Gallery({ items }) {
  const [active, setActive] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filtered = useMemo(() => {
    if (active === 'All') return items
    return items.filter((i) => i.category === active)
  }, [items, active])

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
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.03, duration: 0.45 }}
                onClick={() => openAt(item.id)}
                className={cn(
                  'relative break-inside-avoid w-full overflow-hidden group text-left',
                  index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-[4/3]',
                )}
              >
                <img
                  src={item.src}
                  alt={item.caption || 'Gallery image'}
                  loading="lazy"
                  style={
                    item.objectPosition
                      ? { objectPosition: item.objectPosition }
                      : undefined
                  }
                  className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
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
      )}

      <Lightbox
        items={filtered}
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
