import { memo, useEffect, useRef, useState } from 'react'

const DEFAULT_HERO_SLIDES = [
  {
    src: '/images/hero/hero-luxury-villa.jpg',
    alt: 'Luxury modern residential villa illuminated at dusk by MK Construction & Builders',
    objectPosition: 'center center',
    kenBurns: 'a',
  },
  {
    src: '/images/hero/hero-modern-bungalow.jpg',
    alt: 'Modern bungalow exterior design with warm architectural lighting',
    objectPosition: 'center center',
    kenBurns: 'b',
  },
  {
    src: '/images/hero/hero-ongoing-construction.jpg',
    alt: 'Ongoing RCC slab and structural construction project in Pune',
    objectPosition: 'center 42%',
    kenBurns: 'c',
  },
  {
    src: '/images/hero/hero-contemporary-building.jpg',
    alt: 'Contemporary multi-storey building facade with modern architectural elevation',
    objectPosition: 'center 38%',
    kenBurns: 'a',
  },
  {
    src: '/images/hero/hero-house-architecture.jpg',
    alt: 'Premium residential house architecture with pitched roof and timber accents',
    objectPosition: 'center 45%',
    kenBurns: 'b',
  },
  {
    src: '/images/hero/hero-completed-project.webp',
    alt: 'Completed residential villa construction project by MK Construction & Builders in Pune',
    objectPosition: 'center 45%',
    kenBurns: 'c',
  },
]

/**
 * Cinematic multi-image background slideshow with smooth opacity crossfades
 * and subtle Ken Burns zoom/pan motion. Respects prefers-reduced-motion and
 * preloads upcoming slides to prevent flickering.
 */
function HeroSlideshow({
  slides = DEFAULT_HERO_SLIDES,
  intervalMs = 7000,
  transitionMs = 2200,
  reducedMotion = false,
  className = '',
}) {
  const slideCount = slides.length
  const [state, setState] = useState({
    active: 0,
    previous: null,
    hasTransitioned: false,
  })
  const [systemReducedMotion, setSystemReducedMotion] = useState(false)
  const preloadedRef = useRef(new Set())

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setSystemReducedMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const isReducedMotion = reducedMotion || systemReducedMotion

  // Preload the active and next slides before transitioning so crossfades never flicker.
  useEffect(() => {
    if (slideCount === 0) return
    const indicesToPreload = isReducedMotion
      ? [0]
      : [state.active, (state.active + 1) % slideCount]

    indicesToPreload.forEach((idx) => {
      const src = slides[idx]?.src
      if (!src || preloadedRef.current.has(src)) return
      preloadedRef.current.add(src)
      const img = new window.Image()
      img.src = src
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {})
      }
    })
  }, [state.active, slideCount, slides, isReducedMotion])

  useEffect(() => {
    if (isReducedMotion || slideCount <= 1) return undefined

    let timerId = null

    const scheduleNext = () => {
      timerId = window.setTimeout(() => {
        if (!document.hidden) {
          setState((prev) => ({
            active: (prev.active + 1) % slideCount,
            previous: prev.active,
            hasTransitioned: true,
          }))
        }
        scheduleNext()
      }, intervalMs)
    }

    const handleVisibilityChange = () => {
      if (timerId !== null) {
        window.clearTimeout(timerId)
        timerId = null
      }
      if (!document.hidden) {
        scheduleNext()
      }
    }

    if (!document.hidden) {
      scheduleNext()
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (timerId !== null) {
        window.clearTimeout(timerId)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [intervalMs, isReducedMotion, slideCount])

  if (slideCount === 0) return null

  const kenBurnsDurationMs = intervalMs + transitionMs + 400

  return (
    <div
      className={`hero-slideshow ${className}`.trim()}
      style={{
        '--hero-fade-duration': `${transitionMs}ms`,
        '--hero-ken-burns-duration': `${kenBurnsDurationMs}ms`,
      }}
      aria-hidden="true"
    >
      {slides.map((slide, index) => {
        const isActive = index === state.active
        const isPrevious = !isReducedMotion && index === state.previous
        const isAnimating = !isReducedMotion && (isActive || isPrevious)
        const variant = slide.kenBurns || 'a'

        const slideClasses = [
          'hero-slideshow__slide',
          isActive && 'hero-slideshow__slide--active',
          isPrevious && 'hero-slideshow__slide--leaving',
          isActive && !state.hasTransitioned && 'hero-slideshow__slide--initial',
          isAnimating && `hero-slideshow__slide--kb-${variant}`,
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <div key={slide.src} className={slideClasses}>
            <img
              src={slide.src}
              alt={slide.alt}
              loading={index <= 1 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              draggable={false}
              style={
                slide.objectPosition
                  ? { objectPosition: slide.objectPosition }
                  : undefined
              }
              className="hero-slideshow__img"
            />
          </div>
        )
      })}
    </div>
  )
}

export default memo(HeroSlideshow)
