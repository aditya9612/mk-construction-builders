import { useCallback, useEffect, useState } from 'react'
import { fetchPortfolioProjectsForFilter } from '../api/portfolio'

export default function usePortfolioProjects(filter = 'All') {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
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
      .then(({ items: nextItems }) => {
        if (!active) return
        setItems(nextItems)
        setStatus('success')
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setItems([])
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
    fromFallback: false,
    reload,
  }
}
