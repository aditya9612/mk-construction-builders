import { useCallback, useEffect, useState } from 'react'
import { fetchPublicInstagramReels } from '../api/instagramReels'

export default function useInstagramReels({ page, pageSize } = {}) {
  const [items, setItems] = useState([])
  const [isEnabled, setIsEnabled] = useState(false)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(page ?? 1)
  const [resolvedPageSize, setResolvedPageSize] = useState(pageSize ?? 10)
  const [totalPages, setTotalPages] = useState(1)
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

    fetchPublicInstagramReels({ page, pageSize }, { signal: controller.signal })
      .then((data) => {
        if (!active) return
        setIsEnabled(data.is_enabled)
        setItems(data.is_enabled ? data.items : [])
        setTotal(data.total)
        setCurrentPage(data.page)
        setResolvedPageSize(data.page_size)
        setTotalPages(data.total_pages)
        setLoading(false)
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setItems([])
        setIsEnabled(false)
        setTotal(0)
        setError(err?.message || 'Unable to load Instagram Reels at this time.')
        setLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [page, pageSize, reloadKey])

  return {
    items,
    isEnabled,
    total,
    page: currentPage,
    pageSize: resolvedPageSize,
    totalPages,
    loading,
    error,
    reload,
    retry: reload,
  }
}
