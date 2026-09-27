import { motion } from 'framer-motion'

const STEPS = [
  { num: '01', emoji: '🔎', title: 'Tell us where you\u2019re going', body: 'Search any destination in the world — a city, a country, or a famous landmark.' },
  { num: '02', emoji: '✨', title: 'Discover amazing places', body: 'AI recommends attractions and experiences tailored to that destination.' },
  { num: '03', emoji: '📍', title: 'Find the exact location', body: 'Tap Visit and explore it on Google Maps — coordinates, directions, all of it.' },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-ink text-paper">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-14 text-center">How WanderAI works</h2>
        <div className="grid md:grid-cols-3 gap-10 relative">
          <div className="hidden md:block absolute top-8 left-[16.6%] right-[16.6%] compass-divider" style={{ background: 'linear-gradient(90deg, transparent, rgba(247,244,236,0.25), transparent)' }} />
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative flex flex-col items-center text-center gap-3"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-ink-soft border"
                style={{ borderColor: 'var(--accent, #E8A33D)' }}
              >
                {s.emoji}
              </div>
              <span className="text-xs tracking-wide text-paper/40 font-semibold">{s.num}</span>
              <h3 className="font-display text-xl font-semibold">{s.title}</h3>
              <p className="text-paper/60 text-sm max-w-xs">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
