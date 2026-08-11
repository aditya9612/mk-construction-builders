/**
 * Project portfolio entries.
 * Where only the location is known from references, names use "Project – [Location]".
 * Replace with confirmed project details when provided.
 */
export const projects = [
  {
    id: 'manjari',
    name: 'Project – Manjari',
    location: 'Manjari',
    type: 'Residential',
    status: 'Completed',
    mainImage: '/images/projects/project-01.jpg',
    gallery: [
      '/images/projects/project-01.jpg',
      '/images/gallery/gallery-05.jpg',
      '/images/gallery/gallery-08.jpg',
    ],
    description:
      'Construction work represented in Manjari, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'wagholi',
    name: 'Project – Wagholi',
    location: 'Wagholi',
    type: 'Residential',
    status: 'Completed',
    mainImage: '/images/projects/project-02.jpg',
    gallery: [
      '/images/projects/project-02.jpg',
      '/images/gallery/gallery-03.jpg',
      '/images/gallery/gallery-01.jpg',
    ],
    description:
      'Construction work represented in Wagholi, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'avhalwadi',
    name: 'Project – Avhalwadi',
    location: 'Avhalwadi',
    type: 'House',
    status: 'Completed',
    mainImage: '/images/projects/project-03.jpg',
    gallery: [
      '/images/projects/project-03.jpg',
      '/images/gallery/gallery-04.jpg',
    ],
    description:
      'Construction work represented in Avhalwadi, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'loni-kalbhor',
    name: 'Project – Loni Kalbhor',
    location: 'Loni Kalbhor',
    type: 'Residential',
    status: 'Completed',
    mainImage: '/images/projects/project-04.jpg',
    gallery: [
      '/images/projects/project-04.jpg',
      '/images/gallery/gallery-06.jpg',
    ],
    description:
      'Construction work represented in Loni Kalbhor, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'dhanori',
    name: 'Project – Dhanori',
    location: 'Dhanori',
    type: 'Residential',
    status: 'Ongoing',
    mainImage: '/images/projects/project-05.jpg',
    gallery: [
      '/images/projects/project-05.jpg',
      '/images/projects/project-01.jpg',
    ],
    description:
      'Construction work represented in Dhanori, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'viman-nagar',
    name: 'Project – Viman Nagar',
    location: 'Viman Nagar',
    type: 'Commercial',
    status: 'Completed',
    mainImage: '/images/projects/project-06.jpg',
    gallery: [
      '/images/projects/project-06.jpg',
      '/images/gallery/gallery-07.jpg',
    ],
    description:
      'Construction work represented in Viman Nagar, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'koregaon-park',
    name: 'Project – Koregaon Park',
    location: 'Koregaon Park',
    type: 'Bungalow',
    status: 'Completed',
    mainImage: '/images/projects/project-07.jpg',
    gallery: [
      '/images/projects/project-07.jpg',
      '/images/gallery/gallery-09.jpg',
    ],
    description:
      'Construction work represented in Koregaon Park, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'baner',
    name: 'Project – Baner',
    location: 'Baner',
    type: 'Residential',
    status: 'Ongoing',
    mainImage: '/images/projects/project-08.jpg',
    gallery: [
      '/images/projects/project-08.jpg',
      '/images/quality.jpg',
    ],
    description:
      'Construction work represented in Baner, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'balewadi',
    name: 'Project – Balewadi',
    location: 'Balewadi',
    type: 'House',
    status: 'Completed',
    mainImage: '/images/projects/project-09.jpg',
    gallery: [
      '/images/projects/project-09.jpg',
      '/images/gallery/gallery-02.jpg',
    ],
    description:
      'Construction work represented in Balewadi, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'pisoli',
    name: 'Project – Pisoli',
    location: 'Pisoli',
    type: 'Residential',
    status: 'Completed',
    mainImage: '/images/projects/project-10.jpg',
    gallery: [
      '/images/projects/project-10.jpg',
      '/images/gallery/gallery-05.jpg',
    ],
    description:
      'Construction work represented in Pisoli, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
  {
    id: 'undri',
    name: 'Project – Undri',
    location: 'Undri',
    type: 'Bungalow',
    status: 'Ongoing',
    mainImage: '/images/projects/project-11.jpg',
    gallery: [
      '/images/projects/project-11.jpg',
      '/images/projects/project-04.jpg',
    ],
    description:
      'Construction work represented in Undri, Pune. Full project details will be updated when confirmed.',
    overview: null,
    workProgress: null,
    finalResult: null,
  },
]

export const projectFilters = [
  'All',
  'Residential',
  'Commercial',
  'Bungalow',
  'House',
  'Ongoing',
  'Completed',
]

export const getProjectById = (id) => projects.find((p) => p.id === id)

export const filterProjects = (filter) => {
  if (!filter || filter === 'All') return projects
  if (filter === 'Ongoing' || filter === 'Completed') {
    return projects.filter((p) => p.status === filter)
  }
  return projects.filter((p) => p.type === filter)
}
