import { useState } from 'react'
import { Search } from 'lucide-react'
import { SEARCH_EXAMPLES } from '../data/destinations.js'

export default function SearchBar({ onSearch, large = false }) {
  const [value, setValue] = useState('')

  function submit(e) {
    e.preventDefault()
    if (!value.trim()) return
    onSearch(value.trim())
  }

  return (
    <div className="w-full">
      <form
        onSubmit={submit}
        className={`flex items-center gap-3 bg-paper/95 rounded-full shadow-2xl shadow-black/30 px-5 ${
          large ? 'py-4' : 'py-3'
        }`}
      >
        <Search className="w-5 h-5 text-ink/50 shrink-0" />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search a city, country or destination..."
          className={`flex-1 bg-transparent outline-none text-ink placeholder:text-ink/40 font-body ${
            large ? 'text-lg' : 'text-base'
          }`}
        />
        <button
          type="submit"
          className="shrink-0 rounded-full px-5 py-2.5 font-semibold text-ink text-sm sm:text-base transition-transform hover:scale-105 active:scale-95"
          style={{ background: 'var(--accent, #E8A33D)' }}
        >
          ✨ Explore
        </button>
      </form>
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {SEARCH_EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => onSearch(ex.replace(/\s*[\u{1F1E6}-\u{1F1FF}]{2}/gu, '').trim())}
            className="text-sm text-paper/80 border border-paper/25 rounded-full px-3.5 py-1.5 hover:bg-paper/10 transition-colors"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
