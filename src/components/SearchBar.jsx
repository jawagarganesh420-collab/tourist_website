import { useEffect, useRef, useState } from 'react'
import { Search, MapPin, Loader2, X } from 'lucide-react'
import {
  SEARCH_EXAMPLES,
  PLACES,
  DESTINATIONS,
} from '../data/destinations.js'

const NOMINATIM_URL =
  'https://nominatim.openstreetmap.org/search'

export default function SearchBar({ onSearch, large = false }) {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const wrapperRef = useRef(null)
  const timerRef = useRef(null)
  const requestIdRef = useRef(0)

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      )
    }
  }, [])

  useEffect(() => {
    const query = value.trim()

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (query.length < 3) {
      setSuggestions([])
      setLoading(false)
      return
    }

    timerRef.current = setTimeout(() => {
      loadSuggestions(query)
    }, 450)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [value])

  async function loadSuggestions(query) {
    const requestId = ++requestIdRef.current

    setLoading(true)
    setShowSuggestions(true)

    /*
     * STEP 1
     * Search the places already available
     * inside your own project.
     */
    const localResults =
      findLocalSuggestions(query)

    /*
     * STEP 2
     * Search OpenStreetMap for additional
     * real-world places.
     */
    let liveResults = []

    try {
      const url = new URL(NOMINATIM_URL)

      url.searchParams.set('q', query)
      url.searchParams.set('format', 'jsonv2')
      url.searchParams.set('addressdetails', '1')
      url.searchParams.set('limit', '8')
      url.searchParams.set('dedupe', '1')
      url.searchParams.set('accept-language', 'en')

      const response = await fetch(
        url.toString(),
        {
          headers: {
            Accept: 'application/json',
          },
        }
      )

      if (response.ok) {
        const data = await response.json()

        liveResults = data
          .filter(
            (item) =>
              item.display_name
          )
          .map((item) =>
            normalizeLiveResult(item)
          )
      }
    } catch (error) {
      console.error(
        'Autocomplete search failed:',
        error
      )
    }

    if (requestId !== requestIdRef.current) {
      return
    }

    /*
     * Local project results come first.
     * OpenStreetMap results come after them.
     */
    const combined = [
      ...localResults,
      ...liveResults,
    ]

    const unique =
      removeDuplicates(combined)

    setSuggestions(
      unique.slice(0, 7)
    )

    setLoading(false)
  }

  function findLocalSuggestions(query) {
    const search = query.toLowerCase()

    const results = []

    /*
     * Search cities / countries already
     * available in PLACES.
     */
    Object.entries(PLACES).forEach(
      ([slug, place]) => {
        const searchable =
          `${place.name} ${place.country} ${slug}`
            .toLowerCase()

        if (
          searchable.includes(search)
        ) {
          results.push({
            id: `place-${slug}`,
            name: place.name,
            location: place.country,
            type: 'Destination',
            lat: place.center.lat,
            lng: place.center.lng,
            searchValue: place.name,
            priority: 1,
          })
        }
      }
    )

    /*
     * Search attractions already available
     * in DESTINATIONS.
     */
    Object.values(DESTINATIONS).forEach(
      (destinationList) => {
        destinationList.forEach(
          (destination) => {
            const searchable =
              `${destination.name} ${destination.city} ${destination.country} ${destination.description}`
                .toLowerCase()

            if (
              searchable.includes(search)
            ) {
              results.push({
                id: `destination-${destination.id}`,
                name: destination.name,
                location:
                  destination.city ||
                  destination.country,
                type: 'Tourist place',
                lat:
                  destination.latitude,
                lng:
                  destination.longitude,
                searchValue:
                  destination.name,
                priority: 2,
              })
            }
          }
        )
      }
    )

    return results
  }

  function normalizeLiveResult(item) {
    const address =
      item.address || {}

    const name =
      address.city ||
      address.town ||
      address.village ||
      address.municipality ||
      address.suburb ||
      item.name ||
      item.display_name.split(',')[0]

    const location =
      [
        address.state,
        address.country,
      ]
        .filter(Boolean)
        .join(', ')

    return {
      id:
        `osm-${item.osm_type}-${item.osm_id}`,

      name,

      location,

      type:
        getResultType(item),

      lat: Number(item.lat),

      lng: Number(item.lon),

      searchValue: name,

      priority: 3,
    }
  }

  function getResultType(item) {
    const address =
      item.address || {}

    if (
      item.type === 'city' ||
      address.city
    ) {
      return 'City'
    }

    if (
      item.type === 'town' ||
      address.town
    ) {
      return 'Town'
    }

    if (
      item.type === 'village' ||
      address.village
    ) {
      return 'Village'
    }

    if (
      item.type === 'museum' ||
      item.type === 'attraction' ||
      item.type === 'monument' ||
      item.type === 'viewpoint' ||
      item.type === 'castle' ||
      item.type === 'archaeological_site'
    ) {
      return 'Tourist place'
    }

    if (
      item.type === 'country'
    ) {
      return 'Country'
    }

    return 'Destination'
  }

  function removeDuplicates(items) {
    const seen = new Set()

    return items.filter((item) => {
      const key =
        `${item.name}-${item.location}`
          .toLowerCase()

      if (seen.has(key)) {
        return false
      }

      seen.add(key)

      return true
    })
  }

  function submit(event) {
    event.preventDefault()

    const query = value.trim()

    if (!query) {
      return
    }

    setShowSuggestions(false)
    setSuggestions([])

    onSearch(query)
  }

  function selectSuggestion(item) {
    const query =
      item.searchValue ||
      item.name

    setValue(query)

    setShowSuggestions(false)
    setSuggestions([])

    onSearch(query)
  }

  function clearSearch() {
    setValue('')
    setSuggestions([])
    setShowSuggestions(false)
  }

  const showDropdown =
    showSuggestions &&
    value.trim().length >= 3

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
      style={{
        zIndex: 9999,
      }}
    >
      {/* SEARCH BOX */}

      <form
        onSubmit={submit}
        className={`relative flex items-center gap-3 bg-paper/95 rounded-full shadow-2xl shadow-black/30 px-5 ${
          large ? 'py-4' : 'py-3'
        }`}
      >
        <Search
          className="w-5 h-5 text-ink/50 shrink-0"
        />

        <input
          value={value}
          onChange={(event) => {
            setValue(event.target.value)

            if (
              event.target.value.trim()
                .length >= 3
            ) {
              setShowSuggestions(true)
            }
          }}
          onFocus={() => {
            if (
              value.trim().length >= 3
            ) {
              setShowSuggestions(true)
            }
          }}
          placeholder="Where do you want to go?"
          autoComplete="off"
          className={`flex-1 min-w-0 bg-transparent outline-none text-ink placeholder:text-ink/40 font-body ${
            large
              ? 'text-lg'
              : 'text-base'
          }`}
        />

        {loading && (
          <Loader2
            className="w-5 h-5 text-ink/50 animate-spin shrink-0"
          />
        )}

        {!loading && value && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-1 rounded-full hover:bg-black/5"
          >
            <X className="w-4 h-4 text-ink/50" />
          </button>
        )}

        <button
          type="submit"
          className="shrink-0 rounded-full px-5 py-2.5 font-semibold text-ink text-sm sm:text-base transition-transform hover:scale-105 active:scale-95"
          style={{
            background:
              'var(--accent, #E8A33D)',
          }}
        >
          Explore →
        </button>
      </form>

      {/* AUTOCOMPLETE */}

      {showDropdown && (
        <div
          className="absolute left-0 right-0"
          style={{
            top: 'calc(100% + 10px)',
            zIndex: 999999,
          }}
        >
          <div className="overflow-hidden rounded-2xl bg-white shadow-2xl border border-black/10">

            {loading &&
              suggestions.length === 0 && (
                <div className="flex items-center gap-3 px-5 py-5">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-500" />

                  <span className="text-sm text-gray-500">
                    Finding related places...
                  </span>
                </div>
              )}

            {!loading &&
              suggestions.length === 0 && (
                <div className="px-5 py-5">
                  <p className="text-sm font-medium text-gray-700">
                    No places found
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Try a city, country or tourist attraction.
                  </p>
                </div>
              )}

            {suggestions.length > 0 && (
              <div className="py-2">
                {suggestions.map(
                  (item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        selectSuggestion(item)
                      }
                      className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
                    >
                      {/* ICON */}

                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 shrink-0">
                        <MapPin className="w-5 h-5 text-blue-500" />
                      </div>

                      {/* TEXT */}

                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-800 text-sm">
                          {item.name}
                        </div>

                        {item.location && (
                          <div className="text-xs text-gray-500 mt-1 truncate">
                            {item.location}
                          </div>
                        )}
                      </div>

                      {/* TYPE */}

                      <span className="text-[11px] text-gray-400 border border-gray-200 rounded-full px-2.5 py-1 shrink-0">
                        {item.type}
                      </span>
                    </button>
                  )
                )}
              </div>
            )}

            <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50">
              <span className="text-[10px] text-gray-400">
                Real places powered by OpenStreetMap
              </span>
            </div>
          </div>
        </div>
      )}

      {/* QUICK SEARCH BUTTONS
          IMPORTANT:
          Hide these while autocomplete is open.
          This prevents the exact overlap shown
          in your screenshot.
      */}

      {!showDropdown && (
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {SEARCH_EXAMPLES.map(
            (ex) => (
              <button
                key={ex}
                type="button"
                onClick={() =>
                  onSearch(
                    ex
                      .replace(
                        /\s*[\u{1F1E6}-\u{1F1FF}]{2}/gu,
                        ''
                      )
                      .trim()
                  )
                }
                className="text-sm text-ink/70 border border-ink/20 rounded-full px-3.5 py-1.5 hover:bg-ink/5 transition-colors"
              >
                {ex}
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}
