import { motion } from 'framer-motion'
import { PLACES, POPULAR_PLACES } from '../data/destinations.js'

const IMAGES = {
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop',
  tokyo: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
  bali: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
  santorini: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop',
  switzerland: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop',
  sydney: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=800&auto=format&fit=crop',
  'new-york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop',
  bangkok: 'https://images.unsplash.com/photo-1508009603885-50cf7c079365?q=80&w=800&auto=format&fit=crop',
}

export default function PopularDestinations({ onSearch }) {
  return (
    <section
      id="explore"
      className="py-24 border-t border-ink/10"
      style={{ background: 'linear-gradient(180deg, var(--bg) 0, transparent 220px)' }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid md:grid-cols-2 gap-6 md:gap-16 items-end mb-12">
          <div>
            <p className="kicker mb-4">
              <b>01</b> &nbsp;— Trending around the world
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[0.98] text-ink">
              Places travelers are <em className="text-compass-teal">heading</em> right now
            </h2>
          </div>
          <p className="text-ink/65 leading-relaxed max-w-md md:justify-self-end">
            Pick a destination to see what&rsquo;s worth visiting &mdash; landmarks, nature, culture and
            the quieter spots in between.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {POPULAR_PLACES.map((slug, i) => {
            const p = PLACES[slug]
            return (
              <motion.button
                key={slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                onClick={() => onSearch(p.name)}
                className="group relative rounded-[22px] overflow-hidden h-60 text-left border border-ink/10 shadow-[0_18px_40px_-22px_rgba(16,32,31,0.45)]"
              >
                <img
                  src={IMAGES[slug]}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
                <div className="absolute bottom-0 left-0 p-5 text-paper">
                  <p className="font-mono text-[9px] tracking-[0.18em] uppercase opacity-70">
                    {p.flag} {p.country}
                  </p>
                  <h3 className="font-display text-2xl leading-tight mt-1">{p.name}</h3>
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase opacity-0 group-hover:opacity-100 transition-opacity text-compass-gold">
                    Explore →
                  </span>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
