// Thin wrapper around the Google Maps JavaScript API loader.
// The API key is read from an environment variable and never hardcoded.
// See .env.example for setup instructions.

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

let loadPromise = null

export function hasMapsKey() {
  return Boolean(API_KEY && API_KEY.length > 0 && API_KEY !== 'your_google_maps_api_key_here')
}

// Lazy-loads the Google Maps script only once, only when a map is actually needed
// (i.e. only after the user clicks "Visit" — never on the homepage or search results).
export function loadGoogleMaps() {
  if (!hasMapsKey()) return Promise.reject(new Error('missing-api-key'))
  if (window.google && window.google.maps) return Promise.resolve(window.google)
  if (loadPromise) return loadPromise

  loadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=marker&v=weekly`
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.google)
    script.onerror = () => reject(new Error('failed-to-load-maps'))
    document.head.appendChild(script)
  })
  return loadPromise
}

export function openInGoogleMaps(lat, lng, label) {
  const query = encodeURIComponent(label ? `${label}` : `${lat},${lng}`)
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=&q=${query}`
  window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`, '_blank', 'noopener,noreferrer')
}
