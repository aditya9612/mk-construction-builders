import { useCallback, useEffect, useState } from 'react'
import { fetchFeedbackStatistics } from '../api/customerFeedback'

const DEFAULT_STATISTICS = {
  total_published_reviews: 0,
  average_rating: 0,
  rating_distribution: {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  },
  total_google_reviews: 0,
  total_website_reviews: 0,
}

export default function useCustomerFeedbackStatistics() {
  const [statistics, setStatistics] = useState(DEFAULT_STATISTICS)
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

    fetchFeedbackStatistics({ signal: controller.signal })
      .then((data) => {
        if (!active) return
        setStatistics(data)
        setLoading(false)
      })
      .catch((err) => {
        if (!active || err?.name === 'AbortError') return
        setStatistics(DEFAULT_STATISTICS)
        setError(err?.message || 'Unable to load feedback statistics.')
        setLoading(false)
      })

    return () => {
      active = false
      controller.abort()
    }
  }, [reloadKey])

  return {
    statistics,
    loading,
    error,
    reload,
  }
}
