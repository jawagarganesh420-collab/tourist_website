// src/services/aiService.js

import {
  findPlace,
  getDestinationsForPlace,
  slugify,
  CATEGORIES,
} from '../data/destinations.js'

const LOADING_MESSAGES = [
  'Finding popular places...',
  'Discovering hidden gems...',
  'Searching nearby attractions...',
  'Checking landmarks and experiences...',
  'Preparing your adventure...',
]

const NOMINATIM_URL =
  'https://nominatim.openstreetmap.org/search'

const OVERPASS_URL =
  'https://overpass-api.de/api/interpreter'

const CATEGORY_IMAGES = {
  nature:
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',

  beaches:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',

  mountains:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',

  history:
    'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?q=80&w=1200&auto=format&fit=crop',

  culture:
    'https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format&fit=crop',

  food:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop',

  wildlife:
    'https://images.unsplash.com/photo-1549366021-9f761d450615?q=80&w=1200&auto=format&fit=crop',

  entertainment:
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',

  adventure:
    'https://images.unsplash.com/photo-1526481280695-3c687fd643ed?q=80&w=1200&auto=format&fit=crop',

  shopping:
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',

  scenic:
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=1200&auto=format&fit=crop',

  photography:
    'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1200&auto=format&fit=crop',

  nightlife:
    'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop',
}

export function getLoadingMessages() {
  return LOADING_MESSAGES
}

export async function discoverPlace(query) {
  if (!query || !query.trim()) {
    return null
  }

  const cleanQuery = query.trim()

  const existingPlace = findPlace(cleanQuery)

  if (existingPlace) {
    const curatedDestinations =
      getDestinationsForPlace(existingPlace)

    if (
      curatedDestinations &&
      curatedDestinations.length >= 5
    ) {
      return {
        place: existingPlace,
        destinations: curatedDestinations,
      }
    }
  }

  try {
    const place = await geocodePlace(cleanQuery)

    if (!place) {
      return null
    }

    const destinations =
      await discoverRealPlaces(place)

    if (destinations.length > 0) {
      return {
        place,
        destinations,
      }
    }

    if (existingPlace) {
      return {
        place: existingPlace,
        destinations:
          getDestinationsForPlace(existingPlace),
      }
    }

    return {
      place,
      destinations:
        createFallbackDestinations(place),
    }
  } catch (error) {
    console.error(
      'Dynamic destination discovery failed:',
      error
    )

    if (existingPlace) {
      return {
        place: existingPlace,
        destinations:
          getDestinationsForPlace(existingPlace),
      }
    }

    return null
  }
}

async function geocodePlace(query) {
  const url = new URL(NOMINATIM_URL)

  url.searchParams.set('q', query)
  url.searchParams.set('format', 'jsonv2')
  url.searchParams.set('limit', '1')
  url.searchParams.set('addressdetails', '1')

  const response = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      `Geocoding failed: ${response.status}`
    )
  }

  const results = await response.json()

  if (
    !Array.isArray(results) ||
    results.length === 0
  ) {
    return null
  }

  const result = results[0]
  const address = result.address || {}

  const name =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    address.state ||
    result.display_name?.split(',')[0] ||
    query

  const country = address.country || ''

  const countryCode =
    address.country_code
      ? address.country_code.toUpperCase()
      : ''

  return {
    slug: slugify(name),

    name,

    country,

    countryCode,

    flag: countryCode
      ? countryCodeToFlag(countryCode)
      : '🌍',

    region: slugify(
      address.state ||
        address.region ||
        country
    ),

    intro: createIntro(name, country),

    center: {
      lat: Number(result.lat),
      lng: Number(result.lon),
    },

    boundingBox: result.boundingbox
      ? {
          south: Number(result.boundingbox[0]),
          north: Number(result.boundingbox[1]),
          west: Number(result.boundingbox[2]),
          east: Number(result.boundingbox[3]),
        }
      : null,
  }
}

