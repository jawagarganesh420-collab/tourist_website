import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AIChat from './components/AIChat.jsx'

import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import DestinationDetails from './pages/DestinationDetails.jsx'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  // Start every page at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/explore/:slug" element={<PageTransition><Explore /></PageTransition>} />
            <Route path="/destination/:id" element={<PageTransition><DestinationDetails /></PageTransition>} />
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

      <Footer />
      <AIChat />
    </div>
  )
}
