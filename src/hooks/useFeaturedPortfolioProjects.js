import { useEffect, useState } from 'react'
import { fetchFeaturedPortfolioProjects } from '../api/portfolio'
import { projects } from '../data/projects'

const FEATURED_LIMIT = 6
const staticFeatured = () => projects.slice(0, FEATURED_LIMIT)

export default function useFeaturedPortfolioProjects(limit = FEATURED_LIMIT) {
  const [items, setItems] = useState(staticFeatured)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setLoading(true)

    fetchFeaturedPortfolioProjects({ limit, signal: controller.signal })
      .then(({ items: nextItems, total }) => {
        if (!active) return
        setItems(total === 0 ? staticFeatured() : nextItems)
        setLoading(false)
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setItems(staticFeatured())
        setLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [limit])

  return { items, loading }
}
