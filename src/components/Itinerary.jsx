import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SLOTS = [
  { label: 'Morning', emoji: '🌅' },
  { label: 'Afternoon', emoji: '🍛' },
  { label: 'Evening', emoji: '🌄' },
]

export default function Itinerary({ days }) {
  const navigate = useNavigate()
  return (
    <div className="space-y-6">
      {days.map((day, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="bg-white rounded-2xl border border-ink/10 p-6"
        >
          <h4 className="font-display text-xl font-semibold text-ink mb-4">Day {i + 1}</h4>
          <div className="space-y-3">
            {day.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-4 border-t border-ink/5 pt-3 first:border-0 first:pt-0">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{SLOTS[idx % SLOTS.length].emoji}</span>
                  <div>
                    <p className="text-xs text-ink/40 font-medium">{SLOTS[idx % SLOTS.length].label}</p>
                    <p className="font-medium text-ink">{item.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/destination/${item.id}`)}
                  className="shrink-0 text-xs font-semibold whitespace-nowrap"
                  style={{ color: 'var(--accent, #1B6E6B)' }}
                >
                  📍 View Location
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
