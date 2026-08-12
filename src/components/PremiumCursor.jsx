import { useEffect, useRef, useState } from 'react'

function isTouchDevice() {
  if (typeof window === 'undefined') return true
  return (
    window.matchMedia('(pointer: coarse)').matches ||
    window.matchMedia('(max-width: 1023px)').matches
  )
}

export default function PremiumCursor() {
  const [active, setActive] = useState(false)
  const rafRef = useRef(null)
  const posRef = useRef({ x: 0, y: 0 })
  const glowRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || isTouchDevice()) return undefined

    setActive(true)
    const glow = glowRef.current
    if (!glow) return undefined

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        glow.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!active) return null

  return (
    <div
      ref={glowRef}
      className="premium-cursor-glow"
      aria-hidden
    />
  )
}
