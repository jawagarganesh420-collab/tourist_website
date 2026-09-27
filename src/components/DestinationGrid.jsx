import DestinationCard from './DestinationCard.jsx'

export default function DestinationGrid({ destinations, isFavorite, onToggleFavorite }) {
  if (!destinations.length) {
    return (
      <p className="text-center text-ink/50 py-16">No destinations match those filters yet — try clearing them.</p>
    )
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((d, i) => (
        <DestinationCard
          key={d.id}
          destination={d}
          index={i}
          isFavorite={isFavorite ? isFavorite(d.id) : false}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
