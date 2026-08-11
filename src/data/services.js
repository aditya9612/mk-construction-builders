/**
 * Service categories for the website.
 * status: 'placeholder' means category is editable and not confirmed as official listing.
 */
export const services = [
  {
    id: 'residential',
    title: 'Residential Construction',
    description:
      'End-to-end residential building solutions focused on quality execution and timely delivery.',
    image: '/images/services/residential.svg',
    features: ['Planning support', 'Quality-focused build', 'On-time focus'],
    status: 'placeholder',
  },
  {
    id: 'commercial',
    title: 'Commercial Construction',
    description:
      'Professional commercial spaces designed for durability, function and trust.',
    image: '/images/services/commercial.svg',
    features: ['Structured execution', 'Transparent handling', 'Quality checks'],
    status: 'placeholder',
  },
  {
    id: 'bungalow',
    title: 'Bungalow Construction',
    description:
      'Custom bungalow construction with attention to finish, strength and detail.',
    image: '/images/services/bungalow.svg',
    features: ['Custom layouts', 'Premium finishes', 'Dedicated supervision'],
    status: 'placeholder',
  },
  {
    id: 'house',
    title: 'House Construction',
    description:
      'Complete house construction support from planning discussion to handover.',
    image: '/images/services/house.svg',
    features: ['Clear communication', 'Quality materials focus', 'Timely completion'],
    status: 'placeholder',
  },
  {
    id: 'renovation',
    title: 'Renovation',
    description:
      'Renovation and upgrade work for existing homes and spaces.',
    image: '/images/services/renovation.svg',
    features: ['Site assessment', 'Phased execution', 'Quality checks'],
    status: 'placeholder',
  },
  {
    id: 'interior',
    title: 'Interior Construction',
    description:
      'Interior construction support aligned with project requirements.',
    image: '/images/services/interior.svg',
    features: ['Coordinated works', 'Quality finish', 'On-site supervision'],
    status: 'placeholder',
  },
  {
    id: 'rcc',
    title: 'RCC Construction',
    description:
      'RCC-focused construction executed with quality and process discipline.',
    image: '/images/services/rcc.svg',
    features: ['Structural focus', 'Process checks', 'Professional handling'],
    status: 'placeholder',
  },
  {
    id: 'structural',
    title: 'Structural Work',
    description:
      'Structural construction support for residential and commercial builds.',
    image: '/images/services/structural.svg',
    features: ['Strength focus', 'Quality checks', 'Transparent progress'],
    status: 'placeholder',
  },
  {
    id: 'planning',
    title: 'Architectural Planning',
    description:
      'Planning and design coordination to shape project requirements clearly.',
    image: '/images/services/planning.svg',
    features: ['Requirement discussion', 'Design support', 'Estimation ready'],
    status: 'placeholder',
  },
]

export const getServiceById = (id) => services.find((s) => s.id === id)
