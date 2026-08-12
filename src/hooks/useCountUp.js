import { useEffect, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

export function useCountUp(target, { duration = 1800, enabled = true } = {}) {
  const [count, setCount] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!enabled || target == null) return

    if (reduceMotion) {
      setCount(target)
      return
    }

    let frame
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration, enabled, reduceMotion])

  return count
}

export function useInViewOnce(ref, options = {}) {
  return useInView(ref, {
    once: true,
    margin: '-40px 0px -8% 0px',
    ...options,
  })
}
