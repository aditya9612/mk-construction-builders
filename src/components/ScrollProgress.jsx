import { useScrollProgress } from '../hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Page scroll progress"
    >
      <div
        className="scroll-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
