import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, MapPin } from 'lucide-react'
import MapView from '../components/MapView.jsx'
import NearbyPlaces from '../components/NearbyPlaces.jsx'
import ErrorState from '../components/ErrorState.jsx'
import { getDestinationById, PLACES } from '../data/destinations.js'
import { useFavorites } from '../hooks/useFavorites.js'
import { useDestinationTheme } from '../hooks/useTheme.js'

export default function DestinationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const destination = getDestinationById(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const [activeSpot, setActiveSpot] = useState(destination || null)

  const place = destination ? PLACES[destination.placeId] : null
  useDestinationTheme(place?.region)

  if (!destination) return <ErrorState query={id} onRetry={() => navigate('/')} />

  const saved = isFavorite(destination.id)

  return (
    <div className="pb-24">
      <div className="relative h-[52vh] min-h-[360px]">
        <img src={destination.image} alt={destination.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-24 left-6 sm:left-8 z-10 w-10 h-10 rounded-full bg-ink/40 backdrop-blur flex items-center justify-center text-paper hover:bg-ink/60"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 sm:px-8 pb-8 flex items-end justify-between">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display text-4xl sm:text-5xl font-semibold text-paper">
              {destination.name} {destination.emoji}
            </h1>
            <p className="text-paper/70 mt-1">
              {destination.city}, {destination.country} {place?.flag}
            </p>
          </motion.div>
          <button
            onClick={() => toggleFavorite(destination)}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2.5 bg-paper/90 text-ink font-semibold text-sm"
          >
            <Heart className={`w-4 h-4 ${saved ? 'fill-compass-coral text-compass-coral' : ''}`} />
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 mt-10 space-y-12">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink mb-3">✨ Why visit?</h2>
          <p className="text-ink/70 leading-relaxed">{destination.description}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink mb-4">🎯 Things to do</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {destination.activities.map((a) => (
              <div key={a} className="flex items-center gap-2 rounded-xl border border-ink/10 px-4 py-3 bg-white">
                <span className="text-ink/40">•</span>
                <span className="text-ink font-medium">{a}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid sm:grid-cols-3 gap-5">
          <InfoCard label="Best time" value={destination.bestTime} emoji="🕐" />
          <InfoCard label="Recommended stay" value={destination.duration} emoji="📅" />
          <InfoCard label="Estimated budget" value={destination.estimatedBudget} emoji="💰" />
        </section>

        {destination.travelTips?.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-semibold text-ink mb-3">💡 Travel tips</h2>
            <ul className="space-y-2">
              {destination.travelTips.map((t) => (
                <li key={t} className="text-ink/70 flex gap-2">
                  <span style={{ color: 'var(--accent, #E8A33D)' }}>—</span> {t}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* The map loads only here — never before this point in the journey. */}
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" /> Exact Location — {activeSpot.name}
          </h2>
          <MapView latitude={activeSpot.latitude} longitude={activeSpot.longitude} label={activeSpot.name} />
        </section>

        <NearbyPlaces
          places={destination.nearbyPlaces}
          onSelect={(p) => setActiveSpot({ ...p, name: p.name })}
        />
      </div>
    </div>
  )
}

function InfoCard({ label, value, emoji }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-4">
      <p className="text-xs text-ink/40 mb-1">{emoji} {label}</p>
      <p className="font-semibold text-ink">{value}</p>
    </div>
  )
}