async function discoverRealPlaces(place) {
  const lat = place.center.lat
  const lng = place.center.lng

  const radius = 35000

  const query = `
[out:json][timeout:35];

(
  node["tourism"~"attraction|museum|gallery|viewpoint|zoo|theme_park|aquarium|artwork"](around:${radius},${lat},${lng});
  way["tourism"~"attraction|museum|gallery|viewpoint|zoo|theme_park|aquarium|artwork"](around:${radius},${lat},${lng});
  relation["tourism"~"attraction|museum|gallery|viewpoint|zoo|theme_park|aquarium|artwork"](around:${radius},${lat},${lng});

  node["historic"~"monument|castle|fort|memorial|archaeological_site|ruins|building"](around:${radius},${lat},${lng});
  way["historic"~"monument|castle|fort|memorial|archaeological_site|ruins|building"](around:${radius},${lat},${lng});
  relation["historic"~"monument|castle|fort|memorial|archaeological_site|ruins|building"](around:${radius},${lat},${lng});

  node["leisure"~"park|nature_reserve|water_park"](around:${radius},${lat},${lng});
  way["leisure"~"park|nature_reserve|water_park"](around:${radius},${lat},${lng});

  node["natural"~"beach|peak|waterfall|cave_entrance"](around:${radius},${lat},${lng});
  way["natural"~"beach|peak|waterfall|cave_entrance"](around:${radius},${lat},${lng});

  node["amenity"~"theatre|arts_centre|marketplace"](around:${radius},${lat},${lng});
  way["amenity"~"theatre|arts_centre|marketplace"](around:${radius},${lat},${lng});
);

out center tags;
`

  const response = await fetch(
    OVERPASS_URL,
    {
      method: 'POST',

      headers: {
        'Content-Type':
          'text/plain;charset=UTF-8',
      },

      body: query,
    }
  )

  if (!response.ok) {
    throw new Error(
      `Overpass request failed: ${response.status}`
    )
  }

  const data = await response.json()

  if (
    !data ||
    !Array.isArray(data.elements) ||
    data.elements.length === 0
  ) {
    return []
  }

  const places = data.elements
    .map((item) =>
      normalizeOSMPlace(item, place)
    )
    .filter(Boolean)

  return deduplicatePlaces(places)
    .sort(
      (a, b) =>
        attractionScore(b) -
        attractionScore(a)
    )
    .slice(0, 50)
}

function normalizeOSMPlace(
  item,
  searchedPlace
) {
  const tags = item.tags || {}

  const name =
    tags.name ||
    tags['name:en']

  if (!name) {
    return null
  }

  const latitude = Number(
    item.lat ?? item.center?.lat
  )

  const longitude = Number(
    item.lon ?? item.center?.lon
  )

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null
  }

  const category = detectCategory(tags)

  const city =
    tags['addr:city'] ||
    tags['addr:town'] ||
    tags['addr:village'] ||
    searchedPlace.name

  const country =
    tags['addr:country'] ||
    searchedPlace.country

  const emoji =
    categoryEmoji(category)

  const id =
    `live-${slugify(name)}-${Math.round(
      latitude * 1000
    )}-${Math.round(longitude * 1000)}`

  return {
    id,

    name,

    placeId: searchedPlace.slug,

    city,

    country,

    emoji,

    category,

    tags: buildTags(
      tags,
      category
    ),

    description:
      createDescription(
        name,
        category,
        city
      ),

    duration:
      estimateDuration(category),

    rating:
      estimateRating(tags),

    latitude,

    longitude,

    image:
      getOSMImage(tags) ||
      CATEGORY_IMAGES[category] ||
      CATEGORY_IMAGES.scenic,

    bestTime:
      bestTimeForCategory(category),

    estimatedBudget:
      budgetForCategory(category),

    activities:
      activitiesForCategory(
        name,
        category
      ),

    nearbyPlaces: [],

    travelTips: [
      `Check local opening hours before visiting ${name}.`,
      'Use the exact map location when planning your route.',
    ],

    osmId: item.id,

    source: 'OpenStreetMap',

    website:
      tags.website ||
      tags['contact:website'] ||
      null,

    wikipedia:
      tags.wikipedia ||
      null,
  }
}

