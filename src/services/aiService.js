// Mock AI recommendation + chat service.
// Swap the bodies of these functions for real calls to your AI provider
// (e.g. the Anthropic API) once you're ready — the rest of the app only
// depends on this file's exported shape, not on how it's implemented.
import { findPlace, getDestinationsForPlace, slugify } from '../data/destinations.js'

const LOADING_MESSAGES = [
  'Finding popular places...',
  'Discovering hidden gems...',
  'Checking the best time to visit...',
  'Preparing your adventure...',
]

export function getLoadingMessages() {
  return LOADING_MESSAGES
}

// Simulates an AI call that resolves a free-text search into a destination + its highlights.
export async function discoverPlace(query) {
  await wait(900 + Math.random() * 600)
  const found = findPlace(query)
  if (!found) return null
  const destinations = getDestinationsForPlace(found)
  return { place: found, destinations }
}

// Simulates: "I'm visiting Kerala" / "What can I visit in Paris?" style prompts.
export async function askAI(message, context = {}) {
  await wait(500 + Math.random() * 500)
  const text = message.toLowerCase()

  const placeMatch = Object.keys(context.knownPlaces || {}).find((slug) => text.includes(slug.replace('-', ' ')))
  const place = context.currentPlace || (placeMatch ? findPlace(placeMatch) : null)

  if (text.includes('3 day') || text.includes('three day') || text.includes('plan a')) {
    return place
      ? `Here's a balanced plan for ${place.name}: spend day one in the most iconic spot, day two exploring nature or culture nearby, and day three at a slower pace — local food, a market, or a quiet viewpoint. Want me to lay it out in the Trip Planner?`
      : "Tell me which destination you're planning for and I'll sketch out a day-by-day plan."
  }
  if (text.includes('food') || text.includes('eat')) {
    return place
      ? `${place.name} is worth visiting for its food alone — look for family-run spots away from the main tourist strip for the best regional dishes.`
      : 'Tell me a destination and I can point you toward regional dishes worth seeking out.'
  }
  if (text.includes('budget') || text.includes('cheap')) {
    return place
      ? `${place.name} can be done on almost any budget — public transport and local eateries go a long way, while private guides and boutique stays push costs up fast.`
      : "Let me know where you're headed and I'll give you a sense of typical costs."
  }
  if (text.includes('famil')) {
    return place
      ? `For families in ${place.name}, look for destinations with shorter travel times between stops and a mix of outdoor and indoor activities to keep energy up.`
      : 'Tell me the destination and I can suggest family-friendly stops.'
  }
  if (text.includes('nearby') || text.includes('near')) {
    return place
      ? `Near ${place.name}, it's worth exploring a couple of the lesser-known spots just outside the main area — check the "Explore Nearby" section on the destination page.`
      : 'Which destination should I look near?'
  }
  if (place) {
    return `${place.name} has a great mix of things to see. Tell me what you're most interested in — nature, history, food, or something more relaxed — and I'll narrow it down.`
  }
  return "I can help plan your trip — tell me a city, country or destination you're curious about."
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { slugify }
