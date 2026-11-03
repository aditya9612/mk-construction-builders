import { apiGet } from './client'
import {
  applyProjectFilter,
  mapPortfolioProject,
  mapPortfolioProjects,
  paginatedItems,
  paginatedTotal,
  portfolioQueryFromFilter,
} from './mappers'

const LIST_PATH = '/api/v1/portfolio/projects'

export async function listPublishedPortfolioProjects(
  { page = 1, pageSize = 100, type, status, search, sortBy = 'display_order', sortOrder = 'asc' } = {},
  { signal } = {},
) {
  return apiGet(LIST_PATH, {
    params: {
      page,
      page_size: pageSize,
      type,
      status,
      search,
      sort_by: sortBy,
      sort_order: sortOrder,
    },
    signal,
  })
}

export async function getPublishedPortfolioBySlug(slug, { signal } = {}) {
  return apiGet(`${LIST_PATH}/${encodeURIComponent(slug)}`, { signal })
}

export async function fetchPublishedPortfolioProject(slug, { signal } = {}) {
  const data = await getPublishedPortfolioBySlug(slug, { signal })
  return mapPortfolioProject(data)
}

export async function fetchPortfolioProjectsForFilter(filter, { signal } = {}) {
  const query = portfolioQueryFromFilter(filter)
  const data = await listPublishedPortfolioProjects(
    { ...query, page: 1, pageSize: 100 },
    { signal },
  )
  let items = mapPortfolioProjects(paginatedItems(data))
  let total = paginatedTotal(data, items.length)

  if (total === 0 && (query.type || query.status)) {
    const probe = await listPublishedPortfolioProjects(
      { page: 1, pageSize: 1 },
      { signal },
    )
    total = paginatedTotal(probe, 0)
  }

  if (!query.type && !query.status) {
    items = applyProjectFilter(items, filter)
  }

  return { items, total, query }
}

export async function fetchFeaturedPortfolioProjects(
  { limit = 6, signal } = {},
) {
  const data = await listPublishedPortfolioProjects(
    { page: 1, pageSize: limit },
    { signal },
  )
  const items = mapPortfolioProjects(paginatedItems(data)).slice(0, limit)
  const total = paginatedTotal(data, items.length)
  return { items, total }
}
