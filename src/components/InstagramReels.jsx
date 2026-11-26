import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  AlertCircle,
  ArrowUpRight,
  ExternalLink,
  Film,
  RefreshCw,
} from 'lucide-react'
import SectionTitle from './SectionTitle'
import { fadeUp } from '../motion/variants'
import { DURATION, EASE, STAGGER } from '../motion/tokens'
import useInstagramReels from '../hooks/useInstagramReels'
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_PROFILE_URL,
} from '../api/instagramReels'

const SLOW_LOAD_NOTICE_MS = 8000

function InstagramIcon({ className = 'h-4 w-4' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function ReelFallbackCard({ reel, reason }) {
  const targetUrl = reel.instagram_url || INSTAGRAM_PROFILE_URL

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 px-6 py-8 text-center text-stone-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 border border-gold-500/25"
      />
      <div className="relative z-10 flex flex-col items-center max-w-xs">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/35 bg-gold-500/10 text-gold-400">
          <Film className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.22em] text-gold-400 font-medium">
          {INSTAGRAM_HANDLE}
        </span>
        <h4 className="mt-2 font-display text-xl font-semibold text-stone-50 leading-snug break-words">
          {reel.title || 'MK Construction Reel'}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-stone-300/80">
          {reason ||
            'Preview cannot be displayed inline. Watch this construction update directly on Instagram.'}
        </p>
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-5 min-h-11 px-5 py-2.5 text-[11px] rounded-[8px] sm:rounded-none"
          aria-label={`View ${reel.title || 'Reel'} on Instagram (opens in new tab)`}
        >
          <InstagramIcon className="h-3.5 w-3.5 shrink-0" />
          <span>View on Instagram</span>
          <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

function ReelEmbedFrame({ reel }) {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)

  const hasValidEmbedUrl = Boolean(reel.embed_url)
  const [shouldMountFrame, setShouldMountFrame] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  const [frameLoaded, setFrameLoaded] = useState(false)
  const [frameUnavailable, setFrameUnavailable] = useState(!hasValidEmbedUrl)
  const [isSlowLoading, setIsSlowLoading] = useState(false)

  useEffect(() => {
    setFrameLoaded(false)
    setFrameUnavailable(!reel.embed_url)
    setIsSlowLoading(false)
  }, [reel.embed_url])

  // Lazy-mount the official Instagram embed iframe only when the card nears the viewport.
  useEffect(() => {
    if (!hasValidEmbedUrl || shouldMountFrame) return undefined
    const node = containerRef.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setShouldMountFrame(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldMountFrame(true)
          observer.disconnect()
        }
      },
      { rootMargin: '250px 0px', threshold: 0.01 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [hasValidEmbedUrl, shouldMountFrame])

  // Show a gentle notice on slow connections without treating timeout alone as unavailable.
  useEffect(() => {
    if (!shouldMountFrame || frameLoaded || frameUnavailable) return undefined

    const timer = window.setTimeout(() => {
      setIsSlowLoading(true)
    }, SLOW_LOAD_NOTICE_MS)

    return () => window.clearTimeout(timer)
  }, [shouldMountFrame, frameLoaded, frameUnavailable])

  // Listen to official Instagram iframe postMessage events safely and clean up on unmount.
  useEffect(() => {
    if (!shouldMountFrame || frameUnavailable) return undefined

    const handleMessage = (event) => {
      if (
        event.origin !== 'https://www.instagram.com' &&
        event.origin !== 'https://instagram.com'
      ) {
        return
      }
      if (
        iframeRef.current?.contentWindow &&
        event.source !== iframeRef.current.contentWindow
      ) {
        return
      }

      let payload = event.data
      if (typeof payload === 'string') {
        try {
          payload = JSON.parse(payload)
        } catch {
          return
        }
      }

      if (!payload || typeof payload !== 'object') return

      if (payload.type === 'UNAVAILABLE') {
        setFrameUnavailable(true)
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [shouldMountFrame, frameUnavailable])

  return (
    <div
      ref={containerRef}
      className="relative h-[460px] sm:h-[500px] w-full overflow-hidden bg-stone-100 border-b border-stone-200/70"
    >
      {frameUnavailable || !hasValidEmbedUrl ? (
        <ReelFallbackCard
          reel={reel}
          reason={
            !hasValidEmbedUrl
              ? 'This Reel preview link is unavailable inline. Open it directly on Instagram.'
              : 'This Reel may be private, unavailable, or blocked by browser privacy settings.'
          }
        />
      ) : (
        <>
          {!frameLoaded && (
            <div
              className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-100 px-6 text-center"
              aria-hidden="true"
            >
              <div className="h-12 w-12 rounded-full border border-gold-500/35 bg-white flex items-center justify-center text-gold-600 shadow-sm animate-pulse">
                <InstagramIcon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-navy-700/70 font-medium">
                {isSlowLoading
                  ? 'Still loading Instagram preview...'
                  : 'Loading Reel preview'}
              </p>
              {isSlowLoading && (
                <p className="mt-1.5 text-[11px] text-navy-700/55">
                  You can also open this Reel directly on Instagram below.
                </p>
              )}
            </div>
          )}

          {shouldMountFrame && (
            <iframe
              ref={iframeRef}
              src={reel.embed_url}
              title={
                reel.title
                  ? `${reel.title} — Instagram Reel`
                  : 'MK Construction Instagram Reel'
              }
              loading="lazy"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              onLoad={() => {
                setFrameLoaded(true)
                setIsSlowLoading(false)
              }}
              onError={() => {
                setFrameUnavailable(true)
                setIsSlowLoading(false)
              }}
              className={`h-full w-full border-0 bg-white transition-opacity duration-300 ${
                frameLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </>
      )}
    </div>
  )
}

function InstagramReelCard({ reel, index = 0 }) {
  const reduceMotion = useReducedMotion()
  const targetUrl = reel.instagram_url || INSTAGRAM_PROFILE_URL
  const displayTitle = reel.title || 'Construction Site Update'
  const cardNumber = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      variants={fadeUp}
      custom={index * STAGGER.normal}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: DURATION.reveal, ease: EASE }}
      className="group flex flex-col min-w-0 w-full overflow-hidden bg-white border border-stone-200/80 hover:border-gold-500/50 rounded-[14px] sm:rounded-none hover-lift transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
    >
      <ReelEmbedFrame reel={reel} />

      <div className="flex flex-1 flex-col p-5 sm:p-6 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gold-600 font-medium">
            <InstagramIcon className="h-3 w-3 shrink-0" />
            <span>Instagram Reel</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.22em] text-navy-700/45 font-medium">
            {cardNumber}
          </span>
        </div>

        <h3 className="font-display text-[1.3rem] sm:text-[1.45rem] text-navy-900 font-semibold leading-snug break-words">
          {displayTitle}
        </h3>

        {reel.description ? (
          <p className="mt-2.5 text-[13.5px] sm:text-[14px] text-navy-700/75 leading-relaxed line-clamp-3 break-words">
            {reel.description}
          </p>
        ) : null}

        <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <a
            href={targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 min-h-11 text-[11px] uppercase tracking-[0.18em] font-medium text-navy-900 hover:text-gold-600 transition-colors"
            aria-label={`View ${displayTitle} on Instagram (opens in new tab)`}
          >
            <InstagramIcon className="h-3.5 w-3.5 text-gold-600 shrink-0" />
            <span>View on Instagram</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function ReelsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col min-w-0 overflow-hidden bg-white border border-stone-200/80 rounded-[14px] sm:rounded-none"
        >
          <div className="h-[460px] sm:h-[500px] w-full animate-pulse bg-stone-200/80" />
          <div className="p-5 sm:p-6 space-y-3 animate-pulse">
            <div className="h-3 w-24 bg-stone-200 rounded" />
            <div className="h-6 w-3/4 bg-stone-200 rounded" />
            <div className="h-4 w-full bg-stone-200 rounded" />
            <div className="pt-4 border-t border-stone-100">
              <div className="h-4 w-36 bg-stone-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ReelsEmptyState() {
  return (
    <div className="border border-dashed border-gold-400/50 bg-white rounded-[14px] sm:rounded-none p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-[var(--shadow-soft)]">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/35 bg-gold-500/10 text-gold-600">
        <InstagramIcon className="h-6 w-6" />
      </div>
      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-navy-900 leading-snug">
        Site Reels Coming Soon
      </h3>
      <p className="mt-3 text-sm sm:text-[15px] text-navy-700/75 max-w-lg mx-auto leading-relaxed">
        We regularly share project walkthroughs, structural milestones, and site updates on our official Instagram profile{' '}
        <span className="font-medium text-navy-900">{INSTAGRAM_HANDLE}</span>.
      </p>
      <div className="mt-6 flex justify-center">
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary min-h-11 px-6 rounded-[8px] sm:rounded-none"
          aria-label="Follow Us on Instagram @mkconstructionpune (opens in new tab)"
        >
          <InstagramIcon className="h-4 w-4 shrink-0" />
          <span>Follow Us on Instagram</span>
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}

function ReelsErrorState({ message, onRetry }) {
  return (
    <div className="border border-stone-200 bg-white rounded-[14px] sm:rounded-none p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-3 min-w-0">
        <AlertCircle
          className="h-5 w-5 text-gold-600 shrink-0 mt-0.5"
          aria-hidden="true"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-navy-900">
            Unable to load Instagram Reels right now.
          </p>
          <p className="mt-1 text-xs text-navy-700/70 break-words">
            {message ||
              'You can retry loading the reels or visit our Instagram profile directly.'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onRetry}
          className="min-h-11 px-4 text-[11px] uppercase tracking-[0.16em] font-medium border border-stone-300 text-navy-900 hover:border-gold-500 hover:text-gold-600 transition inline-flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Retry</span>
        </button>
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dark min-h-11 px-5 py-2.5 text-[11px]"
          aria-label="Follow Us on Instagram @mkconstructionpune (opens in new tab)"
        >
          <InstagramIcon className="h-3.5 w-3.5 text-gold-400 shrink-0" />
          <span>Follow Us on Instagram</span>
        </a>
      </div>
    </div>
  )
}

export default function InstagramReels() {
  const { items, isEnabled, loading, error, retry } = useInstagramReels()

  // Hide the entire Instagram Reels section when disabled by backend settings.
  if (!loading && !error && !isEnabled) {
    return null
  }

  return (
    <section
      id="instagram-reels"
      aria-label="Follow Our Construction Journey on Instagram"
      className="section-pad bg-stone-100 relative"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 max-w-md bg-gradient-to-l from-stone-200/40 to-transparent hidden md:block"
      />
      <div className="container-arch relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12 min-w-0">
          <SectionTitle
            eyebrow={INSTAGRAM_HANDLE}
            title="Follow Our Construction Journey"
            subtitle="Explore our latest construction projects, site updates and work highlights."
            className="mb-0 min-w-0"
          />
          <a
            href={INSTAGRAM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dark shrink-0 self-start md:self-auto md:mb-2 min-h-11 rounded-[10px] sm:rounded-none"
            aria-label="Follow Us on Instagram @mkconstructionpune (opens in new tab)"
          >
            <InstagramIcon className="h-4 w-4 text-gold-400 shrink-0" />
            <span>Follow Us on Instagram</span>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>

        {loading ? (
          <ReelsSkeleton />
        ) : error ? (
          <ReelsErrorState message={error} onRetry={retry} />
        ) : items.length === 0 ? (
          <ReelsEmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {items.map((reel, index) => (
              <div key={reel.id} className="min-w-0 flex">
                <InstagramReelCard reel={reel} index={index} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
