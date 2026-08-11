import { cn } from '../utils/formatters'

export default function ProjectFilter({ filters, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-10">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={cn(
            'px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] border transition-all duration-300',
            active === filter
              ? 'bg-navy-900 text-stone-50 border-navy-900'
              : 'bg-transparent text-navy-700/75 border-stone-200 hover:border-gold-500 hover:text-gold-600',
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}
