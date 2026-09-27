import { useState } from 'react'
import { motion } from 'framer-motion'
import TravelStyleSelector from './TravelStyleSelector.jsx'
import Itinerary from './Itinerary.jsx'
import { findPlace, getDestinationsForPlace } from '../data/destinations.js'

const BUDGETS = ['Budget', 'Mid-range', 'Luxury']

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
    <section id="planner" className="py-20 bg-paper-dim">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✈️</span>
          <h2 className="font-display text-3xl font-semibold text-ink">Build My Trip</h2>
        </div>
        <p className="text-ink/60 mb-8">Tell WanderAI the shape of your trip and get a sample day-by-day plan.</p>

        <form onSubmit={createTrip} className="bg-white rounded-2xl border border-ink/10 p-6 sm:p-8 space-y-6">
          <div>
            <label className="text-sm font-medium text-ink/70 mb-1.5 block">📍 Destination</label>
            <input
              value={destinationQuery}
              onChange={(e) => setDestinationQuery(e.target.value)}
              placeholder="e.g. Kerala, Paris, Tokyo..."
              className="w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-ink/40"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className="text-sm font-medium text-ink/70 mb-1.5 block">📅 Number of days</label>
              <input
                type="number"
                min={1}
                max={7}
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-ink/40"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70 mb-1.5 block">👥 Travelers</label>
              <input
                type="number"
                min={1}
                max={12}
                value={travelers}
                onChange={(e) => setTravelers(e.target.value)}
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-ink/40"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-ink/70 mb-1.5 block">💰 Budget</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-ink/15 px-4 py-2.5 outline-none focus:border-ink/40 bg-white"
              >
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-ink/70 mb-2 block">❤️ Travel style</label>
            <TravelStyleSelector value={style} onChange={setStyle} />
          </div>

          {error && <p className="text-sm text-compass-coral">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full py-3 font-semibold text-ink transition-transform hover:scale-[1.01]"
            style={{ background: 'var(--accent, #E8A33D)' }}
          >
            ✨ Create My Trip
          </button>
        </form>

        {itinerary && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
            <h3 className="font-display text-2xl font-semibold text-ink mb-5">
              Your {itinerary.plan.length}-day {itinerary.place.name} itinerary
            </h3>
            <Itinerary days={itinerary.plan} />
          </motion.div>
        )}
      </div>
    </section>
  )
}
