import { Star } from 'lucide-react'
import { motion } from 'framer-motion'

const STORIES = [
  { name: 'Aisha K.', destination: 'Munnar, Kerala', rating: 5, text: 'Munnar was absolutely magical during sunrise! The mist over the tea plantations is something I still think about.' },
  { name: 'Daniel R.', destination: 'Paris, France', rating: 5, text: 'Walked the Seine at night after finding it through WanderAI\u2019s suggestions — better than anything I\u2019d planned myself.' },
  { name: 'Mei L.', destination: 'Shinjuku, Tokyo', rating: 4, text: 'The free observatory deck tip alone was worth it. Views for zero yen.' },
]

export default function TravelStories() {
  return (
    <section className="py-16 bg-paper-dim">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-2xl">✨</span>
          <h2 className="font-display text-3xl font-semibold text-ink">Traveler Stories</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {STORIES.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 border border-ink/10 flex flex-col gap-3"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className={`w-4 h-4 ${idx < s.rating ? 'fill-compass-gold text-compass-gold' : 'text-ink/15'}`} />
                ))}
              </div>
              <p className="text-ink/75 text-sm leading-relaxed">"{s.text}"</p>
              <div className="mt-auto pt-2 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-ink/10 flex items-center justify-center text-sm font-semibold text-ink/60">
                  {s.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{s.name}</p>
                  <p className="text-xs text-ink/50">{s.destination}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
