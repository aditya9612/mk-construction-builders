import { useCallback, useEffect, useState } from 'react'
import { fetchPublishedGallery } from '../api/gallery'

export default function useGallery() {
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

    fetchPublishedGallery({ signal: controller.signal })
      .then(({ items: nextItems }) => {
        if (!active) return
        setItems(nextItems)
        setStatus('success')
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setItems([])
        setError(err?.message || 'Unable to load gallery.')
        setStatus('error')
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [reloadKey])

  return {
    items,
    loading: status === 'loading',
    error,
    fromFallback: false,
    reload,
  }
}
