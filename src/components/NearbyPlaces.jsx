import { motion } from 'framer-motion'

export default function NearbyPlaces({ places, onSelect }) {
  if (!places || !places.length) return null
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold text-ink mb-4">🧭 Explore Nearby</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {places.map((p, i) => (
          <motion.button
            key={p.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(p)}
            className="flex items-center justify-between rounded-xl border border-ink/10 px-4 py-3 text-left hover:border-ink/30 transition-colors bg-white"
          >
            <span className="flex items-center gap-2 font-medium text-ink">
              <span className="text-lg">{p.emoji}</span> {p.name}
            </span>
            <span className="text-sm text-ink/50">View Location →</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
