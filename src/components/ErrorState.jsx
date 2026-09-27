export default function ErrorState({ query, onRetry }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <span className="text-5xl mb-4">🌍</span>
      <h2 className="font-display text-2xl font-semibold text-ink mb-2">
        Hmm... We couldn't discover {query ? `"${query}"` : 'that place'}.
      </h2>
      <p className="text-ink/60 mb-6 max-w-sm">Try searching for a city, country or famous destination.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full px-5 py-2.5 font-semibold text-ink"
          style={{ background: 'var(--accent, #E8A33D)' }}
        >
          Try another search
        </button>
      )}
    </div>
  )
}
