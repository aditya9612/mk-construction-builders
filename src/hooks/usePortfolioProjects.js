import { useCallback, useEffect, useState } from 'react'
import { fetchPortfolioProjectsForFilter } from '../api/portfolio'
import { filterProjects } from '../data/projects'

export default function usePortfolioProjects(filter = 'All') {
  const [items, setItems] = useState(() => filterProjects(filter))
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [fromFallback, setFromFallback] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let active = true

    setStatus('loading')
    setError('')

    fetchPortfolioProjectsForFilter(filter, { signal: controller.signal })
      .then(({ items: nextItems, total }) => {
        if (!active) return
        if (total === 0) {
          setItems(filterProjects(filter))
          setFromFallback(true)
          setStatus('success')
          return
        }
        setItems(nextItems)
        setFromFallback(false)
        setStatus('success')
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setItems(filterProjects(filter))
        setFromFallback(true)
        setError(err?.message || 'Unable to load projects.')
        setStatus('error')
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [filter, reloadKey])

  return {
    items,
    loading: status === 'loading',
    error,
    fromFallback,
    reload,
  }
}
