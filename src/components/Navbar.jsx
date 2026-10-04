import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Compass } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const LINKS = [
  { label: 'Home', target: 'top' },
  { label: 'Explore', target: 'explore' },
  { label: 'Trip Planner', target: 'planner' },
  { label: 'AI Guide', target: 'chat' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goTo(target) {
    setOpen(false)

    const run = () => {
      if (target === 'top') window.scrollTo({ top: 0, behavior: 'smooth' })
      else if (target === 'chat')
        document.querySelector('#ai-guide button[aria-label="Ask WanderAI"]')?.click()
      else document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
    }

    if (isHome) run()
    else {
      navigate('/')
      setTimeout(run, 600) // wait for the page transition to finish
    }
  }

  const solid = scrolled || !isHome

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        solid ? 'glass-nav' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-16">
        <Link to="/" className="flex items-center gap-2.5 text-ink">
          <Compass className="w-6 h-6 text-compass-teal" strokeWidth={1.75} />
          <span className="text-[13px] font-bold tracking-[0.22em] uppercase">
            Wander<span className="text-compass-teal">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.label}
              type="button"
              onClick={() => goTo(l.target)}
              className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink/70 hover:text-ink transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo('planner')}
            className="hidden sm:inline-flex items-center rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] tracking-[0.16em] uppercase text-paper transition-transform hover:-translate-y-0.5"
          >
            Plan my trip
          </button>
          <button
            type="button"
            className="md:hidden text-ink"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden mx-4 mb-3 rounded-2xl bg-paper/95 backdrop-blur-xl border border-ink/10 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col p-5 gap-4">
              {LINKS.map((l) => (
                <button
                  key={l.label}
                  type="button"
                  onClick={() => goTo(l.target)}
                  className="text-left font-mono text-[11px] tracking-[0.16em] uppercase text-ink/80 py-1"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
