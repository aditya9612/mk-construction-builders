import { useCallback, useEffect, useState } from 'react'
import { fetchPublishedPortfolioProject } from '../api/portfolio'
import { getProjectById } from '../data/projects'

export default function usePortfolioProject(slug) {
  const fallback = slug ? getProjectById(slug) : undefined
  const [project, setProject] = useState(fallback)
  const [status, setStatus] = useState(slug ? 'loading' : 'success')
  const [error, setError] = useState('')
  const [fromFallback, setFromFallback] = useState(Boolean(fallback))
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (!slug) {
      setProject(undefined)
      setFromFallback(false)
      setError('')
      setStatus('success')
      return undefined
    }

    const controller = new AbortController()
    let active = true
    const local = getProjectById(slug)

    setStatus('loading')
    setError('')
    setProject(local)
    setFromFallback(Boolean(local))

    fetchPublishedPortfolioProject(slug, { signal: controller.signal })
      .then((next) => {
        if (!active) return
        if (next) {
          setProject(next)
          setFromFallback(false)
          setStatus('success')
          return
        }
        setProject(local)
        setFromFallback(Boolean(local))
        setStatus('success')
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setProject(local)
        setFromFallback(Boolean(local))
        if (local) {
          setError(err?.message || 'Unable to load the latest project details.')
          setStatus('error')
          return
        }
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
    fromFallback,
    reload,
  }
}
