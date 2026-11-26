import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Star,
  MapPin,
  Building2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  MessageSquare,
  MessageSquarePlus,
  CheckCircle,
  X,
  BarChart3,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import SectionTitle from './SectionTitle'
import { Reveal } from './motion/Reveal'
import useCustomerFeedback from '../hooks/useCustomerFeedback'
import useCustomerFeedbackStatistics from '../hooks/useCustomerFeedbackStatistics'
import ReviewFormModal from './ReviewFormModal'

const FALLBACK_PHOTO = '/images/handover/mk-construction-pune-client-project-handover-01.webp'

function GoogleIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

function getInitials(name) {
  if (!name || typeof name !== 'string') return ''
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function CustomerPhoto({ photo, name, reviewSource, isFeatured }) {
  const [imgSrc, setImgSrc] = useState(photo || FALLBACK_PHOTO)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImgSrc(photo || FALLBACK_PHOTO)
    setHasError(false)
  }, [photo])

  const handleError = () => {
    if (imgSrc !== FALLBACK_PHOTO) {
      setImgSrc(FALLBACK_PHOTO)
    } else {
      setHasError(true)
    }
  }

  const initials = getInitials(name)
  const isGoogle = reviewSource === 'google'

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[340px] sm:max-h-[380px] md:max-h-[420px] overflow-hidden rounded-t-2xl sm:rounded-t-[22px] bg-stone-900 select-none">
      {!hasError ? (
        <img
          src={imgSrc}
          alt={name ? `${name} - Customer Review` : 'Customer Review'}
          loading="eager"
          decoding="async"
          onError={handleError}
          className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out hover:scale-105"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center mb-3">
            <span className="font-display text-2xl font-bold text-gold-400">
              {initials || 'MK'}
            </span>
          </div>
          <p className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
            MK Construction & Builders
          </p>
        </div>
      )}

      {/* Subtle overlay gradients for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/15 pointer-events-none" />

      {/* Floating Badges */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-10 pointer-events-none">
        {isFeatured && (
          <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-navy-950 bg-gold-400 border border-gold-300 px-2.5 py-0.5 rounded-full shadow-sm">
            Featured
          </span>
        )}
        {isGoogle ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-navy-900 bg-white/90 backdrop-blur-sm border border-white/60 px-2.5 py-1 rounded-md shadow-sm">
            <GoogleIcon className="w-3.5 h-3.5" />
            <span>Google Review</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-navy-900 bg-white/90 backdrop-blur-sm border border-white/60 px-2.5 py-1 rounded-md shadow-sm">
            Verified Client
          </span>
        )}
      </div>
    </div>
  )
}

