import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getLoadingMessages } from '../services/aiService.js'

export default function LoadingScreen({ place }) {
  const messages = getLoadingMessages()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 750)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-ink flex flex-col items-center justify-center text-center px-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="text-6xl mb-6"
      >
        🌍
      </motion.div>
      <h2 className="font-display text-2xl sm:text-3xl text-paper mb-3">
        WanderAI is discovering {place || 'your destination'} for you...
      </h2>
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="text-paper/60 text-lg"
      >
        {messages[index]}
      </motion.p>
      <div className="mt-8 flex gap-2">
        {messages.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${i === index ? 'bg-compass-gold' : 'bg-paper/20'}`}
            style={i === index ? { background: 'var(--accent, #E8A33D)' } : undefined}
          />
        ))}
      </div>
    </div>
  )
}
