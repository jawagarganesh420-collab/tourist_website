import { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar.jsx'
import './Hero.css'

// Hosted hero clip: a kingfisher flies in and lands on a twig.
// Swap this for your own video if you like.
const VIDEO_URL = 'https://thinkingods.com/demos/kingfisher-hero/hero.mp4'

// Second of the clip at which the bird lands and the page UI reveals itself.
// Change this to match your clip.
const REVEAL_AT = 4.3
const HARD_TIMEOUT_MS = 9000
const SEEN_KEY = 'wanderai_hero_seen'

export default function Hero({ onSearch }) {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const replayRef = useRef(() => {})

  // Reduced-motion users, and anyone who already watched the intro this session,
  // get the final frame and the full UI immediately.
  const [instant] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
      return sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    const hero = heroRef.current
    const video = videoRef.current
    if (!hero || !video) return

    const root = document.documentElement
    let revealed = false
    let started = false
    const timers = []

    function paintThumbs() {
      const vw = video.videoWidth
      const vh = video.videoHeight
      if (!vw || !vh) return
      hero.querySelectorAll('canvas[data-crop]').forEach((canvas) => {
        try {
          const [x, y, s] = canvas.dataset.crop.split(',').map(Number)
          const size = s * vw
          canvas
            .getContext('2d')
            .drawImage(video, x * vw, y * vh, size, size, 0, 0, canvas.width, canvas.height)
          canvas.classList.add('is-on')
        } catch {
          // keep the gradient placeholder
        }
      })
    }

    function reveal() {
      if (revealed) return
      revealed = true
      hero.classList.add('is-revealed')
      paintThumbs()
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {}
    }

    // Make the page backdrop match the footage's backdrop exactly
    function matchBackdrop() {
      try {
        const vw = video.videoWidth
        const vh = video.videoHeight
        if (!vw || !vh) return
        const c = document.createElement('canvas')
        c.width = 1
        c.height = 1
        const ctx = c.getContext('2d', { willReadFrequently: true })
        ctx.drawImage(video, vw * 0.94, vh * 0.12, 1, 1, 0, 0, 1, 1)
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data
        root.style.setProperty('--bg', `rgb(${r}, ${g}, ${b})`)
        root.style.setProperty(
          '--ghost',
          `rgb(${Math.round(r * 0.955)}, ${Math.round(g * 0.955)}, ${Math.round(b * 0.955)})`
        )
      } catch {
        // readback blocked (cross-origin / file://) — CSS fallback colours stay
      }
    }

    function start() {
      if (started) return
      started = true
      matchBackdrop()

      if (instant) {
        video.addEventListener('seeked', reveal, { once: true })
        if (Number.isFinite(video.duration)) video.currentTime = Math.max(video.duration - 0.05, 0)
        timers.push(setTimeout(reveal, 1500))
        return
      }

      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(reveal)
    }

    function onTimeUpdate() {
      if (video.currentTime >= REVEAL_AT) reveal()
    }

    function replay() {
      revealed = false
      hero.classList.remove('is-revealed')
      hero.querySelectorAll('canvas.is-on').forEach((c) => c.classList.remove('is-on'))
      video.currentTime = 0
      const p = video.play()
      if (p && typeof p.catch === 'function') p.catch(reveal)
    }
    replayRef.current = replay

    video.addEventListener('loadeddata', start)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', reveal)
    video.addEventListener('error', reveal)
    timers.push(setTimeout(reveal, HARD_TIMEOUT_MS))

    // loadeddata may already have fired
    if (video.readyState >= 2) start()

    return () => {
      timers.forEach(clearTimeout)
      video.removeEventListener('loadeddata', start)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', reveal)
      video.removeEventListener('error', reveal)
    }
  }, [instant])

  function scrollToExplore() {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className={`kf-hero ${instant ? 'is-instant' : ''}`}>
      {/* ---------- media layer (clipped) ---------- */}
      <div className="kf-media">
        <video
          ref={videoRef}
          className="kf-video"
          src={VIDEO_URL}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="kf-shade kf-shade-l" />
        <div className="kf-shade kf-shade-b" />
        {/* giant word sits BEHIND the bird via mix-blend-mode: darken */}
        <div className="kf-ghost" aria-hidden="true">
          Wander<em>AI</em>
        </div>
      </div>

      {/* ---------- left copy + search ---------- */}
      <div className="kf-copy">
        <p className="kf-eyebrow rv" style={{ '--d': 0 }}>
          <span className="kf-rule" />
          Your AI guide to everywhere
        </p>
        <h1 className="kf-h1 font-display rv" style={{ '--d': 1 }}>
          Where will you wander <em>next?</em>
        </h1>
        <p className="kf-lede rv" style={{ '--d': 2 }}>
          Tell WanderAI where you&rsquo;re going and discover the places, experiences and hidden gems
          worth exploring &mdash; then see the exact spot on the map.
        </p>
        <div className="kf-search rv" style={{ '--d': 3 }}>
          <SearchBar onSearch={onSearch} large />
        </div>
      </div>

      {/* ---------- right cluster ---------- */}
      <div className="kf-cluster">
        <p className="kf-steps rv" style={{ '--d': 4 }}>
          Search <i>·</i> Discover <i>·</i> Visit <i>·</i> Locate
        </p>
        <div className="kf-cards">
          <Card
            delay={5}
            head="Discover"
            idx="01"
            caption="Look closer"
            crop="0.555,0.335,0.22"
            stat="Any city"
          />
          <Card
            delay={6}
            head="Locate"
            idx="02"
            caption="Take off"
            crop="0.43,0.60,0.24"
            stat="Exact pin"
            offset
          />
        </div>
      </div>

      {/* ---------- bottom strip ---------- */}
      <div className="kf-strip rv" style={{ '--d': 7 }}>
        <button type="button" className="kf-scroll" onClick={scrollToExplore}>
          Scroll to explore ↓
        </button>
        <span className="kf-loc">Cities · Countries · Landmarks</span>
        <button type="button" className="kf-replay" onClick={() => replayRef.current()}>
          ↻ Replay
        </button>
      </div>
    </section>
  )
}

function Card({ delay, head, idx, caption, crop, stat, offset }) {
  return (
    <article className={`kf-card rv ${offset ? 'is-offset' : ''}`} style={{ '--d': delay }}>
      <div className="kf-card-head">
        {head} / {idx}
      </div>
      <div className="kf-thumb">
        <canvas width="240" height="240" data-crop={crop} />
        <span className="kf-thumb-cap">{caption}</span>
      </div>
      <div className="kf-card-foot">
        <span className="kf-stat font-display">{stat}</span>
        <span className="kf-dots">
          <i className="on" />
          <i />
          <i />
        </span>
      </div>
    </article>
  )
}
