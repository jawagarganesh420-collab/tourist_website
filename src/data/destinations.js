// Scalable global destination dataset.
// This is sample/mock data standing in for a real destinations API or database.
// See src/services/aiService.js for how a real AI/API would replace searchDestinations().

export const CATEGORIES = [
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'beaches', label: 'Beaches', emoji: '🏖️' },
  { id: 'mountains', label: 'Mountains', emoji: '🏔️' },
  { id: 'history', label: 'History', emoji: '🏛️' },
  { id: 'culture', label: 'Culture', emoji: '🎨' },
  { id: 'food', label: 'Food', emoji: '🍜' },
  { id: 'wildlife', label: 'Wildlife', emoji: '🦁' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎢' },
  { id: 'adventure', label: 'Adventure', emoji: '🏕️' },
  { id: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { id: 'scenic', label: 'Scenic', emoji: '🌅' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'nightlife', label: 'Nightlife', emoji: '🌃' },
]

export const TRAVEL_STYLES = [
  { id: 'solo', label: 'Solo', emoji: '👤' },
  { id: 'family', label: 'Family', emoji: '👨‍👩‍👧' },
  { id: 'friends', label: 'Friends', emoji: '👯' },
  { id: 'couple', label: 'Couple', emoji: '❤️' },
  { id: 'backpacking', label: 'Backpacking', emoji: '🎒' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'photography', label: 'Photography', emoji: '📸' },
  { id: 'adventure', label: 'Adventure', emoji: '🏕️' },
]

// Destination-driven visual theme, applied subtly via CSS variables (see hooks/useTheme.js)
export const REGION_THEMES = {
  default: { accent: '#E8732A', accent2: '#0E7C86', mood: 'wanderer' },
  kerala: { accent: '#1B6E6B', accent2: '#3AAFA9', mood: 'tropical' },
  paris: { accent: '#C98A4B', accent2: '#8B5E83', mood: 'romantic' },
  dubai: { accent: '#D9A441', accent2: '#B5651D', mood: 'desert' },
  switzerland: { accent: '#4A90A4', accent2: '#8FB8C9', mood: 'alpine' },
  tokyo: { accent: '#E1613F', accent2: '#3A3F58', mood: 'neon' },
  bali: { accent: '#3E8E7E', accent2: '#E1613F', mood: 'jungle' },
}

// A "place" is a searchable region: a country, state/province, or city.
// Each place resolves to a curated list of destinations (attractions/experiences).
export const PLACES = {
  kerala: {
    name: 'Kerala', country: 'India', flag: '🇮🇳', region: 'kerala',
    intro: "From misty tea-covered mountains to peaceful backwaters and golden beaches, Kerala offers unforgettable experiences for every kind of traveler.",
    center: { lat: 10.8505, lng: 76.2711 },
  },
  paris: {
    name: 'Paris', country: 'France', flag: '🇫🇷', region: 'paris',
    intro: "A city of golden light and quiet grandeur, Paris rewards the traveler who wanders without a map as much as the one who follows every landmark on the list.",
    center: { lat: 48.8566, lng: 2.3522 },
  },
  tokyo: {
    name: 'Tokyo', country: 'Japan', flag: '🇯🇵', region: 'tokyo',
    intro: "Tokyo moves between centuries in a single block — ancient shrines beside neon towers, silence beside sensory overload.",
    center: { lat: 35.6762, lng: 139.6503 },
  },
  dubai: {
    name: 'Dubai', country: 'UAE', flag: '🇦🇪', region: 'dubai',
    intro: "Where desert dunes meet record-breaking skylines, Dubai is a playground of extremes, luxury, and old-souk charm.",
    center: { lat: 25.2048, lng: 55.2708 },
  },
  goa: {
    name: 'Goa', country: 'India', flag: '🇮🇳', region: 'kerala',
    intro: "Sun-bleached beaches, Portuguese-era lanes, and a laid-back rhythm that slows the whole trip down.",
    center: { lat: 15.2993, lng: 74.1240 },
  },
  bali: {
    name: 'Bali', country: 'Indonesia', flag: '🇮🇩', region: 'bali',
    intro: "Emerald rice terraces, cliffside temples, and a spiritual pulse that runs beneath every corner of the island.",
    center: { lat: -8.3405, lng: 115.0920 },
  },
  switzerland: {
    name: 'Switzerland', country: 'Switzerland', flag: '🇨🇭', region: 'switzerland',
    intro: "Snow-capped peaks, glacial lakes and villages that look untouched by time — Switzerland is scenery on a scale that photos rarely capture.",
    center: { lat: 46.8182, lng: 8.2275 },
  },
  london: {
    name: 'London', country: 'United Kingdom', flag: '🇬🇧', region: 'default',
    intro: "Royal history, world-class museums and a skyline where centuries sit side by side along the Thames.",
    center: { lat: 51.5072, lng: -0.1276 },
  },
  'new-york': {
    name: 'New York', country: 'USA', flag: '🇺🇸', region: 'default',
    intro: "The city that never quite settles — iconic skylines, endless neighborhoods, and energy in every direction.",
    center: { lat: 40.7128, lng: -74.0060 },
  },
  rome: {
    name: 'Rome', country: 'Italy', flag: '🇮🇹', region: 'paris',
    intro: "Three thousand years of history stacked into one city, best explored slowly with good coffee in hand.",
    center: { lat: 41.9028, lng: 12.4964 },
  },
  singapore: {
    name: 'Singapore', country: 'Singapore', flag: '🇸🇬', region: 'tokyo',
    intro: "A meticulously designed city-state where rainforest, street food and futuristic architecture share the same block.",
    center: { lat: 1.3521, lng: 103.8198 },
  },
  maldives: {
    name: 'Maldives', country: 'Maldives', flag: '🇲🇻', region: 'bali',
    intro: "Overwater villas and impossibly blue lagoons — the Maldives is slow travel at its most idyllic.",
    center: { lat: 3.2028, lng: 73.2207 },
  },
  bangkok: {
    name: 'Bangkok', country: 'Thailand', flag: '🇹🇭', region: 'tokyo',
    intro: "Golden temples, floating markets and some of the best street food on the planet, all wrapped in constant motion.",
    center: { lat: 13.7563, lng: 100.5018 },
  },
  sydney: {
    name: 'Sydney', country: 'Australia', flag: '🇦🇺', region: 'default',
    intro: "Harbour views, surf beaches and a laid-back outdoor culture built entirely around the water.",
    center: { lat: -33.8688, lng: 151.2093 },
  },
  'new-zealand': {
    name: 'New Zealand', country: 'New Zealand', flag: '🇳🇿', region: 'switzerland',
    intro: "Dramatic fjords, volcanic plains and film-set landscapes — New Zealand rewards travelers who love the outdoors.",
    center: { lat: -40.9006, lng: 174.8860 },
  },
  chennai: {
    name: 'Chennai', country: 'India', flag: '🇮🇳', region: 'kerala',
    intro: "A coastal capital of Dravidian temples, classical arts and some of South India's finest filter coffee.",
    center: { lat: 13.0827, lng: 80.2707 },
  },
  santorini: {
    name: 'Santorini', country: 'Greece', flag: '🇬🇷', region: 'default',
    intro: "Whitewashed villages perched on volcanic cliffs, facing some of the most photographed sunsets in the world.",
    center: { lat: 36.3932, lng: 25.4615 },
  },
}

// Attractions/experiences per place. Structure matches the brief's schema.
export const DESTINATIONS = {
  kerala: [
    {
      id: 'munnar', name: 'Munnar', placeId: 'kerala', city: 'Munnar', country: 'India',
      emoji: '🌿', category: 'nature', tags: ['Nature', 'Mountains'],
      description: 'Walk through endless tea plantations, misty mountains and peaceful valleys.',
      duration: '1–2 days', rating: 4.8, latitude: 10.0889, longitude: 77.0595,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'September – March', estimatedBudget: '₹₹',
      activities: ['Tea plantations', 'Trekking', 'Photography', 'Viewpoints', 'Local food'],
      nearbyPlaces: [
        { name: 'Tea Museum', emoji: '🌿', latitude: 10.0968, longitude: 77.0576 },
        { name: 'Mattupetty Dam', emoji: '🌊', latitude: 10.1035, longitude: 77.1275 },
        { name: 'Echo Point', emoji: '📸', latitude: 10.0956, longitude: 77.1477 },
        { name: 'Top Station', emoji: '🏔️', latitude: 10.1259, longitude: 77.1638 },
      ],
      travelTips: ['Carry a light jacket — evenings get cool.', 'Book houseboats and homestays ahead in peak season.'],
    },
    {
      id: 'alleppey', name: 'Alleppey', placeId: 'kerala', city: 'Alappuzha', country: 'India',
      emoji: '🌊', category: 'nature', tags: ['Backwaters', 'Relaxation'],
      description: "Experience Kerala's famous backwaters aboard a traditional houseboat.",
      duration: '1 day', rating: 4.7, latitude: 9.4981, longitude: 76.3388,
      image: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'November – February', estimatedBudget: '₹₹₹',
      activities: ['Houseboat cruise', 'Village walks', 'Canoe rides', 'Local seafood'],
      nearbyPlaces: [
        { name: 'Vembanad Lake', emoji: '🌊', latitude: 9.5916, longitude: 76.3928 },
        { name: 'Alleppey Beach', emoji: '🏖️', latitude: 9.4900, longitude: 76.3222 },
      ],
      travelTips: ['One-night houseboat stays are worth the extra cost.', 'Sunset hour on the lake is the highlight.'],
    },
    {
      id: 'wayanad', name: 'Wayanad', placeId: 'kerala', city: 'Wayanad', country: 'India',
      emoji: '🏔️', category: 'wildlife', tags: ['Wildlife', 'Mountains'],
      description: 'Dense forests, spice plantations and wildlife sanctuaries in the Western Ghats.',
      duration: '2 days', rating: 4.6, latitude: 11.6854, longitude: 76.1320,
      image: 'https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'October – May', estimatedBudget: '₹₹',
      activities: ['Wildlife safari', 'Cave exploration', 'Spice tours', 'Trekking'],
      nearbyPlaces: [
        { name: 'Edakkal Caves', emoji: '🏛️', latitude: 11.6293, longitude: 76.3556 },
        { name: 'Chembra Peak', emoji: '🏔️', latitude: 11.5100, longitude: 76.1290 },
      ],
      travelTips: ['Safari slots sell out early — book at dawn.'],
    },
    {
      id: 'varkala', name: 'Varkala', placeId: 'kerala', city: 'Varkala', country: 'India',
      emoji: '🏖️', category: 'beaches', tags: ['Beaches', 'Relaxation'],
      description: 'Dramatic cliffside beaches with laid-back cafés and sweeping ocean views.',
      duration: '1–2 days', rating: 4.6, latitude: 8.7379, longitude: 76.7163,
      image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'November – March', estimatedBudget: '₹',
      activities: ['Cliff walks', 'Surfing', 'Ayurvedic spas', 'Sunset watching'],
      nearbyPlaces: [{ name: 'Janardanaswamy Temple', emoji: '🏛️', latitude: 8.7328, longitude: 76.7048 }],
      travelTips: ['The north cliff has quieter cafés than the main strip.'],
    },
    {
      id: 'kochi', name: 'Kochi', placeId: 'kerala', city: 'Kochi', country: 'India',
      emoji: '🏛️', category: 'history', tags: ['Culture', 'History'],
      description: 'A historic port city blending Portuguese, Dutch and British colonial charm.',
      duration: '1–2 days', rating: 4.5, latitude: 9.9312, longitude: 76.2673,
      image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'October – March', estimatedBudget: '₹₹',
      activities: ['Fort Kochi walk', 'Chinese fishing nets', 'Kathakali show', 'Art galleries'],
      nearbyPlaces: [{ name: 'Mattancherry Palace', emoji: '🏛️', latitude: 9.9580, longitude: 76.2599 }],
      travelTips: ['Catch a Kathakali performance for an evening well spent.'],
    },
    {
      id: 'thekkady', name: 'Thekkady', placeId: 'kerala', city: 'Thekkady', country: 'India',
      emoji: '🐘', category: 'wildlife', tags: ['Wildlife', 'Nature'],
      description: 'Home to Periyar Wildlife Sanctuary and spice-scented hillside trails.',
      duration: '1 day', rating: 4.5, latitude: 9.6019, longitude: 77.1653,
      image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'September – May', estimatedBudget: '₹₹',
      activities: ['Boat safari', 'Spice plantation tour', 'Bamboo rafting'],
      nearbyPlaces: [{ name: 'Periyar Lake', emoji: '🌊', latitude: 9.4633, longitude: 77.1490 }],
      travelTips: ['Early morning boat safaris have the best animal sightings.'],
    },
    {
      id: 'kovalam', name: 'Kovalam', placeId: 'kerala', city: 'Kovalam', country: 'India',
      emoji: '🌴', category: 'beaches', tags: ['Beaches', 'Relaxation'],
      description: 'Crescent-shaped beaches framed by a red-and-white lighthouse.',
      duration: '1 day', rating: 4.4, latitude: 8.4004, longitude: 76.9787,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'November – February', estimatedBudget: '₹',
      activities: ['Lighthouse views', 'Beach relaxation', 'Seafood shacks'],
      nearbyPlaces: [{ name: 'Vizhinjam Lighthouse', emoji: '📸', latitude: 8.3792, longitude: 76.9959 }],
      travelTips: ['Climb the lighthouse near sunset for the best light.'],
    },
  ],
  paris: [
    {
      id: 'eiffel-tower', name: 'Eiffel Tower', placeId: 'paris', city: 'Paris', country: 'France',
      emoji: '🗼', category: 'history', tags: ['Landmark', 'History'],
      description: "The iron icon of Paris — visit at dusk when it begins to sparkle on the hour.",
      duration: 'Half day', rating: 4.7, latitude: 48.8584, longitude: 2.2945,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'April – June, September – October', estimatedBudget: '€€',
      activities: ['Summit views', 'Seine picnic', 'Evening light show', 'Photography'],
      nearbyPlaces: [{ name: 'Trocadéro Gardens', emoji: '🌅', latitude: 48.8626, longitude: 2.2895 }],
      travelTips: ['Book summit tickets online to skip the queue.'],
    },
    {
      id: 'louvre', name: 'The Louvre', placeId: 'paris', city: 'Paris', country: 'France',
      emoji: '🎨', category: 'culture', tags: ['Museum', 'Art'],
      description: "The world's largest art museum, home to the Mona Lisa and centuries of masterworks.",
      duration: '1 day', rating: 4.8, latitude: 48.8606, longitude: 2.3376,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'Year-round', estimatedBudget: '€€',
      activities: ['Renaissance wing', 'Egyptian antiquities', 'Pyramid courtyard'],
      nearbyPlaces: [{ name: 'Tuileries Garden', emoji: '🌳', latitude: 48.8635, longitude: 2.3275 }],
      travelTips: ['Enter via the Carrousel du Louvre to avoid the main pyramid line.'],
    },
    {
      id: 'montmartre', name: 'Montmartre', placeId: 'paris', city: 'Paris', country: 'France',
      emoji: '🎭', category: 'culture', tags: ['Culture', 'Scenic'],
      description: 'Cobblestone hills, artist squares, and the white domes of Sacré-Cœur.',
      duration: 'Half day', rating: 4.6, latitude: 48.8867, longitude: 2.3431,
      image: 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'Spring, Autumn', estimatedBudget: '€',
      activities: ['Sacré-Cœur views', 'Place du Tertre artists', 'Café hopping'],
      nearbyPlaces: [{ name: 'Moulin Rouge', emoji: '🌃', latitude: 48.8841, longitude: 2.3322 }],
      travelTips: ['Go early morning to skip the tour groups.'],
    },
    {
      id: 'seine-river', name: 'Seine River Cruise', placeId: 'paris', city: 'Paris', country: 'France',
      emoji: '🚤', category: 'scenic', tags: ['Scenic', 'Romantic'],
      description: 'Drift past Notre-Dame, the Louvre and the Eiffel Tower from the water.',
      duration: '1–2 hours', rating: 4.5, latitude: 48.8566, longitude: 2.3376,
      image: 'https://images.unsplash.com/photo-1541791096406-98f6ec22b1b3?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'Evening', estimatedBudget: '€€',
      activities: ['Sunset cruise', 'Dinner cruise', 'Photography'],
      nearbyPlaces: [{ name: 'Notre-Dame', emoji: '🏛️', latitude: 48.8530, longitude: 2.3499 }],
      travelTips: ['The last evening cruise catches the tower lights best.'],
    },
  ],
  tokyo: [
    {
      id: 'shibuya', name: 'Shibuya Crossing', placeId: 'tokyo', city: 'Tokyo', country: 'Japan',
      emoji: '🌃', category: 'entertainment', tags: ['Nightlife', 'Culture'],
      description: "The world's busiest pedestrian crossing, framed by neon and giant screens.",
      duration: 'Half day', rating: 4.6, latitude: 35.6595, longitude: 139.7005,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'Evening', estimatedBudget: '¥¥',
      activities: ['Crossing photos', 'Shopping', 'Rooftop cafés'],
      nearbyPlaces: [{ name: 'Hachiko Statue', emoji: '📸', latitude: 35.6590, longitude: 139.7005 }],
      travelTips: ['The Starbucks above the crossing has the best photo angle.'],
    },
    {
      id: 'senso-ji', name: 'Senso-ji Temple', placeId: 'tokyo', city: 'Tokyo', country: 'Japan',
      emoji: '⛩️', category: 'history', tags: ['History', 'Culture'],
      description: "Tokyo's oldest temple, approached through a lantern-lined market street.",
      duration: 'Half day', rating: 4.7, latitude: 35.7148, longitude: 139.7967,
      image: 'https://images.unsplash.com/photo-1583400756767-e17c02cfa5a1?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'Early morning', estimatedBudget: '¥',
      activities: ['Temple grounds', 'Nakamise shopping street', 'Street food'],
      nearbyPlaces: [{ name: 'Tokyo Skytree', emoji: '🌆', latitude: 35.7101, longitude: 139.8107 }],
      travelTips: ['Arrive before 8am to see it without the crowds.'],
    },
    {
      id: 'shinjuku', name: 'Shinjuku', placeId: 'tokyo', city: 'Tokyo', country: 'Japan',
      emoji: '🌆', category: 'nightlife', tags: ['Nightlife', 'Food'],
      description: 'Skyscrapers, tiny alleyway bars, and one of the best skyline views in the city — for free.',
      duration: 'Evening', rating: 4.6, latitude: 35.6938, longitude: 139.7034,
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'Evening', estimatedBudget: '¥¥',
      activities: ['Omoide Yokocho alleys', 'Free observatory deck', 'Izakaya hopping'],
      nearbyPlaces: [{ name: 'Golden Gai', emoji: '🌃', latitude: 35.6938, longitude: 139.7043 }],
      travelTips: ['The Metropolitan Government Building observatory is free and open late.'],
    },
    {
      id: 'mount-fuji', name: 'Mount Fuji', placeId: 'tokyo', city: 'Fujikawaguchiko', country: 'Japan',
      emoji: '🗻', category: 'nature', tags: ['Nature', 'Scenic'],
      description: "Japan's tallest peak, best photographed from the lakes at its base.",
      duration: '1–2 days', rating: 4.8, latitude: 35.3606, longitude: 138.7274,
      image: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'April – May, October – November', estimatedBudget: '¥¥',
      activities: ['Lake Kawaguchiko views', 'Chureito Pagoda', 'Hiking (July–Sept)'],
      nearbyPlaces: [{ name: 'Chureito Pagoda', emoji: '📸', latitude: 35.3927, longitude: 138.8006 }],
      travelTips: ['Clear Fuji views are most likely at sunrise.'],
    },
  ],
  dubai: [
    {
      id: 'burj-khalifa', name: 'Burj Khalifa', placeId: 'dubai', city: 'Dubai', country: 'UAE',
      emoji: '🏙️', category: 'entertainment', tags: ['Landmark', 'Scenic'],
      description: "The world's tallest building, with an observation deck above the clouds.",
      duration: 'Half day', rating: 4.7, latitude: 25.1972, longitude: 55.2744,
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'Sunset', estimatedBudget: 'AED AED',
      activities: ['At the Top observatory', 'Dubai Fountain show', 'Dubai Mall'],
      nearbyPlaces: [{ name: 'Dubai Fountain', emoji: '⛲', latitude: 25.1952, longitude: 55.2744 }],
      travelTips: ['Book sunset slots weeks ahead — they sell out first.'],
    },
    {
      id: 'desert-safari', name: 'Desert Safari', placeId: 'dubai', city: 'Dubai', country: 'UAE',
      emoji: '🐪', category: 'adventure', tags: ['Adventure', 'Nature'],
      description: 'Dune bashing, camel rides and a Bedouin-style dinner under the stars.',
      duration: 'Evening', rating: 4.6, latitude: 24.9857, longitude: 55.6231,
      image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'October – April', estimatedBudget: 'AED AED',
      activities: ['Dune bashing', 'Camel trekking', 'Live entertainment dinner'],
      nearbyPlaces: [{ name: 'Al Marmoom Reserve', emoji: '🏜️', latitude: 24.9167, longitude: 55.4167 }],
      travelTips: ['Choose a smaller-group tour for a calmer dune-bashing ride.'],
    },
    {
      id: 'palm-jumeirah', name: 'Palm Jumeirah', placeId: 'dubai', city: 'Dubai', country: 'UAE',
      emoji: '🌴', category: 'beaches', tags: ['Beaches', 'Luxury'],
      description: 'A palm-shaped island of resorts, beach clubs and skyline views.',
      duration: '1 day', rating: 4.5, latitude: 25.1124, longitude: 55.1390,
      image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'November – March', estimatedBudget: 'AED AED AED',
      activities: ['Beach clubs', 'Monorail ride', 'View from The Pointe'],
      nearbyPlaces: [{ name: 'Atlantis The Palm', emoji: '🏨', latitude: 25.1304, longitude: 55.1173 }],
      travelTips: ['The monorail gives great photo angles of the palm fronds.'],
    },
  ],
  goa: [
    {
      id: 'baga-beach', name: 'Baga Beach', placeId: 'goa', city: 'Goa', country: 'India',
      emoji: '🏖️', category: 'beaches', tags: ['Beaches', 'Nightlife'],
      description: 'Golden sand, water sports and Goa\u2019s liveliest beach shacks.',
      duration: '1 day', rating: 4.4, latitude: 15.5553, longitude: 73.7517,
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'November – February', estimatedBudget: '₹',
      activities: ['Water sports', 'Beach shacks', 'Nightlife'],
      nearbyPlaces: [{ name: 'Fort Aguada', emoji: '🏛️', latitude: 15.4925, longitude: 73.7738 }],
      travelTips: ['Sunset at the northern end is far quieter.'],
    },
    {
      id: 'old-goa', name: 'Old Goa Churches', placeId: 'goa', city: 'Goa', country: 'India',
      emoji: '⛪', category: 'history', tags: ['History', 'Culture'],
      description: 'UNESCO-listed Portuguese-era basilicas and cathedrals.',
      duration: 'Half day', rating: 4.5, latitude: 15.5009, longitude: 73.9116,
      image: 'https://images.unsplash.com/photo-1590059390047-f5c1f6a3b6a4?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'October – March', estimatedBudget: '₹',
      activities: ['Basilica of Bom Jesus', 'Sé Cathedral', 'Heritage walk'],
      nearbyPlaces: [],
      travelTips: ['Visit on a weekday morning to avoid tour groups.'],
    },
  ],
  bali: [
    {
      id: 'ubud', name: 'Ubud', placeId: 'bali', city: 'Ubud', country: 'Indonesia',
      emoji: '🌿', category: 'nature', tags: ['Nature', 'Culture'],
      description: 'Emerald rice terraces, yoga retreats and a sacred monkey forest.',
      duration: '2 days', rating: 4.7, latitude: -8.5069, longitude: 115.2625,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'April – October', estimatedBudget: 'Rp Rp',
      activities: ['Tegalalang rice terraces', 'Monkey Forest', 'Yoga classes'],
      nearbyPlaces: [{ name: 'Tegalalang Rice Terrace', emoji: '🌾', latitude: -8.4312, longitude: 115.2790 }],
      travelTips: ['Rent a scooter to reach the terraces before the tour buses.'],
    },
    {
      id: 'uluwatu', name: 'Uluwatu', placeId: 'bali', city: 'Uluwatu', country: 'Indonesia',
      emoji: '🌊', category: 'beaches', tags: ['Beaches', 'Scenic'],
      description: 'Cliffside temples, surf breaks and dramatic ocean sunsets.',
      duration: '1 day', rating: 4.7, latitude: -8.8290, longitude: 115.0849,
      image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'May – September', estimatedBudget: 'Rp Rp',
      activities: ['Uluwatu Temple', 'Kecak fire dance', 'Surfing'],
      nearbyPlaces: [{ name: 'Uluwatu Temple', emoji: '🛕', latitude: -8.8290, longitude: 115.0849 }],
      travelTips: ['The Kecak dance at sunset is worth planning your day around.'],
    },
  ],
  switzerland: [
    {
      id: 'zermatt', name: 'Zermatt & the Matterhorn', placeId: 'switzerland', city: 'Zermatt', country: 'Switzerland',
      emoji: '🏔️', category: 'mountains', tags: ['Mountains', 'Scenic'],
      description: 'A car-free alpine village beneath one of the most photographed peaks on Earth.',
      duration: '2 days', rating: 4.9, latitude: 46.0207, longitude: 7.7491,
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'June – September, December – March', estimatedBudget: 'CHF CHF CHF',
      activities: ['Gornergrat railway', 'Hiking', 'Skiing'],
      nearbyPlaces: [{ name: 'Gornergrat', emoji: '🚞', latitude: 45.9847, longitude: 7.7864 }],
      travelTips: ['Clear Matterhorn views are most common early morning.'],
    },
    {
      id: 'lake-geneva', name: 'Lake Geneva', placeId: 'switzerland', city: 'Geneva', country: 'Switzerland',
      emoji: '🌊', category: 'scenic', tags: ['Scenic', 'Relaxation'],
      description: 'Vineyard-lined shores, lakeside promenades and views of Mont Blanc.',
      duration: '1 day', rating: 4.6, latitude: 46.2044, longitude: 6.1432,
      image: 'https://images.unsplash.com/photo-1591189863430-ab87e120f312?q=80&w=1200&auto=format&fit=crop',
      bestTime: 'May – September', estimatedBudget: 'CHF CHF',
      activities: ['Jet d\u2019Eau fountain', 'Lakeside cycling', 'Lavaux vineyards'],
      nearbyPlaces: [{ name: 'Lavaux Vineyard Terraces', emoji: '🍇', latitude: 46.4869, longitude: 6.7969 }],
      travelTips: ['Take the slower regional train through Lavaux for the views.'],
    },
  ],
}

// Generic fallback destinations for any place not yet in the curated dataset,
// so search "works" everywhere while a real API/AI backend is wired up later.
export function genericDestinationsFor(place) {
  const seedCoords = place.center || { lat: 20, lng: 0 }
  return [
    { id: `${place.slug}-city-center`, name: `${place.name} City Center`, placeId: place.slug, city: place.name, country: place.country, emoji: '🏙️', category: 'culture', tags: ['Culture', 'Landmark'], description: `Start exploring ${place.name} from its historic center, where most major sights are within walking distance.`, duration: '1 day', rating: 4.5, latitude: seedCoords.lat, longitude: seedCoords.lng, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=1200&auto=format&fit=crop', bestTime: 'Year-round', estimatedBudget: '$$', activities: ['Walking tour', 'Local markets', 'Photography'], nearbyPlaces: [], travelTips: [`Start early to beat the crowds in ${place.name}.`] },
    { id: `${place.slug}-viewpoint`, name: `${place.name} Scenic Viewpoint`, placeId: place.slug, city: place.name, country: place.country, emoji: '🌅', category: 'scenic', tags: ['Scenic'], description: `A high vantage point overlooking ${place.name} — best visited near sunset.`, duration: 'Half day', rating: 4.4, latitude: seedCoords.lat + 0.03, longitude: seedCoords.lng + 0.02, image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop', bestTime: 'Evening', estimatedBudget: '$', activities: ['Sunset watching', 'Photography'], nearbyPlaces: [], travelTips: ['Arrive 30 minutes before sunset for a good spot.'] },
    { id: `${place.slug}-local-market`, name: `${place.name} Local Market`, placeId: place.slug, city: place.name, country: place.country, emoji: '🍜', category: 'food', tags: ['Food', 'Culture'], description: `Sample regional dishes and local produce in ${place.name}'s liveliest market.`, duration: 'Half day', rating: 4.3, latitude: seedCoords.lat - 0.02, longitude: seedCoords.lng - 0.01, image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=1200&auto=format&fit=crop', bestTime: 'Morning', estimatedBudget: '$', activities: ['Street food', 'Local crafts'], nearbyPlaces: [], travelTips: ['Go hungry — sample a little from several stalls.'] },
  ]
}

export function slugify(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function findPlace(query) {
  const slug = slugify(query)
  if (PLACES[slug]) return { slug, ...PLACES[slug] }
  const match = Object.entries(PLACES).find(([key, p]) =>
    key.includes(slug) || slug.includes(key) ||
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.country.toLowerCase().includes(query.toLowerCase())
  )
  if (match) return { slug: match[0], ...match[1] }
  return null
}

export function getDestinationsForPlace(place) {
  if (DESTINATIONS[place.slug]) return DESTINATIONS[place.slug]
  return genericDestinationsFor(place)
}

export function getDestinationById(id) {
  for (const list of Object.values(DESTINATIONS)) {
    const found = list.find((d) => d.id === id)
    if (found) return found
  }
  return null
}

export const POPULAR_PLACES = ['paris', 'tokyo', 'dubai', 'rome', 'bali', 'santorini', 'switzerland', 'sydney', 'new-york', 'bangkok']

export const SEARCH_EXAMPLES = ['Kerala 🇮🇳', 'Paris 🇫🇷', 'Tokyo 🇯🇵', 'Dubai 🇦🇪', 'Bali 🇮🇩']
