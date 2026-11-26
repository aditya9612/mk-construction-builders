import { apiGet } from './client.js'

export const PUBLIC_INSTAGRAM_REELS_PATH = '/api/v1/public/instagram-reels'
export const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/mkconstructionpune/'
export const INSTAGRAM_HANDLE = '@mkconstructionpune'

const ALLOWED_INSTAGRAM_HOSTS = new Set([
  'instagram.com',
  'www.instagram.com',
])

const INSTAGRAM_SHORTCODE_REGEX = /^\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)(?:\/|$)/
const INSTAGRAM_EMBED_PATH_REGEX = /^\/(?:reel|reels|p|tv)\/([A-Za-z0-9_-]+)\/embed\/?$/

/**
 * Parses a URL string safely and verifies it points to instagram.com over https/http.
 */
function parseInstagramUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return null
  const trimmed = rawUrl.trim()
  if (!trimmed) return null

  try {
    const parsed = new URL(trimmed)
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null
    }
    const hostname = parsed.hostname.toLowerCase()
    if (!ALLOWED_INSTAGRAM_HOSTS.has(hostname)) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}

/**
 * Extracts the Instagram shortcode from a Reel/Post URL path.
 */
export function extractInstagramShortcode(rawUrl) {
  const parsed = parseInstagramUrl(rawUrl)
  if (!parsed) return ''
  const match = parsed.pathname.match(INSTAGRAM_SHORTCODE_REGEX)
  return match ? match[1] : ''
}

/**
 * Validates that a URL is a valid public Instagram Reel/Post URL.
 */
export function isValidInstagramUrl(rawUrl) {
  const parsed = parseInstagramUrl(rawUrl)
  if (!parsed) return false
  return INSTAGRAM_SHORTCODE_REGEX.test(parsed.pathname)
}

/**
 * Validates that a URL matches Instagram's official embed URL format.
 */
export function isValidInstagramEmbedUrl(rawUrl) {
  const parsed = parseInstagramUrl(rawUrl)
  if (!parsed) return false
  return INSTAGRAM_EMBED_PATH_REGEX.test(parsed.pathname)
}

/**
 * Sanitizes an Instagram Reel URL to HTTPS or returns empty string if invalid.
 */
export function sanitizeInstagramUrl(rawUrl) {
  const parsed = parseInstagramUrl(rawUrl)
  if (!parsed || !INSTAGRAM_SHORTCODE_REGEX.test(parsed.pathname)) return ''
  parsed.protocol = 'https:'
  return parsed.toString()
}

/**
 * Sanitizes an official Instagram embed URL to HTTPS or returns empty string if invalid.
 */
export function sanitizeInstagramEmbedUrl(rawUrl) {
  const parsed = parseInstagramUrl(rawUrl)
  if (!parsed || !INSTAGRAM_EMBED_PATH_REGEX.test(parsed.pathname)) return ''
  parsed.protocol = 'https:'
  return parsed.toString()
}

/**
 * Normalizes a single Instagram Reel item matching the agreed public API contract.
 */
export function normalizeInstagramReelItem(item) {
  if (!item || typeof item !== 'object') return null

  const id = item.id
  if (id == null || id === '') return null

  const title = typeof item.title === 'string' ? item.title.trim() : ''
  const description =
    typeof item.description === 'string' ? item.description.trim() : ''
  const instagram_url = sanitizeInstagramUrl(item.instagram_url)
  const embed_url = sanitizeInstagramEmbedUrl(item.embed_url)
  const numericOrder = Number(item.display_order)
  const display_order = Number.isFinite(numericOrder) ? numericOrder : 0

  return {
    id,
    title,
    instagram_url,
    embed_url,
    description,
    display_order,
  }
}

/**
 * Normalizes the unwrapped GET /api/v1/public/instagram-reels data payload
 * and sorts items by display_order ascending.
 */
export function normalizeInstagramReelsResponse(data) {
  const payload =
    data && typeof data === 'object' && 'is_enabled' in data
      ? data
      : data?.data && typeof data.data === 'object'
        ? data.data
        : data

  const is_enabled = Boolean(payload?.is_enabled)
  const rawItems = Array.isArray(payload?.items) ? payload.items : []

  const items = rawItems
    .map(normalizeInstagramReelItem)
    .filter(Boolean)
    .sort((a, b) => a.display_order - b.display_order)

  const total =
    typeof payload?.total === 'number' ? payload.total : items.length
  const page = Number(payload?.page) || 1
  const page_size = Number(payload?.page_size) || 10
  const total_pages =
    typeof payload?.total_pages === 'number' ? payload.total_pages : 1

  return {
    is_enabled,
    items,
    total,
    page,
    page_size,
    total_pages,
  }
}

/**
 * Fetches public Instagram Reels using the shared apiGet client.
 * GET /api/v1/public/instagram-reels
 */
export async function fetchPublicInstagramReels(
  { page, pageSize } = {},
  { signal } = {},
) {
  const params = {}
  if (page != null) params.page = page
  if (pageSize != null) params.page_size = pageSize

  const data = await apiGet(PUBLIC_INSTAGRAM_REELS_PATH, {
    params: Object.keys(params).length > 0 ? params : undefined,
    signal,
  })

  return normalizeInstagramReelsResponse(data)
}
