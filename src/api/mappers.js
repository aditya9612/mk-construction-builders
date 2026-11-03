import { mediaUrl } from './client'

const PROJECT_TYPE_LABELS = {
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
  bungalow: 'Bungalow',
  house: 'House',
  renovation: 'Renovation',
  other: 'Other',
}

const PROJECT_STATUS_LABELS = {
  completed: 'Completed',
  ongoing: 'Ongoing',
  in_progress: 'Ongoing',
  'in-progress': 'Ongoing',
  planned: 'Planned',
  showcase: 'Showcase',
}

const FILTER_TYPE_QUERY = {
  Residential: 'RESIDENTIAL',
  Commercial: 'COMMERCIAL',
}

const FILTER_STATUS_QUERY = {
  Ongoing: 'IN_PROGRESS',
  Completed: 'COMPLETED',
}

const GALLERY_CATEGORY_LABELS = {
  projects: 'Projects',
  site: 'Site Work',
  interior: 'Interior',
  exterior: 'Exterior',
  team: 'Team',
  other: 'Other',
  construction: 'Construction',
  events: 'Events',
  'completed work': 'Completed Work',
  'site work': 'Site Work',
}

function firstDefined(...values) {
  return values.find((value) => value != null && value !== '')
}

function titleCaseFromEnum(value) {
  if (value == null || value === '') return ''
  return String(value)
    .replace(/[_-]+/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

function pickMediaPath(media) {
  if (media == null) return ''
  if (typeof media === 'string') return media
  return firstDefined(
    media.src,
    media.src_full,
    media.url,
    media.url_path,
    media.path,
  )
}

function mapProjectType(value) {
  if (value == null || value === '') return ''
  const key = String(value).trim().toLowerCase()
  return PROJECT_TYPE_LABELS[key] || titleCaseFromEnum(value)
}

function mapProjectStatus(value) {
  if (value == null || value === '') return ''
  const key = String(value).trim().toLowerCase()
  return PROJECT_STATUS_LABELS[key] || titleCaseFromEnum(value)
}

function mapGalleryCategory(value) {
  if (value == null || value === '') return 'Other'
  const key = String(value).trim().toLowerCase().replace(/[_-]+/g, ' ')
  return GALLERY_CATEGORY_LABELS[key] || titleCaseFromEnum(value)
}

function mapGalleryImage(item, index = 0) {
  if (item == null) return null
  if (typeof item === 'string') {
    const src = mediaUrl(item)
    return src
      ? {
          id: `img-${index}`,
          src,
          srcFull: src,
          caption: '',
          category: '',
          objectPosition: undefined,
        }
      : null
  }

  const src = mediaUrl(
    firstDefined(item.src, pickMediaPath(item.media), pickMediaPath(item)),
  )
  const srcFull = mediaUrl(
    firstDefined(
      item.src_full,
      item.srcFull,
      pickMediaPath(item.media),
      item.src,
      pickMediaPath(item),
    ),
  )

  if (!src && !srcFull) return null

  return {
    id: firstDefined(item.id, item.media_id, `img-${index}`),
    src: src || srcFull,
    srcFull: srcFull || src,
    caption: firstDefined(item.caption, item.alt, ''),
    category: mapGalleryCategory(item.category),
    objectPosition: firstDefined(item.object_position, item.objectPosition),
  }
}

export function mapPortfolioProject(item) {
  if (!item || typeof item !== 'object') return null

  const id = String(
    firstDefined(item.slug, item.id, item.project_id, ''),
  )
  if (!id) return null

  const cover = mediaUrl(
    firstDefined(
      typeof item.mainImage === 'string' ? item.mainImage : pickMediaPath(item.mainImage),
      typeof item.main_image === 'string' ? item.main_image : pickMediaPath(item.main_image),
      item.cover_url,
      item.image_url,
      typeof item.image === 'string' ? item.image : pickMediaPath(item.image),
      pickMediaPath(item.cover),
      pickMediaPath(item.main_media),
      pickMediaPath(item.media),
    ),
  )

  const gallerySource = Array.isArray(item.gallery)
    ? item.gallery
    : Array.isArray(item.gallery_items)
      ? item.gallery_items
      : []

  const gallery = gallerySource
    .slice()
    .sort((a, b) => {
      const left = typeof a === 'object' ? a?.display_order ?? 0 : 0
      const right = typeof b === 'object' ? b?.display_order ?? 0 : 0
      return left - right
    })
    .map((entry, index) => {
      const mapped = mapGalleryImage(entry, index)
      return mapped ? mapped.srcFull || mapped.src : ''
    })
    .filter(Boolean)

  return {
    id,
    name: firstDefined(item.name, item.title, 'Project'),
    location: firstDefined(item.location, item.city, ''),
    type: mapProjectType(item.type),
    status: mapProjectStatus(item.status),
    mainImage: cover,
    gallery,
    description: firstDefined(item.description, ''),
    overview: firstDefined(item.overview, null),
    workProgress: firstDefined(item.work_progress, item.workProgress, null),
    finalResult: firstDefined(item.final_result, item.finalResult, null),
  }
}

export function mapPortfolioProjects(items) {
  if (!Array.isArray(items)) return []
  return items.map(mapPortfolioProject).filter(Boolean)
}

export function mapGalleryItem(item, index = 0) {
  const mapped = mapGalleryImage(item, index)
  if (!mapped) return null
  return {
    id: String(mapped.id),
    src: mapped.src,
    srcFull: mapped.srcFull,
    caption: mapped.caption,
    category: mapped.category,
    objectPosition: mapped.objectPosition,
  }
}

export function mapGalleryItems(items) {
  if (!Array.isArray(items)) return []
  return items.map(mapGalleryItem).filter(Boolean)
}

export function paginatedItems(data) {
  if (Array.isArray(data)) return data
  if (data && Array.isArray(data.items)) return data.items
  return []
}

export function paginatedTotal(data, itemCount = 0) {
  if (data && typeof data.total === 'number') return data.total
  return itemCount
}

/** Map existing UI filter chips to public portfolio query params. */
export function portfolioQueryFromFilter(filter) {
  if (!filter || filter === 'All') return {}
  if (FILTER_STATUS_QUERY[filter]) {
    return { status: FILTER_STATUS_QUERY[filter] }
  }
  if (FILTER_TYPE_QUERY[filter]) {
    return { type: FILTER_TYPE_QUERY[filter] }
  }
  return {}
}

export function applyProjectFilter(list, filter) {
  if (!filter || filter === 'All') return list
  if (filter === 'Ongoing' || filter === 'Completed') {
    return list.filter((project) => project.status === filter)
  }
  return list.filter((project) => project.type === filter)
}
