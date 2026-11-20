import { apiGet, apiPost, mediaUrl } from './client.js'

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

const MAX_PHOTO_SIZE = 5 * 1024 * 1024 // 5 MB

/**
 * Validates selected customer photo file on the client side.
 * Supported formats: JPG, JPEG, PNG, WEBP.
 * Max size: 5 MB.
 * Rejects: SVG, empty files, unsupported formats.
 */
export function validateCustomerPhoto(file) {
  if (!file) return { valid: true }

  if (file.size === 0) {
    return { valid: false, error: 'The selected photo is empty.' }
  }

  if (file.size > MAX_PHOTO_SIZE) {
    return {
      valid: false,
      error: 'Photo size exceeds 5 MB. Please select a smaller photo.',
    }
  }

  const name = (file.name || '').toLowerCase()
  if (name.endsWith('.svg') || file.type === 'image/svg+xml') {
    return {
      valid: false,
      error: 'SVG photos are not allowed for security reasons.',
    }
  }

  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  const hasAllowedExt = allowedExtensions.some((ext) => name.endsWith(ext))
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/pjpeg']
  const hasAllowedMime = allowedMimeTypes.includes((file.type || '').toLowerCase())

  if (!hasAllowedExt && !hasAllowedMime) {
    return {
      valid: false,
      error: 'Invalid file format. Allowed formats: JPG, JPEG, PNG, WEBP.',
    }
  }

  return { valid: true }
}

/**
 * Submit a public customer review for immediate publication.
 * POST /api/v1/customer-feedback/public/submit
 * - application/json when without photo
 * - multipart/form-data when with photo
 */
export async function submitPublicReview(
  {
    customerName,
    customerLocation,
    rating,
    reviewTitle,
    reviewMessage,
    customerPhoto,
    honeypot = '',
  } = {},
  { signal } = {},
) {
  const SUBMIT_PATH = `${FEEDBACK_PUBLIC_PATH}/submit`

  if (!customerName || !customerName.trim()) {
    throw new Error('Please enter your name.')
  }
  if (!customerLocation || !customerLocation.trim()) {
    throw new Error('Please enter your location.')
  }
  const numericRating = Number(rating)
  if (!numericRating || numericRating < 1 || numericRating > 5) {
    throw new Error('Please select a star rating between 1 and 5.')
  }
  if (!reviewMessage || !reviewMessage.trim()) {
    throw new Error('Please enter your review message.')
  }
  if (reviewMessage.trim().length < 10) {
    throw new Error('Review message must be at least 10 characters.')
  }

  // Validate photo if provided
  if (customerPhoto instanceof File) {
    const photoCheck = validateCustomerPhoto(customerPhoto)
    if (!photoCheck.valid) {
      throw new Error(photoCheck.error)
    }

    const formData = new FormData()
    formData.append('customer_name', customerName.trim())
    formData.append('customer_location', customerLocation.trim())
    formData.append('rating', String(numericRating))
    if (reviewTitle && reviewTitle.trim()) {
      formData.append('review_title', reviewTitle.trim())
    }
    formData.append('review_message', reviewMessage.trim())
    formData.append('customer_photo', customerPhoto)
    formData.append('honeypot', honeypot || '')

    const response = await apiPost(SUBMIT_PATH, formData, { isFormData: true, signal })
    return {
      success: true,
      message:
        response?.message ||
        'Thank you! Your review has been submitted and published successfully.',
      data: mapCustomerFeedbackItem(response?.data),
    }
  }

  // JSON submission (without photo)
  const payload = {
    customer_name: customerName.trim(),
    customer_location: customerLocation.trim(),
    rating: numericRating,
    review_message: reviewMessage.trim(),
    honeypot: honeypot || '',
  }

  if (reviewTitle && reviewTitle.trim()) {
    payload.review_title = reviewTitle.trim()
  }

  const response = await apiPost(SUBMIT_PATH, payload, { isFormData: false, signal })
  return {
    success: true,
    message:
      response?.message ||
      'Thank you! Your review has been submitted and published successfully.',
    data: mapCustomerFeedbackItem(response?.data),
  }
}
