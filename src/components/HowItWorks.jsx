import { motion } from 'framer-motion'

const STEPS = [
  { num: '01', title: 'Tell us where you’re going', body: 'Search any destination in the world — a city, a country, or a famous landmark.' },
  { num: '02', title: 'Discover amazing places', body: 'WanderAI surfaces attractions and experiences for that destination, from icons to quiet corners.' },
  { num: '03', title: 'Find the exact location', body: 'Tap Visit to see the spot on the map — coordinates, nearby places and a one-tap link to Google Maps.' },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto rounded-[28px] bg-ink text-paper px-6 sm:px-12 py-16 shadow-[0_30px_60px_-30px_rgba(8,20,19,0.7)]">
        <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-paper/60 mb-4">
          <b className="font-medium text-compass-gold">02</b> &nbsp;— How WanderAI works
        </p>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.98] max-w-3xl mb-14">
          Search, discover, then <em className="text-[#7FC1C6]">land</em> on the exact spot
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-paper/10 rounded-2xl overflow-hidden">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="bg-ink p-8 flex flex-col gap-4"
            >
              <span className="font-display text-6xl text-compass-gold leading-none">{s.num}</span>
              <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
              <p className="text-paper/60 text-sm leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
