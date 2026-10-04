import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const STORIES = [
  { name: 'Aisha K.', destination: 'Munnar, Kerala', rating: 5, text: 'Munnar was absolutely magical during sunrise! The mist over the tea plantations is something I still think about.' },
  { name: 'Daniel R.', destination: 'Paris, France', rating: 5, text: 'Walked the Seine at night after finding it through WanderAI’s suggestions — better than anything I’d planned myself.' },
  { name: 'Mei L.', destination: 'Shinjuku, Tokyo', rating: 4, text: 'The free observatory deck tip alone was worth it. Views for zero yen.' },
]

export default function TravelStories() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <p className="kicker mb-4">
          <b>05</b> &nbsp;— Traveler stories
        </p>
        <h2 className="font-display text-4xl sm:text-5xl leading-[0.98] text-ink mb-12 max-w-2xl">
          Trips that went <em className="text-compass-teal">better</em> than planned
        </h2>

        <div className="grid sm:grid-cols-3 gap-4">
          {STORIES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="rounded-[22px] border border-ink/10 bg-white/45 p-7 flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < s.rating ? 'fill-compass-gold text-compass-gold' : 'text-ink/15'}`}
                  />
                ))}
              </div>
              <p className="font-display text-xl leading-snug text-ink">&ldquo;{s.text}&rdquo;</p>
              <div className="mt-auto pt-3 flex items-center gap-3 border-t border-ink/10">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-compass-teal to-[#7FC1C6] flex items-center justify-center text-sm font-semibold text-white">
                  {s.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{s.name}</p>
                  <p className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-ink/50">{s.destination}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
