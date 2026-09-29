import { motion } from 'framer-motion'
import SearchBar from './SearchBar.jsx'
import heroBackground from '../assets/i.jpeg'

export default function Hero({ onSearch }) {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-ink">

      {/* ================= BACKGROUND ================= */}

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground})`,
        }}
      />

      {/* Main cinematic dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/95 via-[#020817]/65 to-[#020817]/20" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/85 via-transparent to-[#020817]/25" />

      {/* Subtle blue glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Right-side atmospheric glow */}
      <div className="absolute bottom-10 right-10 w-[450px] h-[250px] bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none" />

      {/* ================= FLOATING LIGHT EFFECTS ================= */}

      <div
        className="absolute top-24 left-10 w-72 h-24 bg-white/5 rounded-full blur-3xl animate-drift pointer-events-none"
      />

      <div
        className="absolute top-40 right-10 w-96 h-32 bg-white/5 rounded-full blur-3xl animate-drift pointer-events-none"
        style={{ animationDelay: '4s' }}
      />

      <div
        className="absolute bottom-24 left-1/3 w-64 h-20 bg-white/5 rounded-full blur-3xl animate-drift pointer-events-none"
        style={{ animationDelay: '9s' }}
      />

      {/* ================= AIRPLANE ================= */}

      <div
        className="absolute top-[22%] left-[8%] text-3xl opacity-70 animate-flyby pointer-events-none"
        style={{ animationDelay: '2s' }}
      >
        ✈️
      </div>

      {/* ================= COMPASS ================= */}

      <div
        className="absolute bottom-16 right-16 text-6xl opacity-10 animate-spinSlow hidden md:block pointer-events-none"
      >
        🧭
      </div>

      {/* ================= SMALL STARS / PARTICLES ================= */}

      {[...Array(18)].map((_, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 rounded-full bg-white/70 animate-twinkle pointer-events-none"
          style={{
            top: `${(i * 37) % 90}%`,
            left: `${(i * 61) % 95}%`,
            animationDelay: `${(i % 6) * 0.6}s`,
          }}
        />
      ))}

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 pt-24 pb-16">

        <div className="max-w-4xl">

          {/* Small label */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/90 text-sm font-medium shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Your AI guide to everywhere
            </span>
          </motion.div>

          {/* Main heading */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
          >
            Where will you
            <br />

            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-white bg-clip-text text-transparent">
              wander next?
            </span>

            <span className="ml-3">
              ✈️
            </span>
          </motion.h1>

          {/* Description */}

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg sm:text-xl text-white/75 leading-relaxed"
          >
            Tell WanderAI where you're going and discover the places,
            experiences and hidden gems worth exploring.
          </motion.p>

          {/* ================= SEARCH AREA ================= */}

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-[100] mt-9 max-w-3xl"
          >
            <div className="relative z-[100] p-2 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-2xl">
              <SearchBar
                onSearch={onSearch}
                large
              />
            </div>
          </motion.div>

          {/* ================= QUICK CATEGORIES ================= */}

          {/*
            IMPORTANT:
            This section is deliberately lower than the
            search autocomplete.

            When SearchBar opens its suggestions,
            those suggestions will appear above these
            buttons.
          */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative z-0 flex flex-wrap gap-3 mt-6"
          >
            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/80 text-sm">
              🏔️ Adventure
            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/80 text-sm">
              🏖️ Beaches
            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/80 text-sm">
              🍜 Food
            </span>

            <span className="px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-white/80 text-sm">
              🏙️ Cities
            </span>
          </motion.div>

        </div>

        {/* ================= BOTTOM INFO ================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative z-0 mt-16 flex flex-wrap gap-8 text-white/60 text-sm"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🌍</span>
            <span>Explore anywhere</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span>AI-powered discoveries</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xl">📍</span>
            <span>Find hidden gems</span>
          </div>
        </motion.div>

      </div>

      {/* ================= BOTTOM EDGE ================= */}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink to-transparent pointer-events-none z-0" />

    </section>
  )
}
