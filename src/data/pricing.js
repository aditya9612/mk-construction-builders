/**
 * Pricing configuration.
 * Set `enabled: true` and rates when real values are provided.
 * Until then the calculator shows on-request messaging only.
 */
export const pricingConfig = {
  enabled: false,
  currency: 'INR',
  note: 'Rate will be provided after site evaluation.',
  estimateDisclaimer:
    'Estimated quotation will depend on project requirements, design, materials, location and site conditions.',
  rates: {
    Basic: null,
    Standard: null,
    Premium: null,
  },
  // Optional future multipliers
  floorMultiplier: {
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  },
  projectTypeMultiplier: {
    Residential: 1,
    Commercial: 1,
    Bungalow: 1,
    House: 1,
    Renovation: 1,
  },
}

export const packages = [
  {
    id: 'basic',
    name: 'Basic Package',
    price: null,
    priceLabel: 'Price available on request',
    description:
      'Essential construction package for quality-focused builds. Scope finalized after site evaluation.',
    features: [
      'Requirement discussion',
      'Quality-focused execution',
      'Transparent communication',
      'On-time focus',
    ],
    highlighted: false,
  },
  {
    id: 'standard',
    name: 'Standard Package',
    price: null,
    priceLabel: 'Price available on request',
    description:
      'Balanced package for residential and house construction needs across Pune.',
    features: [
      'Planning & design support',
      'Quality checks',
      'Dedicated supervision',
      'Structured project handling',
    ],
    highlighted: true,
  },
  {
    id: 'premium',
    name: 'Premium Package',
    price: null,
    priceLabel: 'Price available on request',
    description:
      'Premium construction approach emphasizing finish quality and professional oversight.',
    features: [
      'Detailed planning',
      'Premium material options discussion',
      'Enhanced quality checks',
      'Priority communication',
    ],
    highlighted: false,
  },
]

/**
 * Calculate estimate when pricingConfig.enabled and rates are set.
 * Returns null when rates are unavailable.
 */
export function calculateEstimate({ projectType, area, quality, floors }) {
  if (!pricingConfig.enabled) return null
  const baseRate = pricingConfig.rates[quality]
  if (baseRate == null || !area || Number(area) <= 0) return null

  const typeMult = pricingConfig.projectTypeMultiplier[projectType] ?? 1
  const floorMult = pricingConfig.floorMultiplier[floors] ?? 1
  const total = Number(area) * baseRate * typeMult * floorMult

  return {
    total,
    currency: pricingConfig.currency,
    breakdown: { baseRate, typeMult, floorMult, area: Number(area) },
  }
}
