import { Compass } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 pb-6">
      <div className="max-w-6xl mx-auto rounded-[28px] bg-ink text-paper/70 px-6 sm:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5 text-paper mb-4">
              <Compass className="w-6 h-6 text-[#7FC1C6]" strokeWidth={1.75} />
              <span className="text-[13px] font-bold tracking-[0.22em] uppercase">
                Wander<span className="text-[#7FC1C6]">AI</span>
              </span>
            </div>
            <p className="font-display text-3xl sm:text-4xl text-paper leading-tight">
              Dream it. Discover it. <em className="text-compass-gold">Wander there.</em>
            </p>
          </div>
          <div className="font-mono text-[10px] tracking-[0.16em] uppercase text-paper/50 md:text-right space-y-2">
            <p>Search &middot; Discover &middot; Visit &middot; Locate</p>
            <p>&copy; {new Date().getFullYear()} WanderAI &middot; Built as a demo travel product</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
