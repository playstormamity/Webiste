import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-4"
      >
        <h1 className="text-8xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent font-display">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white uppercase tracking-widest">
          Lost in the Storm?
        </h2>
        <p className="text-gray-400 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-purple-500/20 hover:border-purple-500 transition"
        >
          <Home className="w-4 h-4" /> Return Home
        </Link>
      </motion.div>
    </div>
  )
}