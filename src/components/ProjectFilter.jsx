import { cn } from '../utils/formatters'

export default function ProjectFilter({ filters, active, onChange }) {
  return (
    <div className="mb-10 -mx-1 px-1 overflow-x-auto overscroll-x-contain scrollbar-thin">
      <div className="flex flex-nowrap sm:flex-wrap gap-2 min-w-0 pb-1">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onChange(filter)}
            className={cn(
              'shrink-0 min-h-11 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] border transition-all duration-300',
              active === filter
                ? 'bg-navy-900 text-stone-50 border-navy-900'
                : 'bg-transparent text-navy-700/75 border-stone-200 hover:border-gold-500 hover:text-gold-600',
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  )
}
