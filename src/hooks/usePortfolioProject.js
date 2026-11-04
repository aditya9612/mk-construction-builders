import { useCallback, useEffect, useState } from 'react'
import { fetchPublishedPortfolioProject } from '../api/portfolio'

export default function usePortfolioProject(slug) {
  const [project, setProject] = useState(undefined)
  const [status, setStatus] = useState(slug ? 'loading' : 'success')
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (!slug) {
      setProject(undefined)
      setError('')
      setStatus('success')
      return undefined
    }

    const controller = new AbortController()
    let active = true

    setStatus('loading')
    setError('')
    setProject(undefined)

    fetchPublishedPortfolioProject(slug, { signal: controller.signal })
      .then((next) => {
        if (!active) return
        setProject(next || undefined)
        setStatus('success')
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setProject(undefined)
        if (err?.status === 404) {
          setError('')
          setStatus('success')
          return
        }
        setError(err?.message || 'Unable to load this project.')
        setStatus('error')
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [slug, reloadKey])

  return {
    project,
    loading: status === 'loading',
    error,
    fromFallback: false,
    reload,
  }
}
