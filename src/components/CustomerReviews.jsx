import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Star,
  MapPin,
  Building2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  User,
  RefreshCw,
  MessageSquare,
  MessageSquarePlus,
  CheckCircle,
  X,
} from 'lucide-react'
import SectionTitle from './SectionTitle'
import { Reveal } from './motion/Reveal'
import { fadeUp } from '../motion/variants'
import { EASE, DURATION } from '../motion/tokens'
import useCustomerFeedback from '../hooks/useCustomerFeedback'
import useCustomerFeedbackStatistics from '../hooks/useCustomerFeedbackStatistics'
import ReviewFormModal from './ReviewFormModal'

const CARD_STAGGER = 0.08

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

function formatReviewDate(dateString) {
  if (!dateString) return ''
  try {
    const d = new Date(dateString)
    if (Number.isNaN(d.getTime())) return dateString
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d)
  } catch {
    return dateString
  }
}

function ReviewCard({ review, index }) {
  const [imgError, setImgError] = useState(false)
  const reduceMotion = useReducedMotion()
  const initials = getInitials(review.customer_name)
  const isGoogle = review.review_source === 'google'
  const hasPhoto = Boolean(review.customer_photo) && !imgError

  return (
    <motion.article
      variants={fadeUp}
      custom={index * CARD_STAGGER}
      initial={reduceMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: DURATION.reveal, ease: EASE }}
      className="bg-white border border-stone-200/90 rounded-xl p-5 sm:p-6 shadow-[var(--shadow-soft)] hover-lift transition-shadow duration-300 flex flex-col justify-between h-full min-w-0"
    >
      <div>
        {/* Header: Photo/Avatar + Customer Name/Location + Review Source */}
        <div className="flex items-start justify-between gap-3 min-w-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-stone-100 border border-stone-200 flex items-center justify-center aspect-square select-none">
              {hasPhoto ? (
                <img
                  src={review.customer_photo}
                  alt={review.customer_name}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : initials ? (
                <span className="w-full h-full bg-navy-900 text-gold-400 font-semibold text-sm flex items-center justify-center tracking-wider">
                  {initials}
                </span>
              ) : (
                <span className="w-full h-full bg-navy-900 text-stone-300 flex items-center justify-center">
                  <User className="w-5 h-5" />
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-navy-900 text-base leading-tight truncate">
                {review.customer_name}
              </h4>
              {review.customer_location ? (
                <p className="text-xs text-navy-700/60 mt-1 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
                  <span className="truncate">{review.customer_location}</span>
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {isGoogle ? (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-navy-800 bg-stone-100 border border-stone-200/90 px-2.5 py-1 rounded-md">
                <GoogleIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Google Review</span>
              </span>
            ) : review.review_source === 'website' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-navy-800 bg-stone-100 border border-stone-200/90 px-2.5 py-1 rounded-md">
                Website
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-navy-800 bg-stone-100 border border-stone-200/90 px-2.5 py-1 rounded-md">
                Client Review
              </span>
            )}
            {review.is_featured && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-gold-600 bg-gold-500/10 border border-gold-500/25 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>
        </div>

        {/* Rating and Date */}
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-stone-100 pt-3">
          <div
            className="flex items-center gap-1"
            aria-label={`Rated ${review.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? 'text-gold-500 fill-gold-500' : 'text-stone-300'
                }`}
              />
            ))}
          </div>
          {review.review_date && (
            <time dateTime={review.review_date} className="text-xs text-navy-700/50">
              {formatReviewDate(review.review_date)}
            </time>
          )}
        </div>

        {/* Review Title & Message */}
        {review.review_title && (
          <h5 className="font-display text-lg font-semibold text-navy-900 mt-3 leading-snug break-words">
            {review.review_title}
          </h5>
        )}
        <p className="mt-2 text-sm text-navy-700/80 leading-relaxed whitespace-pre-line break-words">
          {review.review_message}
        </p>
      </div>

      {/* Footer: Project name and/or Google Review Link */}
      {(review.project_name || (isGoogle && review.google_review_url)) && (
        <div className="mt-5 pt-3.5 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs">
          {review.project_name ? (
            <div className="flex items-center gap-1.5 text-navy-700/70 truncate">
              <Building2 className="w-3.5 h-3.5 text-gold-600 shrink-0" />
              <span className="truncate">
                Project: <strong className="font-medium text-navy-900">{review.project_name}</strong>
              </span>
            </div>
          ) : (
            <div />
          )}

          {isGoogle && review.google_review_url && (
            <a
              href={review.google_review_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-gold-600 hover:text-gold-500 transition-colors shrink-0 py-1"
              aria-label={`View Google review by ${review.customer_name} (opens in new tab)`}
            >
              <span>View Google Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}

function StatisticsBanner({ statistics }) {
  const avg = Number(statistics.average_rating || 0).toFixed(1)
  const total = Number(statistics.total_published_reviews || 0)
  const googleTotal = Number(statistics.total_google_reviews || 0)
  const websiteTotal = Number(statistics.total_website_reviews || 0)
  const distribution = statistics.rating_distribution || {}

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 sm:p-8 mb-10 shadow-[var(--shadow-soft)]">
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white border border-stone-200/80 rounded-xl p-5 sm:p-6 shadow-[var(--shadow-soft)] animate-pulse"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-stone-200 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-stone-200 rounded w-3/4" />
              <div className="h-3 bg-stone-200 rounded w-1/2" />
            </div>
          </div>
          <div className="h-3 bg-stone-200 rounded w-1/3 mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-stone-200 rounded w-full" />
            <div className="h-3 bg-stone-200 rounded w-5/6" />
            <div className="h-3 bg-stone-200 rounded w-4/6" />
          </div>
        </div>
      ))}
    </div>
  )
}

function ReviewsErrorState({ message, onRetry }) {
  return (
    <div className="border border-stone-200 bg-white rounded-xl p-6 text-center max-w-md mx-auto shadow-[var(--shadow-soft)]">
      <p className="text-sm text-navy-700/80">
        {message || 'Unable to load customer reviews at this time.'}
      </p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 min-h-11 px-5 text-xs font-medium uppercase tracking-wider border border-stone-300 hover:border-gold-500 hover:text-gold-600 transition-colors inline-flex items-center gap-2"
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
    <div className="border border-dashed border-stone-300 bg-white rounded-2xl p-8 sm:p-12 md:p-16 text-center max-w-2xl mx-auto">
      <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-gold-600">
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
          className="btn-primary min-h-11 px-6 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
        >
          <MessageSquarePlus className="w-4 h-4" />
          Write a Review
        </button>
        <Link
          to="/projects"
          className="btn-ghost text-xs tracking-wider uppercase min-h-11 px-4 inline-flex items-center"
        >
          Explore Our Projects
        </Link>
        <Link
          to="/contact"
          className="btn-dark text-xs tracking-wider uppercase min-h-11 px-5 inline-flex items-center"
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
  className = 'section-pad bg-stone-50',
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
  } = useCustomerFeedback({ pageSize: 6 })

  const {
    statistics,
    loading: statsLoading,
    error: statsError,
    reload: reloadStats,
  } = useCustomerFeedbackStatistics()

  const [activeSort, setActiveSort] = useState('default')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

  const handleSortChange = (sortType) => {
    setActiveSort(sortType)
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
  }

  const handleFeaturedToggle = () => {
    setIsFeatured((prev) => (prev ? null : true))
    setPage(1)
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
    setSubmissionSuccess(true)
    setTimeout(() => {
      setSubmissionSuccess(false)
    }, 6000)
  }

  const hasReviews = reviews.length > 0 || statistics?.total_published_reviews > 0
  const isInitialLoading = reviewsLoading && reviews.length === 0 && statsLoading

  return (
    <section className={className}>
      <div className="container-arch min-w-0">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
          {showTitle && (
            <SectionTitle
              eyebrow={eyebrow}
              title={title}
              subtitle={subtitle}
              className="mb-0 max-w-2xl"
            />
          )}

          {/* Prominent Write a Review CTA button in section header */}
          <div className="shrink-0 self-start md:self-auto md:mb-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="btn-primary min-h-[46px] px-6 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 shadow-[var(--shadow-soft)] hover-lift"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Global Submission Success Toast */}
        {submissionSuccess && (
          <div className="mb-8 border border-emerald-300 bg-emerald-50 text-emerald-950 rounded-xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm shadow-sm animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="font-medium">
                Thank you! Your review has been submitted and published successfully.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSubmissionSuccess(false)}
              className="text-emerald-700 hover:text-emerald-900 p-1 rounded-md"
              aria-label="Dismiss message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Loading State */}
        {isInitialLoading && <ReviewsSkeleton />}

        {/* Error State */}
        {!isInitialLoading && (reviewsError || statsError) && reviews.length === 0 && (
          <ReviewsErrorState
            message={reviewsError || statsError}
            onRetry={handleRetryAll}
          />
        )}

        {/* Empty State */}
        {!isInitialLoading && !reviewsError && !hasReviews && (
          <EmptyReviewsState onWriteReview={() => setIsFormOpen(true)} />
        )}

        {/* Published Reviews Content */}
        {!isInitialLoading && hasReviews && (
          <>
            {/* Statistics Banner */}
            {statistics?.total_published_reviews > 0 && (
              <StatisticsBanner statistics={statistics} />
            )}

            {/* Filter and Sorting Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              {/* Source Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSourceFilter(null)}
                  className={`min-h-9 px-3.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                    reviewSource == null
                      ? 'bg-navy-900 text-stone-50 border-navy-900'
                      : 'bg-white text-navy-800 border-stone-200 hover:border-gold-500'
                  }`}
                >
                  All ({total})
                </button>
                {statistics?.total_google_reviews > 0 && (
                  <button
                    type="button"
                    onClick={() => handleSourceFilter('google')}
                    className={`min-h-9 px-3.5 py-1 text-xs font-medium rounded-full border transition-colors inline-flex items-center gap-1.5 ${
                      reviewSource === 'google'
                        ? 'bg-navy-900 text-stone-50 border-navy-900'
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
                    className={`min-h-9 px-3.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                      reviewSource === 'website'
                        ? 'bg-navy-900 text-stone-50 border-navy-900'
                        : 'bg-white text-navy-800 border-stone-200 hover:border-gold-500'
                    }`}
                  >
                    Website ({statistics.total_website_reviews})
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleFeaturedToggle}
                  className={`min-h-9 px-3.5 py-1 text-xs font-medium rounded-full border transition-colors ${
                    isFeatured
                      ? 'bg-gold-500 text-navy-950 border-gold-500 font-semibold'
                      : 'bg-white text-navy-800 border-stone-200 hover:border-gold-500'
                  }`}
                >
                  Featured Only
                </button>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-2 self-start md:self-auto text-xs">
                <span className="text-navy-700/60 uppercase tracking-wider text-[10px]">Sort by:</span>
                <select
                  value={activeSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-white border border-stone-200 text-navy-900 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-gold-500"
                >
                  <option value="default">Default Order</option>
                  <option value="latest">Latest Reviews</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            </div>

            {/* Reviews Grid */}
            {reviewsLoading && reviews.length === 0 ? (
              <ReviewsSkeleton />
            ) : reviews.length === 0 ? (
              <div className="bg-white border border-dashed border-stone-300 rounded-xl p-8 text-center text-sm text-navy-700/70">
                No reviews match the selected filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
                {reviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} index={index} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || reviewsLoading}
                  className="min-h-10 px-3.5 border border-stone-200 bg-white rounded-md text-navy-800 hover:border-gold-500 disabled:opacity-40 disabled:pointer-events-none transition-colors inline-flex items-center gap-1 text-xs"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setPage(pageNum)}
                        disabled={reviewsLoading}
                        className={`w-9 h-9 rounded-md text-xs font-medium transition-colors ${
                          page === pageNum
                            ? 'bg-navy-900 text-gold-400 font-semibold'
                            : 'bg-white border border-stone-200 text-navy-800 hover:border-gold-500'
                        }`}
                        aria-label={`Go to page ${pageNum}`}
                        aria-current={page === pageNum ? 'page' : undefined}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages || reviewsLoading}
                  className="min-h-10 px-3.5 border border-stone-200 bg-white rounded-md text-navy-800 hover:border-gold-500 disabled:opacity-40 disabled:pointer-events-none transition-colors inline-flex items-center gap-1 text-xs"
                  aria-label="Next page"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}

        {/* Bottom CTA Block */}
        {showCta && (
          <Reveal direction="up" className="mt-12 md:mt-14 text-center min-w-0">
            <p className="font-display text-[clamp(1.35rem,5vw,1.85rem)] text-navy-900 font-semibold text-balance break-words">
              Want to build your dream home?
            </p>
            <div className="mt-6">
              <Link to="/request-quote" className="btn-primary w-full sm:w-auto min-h-[50px]">
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