function getOSMImage(tags) {
  const image = tags.image

  if (
    image &&
    /^https?:\/\//i.test(image)
  ) {
    return image
  }

  return null
}

function detectCategory(tags) {
  const tourism = tags.tourism
  const historic = tags.historic
  const natural = tags.natural
  const leisure = tags.leisure
  const amenity = tags.amenity

  if (natural === 'beach') {
    return 'beaches'
  }

  if (natural === 'peak') {
    return 'mountains'
  }

  if (
    natural === 'waterfall' ||
    natural === 'cave_entrance'
  ) {
    return 'nature'
  }

  if (tourism === 'viewpoint') {
    return 'scenic'
  }

  if (
    tourism === 'zoo' ||
    tourism === 'aquarium'
  ) {
    return 'wildlife'
  }

  if (tourism === 'theme_park') {
    return 'entertainment'
  }

  if (
    tourism === 'museum' ||
    tourism === 'gallery'
  ) {
    return 'culture'
  }

  if (tourism === 'artwork') {
    return 'photography'
  }

  if (tourism === 'attraction') {
    return 'scenic'
  }

  if (
    historic === 'castle' ||
    historic === 'fort' ||
    historic === 'monument' ||
    historic === 'memorial' ||
    historic === 'archaeological_site' ||
    historic === 'ruins' ||
    historic === 'building'
  ) {
    return 'history'
  }

  if (leisure === 'nature_reserve') {
    return 'wildlife'
  }

  if (leisure === 'water_park') {
    return 'entertainment'
  }

  if (leisure === 'park') {
    return 'nature'
  }

  if (
    amenity === 'theatre' ||
    amenity === 'arts_centre'
  ) {
    return 'entertainment'
  }

  if (amenity === 'marketplace') {
    return 'shopping'
  }

  return 'culture'
}

function attractionScore(destination) {
  let score = 0

  if (destination.name) {
    score += 10
  }

  if (destination.website) {
    score += 5
  }

  if (destination.wikipedia) {
    score += 5
  }

  const importantCategories = [
    'history',
    'culture',
    'nature',
    'beaches',
    'mountains',
    'wildlife',
    'scenic',
  ]

  if (
    importantCategories.includes(
      destination.category
    )
  ) {
    score += 3
  }

  return score
}

function deduplicatePlaces(places) {
  const seen = new Set()

  return places.filter((place) => {
    const key =
      `${place.name.toLowerCase()}-${place.category}`

    if (seen.has(key)) {
      return false
    }

    seen.add(key)

    return true
  })
}

function buildTags(tags, category) {
  const result = []

  const categoryObject =
    CATEGORIES.find(
      (item) => item.id === category
    )

  if (categoryObject) {
    result.push(categoryObject.label)
  }

  if (tags.tourism) {
    result.push(
      formatTag(tags.tourism)
    )
  }

  if (tags.historic) {
    result.push(
      formatTag(tags.historic)
    )
  }

  if (tags.natural) {
    result.push(
      formatTag(tags.natural)
    )
  }

  if (tags.leisure) {
    result.push(
      formatTag(tags.leisure)
    )
  }

  if (tags.amenity) {
    result.push(
      formatTag(tags.amenity)
    )
  }

  return [
    ...new Set(result),
  ].slice(0, 4)
}

function formatTag(value) {
  return String(value)
    .replace(/_/g, ' ')
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    )
}

function categoryEmoji(category) {
  const emojis = {
    nature: '🌿',
    beaches: '🏖️',
    mountains: '🏔️',
    history: '🏛️',
    culture: '🎨',
    food: '🍜',
    wildlife: '🦁',
    entertainment: '🎢',
    adventure: '🏕️',
    shopping: '🛍️',
    scenic: '🌅',
    photography: '📸',
    nightlife: '🌃',
  }

  return emojis[category] || '📍'
}

