import { useEffect } from 'react'
import { REGION_THEMES } from '../data/destinations.js'

// Applies a destination-driven accent theme as CSS custom properties.
// Subtle by design: only two accent colors shift, layout stays constant.
export function useDestinationTheme(regionKey) {
  useEffect(() => {
    const theme = REGION_THEMES[regionKey] || REGION_THEMES.default
    const root = document.documentElement
    root.style.setProperty('--accent', theme.accent)
    root.style.setProperty('--accent-2', theme.accent2)
    return () => {
      root.style.setProperty('--accent', REGION_THEMES.default.accent)
      root.style.setProperty('--accent-2', REGION_THEMES.default.accent2)
    }
  }, [regionKey])
}
