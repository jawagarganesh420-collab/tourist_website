import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapView({ latitude, longitude, label }) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    const position = [latitude, longitude]

    // Create map only once
    if (!mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        center: position,
        zoom: 13,
        zoomControl: true,
      })

      // OpenStreetMap tiles
      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }
      ).addTo(mapRef.current)

      // Add marker
      markerRef.current = L.marker(position)
        .addTo(mapRef.current)
        .bindPopup(`<b>${label}</b>`)

      markerRef.current.openPopup()
    } else {
      // If destination changes, move map
      mapRef.current.setView(position, 13)

      if (markerRef.current) {
        markerRef.current
          .setLatLng(position)
          .setPopupContent(`<b>${label}</b>`)

        markerRef.current.openPopup()
      }
    }

    // Fix map size after rendering
    setTimeout(() => {
      mapRef.current?.invalidateSize()
    }, 100)

    return () => {
      // Don't destroy the map when props change
    }
  }, [latitude, longitude, label])

  // Completely remove map when component unmounts
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        markerRef.current = null
      }
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl overflow-hidden border border-ink/10 bg-ink/5"
    >
      {/* Map */}
      <div
        ref={mapContainerRef}
        className="w-full h-[380px]"
      />

      {/* Coordinates + Google Maps button */}
      <div className="p-4 flex items-center justify-between border-t border-ink/10 bg-white">
        <span className="text-sm text-ink/60">
          {Number(latitude).toFixed(4)}, {Number(longitude).toFixed(4)}
        </span>

        <button
          onClick={() => {
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
              '_blank'
            )
          }}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink hover:opacity-70"
        >
          🗺️ Open in Google Maps
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  )
}