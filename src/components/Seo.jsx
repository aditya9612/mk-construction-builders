import { useEffect } from 'react'
import { company } from '../data/company'
import { DEFAULT_OG_IMAGE, SITE_LOGO, SITE_URL } from '../data/site'
import { absoluteUrl, defaultDescription } from '../data/seo'
import { isPlaceholder } from '../utils/formatters'

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!data) {
    if (el) el.remove()
    return
  }
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function buildLocalBusinessSchema() {
  const sameAs = []
  if (company.instagramUrl && !isPlaceholder(company.instagramUrl)) {
    sameAs.push(company.instagramUrl)
  }
  if (company.facebookUrl && !isPlaceholder(company.facebookUrl)) {
    sameAs.push(company.facebookUrl)
  }
  if (company.youtubeUrl && !isPlaceholder(company.youtubeUrl)) {
    sameAs.push(company.youtubeUrl)
  }

  const address = {
    '@type': 'PostalAddress',
    addressLocality: company.city,
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  }
  if (company.address && !isPlaceholder(company.address)) {
    address.streetAddress = company.address
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${SITE_URL}/#localbusiness`,
    name: company.name,
    alternateName: company.shortName,
    url: `${SITE_URL}/`,
    logo: SITE_LOGO,
    image: DEFAULT_OG_IMAGE,
    description: defaultDescription,
    telephone: company.phone,
    email: company.email,
    address,
    areaServed: [
      {
        '@type': 'City',
        name: 'Pune',
      },
      {
        '@type': 'State',
        name: 'Maharashtra',
      },
    ],
    founder: {
      '@type': 'Person',
      name: company.founder,
      jobTitle: company.designation,
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

function buildOrganizationSchema() {
  const sameAs = []
  if (company.instagramUrl && !isPlaceholder(company.instagramUrl)) {
    sameAs.push(company.instagramUrl)
  }
  if (company.facebookUrl && !isPlaceholder(company.facebookUrl)) {
    sameAs.push(company.facebookUrl)
  }
  if (company.youtubeUrl && !isPlaceholder(company.youtubeUrl)) {
    sameAs.push(company.youtubeUrl)
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: company.name,
    alternateName: company.shortName,
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: SITE_LOGO,
    },
    email: company.email,
    telephone: company.phone,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: company.name,
    url: `${SITE_URL}/`,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    inLanguage: 'en',
  }
}

/**
 * Client-side document head manager for React Router pages.
 * Keeps Vite SPA architecture — no extra SEO libraries.
 */
export default function Seo({
  title,
  description,
  path = '/',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  includeBusinessSchema = false,
}) {
  useEffect(() => {
    const pageTitle = title || company.seo.title
    const pageDescription = description || company.seo.description
    const canonical = absoluteUrl(path)
    const robots = noindex ? 'noindex, follow' : 'index, follow'

    document.title = pageTitle
    document.documentElement.lang = 'en'

    upsertMeta('name', 'description', pageDescription)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'googlebot', robots)
    upsertMeta('name', 'author', company.name)
    upsertMeta('name', 'geo.region', 'IN-MH')
    upsertMeta('name', 'geo.placename', company.city)

    upsertLink('canonical', canonical)

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:site_name', company.name)
    upsertMeta('property', 'og:title', pageTitle)
    upsertMeta('property', 'og:description', pageDescription)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', image)
    upsertMeta('property', 'og:locale', 'en_IN')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', pageTitle)
    upsertMeta('name', 'twitter:description', pageDescription)
    upsertMeta('name', 'twitter:image', image)

    if (includeBusinessSchema) {
      upsertJsonLd('seo-ld-organization', buildOrganizationSchema())
      upsertJsonLd('seo-ld-localbusiness', buildLocalBusinessSchema())
      upsertJsonLd('seo-ld-website', buildWebSiteSchema())
    } else {
      upsertJsonLd('seo-ld-organization', null)
      upsertJsonLd('seo-ld-localbusiness', null)
      upsertJsonLd('seo-ld-website', null)
    }
  }, [title, description, path, image, type, noindex, includeBusinessSchema])

  return null
}
