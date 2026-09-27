import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  return (
    <section id="explore" className="py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-2">🔥 Trending Around the World</h2>
        <p className="text-ink/60 mb-10">A few places travelers are searching for right now.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {POPULAR_PLACES.map((slug, i) => {
            const p = PLACES[slug]
            return (
              <motion.button
                key={slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSearch(p.name)}
                className="group relative rounded-2xl overflow-hidden h-56 text-left"
              >
                <img src={IMAGES[slug]} alt={p.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-paper">
                  <p className="text-xs opacity-70">{p.flag} {p.country}</p>
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent, #E8A33D)' }}>
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
