const DEFAULT_API_URL = 'https://api.mkconstruction.site'

function resolveApiBaseUrl() {
  const raw = import.meta.env.VITE_API_URL
  const value = raw == null ? '' : String(raw).trim().replace(/\/$/, '')
  if (value) return value
  // Local empty VITE_API_URL → same-origin /api (Vite proxy). Production keeps the public API.
  return import.meta.env.DEV ? '' : DEFAULT_API_URL
}

export const API_BASE_URL = resolveApiBaseUrl()

export const MEDIA_BASE_URL = (
  import.meta.env.VITE_MEDIA_URL || DEFAULT_API_URL
).replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, { status, payload } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status ?? 0
    this.payload = payload ?? null
  }
}

export function mediaUrl(path) {
  if (path == null || path === '') return ''
  const value = String(path).trim()
  if (!value) return ''
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value
  if (value.startsWith('/images/')) return value
  if (value.startsWith('/')) return `${MEDIA_BASE_URL}${value}`
  return `${MEDIA_BASE_URL}/${value}`
}

function buildUrl(path, params) {
  const normalized = path.startsWith('http')
    ? path
    : `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
  const url = normalized.startsWith('http')
    ? new URL(normalized)
    : new URL(normalized, window.location.origin)

  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([key, value]) => {
      if (value == null || value === '') return
      url.searchParams.set(key, String(value))
    })
  }

  return url.toString()
}

function unwrapSuccess(payload) {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return payload.data
  }
  return payload
}

function messageFromPayload(payload, fallback) {
  if (!payload || typeof payload !== 'object') return fallback
  if (typeof payload.message === 'string' && payload.message.trim()) {
    return payload.message
  }
  if (typeof payload.detail === 'string' && payload.detail.trim()) {
    return payload.detail
  }
  if (Array.isArray(payload.detail) && payload.detail[0]?.msg) {
    return payload.detail[0].msg
  }
  return fallback
}

export async function apiGet(path, { params, signal } = {}) {
  let response

  try {
    response = await fetch(buildUrl(path, params), {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal,
    })
  } catch (error) {
    if (error?.name === 'AbortError') throw error
    throw new ApiError('Unable to reach the server. Please try again.', {
      status: 0,
    })
  }

  let payload = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      payload = await response.json()
    } catch {
      payload = null
    }
  }

  if (!response.ok) {
    throw new ApiError(
      messageFromPayload(payload, `Request failed (${response.status})`),
      { status: response.status, payload },
    )
  }

  if (payload && payload.success === false) {
    throw new ApiError(messageFromPayload(payload, 'Request failed'), {
      status: response.status,
      payload,
    })
  }

  return unwrapSuccess(payload)
}
