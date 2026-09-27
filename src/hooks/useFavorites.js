import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'wanderai_favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setFavorites(JSON.parse(raw))
    } catch (e) {
      // ignore corrupted storage
    }
  }, [])

  const persist = useCallback((next) => {
    setFavorites(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch (e) {
      // storage full or unavailable — favorites still work for this session
    }
  }, [])

  const isFavorite = useCallback((id) => favorites.some((f) => f.id === id), [favorites])

  const toggleFavorite = useCallback((destination) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === destination.id)
      const next = exists ? prev.filter((f) => f.id !== destination.id) : [...prev, destination]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch (e) {}
      return next
    })
  }, [])

  return { favorites, isFavorite, toggleFavorite }
}
