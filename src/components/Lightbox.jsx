import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index]

  useEffect(() => {
    if (index == null) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index, onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[10050] bg-navy-950/95 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute top-4 right-4 text-stone-200 hover:text-gold-400"
            onClick={onClose}
          >
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            aria-label="Previous"
            className="absolute left-3 md:left-6 text-stone-200 hover:text-gold-400"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="absolute right-3 md:right-6 text-stone-200 hover:text-gold-400"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <motion.div
            key={item.id || item.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={item.src}
              alt={item.caption || 'Gallery image'}
              className="w-full max-h-[75vh] object-contain"
            />
            {item.caption && (
              <p className="mt-4 text-center text-stone-300 text-sm">
                {item.caption}
                {item.category ? ` · ${item.category}` : ''}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
