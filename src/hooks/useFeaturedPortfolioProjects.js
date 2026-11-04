import { useCallback, useEffect, useState } from 'react'
import { fetchFeaturedPortfolioProjects } from '../api/portfolio'

const FEATURED_LIMIT = 6

export default function useFeaturedPortfolioProjects(limit = FEATURED_LIMIT) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setLoading(true)
    setError('')

    fetchFeaturedPortfolioProjects({ limit, signal: controller.signal })
      .then(({ items: nextItems }) => {
        if (!active) return
        setItems(nextItems)
        setLoading(false)
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setItems([])
        setError(err?.message || 'Unable to load projects.')
        setLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [limit, reloadKey])

  return { items, loading, error, reload }
}
