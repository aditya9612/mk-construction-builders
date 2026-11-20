import { useCallback, useEffect, useState } from 'react'
import { listPublishedFeedback } from '../api/customerFeedback'

const DEFAULT_PAGE_SIZE = 6

export default function useCustomerFeedback({
  initialPage = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  initialSortBy = 'display_order',
  initialSortOrder = 'asc',
  initialRating = null,
  initialReviewSource = null,
  initialIsFeatured = null,
} = {}) {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(initialPage)
  const [rating, setRating] = useState(initialRating)
  const [reviewSource, setReviewSource] = useState(initialReviewSource)
  const [isFeatured, setIsFeatured] = useState(initialIsFeatured)
  const [sortBy, setSortBy] = useState(initialSortBy)
  const [sortOrder, setSortOrder] = useState(initialSortOrder)
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

    listPublishedFeedback(
      {
        page,
        pageSize,
        rating,
        reviewSource,
        isFeatured,
        sortBy,
        sortOrder,
      },
      { signal: controller.signal },
    )
      .then((data) => {
        if (!active) return
        setItems(data.items)
        setTotal(data.total)
        setTotalPages(data.totalPages)
        setLoading(false)
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setItems([])
        setTotal(0)
        setTotalPages(0)
        setError(err?.message || 'Unable to load customer feedback.')
        setLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [page, pageSize, rating, reviewSource, isFeatured, sortBy, sortOrder, reloadKey])

  return {
    items,
    total,
    totalPages,
    page,
    setPage,
    rating,
    setRating,
    reviewSource,
    setReviewSource,
    isFeatured,
    setIsFeatured,
    sortBy,
    sortOrder,
    setSort: (newSortBy, newSortOrder = 'asc') => {
      setSortBy(newSortBy)
      setSortOrder(newSortOrder)
      setPage(1)
    },
    loading,
    error,
    reload,
  }
}
