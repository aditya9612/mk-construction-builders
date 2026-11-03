import { useCallback, useEffect, useState } from 'react'
import { fetchPublishedGallery } from '../api/gallery'
import { galleryItems as staticGalleryItems } from '../data/gallery'

export default function useGallery() {
  const [items, setItems] = useState(staticGalleryItems)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [fromFallback, setFromFallback] = useState(true)
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
      .then(({ items: nextItems, total }) => {
        if (!active) return
        if (total === 0) {
          setItems(staticGalleryItems)
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
        setItems(staticGalleryItems)
        setFromFallback(true)
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
    fromFallback,
    reload,
  }
}
