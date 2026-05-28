import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import playstormLogo from '../assets/logo.png'

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  const handleLogout = async () => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (err) {
        console.error("Logout request failed:", err)
      }
    }
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('adminToken')
    window.location.href = '/'
  }

  const navLinks = isAdmin ? [
    { to: '/admin', label: 'Dashboard' },
    { to: '/lineups', label: 'Lineups' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/register', label: 'Register' },
    { to: '/pro-arena', label: 'Pro Arena' }
  ] : [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/roster', label: 'Roster' },
    { to: '/events', label: 'Events' },
    { to: '/s3', label: 'Season 3' },
    { to: '/contact', label: 'Contact' },
  ]

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <div className="min-h-screen flex flex-col text-gray-100 font-sans">

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity z-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 shadow-lg shadow-purple-500/40 overflow-hidden border border-purple-500/30">
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
          <div className="hidden items-center gap-2 md:flex bg-white/5 p-1 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    'relative px-4 py-2 text-xs uppercase font-bold tracking-[0.15em] transition-colors rounded-full overflow-hidden',
                    isActive ? 'text-white' : 'text-gray-400 hover:text-white',
                    link.label === 'PRO ARENA' ? 'text-pink-400 hover:text-pink-300' : '',
                    link.label === 'Season 3' ? 'text-purple-400 hover:text-purple-300' : ''
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 z-0 bg-white/10 border border-white/20 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="ml-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition"
              >
                Logout
              </button>
            )}
            
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


                
                {isAdmin && (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm font-bold uppercase tracking-[0.2em] py-3 border-b border-white/5 text-red-400 hover:text-red-300 transition-colors"
                  >
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto max-w-6xl w-full px-4 pb-16 pt-10 flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(6px)', y: 12 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="relative z-10 mt-auto">
        {/* Gradient separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        
        <div className="bg-black/60 backdrop-blur-xl border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid gap-10 md:grid-cols-[1.5fr,1fr,1fr,1fr]">
              
              {/* Brand Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/60 shadow-lg shadow-purple-500/40 overflow-hidden border border-purple-500/30">
                    <img src={playstormLogo} alt="Playstorm" className="h-full w-full object-contain p-1" />
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-white">Playstorm Esports</div>
                    <div className="text-[10px] uppercase tracking-widest text-purple-400">Amity University Noida</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
                  Amity's most elite esports community. Building the future of competitive gaming, one tournament at a time.
                </p>
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-gray-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Competitive. Inclusive. Future-ready.
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="font-display text-[10px] uppercase tracking-widest text-purple-400 font-bold">Navigate</h4>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Home', to: '/' },
                    { label: 'Events', to: '/events' },
                    { label: 'Roster', to: '/roster' },
                    { label: 'Season 3', to: '/s3' },
                    { label: 'Contact', to: '/contact' },
                  ].map(link => (
                    <NavLink key={link.to} to={link.to} className="text-xs text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-200">{link.label}</NavLink>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h4 className="font-display text-[10px] uppercase tracking-widest text-purple-400 font-bold">Connect</h4>
                <div className="flex flex-col gap-2.5">
                  <a href="https://discord.gg/eAqXkxgTF" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-purple-400 transition-colors">Discord</a>
                  <a href="https://instagram.com/playstorm.amity/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-pink-400 transition-colors">Instagram</a>
                  <a href="https://www.youtube.com/@PlaystormAmity" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-red-400 transition-colors">YouTube</a>
                  <a href="https://www.linkedin.com/company/playstormamity/" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-400 hover:text-blue-400 transition-colors">LinkedIn</a>
                </div>
              </div>

              {/* Season 3 CTA */}
              <div className="space-y-4">
                <h4 className="font-display text-[10px] uppercase tracking-widest text-purple-400 font-bold">Season 3</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Registrations are LIVE. 5 game titles. ₹1L+ prize pool.</p>
                <NavLink to="/s3" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white hover:scale-105 transition-transform shadow-lg shadow-purple-500/20">
                  Enter The Arena →
                </NavLink>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-600">
              <p>© 2025 - 2026 Playstorm Esports Club · Amity University Noida</p>
              <p className="font-display uppercase tracking-widest">Built Different. 🔥</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}