import { useNavigate } from 'react-router-dom'
import Hero from '../components/Hero.jsx'
import HowItWorks from '../components/HowItWorks.jsx'
import PopularDestinations from '../components/PopularDestinations.jsx'
import HiddenGems from '../components/HiddenGems.jsx'
import TripPlanner from '../components/TripPlanner.jsx'
import TravelStories from '../components/TravelStories.jsx'
import Favorites from '../components/Favorites.jsx'
import { useFavorites } from '../hooks/useFavorites.js'
import { slugify } from '../data/destinations.js'

export default function Home() {
  const navigate = useNavigate()
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  function handleSearch(query) {
    navigate(`/explore/${slugify(query)}?q=${encodeURIComponent(query)}`)
  }

  return (
    <div>
      <Hero onSearch={handleSearch} />
      <PopularDestinations onSearch={handleSearch} />
      <HowItWorks />
      <HiddenGems />
      {favorites.length > 0 && (
        <Favorites favorites={favorites} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />
      )}
      <TripPlanner />
      <TravelStories />
    </div>
  )
}
