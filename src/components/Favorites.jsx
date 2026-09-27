import DestinationGrid from './DestinationGrid.jsx'

export default function Favorites({ favorites, isFavorite, toggleFavorite }) {
  if (!favorites.length) return null
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">❤️</span>
          <h2 className="font-display text-3xl font-semibold text-ink">My Travel List</h2>
        </div>
        <p className="text-ink/60 mb-8">Destinations you've saved for later.</p>
        <DestinationGrid destinations={favorites} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
      </div>
    </section>
  )
}
