import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

// Components
import Layout from './components/Layout'
import LoadingScreen from './components/LoadingScreen'
import ScrollToTop from './components/ScrollToTop'

// --- NEW VISUAL EFFECTS ---
import { CursorTrackerBackground, CinematicGrain, ScrollProgressBar, BackToTop } from './components/VisualEffects'
import { CosmicMeshNebulaBackground } from './components/BackgroundOptions'

// Pages
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import RosterPage from './pages/Roster'
import EventsPage from './pages/Events'
import LeaderboardPage from './pages/Leaderboard'
import ContactPage from './pages/Contact'
import RegisterPage from './pages/Register'
import LineupsPage from './pages/Lineups'
import ProArenaPage from './pages/ProArena'
import Season3Page from './pages/Season3'
import AdminAuthPage from './pages/AdminAuth'
import NotFound from './pages/NotFound'

// --- ADMIN PROTECTED ROUTE WRAPPER ---
import { Navigate } from 'react-router-dom'
const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  if (!isAdmin) {
    return <Navigate to="/admin" replace />
  }
  return children
}

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
      <ScrollProgressBar />
      <BackToTop />
      <CinematicGrain />
      <CursorTrackerBackground />
      
      {/* 3. DYNAMIC BACKGROUND LAYER */}
      <CosmicMeshNebulaBackground />

      {/* 4. GLOBAL AUDIO */}

      
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
            <Route path="/s3" element={<Season3Page />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* ADMIN-ONLY ROUTES */}
            <Route path="/leaderboard" element={<AdminRoute><LeaderboardPage /></AdminRoute>} />
            <Route path="/register" element={<AdminRoute><RegisterPage /></AdminRoute>} />
            <Route path="/lineups" element={<AdminRoute><LineupsPage /></AdminRoute>} />
            <Route path="/pro-arena" element={<AdminRoute><ProArenaPage /></AdminRoute>} />
            
            {/* ADMIN LOGIN ROUTE */}
            <Route path="/admin" element={<AdminAuthPage />} />
            
            {/* 404 Route - Catch all unknown links */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      )}
    </Router>
  )
}

export default App