import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Compass } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/#explore' },
  { label: 'Trip Planner', to: '/#planner' },
  { label: 'AI Guide', to: '/#ai-guide' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
  ? 'glass-nav shadow-lg shadow-black/20'
  : 'bg-[#03101f]/25 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <Link to="/" className="flex items-center gap-2 text-paper font-display text-xl font-semibold tracking-tight">
          <Compass className="w-6 h-6" style={{ color: 'var(--accent, #E8A33D)' }} />
          WanderAI
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-paper/80 font-medium">
          {LINKS.map((l) => (
            <a key={l.label} href={l.to} className="hover:text-paper transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/#planner')}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-ink transition-transform hover:scale-105"
            style={{ background: 'var(--accent, #E8A33D)' }}
          >
            ✈️ Plan My Trip
          </button>
          <button className="md:hidden text-paper" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-nav overflow-hidden"
          >
            <div className="flex flex-col px-5 pb-5 gap-4 text-paper/90">
              {LINKS.map((l) => (
                <a key={l.label} href={l.to} onClick={() => setOpen(false)} className="py-1">
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
