import { motion } from 'framer-motion'

const GEMS = [
  { title: 'A quiet side street', topic: 'Streets', blurb: 'Away from the main strip, where locals actually spend their evenings.' },
  { title: 'A neighborhood park', topic: 'Green space', blurb: 'A peaceful green space most visitors walk right past.' },
  { title: 'A family-run café', topic: 'Food', blurb: 'Small, unlisted, and better than anything on the main square.' },
  { title: 'A hidden art corner', topic: 'Art', blurb: 'Local murals and small galleries with no entry fee.' },
]

export default function HiddenGems({ placeName }) {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-end mb-12">
          <div>
            <p className="kicker mb-4">
              <b>03</b> &nbsp;— Hidden gems
            </p>
            <h2 className="font-display text-4xl sm:text-5xl leading-[0.98] text-ink">
              The spots most itineraries <em className="text-compass-teal">skip</em>
            </h2>
          </div>
          <p className="text-ink/65 leading-relaxed max-w-md md:justify-self-end">
            Lesser-known corners near {placeName || 'your destination'} that make a trip feel like yours.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {GEMS.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="rounded-[22px] border border-ink/10 bg-white/45 p-6 flex flex-col gap-3"
            >
              <span className="kicker">
                Note 0{i + 1} · {g.topic}
              </span>
              <h3 className="font-display text-2xl leading-tight text-ink">{g.title}</h3>
              <p className="text-sm text-ink/65 leading-relaxed flex-1">{g.blurb}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
