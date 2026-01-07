import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

// Components
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'
import MusicPlayer from './components/MusicPlayer'

// --- NEW VISUAL EFFECTS ---
import { CursorTrackerBackground, ParticleBackground } from './components/VisualEffects'

// Pages
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import RosterPage from './pages/Roster'
import EventsPage from './pages/Events'
import LeaderboardPage from './pages/Leaderboard'
import ContactPage from './pages/Contact'
import RegisterPage from './pages/Register'
import LineupsPage from './pages/Lineups' // Added Lineups
import NotFound from './pages/NotFound'
import ProArenaPage from './pages/ProArena' // Imported ProArena

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show loading screen for 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Router>
      {/* 1. UTILITIES */}
      <ScrollToTop /> {/* Forces page to top on route change */}
      
      {/* 2. GLOBAL VISUAL EFFECTS */}
      <CursorTrackerBackground />
      <ParticleBackground />

      {/* 3. GLOBAL AUDIO */}
      <MusicPlayer />
      
      {/* 4. LOADING SCREEN ANIMATION */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      
      {/* 5. MAIN APP CONTENT */}
      {!isLoading && (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/roster" element={<RosterPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/lineups" element={<LineupsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* NEW ROUTE FOR PRO ARENA */}
            <Route path="/pro-arena" element={<ProArenaPage />} />
            
            {/* 404 Route - Catch all unknown links */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      )}
    </Router>
  )
}

export default App