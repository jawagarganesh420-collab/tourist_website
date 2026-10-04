import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Compass } from 'lucide-react'
import { getLoadingMessages } from '../services/aiService.js'

export default function LoadingScreen({ place }) {
  const messages = getLoadingMessages()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % messages.length), 750)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: 'var(--bg)' }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        className="mb-8 text-compass-teal"
      >
        <Compass className="w-14 h-14" strokeWidth={1.25} />
      </motion.div>

      <p className="kicker mb-4">Discovering</p>
      <h2 className="font-display text-4xl sm:text-5xl leading-[0.98] text-ink mb-6 max-w-2xl">
        WanderAI is finding <em className="text-compass-teal">{place || 'your destination'}</em> for you
      </h2>

      <motion.p
        key={index}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/60"
      >
        {messages[index]}
      </motion.p>

      <div className="mt-8 flex gap-2">
        {messages.map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full transition-colors"
            style={{ background: i === index ? 'var(--accent)' : 'rgba(16,32,31,0.2)' }}
          />
        ))}
      </div>
    </div>
  )
}