function createDescription(
  name,
  category,
  city
) {
  const descriptions = {
    nature:
      `${name} is a natural attraction in and around ${city}, offering a chance to enjoy the local landscape and scenery.`,

    beaches:
      `${name} is a coastal destination around ${city}, ideal for relaxing, walking and enjoying the surrounding views.`,

    mountains:
      `${name} offers mountain scenery and an opportunity to experience the landscape around ${city}.`,

    history:
      `${name} is a historic place connected with the heritage and story of ${city}.`,

    culture:
      `${name} is a cultural attraction where visitors can experience art, heritage and local character in ${city}.`,

    food:
      `${name} is a place to explore local food and regional flavours around ${city}.`,

    wildlife:
      `${name} offers an opportunity to discover wildlife, natural surroundings or conservation areas near ${city}.`,

    entertainment:
      `${name} is an entertainment attraction in ${city}.`,

    shopping:
      `${name} is a place to explore local shopping, markets and everyday life around ${city}.`,

    scenic:
      `${name} is a scenic attraction offering views and memorable experiences around ${city}.`,

    photography:
      `${name} is an interesting photography spot in and around ${city}.`,

    adventure:
      `${name} offers an opportunity for adventure and outdoor experiences around ${city}.`,

    nightlife:
      `${name} is a place to experience the evening atmosphere around ${city}.`,
  }

  return (
    descriptions[category] ||
    `${name} is a notable place to explore while visiting ${city}.`
  )
}

function estimateDuration(category) {
  const durations = {
    nature: '2–4 hours',
    beaches: '2–4 hours',
    mountains: 'Half day',
    history: '2–4 hours',
    culture: '2–4 hours',
    wildlife: 'Half day',
    entertainment: '2–5 hours',
    shopping: '2–4 hours',
    scenic: '1–3 hours',
    photography: '1–3 hours',
    adventure: 'Half day',
    nightlife: 'Evening',
  }

  return (
    durations[category] ||
    '2–4 hours'
  )
}

function estimateRating(tags) {
  if (
    tags.wikipedia ||
    tags.website
  ) {
    return 4.5
  }

  return 4.3
}

function bestTimeForCategory(category) {
  const values = {
    beaches: 'Morning or evening',
    nature: 'Morning or evening',
    mountains: 'Clear weather',
    wildlife: 'Early morning',
    scenic: 'Sunrise or sunset',
    photography: 'Golden hour',
    nightlife: 'Evening',
    shopping: 'Afternoon or evening',
  }

  return (
    values[category] ||
    'Check local opening hours'
  )
}

function budgetForCategory(category) {
  const values = {
    beaches: '$',
    nature: '$',
    scenic: '$',
    photography: '$',
    mountains: '$$',
    history: '$$',
    culture: '$$',
    wildlife: '$$',
    entertainment: '$$',
    shopping: '$$',
    adventure: '$$',
    nightlife: '$$',
  }

  return (
    values[category] ||
    '$'
  )
}

function activitiesForCategory(
  name,
  category
) {
  const activities = {
    nature: [
      'Walking',
      'Exploring',
      'Photography',
    ],

    beaches: [
      'Beach walk',
      'Relaxation',
      'Photography',
    ],

    mountains: [
      'Sightseeing',
      'Hiking',
      'Photography',
    ],

    history: [
      'Historical sightseeing',
      'Photography',
      'Walking tour',
    ],

    culture: [
      'Exploring',
      'Photography',
      'Local culture',
    ],

    wildlife: [
      'Wildlife viewing',
      'Photography',
      'Nature walk',
    ],

    entertainment: [
      'Entertainment',
      'Exploring',
      'Photography',
    ],

    shopping: [
      'Shopping',
      'Local market',
      'Food',
    ],

    scenic: [
      'Sightseeing',
      'Photography',
      'Sunset viewing',
    ],

    photography: [
      'Photography',
      'Sightseeing',
      'Exploring',
    ],

    adventure: [
      'Adventure',
      'Outdoor activities',
      'Photography',
    ],

    nightlife: [
      'Nightlife',
      'Food',
      'Exploring',
    ],
  }

  return (
    activities[category] || [
      'Sightseeing',
      'Photography',
      'Exploring',
    ]
  )
}

