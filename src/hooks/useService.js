import { useCallback, useEffect, useState } from 'react'
import { fetchPublishedService } from '../api/services'

export default function useService(slug) {
  const [service, setService] = useState(undefined)
  const [status, setStatus] = useState(slug ? 'loading' : 'success')
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  const reload = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (!slug) {
      setService(undefined)
      setError('')
      setStatus('success')
      return undefined
    }

    const controller = new AbortController()
    let active = true

    setStatus('loading')
    setError('')
    setService(undefined)

    fetchPublishedService(slug, { signal: controller.signal })
      .then((next) => {
        if (!active) return
        setService(next || undefined)
        setStatus('success')
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setService(undefined)
        if (err?.status === 404) {
          setError('')
          setStatus('success')
          return
        }
        setError(err?.message || 'Unable to load this service.')
        setStatus('error')
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [slug, reloadKey])

  return {
    service,
    loading: status === 'loading',
    error,
    reload,
  }
}
