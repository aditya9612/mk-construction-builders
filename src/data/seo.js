import { company } from './company'
import { SITE_URL } from './site'

const brand = company.name

/** Shared default description for fallbacks */
export const defaultDescription =
  'MK Construction & Builders is a Pune-based construction company offering residential construction, building, renovation and construction solutions with a focus on quality, trust and on-time completion.'

/**
 * Static route SEO metadata.
 * Dynamic routes (service/project details) build titles in their pages.
 */
export const pageSeo = {
  home: {
    title: `${brand} | Construction Company in Pune`,
    description: defaultDescription,
    path: '/',
  },
  about: {
    title: `About Us | ${brand} Pune`,
    description: `Learn about ${brand} — a Pune construction company focused on trust, quality and on-time completion for residential and building projects across Maharashtra.`,
    path: '/about',
  },
  services: {
    title: `Construction Services in Pune | ${brand}`,
    description: `Explore residential construction, house construction, renovation, bungalow and commercial building services from ${brand} in Pune.`,
    path: '/services',
  },
  projects: {
    title: `Our Projects in Pune | ${brand}`,
    description: `Browse residential and building projects by ${brand} across Pune locations including Manjari, Wagholi, Baner, Balewadi and more.`,
    path: '/projects',
  },
  gallery: {
    title: `Project Gallery | ${brand} Pune`,
    description: `View construction and project handover photos from ${brand} — residential builds and site work across Pune.`,
    path: '/gallery',
  },
  process: {
    title: `Our Construction Process | ${brand}`,
    description: `See how ${brand} approaches construction in Pune — from requirement discussion and planning to site execution, quality checks and handover.`,
    path: '/process',
  },
  packages: {
    title: `Construction Packages | ${brand} Pune`,
    description: `Review construction package options from ${brand}. Request a custom quote for your residential or building project in Pune.`,
    path: '/packages',
  },
  calculator: {
    title: `Construction Cost Calculator | ${brand}`,
    description: `Estimate construction costs for your Pune project with the ${brand} cost calculator, then request a detailed quote.`,
    path: '/calculator',
  },
  housePlans: {
    title: `House Plans | ${brand} Pune`,
    description: `Explore house plan ideas and construction layouts supported by ${brand} for residential projects in Pune.`,
    path: '/house-plans',
  },
  quality: {
    title: `Quality & Materials | ${brand}`,
    description: `Quality-focused construction practices at ${brand}, with ${company.qualityChecks} quality checks reflecting our commitment across Pune projects.`,
    path: '/quality',
  },
  testimonials: {
    title: `Client Testimonials | ${brand} Pune`,
    description: `Client feedback and experiences with ${brand} — construction and builders serving homeowners in Pune.`,
    path: '/testimonials',
  },
  contact: {
    title: `Contact ${brand} | Pune`,
    description: `Contact ${brand} in Pune for residential construction, renovation and building enquiries. Call ${company.displayPhone} or email us.`,
    path: '/contact',
  },
  requestQuote: {
    title: `Request a Free Quote | ${brand} Pune`,
    description: `Request a free construction quote from ${brand}. Share your residential or building project details and our Pune team will respond.`,
    path: '/request-quote',
  },
  notFound: {
    title: `Page Not Found | ${brand}`,
    description: defaultDescription,
    path: '/',
    noindex: true,
  },
}

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_URL}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function serviceSeo(service) {
  return {
    title: `${service.title} in Pune | ${brand}`,
    description: `${service.description} Contact ${brand} for ${service.title.toLowerCase()} in Pune.`,
    path: `/services/${service.id}`,
  }
}

export function projectSeo(project) {
  return {
    title: `${project.name} | ${brand} Pune`,
    description:
      project.description ||
      `${project.type} construction project by ${brand} in ${project.location}, Pune.`,
    path: `/projects/${project.id}`,
  }
}
