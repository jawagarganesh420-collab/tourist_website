import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Compass, MapPin, Sparkles, Plane } from 'lucide-react'

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 350),
      setTimeout(() => setStage(2), 1000),
      setTimeout(() => setStage(3), 1750),
      setTimeout(() => setStage(4), 2450),
      setTimeout(() => setVisible(false), 3550),
    ]

    return () => {
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] overflow-hidden bg-[#020817]"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          {/* =====================================================
              BACKGROUND
          ====================================================== */}

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(24,105,150,0.25),transparent_38%),radial-gradient(circle_at_20%_80%,rgba(36,82,160,0.18),transparent_35%),#020817]" />

          {/* Stars */}

          {[...Array(55)].map((_, index) => (
            <motion.span
              key={index}
              className="absolute w-[2px] h-[2px] rounded-full bg-white"
              style={{
                left: `${(index * 47) % 100}%`,
                top: `${(index * 71) % 100}%`,
              }}
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.8, 0.2],
                scale: [0, 1, 0.5],
              }}
              transition={{
                duration:
                  2 +
                  ((index * 13) % 20) / 10,
                delay:
                  ((index * 7) % 20) / 10,
                repeat: Infinity,
                repeatType: 'mirror',
              }}
            />
          ))}

          {/* =====================================================
              GLOWING ORBS
          ====================================================== */}

          <motion.div
            className="absolute left-1/2 top-1/2 w-[420px] h-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[90px]"
            animate={{
              scale: [0.8, 1.15, 0.95],
              opacity: [0.25, 0.55, 0.35],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="absolute left-[20%] bottom-[10%] w-[280px] h-[280px] rounded-full bg-blue-600/10 blur-[90px]"
            animate={{
              x: [0, 80, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
          />

          {/* =====================================================
              ORBIT RINGS
          ====================================================== */}

          <motion.div
            className="absolute left-1/2 top-1/2 w-[330px] h-[150px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan-300/20"
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: -15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: -15,
            }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
            }}
          />

          <motion.div
            className="absolute left-1/2 top-1/2 w-[390px] h-[180px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/10"
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 25,
            }}
            transition={{
              duration: 1.4,
              delay: 0.15,
              ease: 'easeOut',
            }}
          />

          {/* =====================================================
              CENTRAL COMPASS / GLOBE
          ====================================================== */}

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{
              opacity: 0,
              scale: 0.2,
              rotate: -90,
            }}
            animate={{
              opacity: stage >= 1 ? 1 : 0,
              scale: stage >= 1 ? 1 : 0.2,
              rotate: stage >= 1 ? 0 : -90,
            }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="relative flex items-center justify-center w-40 h-40 sm:w-48 sm:h-48">

              {/* Outer ring */}

              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-300/30"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Second ring */}

              <motion.div
                className="absolute inset-3 rounded-full border border-white/10"
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />

              {/* Globe */}

              <motion.div
                className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-cyan-300/50 bg-gradient-to-br from-cyan-400/15 via-blue-500/10 to-transparent shadow-[0_0_70px_rgba(34,211,238,0.2)]"
                animate={{
                  boxShadow: [
                    '0 0 35px rgba(34,211,238,0.12)',
                    '0 0 75px rgba(34,211,238,0.3)',
                    '0 0 35px rgba(34,211,238,0.12)',
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
              >
                <div className="absolute inset-4 rounded-full border border-cyan-200/20" />

                <Compass
                  className="w-16 h-16 sm:w-20 sm:h-20 text-cyan-200"
                  strokeWidth={1.2}
                />

                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,1)]"
                  animate={{
                    scale: [1, 1.7, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.div>

              {/* Orbiting dot */}

              <motion.div
                className="absolute w-3 h-3 rounded-full bg-[#E8A33D] shadow-[0_0_20px_rgba(232,163,61,0.9)]"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  transformOrigin:
                    '80px 80px',
                }}
              />

            </div>
          </motion.div>

          {/* =====================================================
              AIRPLANE
          ====================================================== */}

          <motion.div
            className="absolute left-1/2 top-1/2 z-20"
            initial={{
              x: -300,
              y: 180,
              opacity: 0,
              rotate: -18,
            }}
            animate={{
              x: [-300, -80, 90, 300],
              y: [180, 70, -30, -170],
              opacity: [0, 1, 1, 0],
              rotate: [-18, -8, 5, 15],
            }}
            transition={{
              duration: 3.1,
              delay: 0.45,
              ease: 'easeInOut',
            }}
          >
            <div className="relative">
              <Plane
                className="w-9 h-9 sm:w-11 sm:h-11 text-white drop-shadow-[0_0_15px_rgba(103,232,249,0.8)]"
                fill="rgba(103,232,249,0.15)"
              />

              {/* Flight trail */}

              <motion.div
                className="absolute right-7 top-1/2 w-32 h-[2px] origin-right bg-gradient-to-l from-cyan-300/70 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.8,
                }}
              />
            </div>
          </motion.div>

          {/* =====================================================
              LOCATION PINS
          ====================================================== */}

          {[
            {
              left: '23%',
              top: '30%',
              delay: 1.1,
            },
            {
              left: '75%',
              top: '27%',
              delay: 1.5,
            },
            {
              left: '79%',
              top: '67%',
              delay: 1.8,
            },
            {
              left: '18%',
              top: '68%',
              delay: 2.1,
            },
          ].map((pin, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                left: pin.left,
                top: pin.top,
              }}
              initial={{
                opacity: 0,
                scale: 0,
                y: 10,
              }}
              animate={{
                opacity:
                  stage >= 2 ? 1 : 0,
                scale:
                  stage >= 2 ? 1 : 0,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: pin.delay,
              }}
            >
              <div className="relative">
                <MapPin
                  className="w-5 h-5 text-[#E8A33D]"
                  fill="rgba(232,163,61,0.2)"
                />

                <motion.div
                  className="absolute inset-0 rounded-full border border-[#E8A33D]/50"
                  animate={{
                    scale: [1, 2.5],
                    opacity: [0.7, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                />
              </div>
            </motion.div>
          ))}

          {/* =====================================================
              BRAND REVEAL
          ====================================================== */}

          <div className="absolute inset-x-0 top-[67%] flex flex-col items-center text-center px-6">

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
                filter: 'blur(12px)',
              }}
              animate={{
                opacity:
                  stage >= 3 ? 1 : 0,
                y:
                  stage >= 3 ? 0 : 35,
                filter:
                  stage >= 3
                    ? 'blur(0px)'
                    : 'blur(12px)',
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-3"
            >
              <Compass
                className="w-8 h-8 sm:w-10 sm:h-10"
                style={{
                  color:
                    'var(--accent, #E8A33D)',
                }}
              />

              <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white">
                Wander
                <span className="text-cyan-300">
                  AI
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity:
                  stage >= 4 ? 1 : 0,
                y:
                  stage >= 4 ? 0 : 15,
              }}
              transition={{
                duration: 0.7,
              }}
              className="mt-4 flex items-center gap-2 text-white/65 text-sm sm:text-base"
            >
              <Sparkles className="w-4 h-4 text-[#E8A33D]" />

              <span>
                Your journey starts here
              </span>

              <Sparkles className="w-4 h-4 text-[#E8A33D]" />
            </motion.div>

          </div>

          {/* =====================================================
              BOTTOM LOADING LINE
          ====================================================== */}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-44 sm:w-56">

            <div className="h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-300 to-[#E8A33D]"
                initial={{
                  width: '0%',
                }}
                animate={{
                  width:
                    stage >= 4
                      ? '100%'
                      : stage === 3
                      ? '72%'
                      : stage === 2
                      ? '45%'
                      : '20%',
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                }}
              />
            </div>

            <motion.p
              className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Preparing your journey
            </motion.p>

          </div>

          {/* =====================================================
              CORNER DECORATION
          ====================================================== */}

          <div className="absolute top-6 left-6 text-white/20 text-[10px] tracking-[0.35em] uppercase">
            WanderAI
          </div>

          <div className="absolute top-6 right-6 text-white/20 text-[10px] tracking-[0.35em] uppercase">
            Explore · Discover · Wander
          </div>

          <div className="absolute bottom-6 left-6 text-white/15 text-[9px] tracking-[0.25em]">
            TRAVEL / AI / 01
          </div>

          <div className="absolute bottom-6 right-6 text-white/15 text-[9px] tracking-[0.25em]">
            WORLD AWAITS
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
