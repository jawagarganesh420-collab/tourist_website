import { motion } from 'framer-motion'
import { Star, Clock, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DestinationCard({ destination, index = 0, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="stamp-card bg-white rounded-sm overflow-hidden group flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 text-2xl drop-shadow">{destination.emoji}</span>
        {onToggleFavorite && (
          <button
            onClick={() => onToggleFavorite(destination)}
            aria-label={isFavorite ? 'Remove from saved' : 'Save destination'}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-ink/40 backdrop-blur flex items-center justify-center hover:bg-ink/60 transition-colors"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-compass-coral text-compass-coral' : 'text-paper'}`} />
          </button>
        )}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-paper text-sm font-medium">
          <Star className="w-3.5 h-3.5 fill-compass-gold text-compass-gold" />
          {destination.rating}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-display text-xl font-semibold text-ink">{destination.name}</h3>
        <p className="text-sm text-ink/65 leading-relaxed line-clamp-2">{destination.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {destination.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-ink/5 text-ink/70">
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink/50">
          <Clock className="w-3.5 h-3.5" />
          Recommended: {destination.duration}
        </div>
        <button
          onClick={() => navigate(`/destination/${destination.id}`)}
          className="mt-auto w-full rounded-full py-2.5 font-semibold text-sm text-ink transition-transform hover:scale-[1.02] active:scale-95"
          style={{ background: 'var(--accent, #E8A33D)' }}
        >
          📍 Visit
        </button>
      </div>
    </motion.div>
  )
}
