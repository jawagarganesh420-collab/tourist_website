import { motion } from 'framer-motion'

const GEMS = [
  { title: 'A quiet side street', emoji: '✨', blurb: 'Away from the main strip, where locals actually spend their evenings.' },
  { title: 'A neighborhood park', emoji: '🌳', blurb: 'A peaceful green space most visitors walk right past.' },
  { title: 'A family-run café', emoji: '☕', blurb: 'Small, unlisted, and better than anything on the main square.' },
  { title: 'A hidden art corner', emoji: '🎨', blurb: 'Local murals and small galleries with no entry fee.' },
]

export default function HiddenGems({ placeName }) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🔮</span>
          <h2 className="font-display text-3xl font-semibold text-ink">Hidden Gems</h2>
        </div>
        <p className="text-ink/60 mb-8 max-w-xl">
          Lesser-known spots near {placeName || 'your destination'} that most itineraries skip.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GEMS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="dark-stamp-card bg-ink text-paper rounded-sm p-5 flex flex-col gap-3"
            >
              <span className="text-2xl">{g.emoji}</span>
              <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              <p className="text-sm text-paper/60 flex-1">{g.blurb}</p>
              <button className="text-sm font-semibold self-start" style={{ color: 'var(--accent, #E8A33D)' }}>
                Discover →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
