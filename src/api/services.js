import { apiGet } from './client'
import {
  mapService,
  mapServices,
  paginatedItems,
  paginatedTotal,
} from './mappers'

const LIST_PATH = '/api/v1/services'

export async function listPublishedServices(
  {
    page = 1,
    pageSize = 100,
    search,
    sortBy = 'display_order',
    sortOrder = 'asc',
  } = {},
  { signal } = {},
) {
  return apiGet(LIST_PATH, {
    params: {
      page,
      page_size: pageSize,
      search,
      sort_by: sortBy,
      sort_order: sortOrder,
    },
    signal,
  })
}

export async function getPublishedServiceBySlug(slug, { signal } = {}) {
  return apiGet(`${LIST_PATH}/${encodeURIComponent(slug)}`, { signal })
}

export async function fetchPublishedService(slug, { signal } = {}) {
  const data = await getPublishedServiceBySlug(slug, { signal })
  const record =
    data && typeof data === 'object' && !data.slug && (data.service || data.item)
      ? data.service || data.item
      : data
  return mapService(record)
}

export async function fetchPublishedServices({ signal } = {}) {
  const pageSize = 100
  let page = 1
  let collected = []
  let total = 0
  let totalPages = 1

  do {
    const data = await listPublishedServices({ page, pageSize }, { signal })
    const items = paginatedItems(data)
    total = paginatedTotal(data, collected.length + items.length)
    totalPages = data?.total_pages || 1
    collected = collected.concat(items)
    page += 1
  } while (page <= totalPages && collected.length < total)

  return {
    items: mapServices(collected),
    total,
  }
}

export async function fetchFeaturedServices({ limit = 6, signal } = {}) {
  const data = await listPublishedServices(
    { page: 1, pageSize: limit, sortBy: 'display_order', sortOrder: 'asc' },
    { signal },
  )
  const items = mapServices(paginatedItems(data)).slice(0, limit)
  const total = paginatedTotal(data, items.length)
  return { items, total }
}
