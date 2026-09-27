import { CATEGORIES } from '../data/destinations.js'

export default function CategoryFilter({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
      <button
        onClick={() => onChange(null)}
        className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
          !active ? 'bg-ink text-paper border-ink' : 'border-ink/15 text-ink/70 hover:border-ink/40'
        }`}
      >
        All
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(c.id === active ? null : c.id)}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
            active === c.id ? 'bg-ink text-paper border-ink' : 'border-ink/15 text-ink/70 hover:border-ink/40'
          }`}
        >
          {c.emoji} {c.label}
        </button>
      ))}
    </div>
  )
}
