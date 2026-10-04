import { useState } from 'react'
import { motion } from 'framer-motion'
import TravelStyleSelector from './TravelStyleSelector.jsx'
import Itinerary from './Itinerary.jsx'
import { findPlace, getDestinationsForPlace } from '../data/destinations.js'

const BUDGETS = ['Budget', 'Mid-range', 'Luxury']

const FIELD =
  'w-full rounded-xl border border-ink/15 bg-white/60 px-4 py-2.5 outline-none focus:border-ink/50 transition-colors'
const LABEL = 'font-mono text-[10px] tracking-[0.16em] uppercase text-ink/60 mb-2 block'

export default function TripPlanner() {
  const [destinationQuery, setDestinationQuery] = useState('')
  const [days, setDays] = useState(3)
  const [travelers, setTravelers] = useState(2)
  const [budget, setBudget] = useState('Mid-range')
  const [style, setStyle] = useState('couple')
  const [itinerary, setItinerary] = useState(null)
  const [error, setError] = useState(null)

  function createTrip(e) {
    e.preventDefault()
    setError(null)
    const place = findPlace(destinationQuery)
    if (!place) {
      setError("We couldn't find that destination — try a city or country name.")
      setItinerary(null)
      return
    }
    const spots = getDestinationsForPlace({ ...place, slug: place.slug })
    const dayCount = Math.max(1, Math.min(7, Number(days) || 1))
    const plan = []
    let cursor = 0
    for (let d = 0; d < dayCount; d++) {
      const dayItems = []
      for (let s = 0; s < 3 && spots.length; s++) {
        dayItems.push(spots[cursor % spots.length])
        cursor++
      }
      plan.push(dayItems)
    }
    setItinerary({ place, plan })
  }

  return (
    <section id="planner" className="py-24 bg-paper-dim border-y border-ink/10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <p className="kicker mb-4">
          <b>04</b> &nbsp;— Build my trip
        </p>
        <h2 className="font-display text-4xl sm:text-5xl leading-[0.98] text-ink mb-4">
          Shape the trip, get a <em className="text-compass-teal">day-by-day</em> plan
        </h2>
        <p className="text-ink/65 mb-10 max-w-xl">
          Tell WanderAI the shape of your trip and get a sample itinerary built from real places.
        </p>

        <form
          onSubmit={createTrip}
          className="rounded-[22px] border border-ink/10 bg-white/50 p-6 sm:p-8 space-y-6"
        >
          <div>
            <label className={LABEL}>Destination</label>
            <input
              value={destinationQuery}
              onChange={(e) => setDestinationQuery(e.target.value)}
              placeholder="e.g. Kerala, Paris, Tokyo..."
              className={FIELD}
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className={LABEL}>Number of days</label>
              <input type="number" min={1} max={7} value={days} onChange={(e) => setDays(e.target.value)} className={FIELD} />
            </div>
            <div>
              <label className={LABEL}>Travelers</label>
              <input type="number" min={1} max={12} value={travelers} onChange={(e) => setTravelers(e.target.value)} className={FIELD} />
            </div>
            <div>
              <label className={LABEL}>Budget</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className={FIELD}>
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={LABEL}>Travel style</label>
            <TravelStyleSelector value={style} onChange={setStyle} />
          </div>

          {error && <p className="text-sm text-compass-coral">{error}</p>}

          <button
            type="submit"
            className="inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #E8732A, #F3A15E)',
              boxShadow: '0 10px 26px rgba(232,115,42,0.32)',
            }}
          >
            Create my trip
            <span className="grid place-items-center w-9 h-9 rounded-full bg-white/90 text-compass-gold">→</span>
          </button>
        </form>

        {itinerary && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-12">
            <h3 className="font-display text-3xl text-ink mb-6">
              Your {itinerary.plan.length}-day {itinerary.place.name} itinerary
            </h3>
            <Itinerary days={itinerary.plan} />
          </motion.div>
        )}
      </div>
    </section>
  )
}
