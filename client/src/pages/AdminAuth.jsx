import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Lock, Unlock } from 'lucide-react'

export default function AdminAuth() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    // Check credentials
    if (id === 'Abhinav@2402' && password === 'AMITYFTW') {
      localStorage.setItem('isAdmin', 'true')
      // Force a page reload to update the app state and layout
      window.location.href = '/'
    } else {
      setError('Invalid ID or Password')
    }
  }

  // If already logged in, show a logout button
  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    window.location.href = '/'
  }

  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  if (isAdmin) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20"
      >
        <Unlock className="h-16 w-16 text-emerald-400 mb-6" />
        <h2 className="font-display text-3xl text-white mb-4">Admin Access Granted</h2>
        <p className="text-gray-400 mb-8">All hidden pages are now visible.</p>
        <button
          onClick={handleLogout}
          className="rounded-xl border border-red-500/40 bg-red-500/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/20 transition"
        >
          Revoke Access
        </button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <Lock className="h-16 w-16 text-purple-400 mb-6" />
      <h2 className="font-display text-3xl text-white mb-4">Admin Authentication</h2>
      
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
        <div>
          <input
            type="text"
            placeholder="Admin ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-xl bg-purple-600 px-4 py-3 font-bold text-white hover:bg-purple-500 transition"
        >
          Login
        </button>
      </form>
    </motion.div>
  )
}
