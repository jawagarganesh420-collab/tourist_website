import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AIChat from './components/AIChat.jsx'
import IntroAnimation from './components/IntroAnimation.jsx'

import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import DestinationDetails from './pages/DestinationDetails.jsx'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">

      {/* =====================================================
          GRAND WANDERAI ENTRY
          ===================================================== */}

      <IntroAnimation />

      {/* =====================================================
          MAIN WEBSITE
          ===================================================== */}

      <Navbar />

      <main className="flex-1">

        <AnimatePresence
          mode="wait"
        >
          <Routes
            location={location}
            key={location.pathname}
          >

            {/* HOME */}

            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            {/* EXPLORE */}

            <Route
              path="/explore/:slug"
              element={
                <PageTransition>
                  <Explore />
                </PageTransition>
              }
            />

            {/* DESTINATION DETAILS */}

            <Route
              path="/destination/:id"
              element={
                <PageTransition>
                  <DestinationDetails />
                </PageTransition>
              }
            />

            {/* 404 */}

            <Route
              path="*"
              element={
                <PageTransition>
                  <div className="min-h-[60vh] flex items-center justify-center text-ink/60">
                    Page not found.
                  </div>
                </PageTransition>
              }
            />

          </Routes>
        </AnimatePresence>

      </main>

      {/* =====================================================
          FOOTER
          ===================================================== */}

      <Footer />

      {/* =====================================================
          AI CHAT
          ===================================================== */}

      <AIChat />

    </div>
  )
}
