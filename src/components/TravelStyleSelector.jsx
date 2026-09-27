import { TRAVEL_STYLES } from '../data/destinations.js'

export default function TravelStyleSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
      {TRAVEL_STYLES.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => onChange(s.id)}
          className={`flex flex-col items-center gap-1 rounded-xl py-3 text-xs font-medium border transition-colors ${
            value === s.id ? 'bg-ink text-paper border-ink' : 'border-ink/15 text-ink/70 hover:border-ink/40'
          }`}
        >
          <span className="text-lg">{s.emoji}</span>
          {s.label}
        </button>
      ))}
    </div>
  )
}
