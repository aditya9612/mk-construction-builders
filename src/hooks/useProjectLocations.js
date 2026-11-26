import { useMemo } from 'react'
import { uniqueProjectLocations } from '../data/locations'
import usePortfolioProjects from './usePortfolioProjects'

export default function useProjectLocations() {
  const { items, loading, error, reload } = usePortfolioProjects('All')
  const locations = useMemo(() => uniqueProjectLocations(items), [items])

  return { locations, loading, error, reload }
}