function StatisticsBanner({ statistics }) {
  const avg = Number(statistics.average_rating || 0).toFixed(1)
  const total = Number(statistics.total_published_reviews || 0)
  const googleTotal = Number(statistics.total_google_reviews || 0)
  const websiteTotal = Number(statistics.total_website_reviews || 0)
  const distribution = statistics.rating_distribution || {}

  return (
    <div className="bg-white border border-gold-400/30 rounded-2xl p-6 sm:p-8 mb-8 shadow-[var(--shadow-soft)] animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Big Average Rating */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left border-b lg:border-b-0 lg:border-r border-stone-200/70 pb-6 lg:pb-0 lg:pr-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold-600 font-semibold mb-1">
            Overall Client Rating
          </p>
          <div className="flex items-baseline gap-3 my-2">
            <span className="font-display text-5xl sm:text-6xl font-semibold text-navy-900">
              {avg}
            </span>
            <span className="text-stone-400 text-lg">/ 5.0</span>
          </div>
          <div
            className="flex items-center gap-1.5 mb-2"
            aria-label={`Average rating ${avg} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(Number(avg))
                    ? 'text-gold-500 fill-gold-500'
                    : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-navy-700/60">
            Based on <strong className="text-navy-900 font-semibold">{total}</strong> verified{' '}
            {total === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        {/* Center Column: Rating Distribution Bars */}
        <div className="lg:col-span-5 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = Number(distribution[String(star)] || 0)
            const percent = total > 0 ? Math.round((count / total) * 100) : 0
            return (
              <div key={star} className="flex items-center gap-3 text-xs">
                <span className="w-10 text-navy-800 font-medium flex items-center justify-end gap-1">
                  <span>{star}</span>
                  <Star className="w-3 h-3 text-gold-500 fill-gold-500" />
                </span>
                <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200/50">
                  <div
                    className="h-full bg-gold-500 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-navy-700/60 font-mono text-[11px]">
                  {count}
                </span>
              </div>
            )
          })}
        </div>

        {/* Right Column: Source Breakdown Badges */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col justify-around gap-4 border-t lg:border-t-0 lg:border-l border-stone-200/70 pt-6 lg:pt-0 lg:pl-8">
          <div className="text-center lg:text-left">
            <p className="text-2xl font-display font-semibold text-navy-900">{googleTotal}</p>
            <p className="text-[11px] uppercase tracking-wider text-navy-700/60 mt-0.5 flex items-center justify-center lg:justify-start gap-1">
              <GoogleIcon className="w-3 h-3" /> Google Reviews
            </p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-2xl font-display font-semibold text-navy-900">{websiteTotal}</p>
            <p className="text-[11px] uppercase tracking-wider text-navy-700/60 mt-0.5">
              Website Reviews
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewsSkeleton() {
  return (
    <div className="w-full max-w-lg md:max-w-2xl mx-auto bg-white border border-gold-400/30 rounded-2xl sm:rounded-[22px] shadow-[var(--shadow-soft)] overflow-hidden animate-pulse">
      <div className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[340px] sm:max-h-[380px] md:max-h-[420px] bg-stone-200" />
      <div className="p-6 sm:p-8 md:p-10 flex flex-col items-center text-center">
        <div className="h-7 bg-stone-200 rounded w-1/2 mb-3" />
        <div className="h-4 bg-stone-200 rounded w-1/3 mb-4" />
        <div className="flex gap-1.5 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-stone-200 rounded-full" />
          ))}
        </div>
        <div className="h-5 bg-stone-200 rounded w-2/3 mb-3" />
        <div className="space-y-2.5 w-full max-w-md">
          <div className="h-3.5 bg-stone-200 rounded w-full" />
          <div className="h-3.5 bg-stone-200 rounded w-5/6 mx-auto" />
          <div className="h-3.5 bg-stone-200 rounded w-4/6 mx-auto" />
        </div>
        <div className="mt-6 pt-5 border-t border-stone-100 w-full flex justify-center">
          <div className="h-7 bg-stone-200 rounded-full w-40" />
        </div>
      </div>
    </div>
  )
}

function ReviewsErrorState({ message, onRetry }) {
  return (
    <div className="border border-stone-200 bg-white rounded-2xl p-8 text-center max-w-md mx-auto shadow-[var(--shadow-soft)]">
      <p className="text-sm text-navy-700/80">
        {message || 'Unable to load customer reviews at this time.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 min-h-11 px-5 text-xs font-semibold uppercase tracking-wider border border-stone-300 hover:border-gold-500 hover:text-gold-600 transition-colors inline-flex items-center gap-2 rounded-md"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </button>
      )}
    </div>
  )
}

function EmptyReviewsState({ onWriteReview }) {
  return (
    <div className="border border-dashed border-gold-400/40 bg-white rounded-2xl p-8 sm:p-12 md:p-16 text-center max-w-2xl mx-auto shadow-[var(--shadow-soft)]">
      <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-600">
        <MessageSquare className="w-6 h-6" />
      </div>
      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-navy-900 leading-snug">
        Customer reviews will appear here soon.
      </h3>
      <p className="mt-3 text-sm sm:text-[15px] text-navy-700/70 max-w-lg mx-auto leading-relaxed">
        We take pride in our work across Pune. Have you built with us? Share your feedback directly
        to help fellow homeowners.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onWriteReview}
          className="btn-primary min-h-11 px-6 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 rounded-md"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Write a Review
        </button>
        <Link
          to="/projects"
          className="btn-ghost text-xs tracking-wider uppercase min-h-11 px-4 inline-flex items-center rounded-md"
        >
          Explore Our Projects
        </Link>
        <Link
          to="/contact"
          className="btn-dark text-xs tracking-wider uppercase min-h-11 px-5 inline-flex items-center rounded-md"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}

export default function CustomerReviews({
  showCta = true,
  showTitle = true,
  className = 'section-pad bg-stone-50 pb-20 sm:pb-24 md:pb-28',
  title = 'What Our Customers Say',
  subtitle = 'Real feedback from customers who experienced MK Construction & Builders.',
  eyebrow = 'Customer Reviews',
}) {
  const {
    items: reviews,
    total,
    totalPages,
    page,
    setPage,
    reviewSource,
    setReviewSource,
    isFeatured,
    setIsFeatured,
    setSort,
    loading: reviewsLoading,
    error: reviewsError,
    reload: reloadReviews,
  } = useCustomerFeedback({ pageSize: 50 })

  const {
    statistics,
    loading: statsLoading,
    error: statsError,
    reload: reloadStats,
  } = useCustomerFeedbackStatistics()

  const [allReviews, setAllReviews] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [activeSort, setActiveSort] = useState('default')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)
  const [showStatsOverview, setShowStatsOverview] = useState(false)

  const activeReviewIdRef = useRef(null)
  const touchStartXRef = useRef(0)
  const reduceMotion = useReducedMotion()

  // Accumulate loaded reviews across pages without losing active item on refresh
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setAllReviews((prev) => {
        if (page === 1) return reviews
        const map = new Map(prev.map((r) => [r.id, r]))
        reviews.forEach((r) => map.set(r.id, r))
        return Array.from(map.values())
      })
    } else if (!reviewsLoading && reviews.length === 0 && page === 1) {
      setAllReviews([])
    }
  }, [reviews, page, reviewsLoading])

  // Preserve active review position if data reloads
  useEffect(() => {
    if (allReviews.length > 0) {
      if (activeReviewIdRef.current) {
        const foundIndex = allReviews.findIndex((r) => r.id === activeReviewIdRef.current)
        if (foundIndex !== -1 && foundIndex !== currentIndex) {
          setCurrentIndex(foundIndex)
          return
        }
      }
      if (currentIndex >= allReviews.length) {
        setCurrentIndex(0)
      }
    }
  }, [allReviews, currentIndex])

  const activeReview = allReviews[currentIndex] || null

  useEffect(() => {
    if (activeReview?.id) {
      activeReviewIdRef.current = activeReview.id
    }
  }, [activeReview])

  const handleSortChange = (sortType) => {
    setActiveSort(sortType)
    setCurrentIndex(0)
    setDirection(0)
    activeReviewIdRef.current = null
    if (sortType === 'latest') {
      setSort('review_date', 'desc')
    } else if (sortType === 'rating') {
      setSort('rating', 'desc')
    } else {
      setSort('display_order', 'asc')
    }
  }

  const handleSourceFilter = (source) => {
    setReviewSource(source)
    setPage(1)
    setCurrentIndex(0)
    setDirection(0)
    activeReviewIdRef.current = null
  }

  const handleFeaturedToggle = () => {
    setIsFeatured((prev) => (prev ? null : true))
    setPage(1)
    setCurrentIndex(0)
    setDirection(0)
    activeReviewIdRef.current = null
  }

  const handleRetryAll = () => {
    reloadReviews()
    reloadStats()
  }

  const handleReviewSuccess = () => {
    reloadReviews()
    reloadStats()
    setReviewSource(null)
    setSort('review_date', 'desc')
    setActiveSort('latest')
    setPage(1)
    setCurrentIndex(0)
    setDirection(0)
    activeReviewIdRef.current = null
    setSubmissionSuccess(true)
    setTimeout(() => {
      setSubmissionSuccess(false)
    }, 6000)
  }

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (allReviews.length <= 1) return
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + allReviews.length) % allReviews.length)
  }, [allReviews.length])

  const handleNext = useCallback(() => {
    if (allReviews.length <= 1) return
    setDirection(1)
    setCurrentIndex((prev) => {
      const next = (prev + 1) % allReviews.length
      return next
    })
  }, [allReviews.length])

  const goToSlide = (idx) => {
    if (idx === currentIndex) return
    setDirection(idx > currentIndex ? 1 : -1)
    setCurrentIndex(idx)
  }

  // Load next page buffer when nearing end of current batch
  useEffect(() => {
    if (
      page < totalPages &&
      currentIndex >= allReviews.length - 2 &&
      !reviewsLoading
    ) {
      setPage((p) => p + 1)
    }
  }, [currentIndex, allReviews.length, page, totalPages, reviewsLoading, setPage])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase()
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartXRef.current - touchEndX
    if (diff > 45) {
      handleNext()
    } else if (diff < -45) {
      handlePrev()
    }
  }

  // Framer Motion drag end handler
  const handleDragEnd = (_, { offset, velocity }) => {
    if (offset.x < -40 || velocity.x < -300) {
      handleNext()
    } else if (offset.x > 40 || velocity.x > 300) {
      handlePrev()
    }
  }

  const hasReviews = allReviews.length > 0 || total > 0 || statistics?.total_published_reviews > 0
  const isInitialLoading = reviewsLoading && allReviews.length === 0 && statsLoading

  // Calculate visible dots (window of up to 7 dots)
  const totalCount = total > 0 ? total : allReviews.length
  const totalCountDisplay = totalCount > 400 ? '400+' : totalCount

  const getVisibleDots = (current, count) => {
    if (count <= 7) return Array.from({ length: count }, (_, i) => i)
    const maxDots = 7
    let start = Math.max(0, current - Math.floor(maxDots / 2))
    let end = start + maxDots
    if (end > count) {
      end = count
      start = Math.max(0, end - maxDots)
    }
    const dots = []
    for (let i = start; i < end; i++) dots.push(i)
    return dots
  }

  const visibleDots = getVisibleDots(currentIndex, allReviews.length)

  // Framer motion variants
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 80 : dir < 0 ? -80 : 0,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 280, damping: 28 },
        opacity: { duration: 0.18 },
        scale: { duration: 0.18 },
      },
    }),
  }

  const reducedVariants = {
    enter: { opacity: 0 },
    center: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  }

  return (
    <section className={className}>
      <div className="container-arch min-w-0">
        {/* Section Heading */}
        {showTitle && (
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            align="center"
            className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto"
          />
        )}

        {/* Global Submission Success Toast */}
        {submissionSuccess && (
          <div className="mb-8 border border-emerald-300 bg-emerald-50 text-emerald-950 rounded-xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm shadow-sm animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-medium">
                Thank you! Your review has been submitted and published successfully.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSubmissionSuccess(false)}
              className="text-emerald-700 hover:text-emerald-900 p-1 rounded-md cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter and Sorting Toolbar */}
        {!isInitialLoading && hasReviews && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto">
            {/* Filter pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSourceFilter(null)}
                className={`min-h-9 px-3.5 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                  reviewSource == null
                    ? 'bg-navy-900 text-gold-400 border-navy-900 shadow-sm'
                    : 'bg-white text-navy-800 border-stone-200 hover:border-gold-500'
                }`}
              >
                All ({total})
              </button>
              {statistics?.total_google_reviews > 0 && (
                <button
                  type="button"
                  onClick={() => handleSourceFilter('google')}
                  className={`min-h-9 px-3.5 py-1 text-xs font-semibold rounded-full border transition-all inline-flex items-center gap-1.5 cursor-pointer ${
                    reviewSource === 'google'
                      ? 'bg-navy-900 text-gold-400 border-navy-900 shadow-sm'
                      : 'bg-white text-navy-800 border-stone-200 hover:border-gold-500'
                  }`}
                >
                  <GoogleIcon className="w-3.5 h-3.5" />
                  Google ({statistics.total_google_reviews})
                </button>
              )}
              {statistics?.total_website_reviews > 0 && (
                <button
                  type="button"
                  onClick={() => handleSourceFilter('website')}
                  className={`min-h-9 px-3.5 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                    reviewSource === 'website'
                      ? 'bg-navy-900 text-gold-400 border-navy-900 shadow-sm'
                      : 'bg-white text-navy-800 border-stone-200 hover:border-gold-500'
                  }`}
                >
                  Website ({statistics.total_website_reviews})
                </button>
              )}
              <button
                type="button"
                onClick={handleFeaturedToggle}
                className={`min-h-9 px-3.5 py-1 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                  isFeatured
                    ? 'bg-gold-500 text-navy-950 border-gold-500 font-bold shadow-sm'
                    : 'bg-white text-navy-800 border-stone-200 hover:border-gold-500'
                }`}
              >
                Featured Only
              </button>
            </div>

            {/* Right actions: Rating overview toggle & sort */}
            <div className="flex items-center gap-2.5">
              {statistics?.total_published_reviews > 0 && (
                <button
                  type="button"
                  onClick={() => setShowStatsOverview((prev) => !prev)}
                  className="min-h-9 px-3 py-1 text-[11px] font-medium text-navy-700 bg-white border border-stone-200 hover:border-gold-500 rounded-full inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  aria-expanded={showStatsOverview}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-gold-600" />
                  <span className="hidden sm:inline">Overview</span>
                  {showStatsOverview ? (
                    <ChevronUp className="w-3 h-3 text-stone-500" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-stone-500" />
                  )}
                </button>
              )}

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-navy-700/60 uppercase tracking-wider text-[10px] font-semibold">
                  Sort:
                </span>
                <select
                  value={activeSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-white border border-stone-200 text-navy-900 text-xs rounded-full px-3 py-1.5 focus:outline-none focus:border-gold-500 cursor-pointer shadow-sm"
                  aria-label="Sort reviews"
                >
                  <option value="default">Default</option>
                  <option value="latest">Latest</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Rating Statistics Overview */}
        {showStatsOverview && statistics?.total_published_reviews > 0 && (
          <div className="max-w-2xl mx-auto mb-8">
            <StatisticsBanner statistics={statistics} />
          </div>
        )}

        {/* Loading State */}
        {isInitialLoading && <ReviewsSkeleton />}

        {/* Error State */}
        {!isInitialLoading && (reviewsError || statsError) && allReviews.length === 0 && (
          <ReviewsErrorState
            message={reviewsError || statsError}
            onRetry={handleRetryAll}
          />
        )}

        {/* Empty State */}
        {!isInitialLoading && !reviewsError && !hasReviews && (
          <EmptyReviewsState onWriteReview={() => setIsFormOpen(true)} />
        )}

        {/* Testimonial Slider */}
        {!isInitialLoading && hasReviews && allReviews.length > 0 && activeReview && (
          <div className="max-w-2xl mx-auto">
            {/* Carousel Container */}
            <div
              className="relative w-full focus:outline-none select-none"
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Customer Reviews Slider"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Previous Arrow Button */}
              {allReviews.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous review"
                  className="absolute left-2.5 sm:left-3 top-32 sm:top-36 md:top-1/2 md:-left-7 lg:-left-16 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 flex items-center justify-center shadow-[0_6px_20px_rgba(196,151,47,0.4)] border border-gold-300/60 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </button>
              )}

              {/* Active Review Card with AnimatePresence */}
              <div className="overflow-hidden min-w-0 rounded-2xl sm:rounded-[22px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.article
                    key={activeReview.id}
                    custom={direction}
                    variants={reduceMotion ? reducedVariants : slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.2}
                    onDragEnd={handleDragEnd}
                    className="bg-white border border-gold-400/40 rounded-2xl sm:rounded-[22px] shadow-[0_20px_50px_-20px_rgba(10,22,34,0.18)] overflow-hidden w-full cursor-grab active:cursor-grabbing flex flex-col justify-between"
                  >
                    {/* 1. Large Customer Photo */}
                    <CustomerPhoto
                      photo={activeReview.customer_photo}
                      name={activeReview.customer_name}
                      reviewSource={activeReview.review_source}
                      isFeatured={activeReview.is_featured}
                    />

                    {/* Card Content */}
                    <div className="p-6 sm:p-8 md:p-10 flex flex-col items-center text-center">
                      {/* 2. Customer Name */}
                      <h3 className="font-display text-2xl sm:text-3xl md:text-[28px] font-bold text-navy-900 tracking-tight leading-snug">
                        {activeReview.customer_name}
                      </h3>

                      {/* 3. Customer Location with MapPin Icon */}
                      {activeReview.customer_location ? (
                        <div className="mt-1.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-navy-700/70 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-gold-500 shrink-0" aria-hidden="true" />
                          <span>{activeReview.customer_location}</span>
                        </div>
                      ) : null}

                      {/* 4. Five-Star Rating in Gold */}
                      <div
                        className="mt-3.5 sm:mt-4 flex items-center justify-center gap-1.5"
                        aria-label={`Rated ${activeReview.rating} out of 5 stars`}
                      >
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 sm:w-5.5 sm:h-5.5 ${
                              i < activeReview.rating
                                ? 'text-gold-500 fill-gold-500'
                                : 'text-stone-200 fill-stone-100'
                            }`}
                          />
                        ))}
                      </div>

                      {/* 5. Review Title in Elegant Gold Typography */}
                      {activeReview.review_title ? (
                        <h4 className="font-display italic text-lg sm:text-xl font-medium text-gold-600 mt-4 leading-snug max-w-lg mx-auto">
                          “{activeReview.review_title}”
                        </h4>
                      ) : null}

                      {/* 6. Review Message with Quotation Marks */}
                      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-navy-800 leading-relaxed max-w-xl mx-auto break-words font-sans">
                        <span className="text-gold-500 font-display text-xl select-none mr-1 inline-block align-top">“</span>
                        <span>{activeReview.review_message}</span>
                        <span className="text-gold-500 font-display text-xl select-none ml-1 inline-block align-bottom">”</span>
                      </p>

                      {/* 7. Project Name in Premium Badge */}
                      {activeReview.project_name ? (
                        <div className="mt-6 pt-5 border-t border-stone-100/90 w-full flex items-center justify-center">
                          <div className="inline-flex items-center gap-2 bg-stone-50 border border-gold-500/20 px-3.5 py-1.5 rounded-full text-xs text-navy-800 font-medium max-w-full">
                            <Building2 className="w-3.5 h-3.5 text-gold-600 shrink-0" aria-hidden="true" />
                            <span className="truncate">
                              Project: <strong className="font-semibold text-navy-950">{activeReview.project_name}</strong>
                            </span>
                          </div>
                        </div>
                      ) : null}

                      {/* Google Review link if present */}
                      {activeReview.review_source === 'google' && activeReview.google_review_url && (
                        <div className="mt-4">
                          <a
                            href={activeReview.google_review_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-gold-600 hover:text-gold-500 transition-colors py-1"
                            aria-label={`View Google review by ${activeReview.customer_name} (opens in new tab)`}
                          >
                            <GoogleIcon className="w-3.5 h-3.5" />
                            <span>View Google Review</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              {/* Next Arrow Button */}
              {allReviews.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next review"
                  className="absolute right-2.5 sm:right-3 top-32 sm:top-36 md:top-1/2 md:-right-7 lg:-right-16 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gold-500 hover:bg-gold-400 text-navy-950 flex items-center justify-center shadow-[0_6px_20px_rgba(196,151,47,0.4)] border border-gold-300/60 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                </button>
              )}
            </div>

            {/* Pagination Controls and Review Counter */}
            {allReviews.length > 0 && (
              <div className="mt-6 sm:mt-7 flex flex-col items-center gap-3">
                {/* Current Review Counter */}
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-800">
                  <span className="text-gold-600 font-bold">{currentIndex + 1}</span> of{' '}
                  <span>{totalCountDisplay}</span>
                </div>

                {/* Pagination Dots */}
                {allReviews.length > 1 && (
                  <div
                    className="flex items-center gap-1.5"
                    role="tablist"
                    aria-label="Review pagination"
                  >
                    {visibleDots.map((dotIndex) => (
                      <button
                        key={dotIndex}
                        type="button"
                        role="tab"
                        aria-selected={dotIndex === currentIndex}
                        aria-label={`Go to review ${dotIndex + 1}`}
                        onClick={() => goToSlide(dotIndex)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          dotIndex === currentIndex
                            ? 'w-7 h-2 bg-gold-500'
                            : 'w-2 h-2 bg-stone-300 hover:bg-gold-400/60'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Write a Review Button below the carousel */}
            <div className="mt-8 sm:mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setIsFormOpen(true)}
                className="btn-primary min-h-[48px] px-8 text-xs font-semibold uppercase tracking-[0.14em] inline-flex items-center gap-2.5 shadow-[0_10px_25px_-8px_rgba(196,151,47,0.5)] rounded-md hover-lift cursor-pointer"
              >
                <MessageSquarePlus className="w-4 h-4 text-navy-950" />
                <span>Write a Review</span>
              </button>
            </div>
          </div>
        )}

        {/* Empty filter result fallback */}
        {!isInitialLoading && hasReviews && allReviews.length === 0 && (
          <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-8 text-center text-sm text-navy-700/70 max-w-xl mx-auto shadow-sm">
            <p className="mb-4">No reviews match the selected filter.</p>
            <button
              type="button"
              onClick={() => {
                setReviewSource(null)
                setIsFeatured(null)
                setPage(1)
              }}
              className="min-h-10 px-5 text-xs font-semibold uppercase tracking-wider bg-navy-900 text-gold-400 rounded-full hover:bg-navy-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom CTA Block */}
        {showCta && (
          <Reveal direction="up" className="mt-14 sm:mt-16 md:mt-20 text-center min-w-0">
            <p className="font-display text-[clamp(1.35rem,5vw,1.85rem)] text-navy-900 font-semibold text-balance break-words">
              Want to build your dream home?
            </p>
            <div className="mt-6">
              <Link to="/request-quote" className="btn-primary w-full sm:w-auto min-h-[50px] rounded-md">
                Get Free Quote
              </Link>
            </div>
          </Reveal>
        )}

        {/* Review Form Modal */}
        <ReviewFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleReviewSuccess}
        />
      </div>
    </section>
  )
}