function createFallbackDestinations(place) {
  const lat = place.center.lat
  const lng = place.center.lng

  return [
    createFallback(
      place,
      `${place.name} City Center`,
      lat,
      lng,
      'culture',
      '🏙️'
    ),

    createFallback(
      place,
      `${place.name} Scenic Viewpoint`,
      lat + 0.03,
      lng + 0.02,
      'scenic',
      '🌅'
    ),

    createFallback(
      place,
      `${place.name} Local Market`,
      lat - 0.02,
      lng - 0.01,
      'shopping',
      '🛍️'
    ),
  ]
}

function createFallback(
  place,
  name,
  latitude,
  longitude,
  category,
  emoji
) {
  return {
    id:
      `${place.slug}-${slugify(name)}`,

    name,

    placeId: place.slug,

    city: place.name,

    country: place.country,

    emoji,

    category,

    tags: [category],

    description:
      `Explore ${name} while visiting ${place.name}.`,

    duration: 'Half day',

    rating: 4.3,

    latitude,

    longitude,

    image:
      CATEGORY_IMAGES[category] ||
      CATEGORY_IMAGES.scenic,

    bestTime:
      'Check local conditions',

    estimatedBudget: '$',

    activities: [
      'Sightseeing',
      'Photography',
      'Exploring',
    ],

    nearbyPlaces: [],

    travelTips: [
      `Check local information before visiting ${name}.`,
    ],
  }
}

function createIntro(name, country) {
  return `Discover the best-known landmarks, attractions, nature spots and cultural experiences in ${name}${
    country ? `, ${country}` : ''
  }.`
}

function countryCodeToFlag(code) {
  if (
    !code ||
    code.length !== 2
  ) {
    return '🌍'
  }

  return String.fromCodePoint(
    ...code
      .toUpperCase()
      .split('')
      .map(
        (char) =>
          127397 +
          char.charCodeAt(0)
      )
  )
}

export async function askAI(
  message,
  context = {}
) {
  await wait(
    500 + Math.random() * 500
  )

  const text =
    message.toLowerCase()

  const placeMatch =
    Object.keys(
      context.knownPlaces || {}
    ).find((slug) =>
      text.includes(
        slug.replace('-', ' ')
      )
    )

  const place =
    context.currentPlace ||
    (placeMatch
      ? findPlace(placeMatch)
      : null)

  if (
    text.includes('3 day') ||
    text.includes('three day') ||
    text.includes('plan a')
  ) {
    return place
      ? `Here's a balanced plan for ${place.name}: spend day one in the most iconic spot, day two exploring nature or culture nearby, and day three at a slower pace — local food, a market, or a quiet viewpoint. Want me to lay it out in the Trip Planner?`
      : "Tell me which destination you're planning for and I'll sketch out a day-by-day plan."
  }

  if (
    text.includes('food') ||
    text.includes('eat')
  ) {
    return place
      ? `${place.name} is worth visiting for its food alone — look for family-run spots away from the main tourist strip for the best regional dishes.`
      : 'Tell me a destination and I can point you toward regional dishes worth seeking out.'
  }

  if (
    text.includes('budget') ||
    text.includes('cheap')
  ) {
    return place
      ? `${place.name} can be done on almost any budget — public transport and local eateries go a long way, while private guides and boutique stays push costs up fast.`
      : "Let me know where you're headed and I'll give you a sense of typical costs."
  }

  if (
    text.includes('family')
  ) {
    return place
      ? `For families in ${place.name}, look for destinations with shorter travel times between stops and a mix of outdoor and indoor activities to keep energy up.`
      : 'Tell me the destination and I can suggest family-friendly stops.'
  }

  if (
    text.includes('nearby') ||
    text.includes('near')
  ) {
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
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export { slugify }
