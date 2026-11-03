import { apiGet } from './client'
import { mapGalleryItems, paginatedItems, paginatedTotal } from './mappers'

const LIST_PATH = '/api/v1/gallery'

export async function listPublishedGallery(
  {
    page = 1,
    pageSize = 100,
    category,
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
      category,
      search,
      sort_by: sortBy,
      sort_order: sortOrder,
    },
    signal,
  })
}

export async function fetchPublishedGallery({ signal } = {}) {
  const pageSize = 100
  let page = 1
  let collected = []
  let total = 0
  let totalPages = 1

  do {
    const data = await listPublishedGallery(
      { page, pageSize },
      { signal },
    )
    const items = paginatedItems(data)
    total = paginatedTotal(data, collected.length + items.length)
    totalPages = data?.total_pages || 1
    collected = collected.concat(items)
    page += 1
  } while (page <= totalPages && collected.length < total)

  return {
    items: mapGalleryItems(collected),
    total,
  }
}
