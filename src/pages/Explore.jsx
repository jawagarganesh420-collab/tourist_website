import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import LoadingScreen from '../components/LoadingScreen.jsx'
import ErrorState from '../components/ErrorState.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import DestinationGrid from '../components/DestinationGrid.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { discoverPlace } from '../services/aiService.js'
import { useFavorites } from '../hooks/useFavorites.js'
import { useDestinationTheme } from '../hooks/useTheme.js'
import { slugify } from '../data/destinations.js'

export default function Explore() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const query = searchParams.get('q') || slug

  const [status, setStatus] = useState('loading') // loading | ready | error
  const [result, setResult] = useState(null)
  const [category, setCategory] = useState(null)
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    setCategory(null)
    discoverPlace(query).then((res) => {
      if (cancelled) return
      if (!res) {
        setStatus('error')
      } else {
        setResult(res)
        setStatus('ready')
      }
    })
    return () => {
      cancelled = true
    }
  }, [query])

  useDestinationTheme(result?.place?.region)

  function handleSearch(q) {
    navigate(`/explore/${slugify(q)}?q=${encodeURIComponent(q)}`)
  }

  if (status === 'loading') return <LoadingScreen place={query} />
  if (status === 'error') return <ErrorState query={query} onRetry={() => navigate('/')} />

  const { place, destinations } = result
  const filtered = category ? destinations.filter((d) => d.category === category) : destinations

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="max-w-lg mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink mb-3">
            Explore {place.name} {place.flag}
          </h1>
          <p className="text-ink/60 max-w-2xl">{place.intro}</p>
        </motion.div>

        <h2 className="font-display text-xl font-semibold text-ink mb-4">✨ Places you shouldn't miss</h2>
        <div className="mb-6">
          <CategoryFilter active={category} onChange={setCategory} />
        </div>
        <DestinationGrid destinations={filtered} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
      </div>
    </div>
  )
}
