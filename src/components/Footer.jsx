import { Compass } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/60 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-paper font-display text-lg font-semibold">
          <Compass className="w-5 h-5" style={{ color: 'var(--accent, #E8A33D)' }} />
          WanderAI
        </div>
        <p className="text-sm text-center">Dream it. Discover it. Wander there.</p>
        <p className="text-xs">© {new Date().getFullYear()} WanderAI. Built as a demo travel product.</p>
      </div>
    </footer>
  )
}
