export const locations = [
  { id: 'manjari', name: 'Manjari' },
  { id: 'wagholi', name: 'Wagholi' },
  { id: 'avhalwadi', name: 'Avhalwadi' },
  { id: 'loni-kalbhor', name: 'Loni Kalbhor' },
  { id: 'dhanori', name: 'Dhanori' },
  { id: 'viman-nagar', name: 'Viman Nagar' },
  { id: 'koregaon-park', name: 'Koregaon Park' },
  { id: 'baner', name: 'Baner' },
  { id: 'balewadi', name: 'Balewadi' },
  { id: 'pisoli', name: 'Pisoli' },
  { id: 'undri', name: 'Undri' },
]

const TOKEN_ALIASES = {
  manajri: 'manjari',
  manjri: 'manjari',
}

export function locationKey(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/,?\s*pune\b.*$/i, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function locationLabel(value) {
  const raw = String(value || '').trim()
  if (!raw) return ''
  const withoutCity = raw.replace(/,?\s*pune\b.*$/i, '').trim()
  return withoutCity || raw
}

function normalizeTokens(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter((token) => token && token !== 'pune')
    .map((token) => TOKEN_ALIASES[token] || token)
}

function tokensIncludeSequence(hayTokens, needleTokens) {
  if (!needleTokens.length) return false
  for (let i = 0; i <= hayTokens.length - needleTokens.length; i += 1) {
    if (needleTokens.every((token, j) => hayTokens[i + j] === token)) return true
  }
  return false
}

export function resolveProjectLocality(locationValue) {
  const hayTokens = normalizeTokens(locationValue)
  if (!hayTokens.length) return null

  const known = [...locations].sort((a, b) => b.name.length - a.name.length)
  for (const loc of known) {
    if (tokensIncludeSequence(hayTokens, normalizeTokens(loc.name))) {
      return { id: loc.id, name: loc.name }
    }
  }

  const fallback = locationLabel(locationValue)
  const id = locationKey(fallback)
  if (!id) return null
  return { id, name: fallback }
}

export function projectMatchesLocation(project, locationId) {
  if (!locationId) return true
  const resolved = resolveProjectLocality(project?.location)
  if (!resolved) return false
  const key = locationKey(locationId)
  return resolved.id === key || resolved.id === locationId
}

export function uniqueProjectLocations(projects) {
  const map = new Map()
  for (const project of projects || []) {
    const locality = resolveProjectLocality(project?.location)
    if (!locality) continue
    const existing = map.get(locality.id)
    if (existing) {
      existing.projectIds.push(project.id)
      existing.projectCount += 1
      continue
    }
    map.set(locality.id, {
      id: locality.id,
      name: locality.name,
      projectId: project.id,
      projectIds: [project.id],
      projectCount: 1,
    })
  }

  const knownOrder = locations.map((loc) => loc.id)
  return [...map.values()].sort((a, b) => {
    const left = knownOrder.indexOf(a.id)
    const right = knownOrder.indexOf(b.id)
    if (left === -1 && right === -1) return a.name.localeCompare(b.name)
    if (left === -1) return 1
    if (right === -1) return -1
    return left - right
  })
}

export const businessLocation = {
  name: 'MK Construction & Builders',
  addressLines: ['Manjri Budruk, Pune,', 'Maharashtra - 412307, India'],
  directionsUrl:
    'https://www.google.com/maps/dir/18.5126262,73.9713133/Pune,+Maharashtra+412307/@18.5042402,73.944041,14z/data=!3m1!4b1!4m18!1m8!3m7!1s0x3bc2c288130f3eef:0xf3d90a55cd7caf4a!2sPune,+Maharashtra+412307!3b1!8m2!3d18.4999637!4d73.977126!16s%2Fg%2F1hhwvg95q!4m8!1m1!4e1!1m5!1m1!1s0x3bc2c288130f3eef:0xf3d90a55cd7caf4a!2m2!1d73.977126!2d18.4999637?hl=en&entry=ttu&g_ep=EgoyMDI2MDgxNi4wIKXMDSoASAFQAw%3D%3D',
  embedUrl:
    'https://maps.google.com/maps?q=18.4999637,73.977126&hl=en&z=14&output=embed',
}
