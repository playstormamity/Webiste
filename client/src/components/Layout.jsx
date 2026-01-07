import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import playstormLogo from '../assets/logo.png'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/roster', label: 'Roster' },
  { to: '/lineups', label: 'Lineups' },
  { to: '/events', label: 'Events' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/contact', label: 'Contact' },
]

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <div className="min-h-screen flex flex-col text-gray-100 font-sans">

      {/* Background Blobs */}
      <div className="pointer-events-none fixed inset-0 opacity-60 z-0">
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-purple-700/40 blur-[110px]" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-pink-500/30 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity z-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/40 shadow-lg shadow-purple-500/40 overflow-hidden border border-purple-500/30">
              <img
                src={playstormLogo}
                alt="Playstorm Esports Club logo"
                className="h-full w-full object-contain p-1"
              />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xs uppercase tracking-[0.2em] text-purple-300">
                Amity University Noida
              </div>
              <div className="font-display text-sm font-semibold text-white">
                Playstorm Esports Club
              </div>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'relative px-1 py-1 text-xs uppercase tracking-[0.18em] transition-colors',
                    isActive ? 'text-purple-300' : 'text-gray-300 hover:text-white',
                    // Highlight PRO ARENA - Removed gradient, now solid Pink-400
                    link.label === 'PRO ARENA' ? 'font-bold text-pink-400 hover:text-pink-300' : ''
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 p-2 text-gray-300 hover:text-white active:scale-95 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden absolute top-full left-0 right-0 bg-[#080013]/95 border-b border-white/10 backdrop-blur-xl overflow-hidden"
            >
              <div className="flex flex-col p-6 space-y-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      [
                        'text-sm font-bold uppercase tracking-[0.2em] py-3 border-b border-white/5 transition-colors',
                        isActive ? 'text-purple-400 border-purple-500/30 pl-2' : 'text-gray-300 hover:text-white hover:pl-2',
                        link.label === 'PRO ARENA' ? 'text-pink-400' : ''
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-6xl w-full px-4 pb-16 pt-10 flex-grow">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/50 mt-auto">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-gray-400 md:flex-row">
          <p>© 2025 - 2026 Playstorm Esports Club · Amity University Noida</p>
          <p className="flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-gray-500">
            <span className="h-1 w-1 rounded-full bg-emerald-400" /> Competitive. Inclusive. Future-ready.
          </p>
        </div>
      </footer>
    </div>
  )
}