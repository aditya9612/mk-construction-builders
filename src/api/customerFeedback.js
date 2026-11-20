import { apiGet, mediaUrl } from './client'

const FEEDBACK_PUBLIC_PATH = '/api/v1/customer-feedback/public'
const STATISTICS_PATH = `${FEEDBACK_PUBLIC_PATH}/statistics`

/**
 * Sanitizes customer photo URL.
 * - Handles absolute http/https URLs.
 * - Resolves relative media paths against MEDIA_BASE_URL.
 * - Discards local filesystem paths (e.g. C:\, /Users/, file://).
 * - Returns empty string when invalid or missing.
 */
export function sanitizeCustomerPhoto(photo) {
  if (photo == null || typeof photo !== 'string') return ''
  const trimmed = photo.trim()
  if (!trimmed) return ''

  // Never expose or allow local filesystem paths
  if (
    /^[a-zA-Z]:[\\/]/.test(trimmed) ||
    /^(file:|\/Users\/|\/home\/|\\\\)/i.test(trimmed)
  ) {
    return ''
  }

  // Absolute URLs
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }

  // Relative path - resolve through mediaUrl
  return mediaUrl(trimmed)
}

/**
 * Sanitizes external review URLs (e.g. Google Review URL).
 * Must be a valid http or https URL.
 */
export function sanitizeExternalUrl(url) {
  if (url == null || typeof url !== 'string') return null
  const trimmed = url.trim()
  if (!trimmed) return null
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed
  }
  return null
}

/**
 * Maps a single CustomerFeedbackPublicResponse item into a safe client object.
 * Uses exact Swagger field names.
 */
export function mapCustomerFeedbackItem(item) {
  if (!item || typeof item !== 'object') return null

  return {
    id: item.id,
    customer_name: typeof item.customer_name === 'string' && item.customer_name.trim()
      ? item.customer_name.trim()
      : 'Anonymous',
    customer_location: typeof item.customer_location === 'string'
      ? item.customer_location.trim()
      : '',
    customer_photo: sanitizeCustomerPhoto(item.customer_photo),
    rating: Math.max(1, Math.min(5, Number(item.rating) || 5)),
    review_title: typeof item.review_title === 'string' && item.review_title.trim()
      ? item.review_title.trim()
      : null,
    review_message: typeof item.review_message === 'string'
      ? item.review_message.trim()
      : '',
    project_name: typeof item.project_name === 'string' && item.project_name.trim()
      ? item.project_name.trim()
      : null,
    review_source: typeof item.review_source === 'string'
      ? item.review_source.trim().toLowerCase()
      : 'website',
    google_review_url: sanitizeExternalUrl(item.google_review_url),
    review_date: typeof item.review_date === 'string' ? item.review_date.trim() : '',
    is_featured: Boolean(item.is_featured),
    display_order: Number(item.display_order) || 0,
  }
}

/**
 * Maps CustomerFeedbackPublicStatisticsResponse.
 * Guaranteed to provide all required statistics fields.
 */
export function mapCustomerFeedbackStatistics(data) {
  const distribution = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  }

  if (data?.rating_distribution && typeof data.rating_distribution === 'object') {
    Object.keys(distribution).forEach((star) => {
      distribution[star] = Number(data.rating_distribution[star]) || 0
    })
  }

  return {
    total_published_reviews: Math.max(0, Number(data?.total_published_reviews) || 0),
    average_rating: Math.max(0, Number(data?.average_rating) || 0),
    rating_distribution: distribution,
    total_google_reviews: Math.max(0, Number(data?.total_google_reviews) || 0),
    total_website_reviews: Math.max(0, Number(data?.total_website_reviews) || 0),
  }
}

/**
 * Fetch public customer feedback statistics.
 * GET /api/v1/customer-feedback/public/statistics
 */
export async function fetchFeedbackStatistics({ signal } = {}) {
  const data = await apiGet(STATISTICS_PATH, { signal })
  return mapCustomerFeedbackStatistics(data)
}

/**
 * List published customer feedback with pagination, sorting, and filters.
 * GET /api/v1/customer-feedback/public
 * Supported Swagger parameters:
 * - page (int >= 1, default 1)
 * - page_size (int 1..100, default 10)
 * - rating (int 1..5, optional)
 * - review_source ('google' | 'website' | 'manual', optional)
 * - is_featured (boolean, optional)
 * - sort_by ('display_order' | 'review_date' | 'rating', default 'display_order')
 * - sort_order ('asc' | 'desc', default 'asc')
 */
export async function listPublishedFeedback(
  {
    page = 1,
    pageSize = 6,
    rating,
    reviewSource,
    isFeatured,
    sortBy = 'display_order',
    sortOrder = 'asc',
  } = {},
  { signal } = {},
) {
  const params = {
    page,
    page_size: pageSize,
    sort_by: sortBy,
    sort_order: sortOrder,
  }

  if (rating != null && rating !== '') {
    params.rating = Number(rating)
  }

  if (reviewSource != null && reviewSource !== '') {
    params.review_source = reviewSource
  }

  if (typeof isFeatured === 'boolean') {
    params.is_featured = isFeatured
  }

  const data = await apiGet(FEEDBACK_PUBLIC_PATH, { params, signal })

  const rawItems = Array.isArray(data?.items) ? data.items : []
  const items = rawItems.map(mapCustomerFeedbackItem).filter(Boolean)

  return {
    items,
    total: typeof data?.total === 'number' ? data.total : items.length,
    page: Number(data?.page) || page,
    pageSize: Number(data?.page_size) || pageSize,
    totalPages: typeof data?.total_pages === 'number' ? data.total_pages : 0,
  }
}

/**
 * Get published feedback by ID.
 * GET /api/v1/customer-feedback/public/{feedback_id}
 */
export async function getPublishedFeedbackById(feedbackId, { signal } = {}) {
  if (!feedbackId) throw new Error('Feedback ID is required')
  const data = await apiGet(`${FEEDBACK_PUBLIC_PATH}/${encodeURIComponent(feedbackId)}`, {
    signal,
  })
  return mapCustomerFeedbackItem(data)
}
